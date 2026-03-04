---
title: "Force Feedback Build Log: From Custom Firmware to EMC Lite"
date: 2026-02-26
tags: [Sim Racing, Force Feedback, Arduino Leonardo, EMC Lite, Build Log]
summary: How I went from writing my own FFB firmware on an Arduino Leonardo to switching to EMC Lite — the full path including the code I tested along the way.
---

## Starting point

I already had a working steering wheel and pedals from earlier versions of this project. The wheel used a magnetic encoder and a XIAO RP2040 for USB HID input, and it worked fine for steering. But there was no force feedback — the wheel just spun freely. I wanted the wheel to push back when the car hit a curb or lost grip, like a real steering rack.

So I started building a force feedback system. The hardware: an Arduino Leonardo for USB communication, a BTS7960 H-bridge motor driver, and a 12V brushed DC motor with a quadrature encoder on the shaft.

## Writing my own firmware

My first approach was to write everything from scratch on the Arduino Leonardo. The Leonardo natively supports USB HID, so the PC sees it as a game controller without extra drivers.

I started with encoder reading. The motor had an incremental quadrature encoder (A/B channels), and I needed accurate position tracking. Here's the interrupt-based counting code I used:

```cpp
volatile long encoderCount = 0;

void encoderISR_A() {
  bool a = digitalRead(ENCODER_A);
  bool b = digitalRead(ENCODER_B);
  encoderCount += (a == b) ? 1 : -1;
}

void setup() {
  pinMode(ENCODER_A, INPUT_PULLUP);
  pinMode(ENCODER_B, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(ENCODER_A), encoderISR_A, CHANGE);
}
```

Then converting counts to a steering angle:

```cpp
const float PPR = 537.7;
const float CPR = PPR * 4; // 2150.8 counts per revolution

float steeringAngle = (encoderCount / CPR) * 360.0;
```

Getting CPR wrong breaks everything downstream. I had a session where 180 degrees of physical rotation showed as 379 degrees in software — I was using PPR where I needed CPR.

## Testing the motor driver

Once encoder reading worked, I moved to driving the motor. The BTS7960 takes a PWM signal for speed and two direction pins. I wrote a proportional controller to push the motor toward a target position:

```cpp
void applyForce(int targetCount) {
  long error = targetCount - encoderCount;
  int pwmValue = constrain(abs(error) * 2, 0, 255);

  if (error > 0) {
    analogWrite(MOTOR_PWM_R, pwmValue);
    analogWrite(MOTOR_PWM_L, 0);
  } else {
    analogWrite(MOTOR_PWM_R, 0);
    analogWrite(MOTOR_PWM_L, pwmValue);
  }
}
```

This worked for basic centering — the wheel returned to center on its own, and I could feel resistance when turning. But the feel was inconsistent. Sometimes soft, sometimes it vibrated at center, and occasionally it felt like something was blocking rotation when nothing was.

## Where custom firmware hit a wall

The real problem was the FFB protocol. Games like BeamNG and Assetto Corsa send force feedback commands over USB using the PID (Physical Interface Device) protocol. The game sends structured effects — constant force, spring, damper, friction — and the firmware has to interpret them and drive the motor.

Implementing PID FFB from scratch on an Arduino is a lot of work. I got basic constant-force effects parsing, but handling multiple simultaneous effects, gain scaling, and timing made the firmware unreliable. I was spending more time debugging USB descriptor issues than improving how the wheel felt.

I also had axis mapping issues on the game side. Assetto Corsa would sometimes refuse brake binding even when the input showed up in the Windows game controller panel. And force feel changed between sessions for no clear reason — sometimes my firmware, sometimes game config, hard to tell which.

## Switching to EMC Lite

After a few weeks I looked at what other builders were using. EMC Lite kept coming up — it handles the PID protocol, motor driving, encoder reading, and effect processing out of the box.

The switch was straightforward. I flashed EMC Lite onto the Leonardo, kept the same wiring, and opened the desktop configurator. Within an afternoon I had working force feedback with spring, damper, and constant force effects. The configurator lets me adjust gains without reflashing, which was the other big advantage — I had wanted to build something like that but never got to it.

::: note Why writing my own firmware first was still worth it
The encoder ISR, motor driver code, and basic force loop gave me context for what EMC Lite is actually doing. When I adjust a parameter in the configurator now, I know what is changing at the hardware level.
:::

## Current setup

- Arduino Leonardo running EMC Lite firmware
- BTS7960 H-bridge driver
- 12V brushed DC planetary gearmotor (~3 Nm)
- Quadrature encoder (537.7 PPR, 2150.8 CPR at full decode)
- Wooden rig built from 2x4s

I am working toward adding a second motor on the same shaft for more torque. Power delivery is the current problem — a single 12V supply sags when both motors pull at once.

## What I took away from this

- Get encoder math right first. CPR vs PPR mixups waste hours.
- A proportional controller is enough to validate hardware before touching the FFB protocol.
- If a mature open-source firmware exists for your use case, use it. Save custom firmware for the parts that are actually unique to your build.
- Axis mapping bugs and FFB bugs look the same from the driver seat. Test them separately.

![Wheel test notes placeholder](/blog/placeholders/placeholder-blueprint.svg)
*Image placeholder: [ADD] wheel rig test photo / wiring snapshot*

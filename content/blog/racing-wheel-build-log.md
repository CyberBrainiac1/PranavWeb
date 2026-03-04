---
title: "Racing Wheel Build Log: V1 Steering, V2 Pedals, and V3 Force Feedback"
date: 2026-03-04
tags: [Sim Racing, DIY, Build Log, Force Feedback, XIAO RP2040, BeamNG]
summary: The full story of how I built a DIY sim racing rig from scratch — from a magnetic encoder steering wheel and spring-loaded pedals to an open-source force feedback system and a wooden rig.
---

## How it started: BeamNG and the joystick

It started with BeamNG. The physics in that game are realistic enough that I wanted to feel them, not just see them. I started by playing with a joystick and it was fun, but quickly became boring. I wanted something that felt like actual driving.

So I started sketching ideas for a steering wheel. The first problem I ran into: what sensor do I use to get an accurate reading of how far the wheel is turned?

I looked at potentiometers, rotary encoders, volume dials — nothing felt right for a steering wheel that might spin multiple times. Then I found a magnetic encoder inside an old odometer pod I had lying around. Magnetic encoders track rotation without contact, don't wear out, and give a clean signal. That was the answer.

---

## V1: The Steering Wheel

### Sensor and CAD

With the magnetic encoder chosen, I designed a 60-degree mounting stand for the odometer pod in CAD. I also found a Formula 1 steering wheel model online and sent it to the printer. While that was printing, I figured out the electronics.

::: note Build order tip
I started the print first and figured out the wiring while it ran. This kept things moving in parallel instead of waiting for hardware at every step.
:::

### Showing up as a controller

I quickly realized the wheel needed to show up as a USB controller for games to see it. Serial output wasn't enough — games don't read serial ports.

I researched how commercial wheel manufacturers handle this. The answer: USB HID. If the microcontroller presents itself as a USB Human Interface Device, the operating system treats it like a gamepad with no custom drivers needed.

I had a Seeed Studio XIAO RP2040 from an old custom macropad build. It runs on the RP2040 chip and already acts as a USB HID device when connected to a computer — exactly what I needed.

### Writing the firmware

I first wrote simple encoder code to read position values and print them to the serial monitor. Once I confirmed the encoder was working and the values made sense, I adapted the code to output USB HID reports so the wheel would show up as a joystick axis in-game.

I got help from ChatGPT to structure the HID descriptor and understand how axis values map to the expected range. After that I added tuning parameters: sensitivity multipliers, steering speed limits, and center-point calibration so I could adjust feel without reflashing.

The result worked. Windows recognized it as a game controller, BeamNG picked up the steering input, and I could tune how it felt from a config block at the top of the firmware.

![Placeholder: V1 steering wheel on desk](/blog/placeholders/placeholder-blueprint.svg)
*[Image placeholder: V1 steering wheel — F1 wheel print mounted with the odometer pod encoder, XIAO RP2040 wired underneath]*

---

## V2: The Pedals

### Why pedals were next

After the wheel worked, I had no way to accelerate. I needed pedals.

Before printing anything, I built a cardboard prototype to find problems early. Cardboard is fast to cut and tape, and it immediately showed me the biggest issue: **the pedal did not return to its resting position when I let go.**

I needed a return force — something stronger than rubber bands.

### The spring problem (and how I solved it)

I looked at how commercial pedals work. The answer is compression springs: press the pedal, the spring compresses; release it, the spring pushes back. Simple, consistent, and strong enough to overcome friction.

I didn't have compression springs around. But I did have a tight expansion spring. I stretched it out by hand and used a heat gun to lock it in that expanded position permanently. This works because of **stress relief** — heating a metal spring lets the atoms rearrange into a new equilibrium. Once it cools, the spring stays in that shape without memory of where it started.

The resulting spring behaved like a compression spring in function: stretched out and anchored at both ends, it pushed the pedal back to rest every time.

### Printing and assembly

I CADed a pedal design around the converted spring and printed it. For the sensor I used a lower-resolution rotary encoder this time — fewer counts per revolution means less processing load on the microcontroller and lower power draw, which matters when both devices share the same USB power.

The printed pedal worked. But two issues came up:

1. **Hard to press.** The spring rate was too high. More geometry tuning needed.
2. **Inconsistent return position.** I had over-toleranced the screw holes, which gave the pedal too much wiggle room. Every press landed in a slightly different spot — sometimes too far forward, sometimes too far back.

I also learned that **how the pedal is fixed to the floor matters as much as the pedal itself.** If the base shifts while pressing, the sensor reading drifts regardless of how well the return spring works.

### Software mitigation

Rather than reprint the chassis for the tolerance issue (which would have taken hours), I fixed it in software. I added dead-zone logic and a return-position clamp so the firmware treats a range of input values as "zero" instead of requiring a single exact count.

::: note Lesson
Hardware tolerances you can't fix fast are often faster to correct in firmware. Know which lever to pull.
:::

![Placeholder: V2 pedal assembly](/blog/placeholders/placeholder-blueprint.svg)
*[Image placeholder: V2 pedal — spring mounted underneath, encoder visible, cardboard prototype nearby for comparison]*

---

## V3: Force Feedback

### What I was missing

After a while I compared my setup to a friend's wheel. Theirs had **force feedback** — the wheel pushed back, resisted, and reacted to what was happening on-screen. When tires slipped, the wheel got light. When grip came back, it stiffened. When the car hit a curb, it kicked.

That feedback loop makes sim racing feel real. Without it, I was just turning a handle with no connection to the car.

### How FFB works

BeamNG outputs structured force commands, something like:

- "Apply 8 Nm to the left for 5 ms"
- "Resist with 3 Nm (high grip surface)"
- "No resistance (ice)"

The wheel firmware reads these commands and drives a motor attached to the steering shaft. The motor applies or resists force based on what the game sends. If the driver is stronger than the motor, the tires slip — just like in a real car with strong feedback at the steering rack.

### Hardware decisions

I needed a motor. Real FFB motors for sim racing run around 8 Nm and cost $400+. I found a motor I had lying around rated at about 3 Nm, which is lower but usable on a budget. The driving feel is less intense, but the signal path and the feedback loop work the same way.

For the wheel itself, I wanted physical buttons — shift paddles, a horn, whatever else. But wiring a full button cluster from scratch was going to be expensive and time-consuming, especially with school keeping me busy. Then I noticed something obvious: my existing controller already had all the buttons I needed. I just mounted the controller on the wheel. No reprogramming, no new wiring, same experience.

### Mechanical redesign

I rebuilt the wheel mount from the ground up for V3. The main changes:

- **Triangle supports at the back.** Steering wheels flex under hard input. I added two angled supports behind the wheel hub that form a triangle with the main column — stiff, light, and easy to print.
- **Snap-on wheel shapes.** My printer bed wasn't big enough to print the full wheel in one piece. Instead of adding seams, I designed the wheel as interlocking snap-fit segments that can be swapped out. Different cars have different wheel shapes, so this makes sense anyway.

### Firmware: open source from the start

I wrote the FFB firmware with the intent of making it public so anyone building a budget wheel could use it. The first target was getting the motor encoder working — my FFB motor had a different encoder type than the steering encoder in V1, so I had to adapt the counting logic.

Then I got the FFB signal path working: read the BeamNG output, convert to a torque command, and drive the motor driver to produce that force.

One thing I hit: **my original XIAO RP2040 couldn't handle the FFB communication protocol alongside HID output at the same time.** I needed a microcontroller with more peripherals and processing headroom. I swapped to a different board that handled both channels cleanly.

### The rig and what's next

While all this was happening, I built a simple wooden rig out of 2x4s. It gives the setup the physical feel of sitting in a car — wheel in front, pedals at your feet, seat behind you. It's not pretty, but it's rigid and functional.

I'm also working on a VR headset using an old phone to go with the rig. And I just finished wiring a second motor into the wheel — **dual-motor for more torque** — but I'm running into power delivery issues at the moment.

![Placeholder: V3 FFB wheel with wooden rig](/blog/placeholders/placeholder-blueprint.svg)
*[Image placeholder: V3 FFB wheel — triangle supports visible, controller mounted on wheel, wooden rig in background. Upload pending.]*

---

## What this build actually taught me

- **Start with cardboard.** Every version I prototyped in cardboard or cardboard-equivalent first saved me at least one failed print.
- **Fix tolerances in software first, hardware second.** Reflashing takes minutes; reprinting takes hours.
- **Budget constraints force good decisions.** Using a 3 Nm motor instead of an 8 Nm one meant I had to understand the FFB signal path deeply rather than just throwing power at the problem.
- **Reuse what you have.** The XIAO RP2040 from an old macropad, the odometer pod encoder, the existing controller for buttons — all of those avoided new purchases and taught me to think in systems instead of parts.

V1, V2, and V3 are each real revisions in hardware, firmware, and understanding. Each one was built because the previous one showed me exactly what was missing.

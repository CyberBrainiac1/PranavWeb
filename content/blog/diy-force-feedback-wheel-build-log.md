---
title: Building a DIY Force Feedback Wheel: What Worked, What Broke, What I’m Fixing Next
date: 2026-02-26
tags: [Sim Racing, Force Feedback, Arduino Leonardo, Build Log]
summary: A full timeline of my DIY wheel build, from BeamNG and Assetto Corsa setup to encoder math bugs, axis issues, and what I’m testing next.
---

## Why I started this project

I built this because I wanted my own steering wheel for sim racing, not just to play, but to understand what makes a setup actually feel right.  
I started in BeamNG, then moved into Assetto Corsa. The goal was simple at first: make the wheel and pedals behave correctly in game.

Then the project got deeper.  
It was not just "does it move?" anymore. It became:

- Is axis direction correct?
- Are controls binding the way they should?
- Does the reported angle match real angle?
- Does force feedback feel predictable?

I also want to try a fully maxed-out sim setup in person. I want that reference point so I know what "great" should feel like, not just what is "working."

## Core stack I’m using right now

My current base stack:

- Arduino Leonardo (USB HID)
- BTS7960 H-bridge motor driver
- Quadrature incremental encoder (A/B)

I also explored EMC Lite wiring/config, looked into EMC Pro availability, and checked FFBeast ideas to see what could improve a Leonardo-based FFB path.

Long term, I want an EMC Lite-like standalone tuning app (desktop `.exe` style) so I can tweak wheel settings quickly without reflashing every small change.

## Motor and drivetrain direction (current plan)

I’m working toward a dual-motor layout:

- Two 12V brushed DC planetary gearmotors
- Both geared into one shared shaft
- Both commanded together to sum torque

From earlier reference notes, this is in the ~312 RPM class at gearbox output.  
Final coupling details are still `[ADD]`.

## The math lesson that kept coming back

The one rule that I now treat as non-negotiable:

```python
# full quadrature decoding
cpr = ppr * 4
```

In my case, I referenced 537.7 PPR at output shaft. That means:

```python
ppr = 537.7
cpr = ppr * 4  # 2150.8
```

That number affects everything. If CPR is wrong in any part of the chain, steering angle and in-game behavior drift fast.

::: note Why this mattered so much
When angle looked wrong, it usually was not a "small tuning issue." It was almost always a counting/reference mismatch.
:::

## Weird bug timeline (real problems I hit)

This is the part that took the most time:

1. I rotated 180° and saw around **379°** reported.
2. Later, 180° showed around **21°**.
3. Pedals showed activity in UI, but in-game behavior was still wrong.
4. Controls were backwards at least once.
5. Axis mapping got messy:
   - Throttle should be **Z**
   - Brake should be **Y**
   - That was not always what the game accepted
6. Assetto Corsa sometimes would not accept brake binding even when button press registered elsewhere.
7. FFB feel changed session to session:
   - Sometimes soft
   - Sometimes it felt like something was stopping rotation (no physical block found)
   - Sometimes it felt vibration-like

### Brake input snapshot I used

- Pressed = HIGH (button to 3V3)
- Encoder pins on D2/D3
- Brake button on D4

## What I think is happening (hypotheses, not final conclusions)

These are working hypotheses:

- I may have measured/used the wrong shaft reference at some points.
- CPR/PPR values may have been inconsistent between code and hardware assumptions.
- Gear reduction may not have been fully included in final steering-angle mapping.
- Partial quadrature decoding can collapse expected counts.
- Axis inversion + game-specific bind behavior can make "working input" look broken.

None of this is final truth yet. I’m treating each one as a testable cause.

## What I’m testing next

My next passes are structured:

1. Repeat fixed-angle checks and log counts every run.
2. Lock one CPR source and verify full quadrature decoding path.
3. Re-test axis direction and bind order in both BeamNG and Assetto Corsa with the same checklist.
4. Tune force response to reduce soft zones and vibration-like behavior.
5. Publish a stable baseline profile `[ADD]`.

## Build constraints and future upgrades

The rig itself is intentionally constrained:

- Wood-only
- ONLY 2x4s
- Mostly built with a drill

That constraint keeps me honest and forces practical design choices.

Future upgrades I’m actively looking at:

- Handbrake ergonomic fist handle (`.STEP`)
- Paddle shifters with limit switches (`.STEP` / SolidWorks)
- Tensioner CAD parts
- Repurposing old drill parts where useful
- Possible ESP32 wireless path later

::: tip Big picture
The goal is not just to "have a wheel."  
The goal is a system I understand deeply, can fix quickly, and can keep improving without rebuilding from zero every time.
:::

![Wheel test notes placeholder](/blog/placeholders/placeholder-blueprint.svg)
*Image placeholder: [ADD] wheel rig test photo / wiring snapshot*

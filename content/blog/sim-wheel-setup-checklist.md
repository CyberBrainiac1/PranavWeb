---
title: Sim Wheel Setup Checklist: What I Use Before Every Test Session
date: 2026-02-26
tags: [Sim Racing, Setup, Troubleshooting, BeamNG, Assetto Corsa]
summary: The practical checklist I use to get steering, throttle, brake, and force response working before I start tuning.
---

## Why I made this checklist

I kept losing time on the same setup mistakes, especially when switching between BeamNG and Assetto Corsa.  
So I wrote this as a real pre-flight checklist I can run every session.

This is not theory. This is the stuff that actually helps me get from "weird behavior" to "driveable build" faster.

## 1) Hardware pre-check (2 minutes)

Before opening any game:

- Confirm wheel rotates freely with no mechanical rub.
- Confirm encoder A/B wiring is stable.
- Confirm brake button wiring is stable (my brake button path is on D4).
- Confirm motor driver power path is clean and not loose.
- Confirm USB reconnect gives a clean device detect.

If any of these fail, I stop there and fix hardware first.

## 2) Input map first, tuning second

I set controls in this order:

1. Steering
2. Throttle
3. Brake
4. Extra buttons

For my setup target:

- Throttle should be on **Z**
- Brake should be on **Y**

If I skip this order and start tuning early, I usually end up tuning around a mapping bug.

## 3) Direction check (this catches a lot)

I do one slow movement pass:

- Turn wheel left and verify game steering goes left.
- Press throttle and verify value rises the correct way.
- Press brake and verify the brake action goes the correct way.

If anything is backwards, I fix inversion before touching sensitivity.

## 4) Bind behavior check per game

BeamNG and Assetto Corsa do not always accept binds the same way.

What I do now:

- Re-bind each critical input manually after major firmware/input changes.
- If Assetto Corsa refuses brake bind, I clear and re-bind only brake first.
- I verify the bind result by driving one short lap, not just by looking at the menu meter.

Seeing activity in the settings screen is not enough. It still has to behave correctly in-game.

## 5) Angle sanity test (quick version)

I rotate to a known rough angle and confirm the reading is in the right range.  
If angle is wildly wrong, I stop and verify count math and shaft reference before any feel tuning.

This avoids wasting time trying to tune FFB on broken angle data.

## 6) Force feel check

I do three short tests:

- Center return feel
- Quick left-right transitions
- Hold against resistance

If it feels too soft, blocked, or vibration-like, I log exactly when it happens and move one variable at a time.

## 7) My session log format

I keep short notes for each test:

- Build version: `[ADD]`
- Game + track: `[ADD]`
- Input map status: pass/fail
- Direction status: pass/fail
- Bind status: pass/fail
- Feel notes: one sentence
- Next change: one sentence

This keeps me from repeating the same dead-end changes.

## What this checklist fixed for me

- Faster recovery from backwards controls
- Less confusion from game bind mismatch
- Cleaner separation between mapping bugs and feel tuning
- More consistent test-to-test progress

If you are building your own wheel, this checklist is a way better use of time than guessing from memory every session.

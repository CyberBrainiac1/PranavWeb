---
title: CPR vs PPR: The One Rule That Saved Me (PPR × 4)
date: 2026-02-25
tags: [Sim Racing, Encoder Math, Debugging]
summary: A short breakdown of CPR vs PPR, why PPR x 4 matters, and how this rule connected directly to my steering-angle bugs.
---

## The short version

If you are reading quadrature encoder signals (A/B), this is the rule:

```python
def counts_per_rev(ppr: float) -> float:
    return ppr * 4
```

I kept coming back to this while debugging my wheel angle.

## Why it mattered in my build

At one point:

- 180° rotation showed ~379°

Later:

- 180° rotation showed ~21°

That is the kind of error that usually means count/reference math is off, not just "game settings are weird."

## My reference example

I referenced 537.7 PPR at output shaft:

```python
ppr = 537.7
cpr = ppr * 4  # 2150.8
```

If code assumes a different CPR, angle conversion will be wrong even when hardware seems fine.

## Common places this goes wrong

- Measuring one shaft but calculating for another
- Forgetting gear reduction in final angle mapping
- Decoding only part of quadrature but assuming full x4 counts
- Mixing values between notes, firmware, and test scripts

::: warning Reminder to future me
Before tuning feel, lock the math.
:::

## What I do now

1. Fix one CPR value as the source of truth.
2. Run repeatable fixed-angle tests.
3. Log expected vs actual counts each pass.
4. Only then tune game-side behavior.

It saved me time because once this was right, other issues became easier to isolate.

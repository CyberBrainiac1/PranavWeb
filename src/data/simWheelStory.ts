import type { ProjectSection } from './projects'

export const simWheelProjectSections: ProjectSection[] = [
  {
    heading: '1) Why I built it (BeamNG -> Assetto Corsa)',
    bullets: [
      'I started this build because I wanted a DIY steering wheel setup I could actually tune myself.',
      'BeamNG was the first target, then I moved testing into Assetto Corsa.',
      'A big part of the project is getting wheel and pedals to behave correctly in-game with proper binding, limits, and direction.',
      'I also want to try a fully maxed-out sim setup in person so I can benchmark what "great" should actually feel like.',
    ],
  },
  {
    heading: '2) Core hardware stack',
    bullets: [
      'Controller: Arduino Leonardo running as USB HID.',
      'Motor driver: BTS7960 H-bridge module.',
      'Position feedback: quadrature incremental encoder (A/B channels).',
      'I explored EMC Lite wiring/config and asked about EMC Pro availability for future options.',
      'I also looked into FFBeast ideas and whether they can improve a Leonardo-based FFB path.',
      'Long-term software goal: an EMC Lite-like standalone tuning app (.exe style) for fast settings changes.',
    ],
  },
  {
    heading: '3) Encoder math and the CPR rule',
    bullets: [
      'One rule that matters every time: CPR = PPR x 4 for full quadrature decoding.',
      'The encoder reference I used was 537.7 PPR at output shaft, which is about 2150.8 CPR after x4.',
      'If CPR is wrong anywhere in the chain, steering angle mapping breaks immediately.',
    ],
  },
  {
    heading: '4) Dual-motor torque idea (in progress)',
    bullets: [
      'Current direction is a dual-motor architecture with two 12V brushed DC planetary gearmotors geared into one shared shaft.',
      'Goal is to sum torque while commanding both motors together.',
      'Reference class is around 312 RPM at gearbox output from earlier setup notes.',
      '[ADD] Final gear ratio and coupling layout after test validation.',
    ],
  },
  {
    heading: '5) Weird bugs timeline',
    bullets: [
      'At one point, rotating 180 degrees reported around 379 degrees.',
      'Later, the same 180-degree movement reported around 21 degrees.',
      'Pedals had multiple mapping issues even when the game UI showed activity.',
      'Auto-calibration worked, but I tested no-calibration behavior with brake as a button.',
      'Controls were backwards at least once and needed inversion fixes.',
      'Throttle was supposed to be Z axis, brake was supposed to be Y axis, but mapping did not always hold.',
      'Assetto Corsa sometimes would not accept brake binding even when button press registered elsewhere.',
      'Brake wiring at one point: pressed = HIGH with button to 3V3; encoder on D2/D3 and brake button on D4.',
      'FFB feel was inconsistent: sometimes soft, sometimes like it was being stopped, sometimes vibration-like.',
    ],
  },
  {
    heading: '6) What I think is happening (hypotheses)',
    bullets: [
      'Hypothesis: wrong shaft reference in calculations can cause major angle mismatch.',
      'Hypothesis: CPR/PPR values may be inconsistent between code and measured shaft.',
      'Hypothesis: gear reduction may not be fully accounted for in final steering-angle math.',
      'Hypothesis: partial quadrature decoding could collapse expected counts.',
      'Hypothesis: axis inversion and game-specific binding behavior can hide hardware that is actually reporting correctly.',
    ],
  },
  {
    heading: '7) What I am testing next',
    bullets: [
      'Validate angle math with repeatable fixed-angle tests and logged counts.',
      'Lock one consistent CPR source and confirm full decoding path.',
      'Re-test axis direction and binding order across BeamNG and Assetto Corsa with a strict checklist.',
      'Tune force response to remove soft/dead behavior and reduce vibration-like artifacts.',
      '[ADD] Publish a stable baseline profile after repeatability checks.',
    ],
  },
  {
    heading: '8) Future upgrades',
    bullets: [
      'Keep building the rig with wood-only constraints (2x4s and mostly a drill).',
      'Explore ergonomic handbrake fist-handle CAD (.STEP).',
      'Add paddle shifter concepts with limit switches (.STEP / SolidWorks).',
      'Use tensioner parts and possibly repurpose old drill components where practical.',
      'Investigate ESP32 wireless path for future versions.',
    ],
  },
]

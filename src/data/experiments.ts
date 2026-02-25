export type Experiment = {
  id: string
  label: string
  title: string
  notes: string[]
  status: string
}

export const experiments: Experiment[] = [
  {
    id: 'sim-rig-log',
    label: 'LOG 01',
    title: 'Sim Rig Input + Feel Iteration',
    status: 'ACTIVE',
    notes: [
      'Encoder mapping and smoothing updates are driving current pedal feel experiments.',
      'V2 shorter-travel pedal behavior is being tuned for control consistency.',
    ],
  },
  {
    id: 'embedded-vision',
    label: 'LOG 02',
    title: 'Embedded Image Classification',
    status: 'IN PROGRESS',
    notes: [
      'Experimenting with real-time image classification on embedded hardware.',
      '[ADD] Captured benchmark metrics and deployment notes.',
    ],
  },
  {
    id: 'isaac-sim',
    label: 'LOG 03',
    title: 'Isaac Sim Exploration',
    status: 'EARLY',
    notes: [
      'Exploring simulation workflows that can support hardware-first robotics iteration.',
      '[ADD] Validated simulation-to-hardware transfer workflow.',
    ],
  },
]

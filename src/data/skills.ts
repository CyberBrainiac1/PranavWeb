export type SkillModule = {
  id: string
  label: string
  title: string
  items: string[]
}

export const skillModules: SkillModule[] = [
  {
    id: 'cad',
    label: 'MODULE / CAD',
    title: 'Design + Mechanisms',
    items: ['SolidWorks', 'Onshape', 'Mechanism packaging', 'Assembly-driven iteration'],
  },
  {
    id: 'fabrication',
    label: 'MODULE / FAB',
    title: 'Prototyping + Fabrication',
    items: ['3D printing', 'Basic machining', 'Rapid prototyping', 'Fixture-minded builds'],
  },
  {
    id: 'electronics',
    label: 'MODULE / ELECTRO',
    title: 'Electronics + Control',
    items: ['Basic electronics', 'Motor drivers', 'Sensors', 'Signal sanity checks'],
  },
  {
    id: 'embedded',
    label: 'MODULE / EMBED',
    title: 'Embedded Stack',
    items: ['ESP32', 'Raspberry Pi', 'Sensor tuning', 'Real-world tuning loops'],
  },
  {
    id: 'systems',
    label: 'MODULE / TEST',
    title: 'Testing + Iteration',
    items: [
      'Hardware integration',
      'Bench validation',
      'Debug-first iteration',
      'Build / iterate / test',
    ],
  },
]

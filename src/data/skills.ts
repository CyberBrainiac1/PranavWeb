export type SkillModule = {
  id: string
  label: string
  title: string
  items: string[]
}

export const skillModules: SkillModule[] = [
  {
    id: 'cad',
    label: 'CAD',
    title: 'Design + Mechanisms',
    items: ['SolidWorks', 'Onshape', 'Mechanism layout', 'Assembly iteration'],
  },
  {
    id: 'fabrication',
    label: 'FAB',
    title: 'Build + Fabrication',
    items: ['3D printing', 'Basic machining', 'Rapid prototyping', 'Simple fixtures'],
  },
  {
    id: 'electronics',
    label: 'ELECTRONICS',
    title: 'Electronics + Control',
    items: ['Basic electronics', 'Motor drivers', 'Sensors', 'Signal checks'],
  },
  {
    id: 'embedded',
    label: 'EMBEDDED',
    title: 'Embedded Hardware',
    items: ['ESP32', 'Raspberry Pi', 'Sensor tuning', 'Real-world testing loops'],
  },
  {
    id: 'systems',
    label: 'TESTING',
    title: 'Testing + Iteration',
    items: ['Hardware integration', 'Bench validation', 'Iteration mindset', 'Build / test / improve'],
  },
]

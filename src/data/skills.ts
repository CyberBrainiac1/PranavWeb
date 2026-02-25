export type Skill = {
  name: string
  group: 'CAD' | 'Fabrication' | 'Embedded' | 'Software' | 'Systems'
  icon: 'cad' | 'fabrication' | 'embedded' | 'software' | 'systems'
}

export const skills: Skill[] = [
  { name: 'SolidWorks', group: 'CAD', icon: 'cad' },
  { name: 'Onshape', group: 'CAD', icon: 'cad' },
  { name: '3D Printing', group: 'Fabrication', icon: 'fabrication' },
  { name: 'Machining', group: 'Fabrication', icon: 'fabrication' },
  { name: 'Rapid Prototyping', group: 'Fabrication', icon: 'fabrication' },
  { name: 'ESP32', group: 'Embedded', icon: 'embedded' },
  { name: 'Raspberry Pi', group: 'Embedded', icon: 'embedded' },
  { name: 'Sensors + Actuators', group: 'Embedded', icon: 'embedded' },
  { name: 'Python', group: 'Software', icon: 'software' },
  { name: 'HTML/CSS', group: 'Software', icon: 'software' },
  { name: 'System Integration', group: 'Systems', icon: 'systems' },
  { name: 'Hardware Debugging', group: 'Systems', icon: 'systems' },
]

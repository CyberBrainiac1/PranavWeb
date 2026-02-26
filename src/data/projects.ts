import { simWheelProjectSections } from './simWheelStory'

export type ProjectStatus = 'featured' | 'active' | 'team' | 'in-progress'

export type ProjectSection = {
  heading:
    | 'Goal'
    | 'Hardware [ADD PARTS]'
    | 'Electronics/Control [ADD]'
    | 'Input/Response tuning [ADD]'
    | 'Tuning / Feel [ADD]'
    | 'What I’m improving next [ADD]'
    | string
  bullets: string[]
}

export type Project = {
  id: string
  name: string
  summary: string
  status: ProjectStatus
  tags: string[]
  links?: Array<{ label: string; href: string }>
  featured?: boolean
  rev: string
  spec: string
  details: ProjectSection[]
}

export const projects: Project[] = [
  {
    id: 'sim-racing-wheel-force-feedback',
    name: 'Sim Racing Wheel / Force Feedback',
    summary:
      'DIY steering wheel + pedals project focused on getting realistic in-game behavior and better force feedback feel over each revision.',
    status: 'featured',
    featured: true,
    tags: ['Sim Racing', 'Force Feedback', 'Arduino Leonardo', 'BTS7960', 'Encoder A/B'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [
      { label: 'Full Build Log', href: '#/blog/diy-force-feedback-wheel-build-log' },
      { label: 'CPR vs PPR Notes', href: '#/blog/cpr-vs-ppr-one-rule' },
    ],
    details: simWheelProjectSections,
  },
  {
    id: 'ftc-evergreen-dragons',
    name: 'FTC Evergreen Dragons',
    summary:
      'I build competitive robots with my FTC team, mostly mechanism design and quick testing.',
    status: 'team',
    tags: ['FTC', 'Mechanisms', 'CAD', 'Integration'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    details: [
      {
        heading: 'Focus',
        bullets: [
          'Turn ideas into parts we can actually build and test quickly.',
          'Update designs based on what happens on real hardware, not just CAD.',
        ],
      },
    ],
  },
  {
    id: 'frc-2854-prototypes',
    name: 'FRC 2854 Prototypes',
    summary:
      'Prototype work with FRC 2854 to test mechanism ideas and see what is worth building further.',
    status: 'team',
    tags: ['FRC', 'Prototype', 'Mechanics'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    details: [
      {
        heading: 'Focus',
        bullets: [
          'Try different mechanism options and figure out what fits.',
          'Keep notes on what works before making things more complex.',
        ],
      },
    ],
  },
  {
    id: 'esp32-control-projects',
    name: 'ESP32 Control Projects',
    summary:
      'ESP32 projects where I connect sensors and drivers, then tune behavior for robot tasks.',
    status: 'active',
    tags: ['ESP32', 'Sensors', 'Control'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'What I worked on',
        bullets: [
          'Sensor readout and filtering with real hardware noise.',
          'Tuning control loops so behavior stays consistent across versions.',
        ],
      },
    ],
  },
  {
    id: 'maker-tools-solderbuddy',
    name: 'Maker Tools / SolderBuddy',
    summary:
      'Small bench helper tools, including SolderBuddy from the AMD x Hack Club Prototype Hackathon.',
    status: 'active',
    tags: ['Tools', 'Hackathon', 'Bench Workflow'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/SolderBuddy' }],
    details: [
      {
        heading: 'What I worked on',
        bullets: [
          'Make soldering and wiring sessions smoother and faster.',
          'Keep tools compact, easy to use, and easy to remake.',
        ],
      },
    ],
  },
  {
    id: 'quadruped',
    name: 'Quadruped',
    summary:
      'In-progress quadruped where I am testing layout ideas and control tradeoffs.',
    status: 'in-progress',
    tags: ['Quadruped', 'In Progress', 'Control'],
    rev: 'REV 0',
    spec: 'STATUS / IN PROGRESS',
    details: [
      {
        heading: 'What I worked on',
        bullets: [
          'Early layout testing before locking in a final drivetrain.',
          'Learning stability and control from small test cycles.',
        ],
      },
    ],
  },
  {
    id: 'diy-robotic-hand',
    name: 'DIY Robotic Hand',
    summary:
      'DIY robotic hand build where I keep improving the mechanism and integration.',
    status: 'active',
    tags: ['Robotic Hand', '3D Printing', 'Mechanisms'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/RoboticHand' }],
    details: [
      {
        heading: 'What I worked on',
        bullets: [
          'Iterating finger mechanics and actuation paths.',
          'Testing structure and assembly limits between revisions.',
        ],
      },
    ],
  },
]

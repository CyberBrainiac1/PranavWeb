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
      'DIY steering wheel and pedal setup I keep improving over time, with force feedback as the big goal.',
    status: 'featured',
    featured: true,
    tags: ['Sim Racing', 'Force Feedback', 'XIAO RP2040', 'ESP32', 'Control'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [
      { label: 'Blog Build Log', href: './blog/diy-sim-racing-rig-xiao-rp2040.html' },
      { label: 'Project Focus', href: '#/projects' },
    ],
    details: [
      {
        heading: 'Goal',
        bullets: [
          'Build a setup that feels fun and natural to drive without spending a ton.',
          'Keep the design flexible so I can swap and upgrade parts later.',
        ],
      },
      {
        heading: 'Hardware [ADD PARTS]',
        bullets: [
          'Current version uses a compact controller with encoder-based steering and pedals.',
          '[ADD] Final parts list and revision snapshots.',
        ],
      },
      {
        heading: 'Electronics/Control [ADD]',
        bullets: [
          'Sensor input is tuned so USB controller behavior feels stable and predictable.',
          '[ADD] Final wiring diagram for wheel, pedal, and future force feedback.',
        ],
      },
      {
        heading: 'Input/Response tuning [ADD]',
        bullets: [
          'Encoder input is mapped so throttle and steering feel smooth across full range.',
          '[ADD] Tuning notes and test checklist for repeatable feel.',
        ],
      },
      {
        heading: 'Tuning / Feel [ADD]',
        bullets: [
          'V2 pedal travel is shorter, so I adjusted count range to keep control feel consistent.',
          'I still use gain and smoothing so throttle does not jump around.',
          '[ADD] Tuning profile notes across different games.',
        ],
      },
      {
        heading: 'What I’m improving next [ADD]',
        bullets: [
          'Better rigidity and cleaner mounting for more consistent steering feel.',
          '[ADD] Force feedback milestones and safety limits.',
        ],
      },
    ],
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

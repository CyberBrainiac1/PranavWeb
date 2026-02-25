export type ProjectStatus = 'featured' | 'active' | 'team' | 'in-progress'

export type ProjectSection = {
  heading:
    | 'Goal'
    | 'Hardware [ADD PARTS]'
    | 'Electronics/Control [ADD]'
    | 'Firmware/Software experiments [ADD]'
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
      'DIY steering wheel + pedal rig built around low-cost hardware and iterative tuning, with force-feedback direction as the top priority path.',
    status: 'featured',
    featured: true,
    tags: ['Sim Racing', 'Force Feedback', 'XIAO RP2040', 'ESP32', 'Control'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [
      { label: 'Blog Build Log', href: '#experiments' },
      { label: 'Project Focus', href: '#projects' },
    ],
    details: [
      {
        heading: 'Goal',
        bullets: [
          'Build a practical sim setup that feels good to drive while staying budget-conscious.',
          'Keep the platform open for future hardware upgrades instead of locking into one design.',
        ],
      },
      {
        heading: 'Hardware [ADD PARTS]',
        bullets: [
          'Current stack uses a compact microcontroller + encoder-based steering and pedal sensing.',
          '[ADD] Finalized mechanical BOM list and revision snapshots.',
        ],
      },
      {
        heading: 'Electronics/Control [ADD]',
        bullets: [
          'Sensor-to-axis mapping is tuned for reliable USB controller behavior.',
          '[ADD] Final control wiring diagram for wheel, pedal, and future FFB path.',
        ],
      },
      {
        heading: 'Firmware/Software experiments [ADD]',
        bullets: [
          'Mapped encoder readings into full joystick range with practical filtering.',
          '[ADD] Firmware experiments list and test matrix.',
        ],
      },
      {
        heading: 'Tuning / Feel [ADD]',
        bullets: [
          'V2 pedal travel is shorter, so count range was adapted to preserve drivability.',
          'Gain and smoothing are still part of the tuning loop to avoid jumpy throttle response.',
          '[ADD] Repeatable tuning profile notes across different games.',
        ],
      },
      {
        heading: 'What I’m improving next [ADD]',
        bullets: [
          'Mechanical rigidity and cleaner mounting for more consistent steering feel.',
          '[ADD] Force-feedback implementation milestones and safety constraints.',
        ],
      },
    ],
  },
  {
    id: 'ftc-evergreen-dragons',
    name: 'FTC Evergreen Dragons',
    summary:
      'Team-focused competitive robotics work with emphasis on mechanism design, integration, and practical iteration.',
    status: 'team',
    tags: ['FTC', 'Mechanisms', 'CAD', 'Integration'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    details: [
      {
        heading: 'Focus',
        bullets: [
          'Translate concepts into buildable subsystems through rapid prototype loops.',
          'Balance CAD intent with what actually survives physical testing.',
        ],
      },
    ],
  },
  {
    id: 'frc-2854-prototypes',
    name: 'FRC 2854 Prototypes',
    summary:
      'Prototype-driven contribution work around mechanism concepts and manufacturable subsystem ideas.',
    status: 'team',
    tags: ['FRC', 'Prototype', 'Mechanics'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    details: [
      {
        heading: 'Focus',
        bullets: [
          'Quickly evaluate mechanism paths and packaging constraints.',
          'Document what works physically before scaling complexity.',
        ],
      },
    ],
  },
  {
    id: 'esp32-control-projects',
    name: 'ESP32 Control Projects',
    summary:
      'Embedded control experiments connecting sensors, drivers, and practical behavior tuning for robotics tasks.',
    status: 'active',
    tags: ['ESP32', 'Sensors', 'Control', 'Python'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Scope',
        bullets: [
          'Sensor readout + filtering under real hardware noise.',
          'Control loop tuning for repeatable behavior across revisions.',
        ],
      },
    ],
  },
  {
    id: 'maker-tools-solderbuddy',
    name: 'Maker Tools / SolderBuddy',
    summary:
      'Compact desk-side helper tooling for bench builds, including SolderBuddy from AMD x Hack Club Prototype Hackathon.',
    status: 'active',
    tags: ['Tools', 'Hackathon', 'Bench Workflow'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/SolderBuddy' }],
    details: [
      {
        heading: 'Scope',
        bullets: [
          'Reduce friction during soldering and wiring sessions.',
          'Keep tools compact, fast to use, and easy to reproduce.',
        ],
      },
    ],
  },
  {
    id: 'quadruped',
    name: 'Quadruped',
    summary:
      'In-progress legged robotics platform exploring mechanical architecture and control tradeoffs.',
    status: 'in-progress',
    tags: ['Quadruped', 'In Progress', 'Control'],
    rev: 'REV 0',
    spec: 'STATUS / IN PROGRESS',
    details: [
      {
        heading: 'Scope',
        bullets: [
          'Early architecture exploration before committing to a final drivetrain layout.',
          'Collecting stability and control lessons from small iteration cycles.',
        ],
      },
    ],
  },
  {
    id: 'diy-robotic-hand',
    name: 'DIY Robotic Hand',
    summary:
      'Biologically inspired hand build focused on practical mechanism iteration and embedded integration.',
    status: 'active',
    tags: ['Robotic Hand', '3D Printing', 'Mechanisms'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/RoboticHand' }],
    details: [
      {
        heading: 'Scope',
        bullets: [
          'Iterating finger mechanics and actuation paths.',
          'Testing structure and assembly constraints between revisions.',
        ],
      },
    ],
  },
]

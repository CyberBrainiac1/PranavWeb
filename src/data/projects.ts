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
      { label: 'Setup + Troubleshooting Checklist', href: '#/blog/sim-wheel-setup-checklist' },
    ],
    details: simWheelProjectSections,
  },
  {
    id: 'ftc-shooter-evergreen-dragons',
    name: 'FTC Shooter (Evergreen Dragons)',
    summary:
      'Shooter mechanism work under FTC Evergreen Dragons. Core architecture is still being documented into a full system writeup.',
    status: 'team',
    tags: ['FTC', 'Shooter', 'Evergreen Dragons', 'In Progress'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Current state',
        bullets: [
          'This shooter is part of my FTC Evergreen Dragons mechanism work.',
          'I do not have final published specs yet for wheel count, flywheel/compression setup, hood angle method, motor type, gear ratio, feeder/indexer, or sensors.',
          'I am collecting notes and visual references so I can turn it into one clean full system description.',
        ],
      },
      {
        heading: 'Spec sheet to finalize [ADD]',
        bullets: [
          '[ADD] Shooter architecture (single wheel / dual wheel / other).',
          '[ADD] RPM targets by distance and game situation.',
          '[ADD] Angle control method and calibration routine.',
          '[ADD] Feed/index timing and jam-handling behavior.',
          '[ADD] Tuning notes that can be reused for awards or documentation.',
        ],
      },
    ],
  },
  {
    id: 'diy-robotic-hand',
    name: 'DIY Robotic Hand',
    summary:
      'DIY robotic hand project focused on replicating human hand movement with practical build documentation.',
    status: 'active',
    tags: ['Robotic Hand', 'Mechanics', '3D Printing'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/RoboticHand' }],
    details: [
      {
        heading: 'Project goal',
        bullets: [
          'The main goal is a DIY robotic hand that can replicate human hand movements.',
          'This is both a physical build and a documented engineering project.',
          'I am keeping the documentation focused on design decisions, mechanics, and control behavior.',
        ],
      },
      {
        heading: 'Design exploration',
        bullets: [
          'I have been exploring differential mechanisms for fingers and/or wrist-style motion sharing.',
          'I am gathering 3D-printable model references plus practical design tips for tolerances, material choice, assembly order, and load handling.',
          '[ADD] Final DOF layout, tendon/actuation route, and control hardware stack.',
        ],
      },
      {
        heading: 'Validation path [ADD]',
        bullets: [
          '[ADD] Test protocol and repeatable benchmark metrics.',
          '[ADD] Final figures, diagrams, and build notes for documentation.',
          '[ADD] Next build milestone after validation checks.',
        ],
      },
    ],
  },
  {
    id: 'robotic-arm-build',
    name: 'Robotic Arm',
    summary:
      'Separate ongoing robotic arm build currently in servo channel mapping and joint verification stages.',
    status: 'active',
    tags: ['Robotic Arm', 'Servo Mapping', 'Control Testing'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Current stage',
        bullets: [
          'I have been doing servo channel mapping and testing joint-by-joint to confirm PWM channel assignments.',
          'For the claw/gripper, I tested or considered a continuous rotation servo.',
          'That claw choice is important because continuous rotation behaves differently from a position-hold servo.',
        ],
      },
      {
        heading: 'Control context',
        bullets: [
          'I usually use Raspberry Pi with Python when I need control examples and testing flow.',
          'I also have ESP32 + 28BYJ-48 stepper experience using Dabble Gamepad, which may be reused for teleop.',
          '[ADD] Final arm controller architecture and wiring map.',
        ],
      },
      {
        heading: 'Next validation [ADD]',
        bullets: [
          '[ADD] Joint limits and repeatability checks.',
          '[ADD] Gripper approach (continuous rotation vs positional) after reliability testing.',
          '[ADD] End-to-end movement routine for demos.',
        ],
      },
    ],
  },
  {
    id: 'ftc-evergreen-dragons',
    name: 'FTC Evergreen Dragons',
    summary:
      'I build competitive robots with FTC Evergreen Dragons, with heavy focus on practical mechanism design and rapid testing.',
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
          'Shooter mechanism work is one active subsystem under this team effort.',
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
]

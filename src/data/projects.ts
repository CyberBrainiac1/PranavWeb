export type ProjectDetailSection = {
  heading: string
  bullets: string[]
  placeholders?: string[]
}

export type Project = {
  slug: string
  name: string
  summary: string
  status: 'active' | 'in-progress' | 'team'
  tags: string[]
  featured?: boolean
  links?: Array<{ label: string; url: string }>
  details: ProjectDetailSection[]
  codeUpdate?: string[]
}

export const projects: Project[] = [
  {
    slug: 'sim-racing-wheel-force-feedback',
    name: 'Sim Racing Wheel / Force Feedback',
    summary:
      'Budget DIY steering wheel + pedals using XIAO RP2040, magnetic steering sensing, and EC11 throttle input with iterative upgrades toward force feedback.',
    status: 'active',
    featured: true,
    tags: ['RP2040', 'Embedded', 'Control', 'Sim Racing', 'Mechanical Design'],
    links: [
      { label: 'Build Log', url: '#blog' },
      { label: 'See the Build', url: '#projects' },
    ],
    details: [
      {
        heading: 'System Overview',
        bullets: [
          'Windows recognizes it as a game controller through standard USB HID behavior.',
          'Steering axis is read from magnetic encoder counts and mapped into joystick range.',
          'Throttle axis uses EC11 counts with smoothing and gain tuning to improve feel.',
        ],
      },
      {
        heading: 'Force Feedback Roadmap',
        bullets: [
          'Current setup focuses on reliable steering + throttle input on low-cost hardware.',
          '[VERIFY] Next hardware pass adds force feedback module with safer torque limits and better mounting rigidity.',
          '[VERIFY] Planned software loop includes centering behavior and basic in-game feedback mapping.',
        ],
        placeholders: [
          '[IMAGE PLACEHOLDER: FFB motor mount concept]',
          '[IMAGE PLACEHOLDER: Wheel shaft + coupling close-up]',
        ],
      },
      {
        heading: 'V2 Accelerator Pedal (Shorter Travel)',
        bullets: [
          'I redesigned the accelerator pedal and it now moves about one-third the distance of the old design.',
          'That means my EC11 encoder gives about one-third the counts too (for example, roughly 15 counts became about 5).',
          'Without software scaling, each encoder click would become a large throttle jump.',
          'I changed the clamp range from 0..15 to 0..5, still map 0..5 to the full joystick Y axis, keep smoothing so output ramps instead of snapping, and keep a sensitivity/gain factor so I can tune how quickly it reaches full throttle.',
          'This keeps the build budget-friendly while staying upgradeable for better future sensors.',
        ],
        placeholders: [
          '[IMAGE PLACEHOLDER: V2 pedal CAD or sketch]',
          '[IMAGE PLACEHOLDER: V2 pedal linkage close-up]',
        ],
      },
    ],
    codeUpdate: [
      'THR_MAX_COUNTS changed from 15 to 5',
      'gain and smoothing still apply',
      'invert flag fixes direction',
    ],
  },
  {
    slug: 'diy-robotic-hand',
    name: 'DIY Robotic Hand',
    summary:
      'Biologically inspired robotic hand project focused on practical mechanisms, controllable motion, and iterative mechanical/electrical integration.',
    status: 'active',
    tags: ['Mechanisms', '3D Printing', 'Embedded'],
    links: [{ label: 'GitHub Repo', url: 'https://github.com/CyberBrainiac1/RoboticHand' }],
    details: [
      {
        heading: 'Current Scope',
        bullets: [
          'Designing and refining finger mechanisms for reliable actuation.',
          'Testing structure, linkage tolerances, and practical assembly constraints.',
          'Integrating control and embedded experimentation in parallel with hardware revisions.',
        ],
      },
    ],
  },
  {
    slug: 'ftc-evergreen-dragons',
    name: 'FTC Evergreen Dragons',
    summary:
      'Competitive FTC robotics work spanning robot architecture, mechanism design, and system integration across seasons.',
    status: 'team',
    tags: ['FTC', 'Team Build', 'CAD', 'Rapid Prototyping'],
    details: [
      {
        heading: 'Focus Areas',
        bullets: [
          'Mechanical design and practical subsystem integration.',
          'Iteration between CAD, manufacturing, and field testing.',
          'Bringing student-built systems to reliable match performance.',
        ],
      },
    ],
  },
  {
    slug: 'frc-2854-prototypes',
    name: 'FRC 2854 Prototypes',
    summary:
      'Prototype-focused collaboration around FRC-style mechanisms and subsystem concepts with an emphasis on real-world reliability.',
    status: 'team',
    tags: ['FRC', 'Prototyping', 'Mechanisms'],
    details: [
      {
        heading: 'Prototype Direction',
        bullets: [
          'Rapid mechanism concept testing for practical build feasibility.',
          'Comparing tradeoffs in packaging, strength, and manufacturability.',
          'Documenting what survives repeated test cycles and what needs redesign.',
        ],
      },
    ],
  },
  {
    slug: 'esp32-control-projects',
    name: 'ESP32 Control Projects',
    summary:
      'Embedded control experiments that connect sensors, actuators, and lightweight control logic for physical robotics systems.',
    status: 'active',
    tags: ['ESP32', 'Sensors', 'Control'],
    details: [
      {
        heading: 'What I Work On',
        bullets: [
          'Sensor readout pipelines and practical filtering in noisy hardware setups.',
          'Actuator control loops tuned for stable behavior under real constraints.',
          'Fast hardware/software iteration with bench testing and logging.',
        ],
      },
    ],
  },
  {
    slug: 'maker-tools-solderbuddy',
    name: 'Maker Tools / SolderBuddy',
    summary:
      'Compact build-support tools for the workbench, including SolderBuddy from the AMD x Hack Club Prototype Hackathon.',
    status: 'active',
    tags: ['Tools', 'Hackathon', 'Desktop Hardware'],
    links: [{ label: 'GitHub Repo', url: 'https://github.com/CyberBrainiac1/SolderBuddy' }],
    details: [
      {
        heading: 'Tooling Goal',
        bullets: [
          'Reduce friction during wiring, soldering, and bench debugging.',
          'Design compact hardware helpers that actually improve workflow.',
          'Keep builds inexpensive and easy to reproduce.',
        ],
      },
    ],
  },
  {
    slug: 'quadruped',
    name: 'Quadruped',
    summary:
      'In-progress quadruped platform exploring mechanical architecture, control strategy, and iteration on stable locomotion.',
    status: 'in-progress',
    tags: ['In Progress', 'Legged Robotics', 'Control'],
    details: [
      {
        heading: 'Status',
        bullets: [
          'Early-stage mechanical and control prototyping.',
          'Working through drivetrain, frame, and control tradeoffs.',
          'Collecting lessons before committing to full build architecture.',
        ],
      },
    ],
  },
]

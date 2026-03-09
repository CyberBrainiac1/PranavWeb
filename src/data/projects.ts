export type ProjectStatus = 'featured' | 'active' | 'team' | 'in-progress'

export type ProjectSection = {
  heading: string
  bullets: string[]
}

export type Project = {
  id: string
  slug?: string
  name: string
  summary: string
  overview?: string
  whyBuilt?: string
  currentState?: string
  nextSteps?: string
  status: ProjectStatus
  tags: string[]
  stack?: string[]
  hardware?: string[]
  links?: Array<{ label: string; href: string }>
  relatedRepos?: Array<{ label: string; href: string }>
  relatedPosts?: string[]
  featured?: boolean
  rev: string
  spec: string
  details: ProjectSection[]
}

export const projects: Project[] = [
  {
    id: 'custom-steering-wheel-and-pedals',
    name: 'Custom Steering Wheel and Pedals',
    summary:
      'A DIY force feedback sim racing wheel built around Arduino Leonardo, BTS7960 motor driver, and quadrature encoders — with a Windows WPF Control Center app for tuning.',
    overview:
      'Started as a simple steering wheel project and grew into a full force feedback system. The build uses an Arduino Leonardo as a USB HID device, a BTS7960 H-bridge motor driver for FFB torque, and a quadrature incremental encoder for position feedback. A forked firmware from the Arduino-FFB-wheel project by Milos Rankovic powers the wheel. On top of the firmware, a custom Windows WPF Control Center app was built for flashing, calibrating, and tuning the wheel without reflashing for every small change.',
    whyBuilt:
      'BeamNG was what got me into sim racing, then Assetto Corsa deepened it. I wanted to understand what makes a good setup feel right — not just "does it move" but: is the angle correct, are controls binding right, does FFB feel predictable? I also want to benchmark against a maxed-out professional sim setup in person.',
    currentState:
      'Active — dual-motor torque architecture in progress. Debugging angle scaling, pedal binding, and FFB feel consistency.',
    nextSteps:
      'Validate angle math with fixed-angle tests, lock a consistent CPR value, re-test axis binding across BeamNG and Assetto Corsa, tune FFB to remove soft/dead behavior. Explore ESP32 wireless direction for a future revision.',
    status: 'featured',
    featured: true,
    tags: ['Sim Racing', 'Force Feedback', 'Arduino Leonardo', 'BTS7960', 'Encoder', 'C# / WPF'],
    stack: ['Arduino (C++)', 'C# (.NET 8 WPF)', 'USB HID', 'Serial Protocol'],
    hardware: [
      'Arduino Leonardo',
      'BTS7960 H-bridge motor driver',
      'Quadrature incremental encoder (A/B)',
      '12V brushed DC planetary gearmotors (~312 RPM output class)',
      'Wood 2x4 rig frame',
    ],
    rev: 'REV 3',
    spec: 'STATUS / ACTIVE',
    links: [
      {
        label: 'Drive Video',
        href: 'https://drive.google.com/open?id=1iPe4Rb0EEIpZD5XJL82ytoZZppYTnPQk',
      },
      {
        label: 'Build Blog',
        href: 'https://cyberbrainiac1.github.io/PranavWeb/blog/diy-sim-racing-rig-xiao-rp2040.html',
      },
      {
        label: 'Onshape CAD',
        href: 'https://cad.onshape.com/documents/c546baa31de9795688852c30/w/9018c2c298b2b7ded205473a/e/647760204ad10df7fbbe13da',
      },
    ],
    relatedRepos: [
      {
        label: 'BTS7960 + Leonardo Control Center (GitHub)',
        href: 'https://github.com/CyberBrainiac1/BTS7960LeonardoFirmware-ControlCenter',
      },
      {
        label: 'Original Arduino-FFB-wheel by ranenbg',
        href: 'https://github.com/ranenbg/Arduino-FFB-wheel',
      },
    ],
    relatedPosts: [
      'diy-force-feedback-wheel-build-log',
      'racing-wheel-build-log',
      'sim-wheel-setup-checklist',
    ],
    details: [
      {
        heading: 'Overview',
        bullets: [
          'Arduino Leonardo runs as USB HID game controller — no driver needed.',
          'BTS7960 H-bridge provides bidirectional motor control for force feedback torque.',
          'Quadrature encoder (A/B) feeds position back; CPR = PPR x 4 rule is critical.',
          'Forked firmware from Arduino-FFB-wheel (Milos Rankovic / ranenbg).',
          'Custom Windows WPF Control Center app (C# .NET 8) handles flash, calibration, telemetry, and profile management.',
        ],
      },
      {
        heading: 'Hardware stack',
        bullets: [
          'Controller: Arduino Leonardo (USB HID)',
          'Motor driver: BTS7960 H-bridge module',
          'Position: quadrature incremental encoder — A/B channels',
          'Motors: 12V brushed DC planetary gearmotors (~312 RPM output class)',
          'Encoder reference: 537.7 PPR at output shaft = ~2150.8 CPR after x4 decoding',
          'Dual-motor direction: two motors geared into one shared shaft, summing torque',
          'Rig frame: wood-only using 2x4s',
        ],
      },
      {
        heading: 'Control Center app',
        bullets: [
          'Built as a Windows WPF app (.NET 8) on top of the forked firmware.',
          'Features: setup wizard, wiring validation, calibration workflow, telemetry dashboard, profile gallery, phone dashboard (LAN), local Ollama AI side-view.',
          'Hardened Leonardo flashing + reset + rollback so settings changes do not require full reflash.',
          'Soft Dark + Light theme toggle in Settings.',
          'Build: dotnet build ControlCenter/ArduinoFFBControlCenter.sln -c Release',
        ],
      },
      {
        heading: 'Encoder math',
        bullets: [
          'Rule: CPR = PPR x 4 for full quadrature decoding.',
          'Reference: 537.7 PPR at output shaft = ~2150.8 CPR after x4.',
          'If CPR is wrong anywhere in the chain, steering angle mapping breaks immediately.',
          'Gear reduction must be fully accounted for in steering-angle math.',
        ],
      },
      {
        heading: 'Debugging history',
        bullets: [
          'Angle bug 1: rotating 180 deg reported ~379 deg.',
          'Angle bug 2: same 180 deg rotation reported ~21 deg.',
          'Possible causes: wrong shaft measured, CPR mismatch, missing gear reduction in angle math, partial quadrature decoding.',
          'Pedal issues: auto-calibration worked; no-calibration behavior tested with brake as button.',
          'Controls were backwards at least once and needed inversion fixes.',
          'Throttle = Z axis, brake = Y axis, but mapping did not always hold.',
          'Assetto Corsa sometimes would not accept brake binding even when press registered elsewhere.',
          'Brake wiring at one point: pressed = HIGH to 3V3; encoder on D2/D3, brake button on D4.',
          'FFB feel: sometimes soft, sometimes like resistance without real obstruction, vibration-like behavior happened.',
        ],
      },
      {
        heading: 'Physical rig and build notes',
        bullets: [
          'Wood-only rig using 2x4s, mostly a drill.',
          'Looked into laptop stand, handbrake handle, paddle shifters, tensioners.',
          'Investigated reuse of old drill parts.',
          'ESP32 wireless direction explored for future versions.',
        ],
      },
      {
        heading: 'Album media',
        bullets: [
          'v1steeringwheel.HEIC',
          'v1JankyPedal.HEIC',
          'differentAngleWheel.JPG',
          'BackSteeringold.HEIC',
          'SeeedStudioXiaoPictureWithWires.HEIC',
        ],
      },
    ],
  },
  {
    id: 'diy-robotic-hand',
    name: 'Robotic Hand',
    summary:
      'A 3D-printed tendon-driven robotic hand using MG90S micro servos and a Raspberry Pi 4B with a 16-channel PWM HAT to mimic human finger flexion.',
    overview:
      'Designed as a prototype to explore tendon-driven actuation, multi-servo control, and mechanical design. Each finger uses a servo to pull a string routed through the joints, allowing smooth curl. A Raspberry Pi 4B with a 16-channel PWM HAT controls all six servos. The build combined CAD design, 3D printing, electronics, and Python control code.',
    whyBuilt:
      'I wanted hands-on experience with tendon-driven actuation, multi-servo control, and mechanical design — a real-world challenge combining CAD, robotics, control systems, and mechanical problem-solving.',
    currentState: 'Active prototype — functional with Raspberry Pi 4B control.',
    nextSteps: 'Refine tendon routing, add sensor feedback, improve finger speed and grip strength.',
    status: 'active',
    tags: ['Robotics', 'Raspberry Pi', 'Servo Control', 'CAD', 'Tendon Drive', '3D Printing'],
    stack: ['Python', 'Raspberry Pi OS'],
    hardware: [
      'Raspberry Pi 4B',
      'Adafruit 16-channel PWM Servo HAT',
      '6x MG90S 9g metal gear micro servos',
      '3D-printed finger and palm parts',
      'Tendon strings (one per finger)',
    ],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/RoboticHand' }],
    relatedRepos: [
      { label: 'RoboticHand (GitHub)', href: 'https://github.com/CyberBrainiac1/RoboticHand' },
    ],
    details: [
      {
        heading: 'Overview',
        bullets: [
          'Tendon-based mechanism: each finger uses a servo pulling a string through the joints.',
          'Six servos total — one per finger (five fingers + thumb).',
          'Raspberry Pi 4B + Adafruit 16-channel PWM HAT for servo control.',
          'All parts 3D-printed in PLA.',
          'Total BOM cost approximately $44.',
        ],
      },
      {
        heading: 'Bill of materials',
        bullets: [
          'MG90S 9g micro servos (15-pack) — AliExpress ~$15',
          'Adafruit 16-channel PWM Servo HAT — $17.50',
          'Raspberry Pi 4B — already owned',
          'Servo horns (metal, AliExpress) — ~$1',
          'Total: ~$44',
        ],
      },
      {
        heading: 'Build notes',
        bullets: [
          'Built an earlier version first, then fully redesigned in CAD.',
          'Focused on qualifying as a serious prototype with better structure and documentation.',
          'Wiring follows Adafruit PWM HAT standard layout.',
        ],
      },
      {
        heading: 'Album media',
        bullets: [
          'RoboticHandWorking.mp4',
          'RoboticHandMoving.MOV',
          'workingonRobotHand.HEIC',
          'WorkingonRobothand(1).HEIC',
        ],
      },
    ],
  },
  {
    id: 'solder-buddy',
    name: 'SolderBuddy',
    summary:
      'AI-powered robotic soldering assistant built at AMD x Hack Club Robotics Hackathon 2025. Two SO101 robot arms trained with ACT models to pick and hand over soldering tools on demand.',
    overview:
      'SolderBuddy is a human-robot collaboration system that assists during soldering by autonomously retrieving and handing over tools. Built by Team 07 ("The Console") at the AMD x Hack Club hackathon. The system uses AI vision, robotic manipulation, and a physical macro pad interface. Multiple cameras capture visual data; ACT models trained on ~480 episodes identify tool locations; an SO101 arm picks the requested tool and waits for the user to take it before returning home.',
    whyBuilt:
      'To reduce interruptions during precision electronics work by letting a robot handle tool delivery, keeping the human focused. Explored human-robot collaboration instead of full automation.',
    currentState:
      'Hackathon prototype — functional with three trained tools (solder wire, solder sucker, wire strippers). Models published on HuggingFace.',
    nextSteps:
      'Add GUI for tool status overview, retrain for additional tools, adapt system for other collaborative robotics use cases.',
    status: 'team',
    tags: ['Hackathon', 'Robot Arm', 'AI / ACT Model', 'AMD AI PC', 'SO101', 'LeRobot'],
    stack: ['Python', 'LeRobot', 'ACT model', 'Supabase'],
    hardware: [
      'Leader SO101 robot arm',
      'Follower SO101 robot arm',
      'AMD AI PC',
      'AMD flexible camera',
      'UGreen 1080p webcam',
      'Small claw-mounted camera',
      'Seeed XIAO RP2040 macro pad',
    ],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    links: [
      { label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/SolderBuddy' },
      {
        label: 'HuggingFace — solder model',
        href: 'https://huggingface.co/Cyberbrainiac/act_solder_16ksteps',
      },
      {
        label: 'HuggingFace — wire model',
        href: 'https://huggingface.co/Cyberbrainiac/act_wire_16ksteps',
      },
      {
        label: 'HuggingFace — sucker model',
        href: 'https://huggingface.co/Cyberbrainiac/act_ss_16ksteps',
      },
    ],
    relatedRepos: [
      { label: 'SolderBuddy (GitHub)', href: 'https://github.com/CyberBrainiac1/SolderBuddy' },
    ],
    details: [
      {
        heading: 'Overview',
        bullets: [
          'Team 07 — "The Console": Arnav Thapar, Pranav Emmadi, Lucas Escobar.',
          'Two SO101 robot arms (leader/follower teleoperation for data capture, follower for inference).',
          'Three AI models trained: solder wire, solder sucker, wire strippers.',
          '~480 training episodes across model experiments, camera changes, placement iterations.',
          'Macro pad (Seeed XIAO RP2040) provides button-based tool requests.',
        ],
      },
      {
        heading: 'AI training pipeline',
        bullets: [
          'Visual data captured from multiple camera angles.',
          'ACT model primary; also experimented with pi0.5 and smolvl.',
          'Datasets published on HuggingFace: toolsmasterss, toolsmasterwire, toolsmastersolder.',
          'Training and inference run on AMD AI PC.',
          'Issue: each USB port supports only two webcams at once — split cameras across ports.',
        ],
      },
      {
        heading: 'Problems and solutions',
        bullets: [
          'Bad train data — fixed with slow, steady, smooth recordings.',
          'Bad camera placement — added a 4th camera.',
          'Claw grip issues on spool and pliers — changed approach angles after many episodes.',
          'Some webcams not connecting — split across USB ports (bandwidth limit: 2 per port).',
          'Cameras moved between sessions — rerecorded all episodes.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['TestingRobotArm.HEIC'],
      },
    ],
  },
  {
    id: 'familiar-ai',
    name: 'FamiliarAI',
    summary:
      'A caregiver dashboard MVP for a dementia support system — face detection on Raspberry Pi feeds a Supabase backend, with a React UI for caregivers to track recent interactions.',
    overview:
      'FamiliarAI is a hackathon MVP combining a Raspberry Pi face detection pipeline with a React caregiver dashboard. The Pi side detects faces and infers identity, then ingests data into Supabase. The dashboard shows home view, alerts, people directory, and person detail views — letting caregivers see who a person has recently seen.',
    whyBuilt:
      'Built to address a real challenge in dementia care: helping caregivers keep track of recent social interactions using a low-friction camera system and simple dashboard.',
    currentState: 'Hackathon MVP — UI fully functional with mock data; Pi pipeline implemented.',
    nextSteps: 'Connect real Supabase backend, improve face recognition accuracy, add caregiver notifications.',
    status: 'active',
    tags: ['Hackathon', 'AI', 'Raspberry Pi', 'React', 'Supabase', 'Face Detection'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Python (Pi side)'],
    hardware: ['Raspberry Pi (with camera)', 'Camera module'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    links: [
      { label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/FamiliarAI' },
    ],
    relatedRepos: [
      { label: 'FamiliarAI (GitHub)', href: 'https://github.com/CyberBrainiac1/FamiliarAI' },
    ],
    details: [
      {
        heading: 'Overview',
        bullets: [
          'Raspberry Pi side: face detection pipeline with Supabase ingestion.',
          'Dashboard: React/TypeScript UI with landing page, sign-in, home, alerts, people, and person detail views.',
          'Design system: light green (#86efac) primary, white background, clean cards and soft shadows.',
          'Mock data used during UI development to simulate backend responses.',
        ],
      },
      {
        heading: 'Components',
        bullets: [
          'Button, Card, Navbar, PersonCard, InteractionItem, AlertCard — all reusable.',
          'Pages: Landing, Sign In, Home Dashboard, Unknown Person Review, Recent Interactions, People Directory, Person Detail.',
          'Raspberry Pi side: face detection + Supabase ingestion pipeline in /raspberry-pi/.',
        ],
      },
    ],
  },
  {
    id: 'makeblock-rover-first-robot',
    name: 'Makeblock Rover (First Robot)',
    summary:
      'When I was 5, my dad bought me my first robot, a Makeblock rover. It sparked my interest in robotics and tech.',
    status: 'active',
    tags: ['Age 5', 'First Robot', 'Makeblock', 'Early Inspiration'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Why it matters',
        bullets: [
          'This was the project that started everything for me in robotics.',
          'It directly shaped the way I think about building and learning hardware.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['pranav5yearoldsRobot.HEIC'],
      },
    ],
  },
  {
    id: 'hackpack-turret-domino-robot',
    name: 'Hackpack Turret + Domino Robot Merge',
    summary:
      'I combined the Hackpack turret and domino robot into one build by keeping wiring mostly identical and sharing the IR sensor across both Arduinos.',
    status: 'active',
    tags: ['Age 13', 'Arduino', 'Hackpack', 'Mechanical Integration'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'Kept the original wiring mostly the same while combining both systems.',
          'Connected one IR sensor to both Arduinos at the same time.',
          'Drilled into the domino base and mounted the bottom roller servo by screws.',
        ],
      },
      {
        heading: 'Code files',
        bullets: ['IRTurrentTank - Pranav Emmadi.ino', 'DominoTank - Pranav Emmadi.ino'],
      },
      {
        heading: 'Album media',
        bullets: ['Hackpackturrentmergedwithdominorobot.HEIC'],
      },
    ],
  },
  {
    id: 'warriorhacks-raspberry-pi-camera-robot',
    name: 'Raspberry Pi Camera Robot (Warrior Hacks)',
    summary:
      'At Warrior Hacks, we built a robot that streamed live camera feed into a React site and mirrored movement live to a remote viewer.',
    status: 'team',
    tags: ['Age 13', 'Warrior Hacks', 'Raspberry Pi', 'React', 'Live Feed'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    links: [
      { label: 'Demo Link 1', href: 'https://drive.google.com/open?id=1bUCc7GvZcgvsVUWT02nAGBww4vK33WMo' },
      { label: 'Demo Link 2', href: 'https://drive.google.com/open?id=1kVfyQnRgwfbjXKmHHkez-WTtG5ISwznM' },
    ],
    relatedRepos: [
      { label: 'WarriorHacksShadowBot (GitHub)', href: 'https://github.com/CyberBrainiac1/WarriorHacksShadowBot' },
    ],
    details: [
      {
        heading: 'Hackathon context',
        bullets: [
          'Built during the first Warrior Hacks event.',
          'Robot streamed camera feed while driving in real time.',
          'Focus was practical integration between robot hardware and web interface.',
        ],
      },
      {
        heading: 'Album media',
        bullets: [
          'WarriorHacksRobot(1).HEIC',
          'warriorHacks.HEIC',
          'warriorhacksrobot.HEIC',
        ],
      },
    ],
  },
  {
    id: 'warriorhacks-self-moving-jumpscare-robot',
    name: 'Self-Moving Camera Robot (Warrior Hacks)',
    summary:
      'For Warrior Hacks, we made a robot that moved randomly, jump-scared users, and streamed live video; I focused on hardware build and code deployment.',
    status: 'team',
    tags: ['Age 13', 'Warrior Hacks', 'Hardware Build', 'Live Feed'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    links: [
      { label: 'Demo Link 1', href: 'https://drive.google.com/open?id=1jzz8oYpikwi1FvEgFAC-9nIh_m_VL33U' },
      { label: 'Demo Link 2', href: 'https://drive.google.com/open?id=128mxgnd2c3FBa2JfEH2KGC7HNQFsv9zT' },
    ],
    details: [
      {
        heading: 'Build role',
        bullets: [
          'Handled hardware assembly and getting the software running end-to-end on robot hardware.',
          'Focused on making behavior actually run in live demo conditions.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['IMG_5525.HEIC', 'IMG_5526.HEIC'],
      },
    ],
  },
  {
    id: 'pcb-usb-hub-and-hackercard',
    name: 'PCB USB Hub + HackerCard',
    summary:
      'I built a USB hub PCB through Hack Club OnBoard (up to $100 grant for high school students), which sparked my interest to design and build a HackerCard too.',
    overview:
      'Hack Club OnBoard is a grant program offering up to $100 for PCB manufacturing costs for high school students. The USB hub was my entry project, fabricated through JLCPCB. It deepened my understanding of PCB design workflows, Gerber exports, and working with real fabrication constraints. The HackerCard followed as a next step in fabrication and design.',
    status: 'active',
    tags: ['Age 12/13', 'PCB Design', 'Hack Club OnBoard', 'USB Hub', 'HackerCard'],
    stack: ['EasyEDA / KiCad'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    relatedRepos: [
      { label: 'OnBoard (Hack Club, GitHub)', href: 'https://github.com/CyberBrainiac1/OnBoard' },
    ],
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'USB hub PCB was the entry point project that pushed me deeper into PCB workflow.',
          'Designed in EasyEDA, Gerber files submitted to JLCPCB for fabrication.',
          'Hack Club OnBoard grant covered up to $100 in manufacturing costs.',
          'Followed up by building a HackerCard as the next fabrication and design step.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['USBPCB.HEIC', 'HackerCard.HEIC', 'FirstRobotPCB.HEIC'],
      },
    ],
  },
  {
    id: 'adjust-fidget',
    name: 'Adjust Fidget',
    summary:
      'Built a focused fidget project and documented it in a public repository.',
    status: 'active',
    tags: ['Age 13', 'Open Source', 'Iteration'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    links: [
      { label: 'GitHub README', href: 'https://github.com/CyberBrainiac1/adjustFidget/blob/main/README.md' },
    ],
    relatedRepos: [
      { label: 'adjustFidget (GitHub)', href: 'https://github.com/CyberBrainiac1/adjustFidget' },
    ],
    details: [
      {
        heading: 'Project notes',
        bullets: [
          'Built as a smaller focused project to improve build quality and repeatability.',
          'Documentation lives in the GitHub README.',
        ],
      },
    ],
  },
  {
    id: 'fan-9v-battery-and-motors',
    name: 'DIY Fan (9V + Two Motors)',
    summary:
      'I made an early fan using a 9V battery, two motors, a salvaged rod from an old printer, and lots of tape.',
    status: 'active',
    tags: ['Age 8', 'Early Build', 'Motors', 'DIY'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'Used parts I already had and improvised structure from salvaged components.',
          'Simple but important project for learning motor wiring and mechanical balance.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['JankyPranav7YearsFan.HEIC'],
      },
    ],
  },
  {
    id: 'better-complex-fan',
    name: 'Better Fan (Onshape + 12V Motors)',
    summary:
      'I redesigned the fan in Onshape around small 12V DC motors to improve fit, structure, and print quality.',
    status: 'active',
    tags: ['Age 13', 'Onshape', '3D Printing', '12V Motors'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'Designed to exact motor dimensions in CAD before fabrication.',
          'Used this build to improve print-fit workflow and real-world assembly quality.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['TopFullFan.HEIC', 'SideFullFan.HEIC', 'BackFullFan.HEIC', 'DIYFanTpMOdel.MOV'],
      },
    ],
  },
]

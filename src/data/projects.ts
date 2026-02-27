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
    id: 'custom-steering-wheel-and-pedals',
    name: 'Custom Steering Wheel and Pedals',
    summary:
      'I designed my own steering wheel using a magnetic encoder and iterated pedals from a cardboard prototype to a spring-based design.',
    status: 'featured',
    featured: true,
    tags: ['Age 14', 'Sim Racing', 'Magnetic Encoder', 'Pedals', 'Hardware Iteration'],
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
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'Designed around a magnetic encoder for high steering precision, but still saw occasional glitches.',
          'Pedals started as cardboard + rotary encoder + rubber band, then moved to a spring-based mechanism.',
          'This project taught me a lot, but I am currently prioritizing other builds.',
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
      'For Warrior Hacks, we made a robot that moved randomly, jump-scared users, and streamed live video; I focused on hardware build + code deployment.',
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
      'I built a USB hub PCB through Hack Club OnBoard, which sparked my interest to design and build a HackerCard too.',
    status: 'active',
    tags: ['Age 12/13', 'PCB Design', 'Hack Club', 'USB Hub', 'HackerCard'],
    rev: 'REV 1',
    spec: 'STATUS / ACTIVE',
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'USB hub PCB was the entry point project that pushed me deeper into PCB workflow.',
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
  {
    id: 'diy-robotic-hand',
    name: 'Robotic Hand',
    summary:
      'I designed a robotic hand for Hack Club + AMD prototype work, fully rebuilt from CAD and published with a dedicated repository.',
    status: 'active',
    tags: ['Age 14', 'Robotic Hand', 'CAD', 'Prototype'],
    rev: 'REV 2',
    spec: 'STATUS / ACTIVE',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/RoboticHand' }],
    details: [
      {
        heading: 'Build notes',
        bullets: [
          'I built an earlier version first, then redesigned this version fully in CAD.',
          'Focused on qualifying as a serious prototype with better structure and documentation.',
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
    name: 'Solder Buddy',
    summary:
      'At the AMD x Hack Club hackathon, my team trained AI models with SO101 robot arms to pick one of three tools from the ground.',
    status: 'team',
    tags: ['Age 14', 'Hackathon', 'Robot Arm', 'AI Models'],
    rev: 'REV 1',
    spec: 'STATUS / TEAM',
    links: [{ label: 'GitHub Repo', href: 'https://github.com/CyberBrainiac1/SolderBuddy' }],
    details: [
      {
        heading: 'Hackathon notes',
        bullets: [
          'Team trained three AI models for tool selection behavior.',
          'Integrated robot-arm execution with real-world object pickup tasks.',
        ],
      },
      {
        heading: 'Album media',
        bullets: ['TestingRobotArm.HEIC'],
      },
    ],
  },
]

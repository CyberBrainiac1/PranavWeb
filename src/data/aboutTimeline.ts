export type AboutTimelineEntry = {
  date: string
  title: string
  organization: string
  notes: string
}

export const aboutTimelineEntries: AboutTimelineEntry[] = [
  {
    date: 'Early',
    title: 'Started building with a hardware-first mindset',
    organization: 'Personal projects',
    notes:
      'Began focusing on practical mechanisms, testing in the real world, and making each version better than the last.',
  },
  {
    date: 'Team chapter',
    title: 'Founded FTC Evergreen Dragons',
    organization: 'FTC',
    notes:
      'Built a team culture around fast iteration, honest testing, and designs that can actually be built and improved.',
  },
  {
    date: 'Build growth',
    title: 'Expanded into robotic hand and robotic arm builds',
    organization: 'Design + fabrication',
    notes:
      'Moved into dedicated hand and arm projects with joint-level testing, mechanism iteration, and practical build validation.',
  },
  {
    date: 'FTC systems',
    title: 'Shooter mechanism work with Evergreen Dragons',
    organization: 'FTC Evergreen Dragons',
    notes:
      'Started documenting shooter architecture and tuning notes so the system can be shared cleanly for team docs and awards.',
  },
  {
    date: 'Now',
    title: 'Main focus: Sim Racing Wheel + Force Feedback',
    organization: 'Flagship build',
    notes:
      'Currently tuning wheel feel, pedal behavior, and force response to make the full setup smoother and more realistic.',
  },
  {
    date: 'Next',
    title: 'Keep leveling up with stronger systems integration',
    organization: 'Future path',
    notes:
      'Goal is to keep building higher-quality hardware systems through disciplined testing and better version control of designs.',
  },
]

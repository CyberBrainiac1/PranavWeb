export type ExperienceItem = {
  id: string
  title: string
  blurb: string
}

export const experienceItems: ExperienceItem[] = [
  {
    id: 'maker-faire',
    title: 'Maker Faire',
    blurb:
      'I got to share projects in a real maker environment and learn how to explain design decisions to different people clearly.',
  },
  {
    id: 'stanford-seeme',
    title: 'Stanford SEE ME',
    blurb:
      'Hands-on engineering sessions that pushed me to think through mechanisms, tradeoffs, and testing in a practical way.',
  },
  {
    id: 'bwsi-saturday',
    title: 'BWSI Saturday Program (Ongoing)',
    blurb:
      'I am currently part of the Saturday track, where I keep building skills around robotics systems and structured iteration.',
  },
  {
    id: 'intuitive-surgical',
    title: 'Intuitive Surgical',
    blurb:
      'A family member works there, and that connection keeps me focused on the level of precision and reliability real robots need.',
  },
]

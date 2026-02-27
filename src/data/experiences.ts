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
      'I visited Maker Faire and got to see a lot of real builds up close, which gave me ideas for my own designs.',
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
      'I am currently in the "Yes! You Can Program Autonomous Cars" track, where I keep building skills around autonomy and structured iteration.',
  },
  {
    id: 'intuitive-surgical',
    title: 'Intuitive Surgical',
    blurb:
      'A family member works there, and that connection keeps me focused on the level of precision and reliability real robots need.',
  },
]

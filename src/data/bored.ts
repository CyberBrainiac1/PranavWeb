export type BoredIdea = {
  id: string
  title: string
  description: string
  link?: string
}

export const boredIdeas: BoredIdea[] = [
  {
    id: 'wiki-race',
    title: 'Wiki Race',
    description: 'Start from a random page and race to a target page with only internal links.',
    link: 'https://en.wikipedia.org/wiki/Special:Random',
  },
  {
    id: 'brawl-stars',
    title: 'Brawl Stars',
    description: 'Run a few matches and test a new brawler or build.',
    link: 'https://supercell.com/en/games/brawlstars/',
  },
  {
    id: 'shellshockers',
    title: 'Shell Shockers',
    description: 'Jump into a quick FPS game and aim-train for 15 minutes.',
    link: 'https://shellshock.io/',
  },
  {
    id: 'cad-session',
    title: 'CAD Session',
    description: 'Design one small part or mechanism concept and save it as a mini challenge.',
    link: 'https://cad.onshape.com/',
  },
  {
    id: 'vibe-code',
    title: 'Vibe Code',
    description: 'Build a tiny idea fast and keep it playful, no pressure.',
  },
  {
    id: 'mechanism-sketch',
    title: 'Mechanism Sketch Sprint',
    description: 'Set a 20-minute timer and sketch 3 mechanism ideas.',
  },
  {
    id: 'teardown',
    title: 'Teardown Challenge',
    description: 'Take apart an old gadget and map how it was built.',
  },
  {
    id: 'rapid-prototype',
    title: 'Rapid Prototype',
    description: 'Use scrap materials to mock up one idea in under 30 minutes.',
  },
  {
    id: 'watch-and-note',
    title: 'Watch + Notes',
    description: 'Watch one robotics video and write 5 practical takeaways.',
  },
  {
    id: 'micro-workout',
    title: 'Reset Break',
    description: 'Short walk or quick workout, then come back with a fresh head.',
  },
]

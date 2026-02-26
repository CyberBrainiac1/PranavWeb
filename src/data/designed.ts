export type DesignedItem = {
  id: string
  title: string
  note: string
}

export const designedItems: DesignedItem[] = [
  {
    id: 'ftc-shooter',
    title: 'FTC Shooter',
    note: 'FTC Evergreen Dragons shooter mechanism work; full final spec sheet is being documented.',
  },
  {
    id: 'robotic-hand',
    title: 'Robotic Hand',
    note: 'DIY hand aimed at replicating human movement with ongoing design, mechanics, and control iteration.',
  },
  {
    id: 'robotic-arm',
    title: 'Robotic Arm',
    note: 'Ongoing arm build in servo-channel mapping/testing with gripper approach under validation.',
  },
]

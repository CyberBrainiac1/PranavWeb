export type TimelineEntry = {
  date: string
  title: string
  organization: string
  notes: string
}

export const timeline: TimelineEntry[] = [
  {
    "date": "[VERIFY]",
    "title": "Add your LinkedIn timeline entries",
    "organization": "No imported timeline yet",
    "notes": "Add lines to LINKEDIN.txt and run npm run timeline:generate"
  }
]

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const repoRoot = resolve(process.cwd())
const inputPath = resolve(repoRoot, 'LINKEDIN.txt')
const outputPath = resolve(repoRoot, 'src/data/timeline.ts')

const toRecord = (line) => {
  const parts = line.split('|').map((part) => part.trim())
  if (parts.length < 3) {
    return null
  }

  const [date, title, organization, notes] = parts
  return {
    date,
    title,
    organization,
    notes: notes ?? '',
  }
}

let entries = []

if (existsSync(inputPath)) {
  const raw = readFileSync(inputPath, 'utf8')
  entries = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map(toRecord)
    .filter(Boolean)
}

if (entries.length === 0) {
  entries = [
    {
      date: '[VERIFY]',
      title: 'Add your LinkedIn timeline entries',
      organization: 'No imported timeline yet',
      notes: 'Add lines to LINKEDIN.txt and run npm run timeline:generate',
    },
  ]
}

const fileHeader =
  "export type TimelineEntry = {\n  date: string\n  title: string\n  organization: string\n  notes: string\n}\n\n"

const serialized = `${fileHeader}export const timeline: TimelineEntry[] = ${JSON.stringify(entries, null, 2)}\n`

writeFileSync(outputPath, serialized, 'utf8')
console.log(`Timeline data written to ${outputPath}`)

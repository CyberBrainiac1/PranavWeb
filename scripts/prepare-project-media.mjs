import { copyFileSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { extname, resolve, join, basename } from 'node:path'
import convert from 'heic-convert'

const repoRoot = resolve(process.cwd())
const mediaDir = resolve(repoRoot, 'public', 'PicturesandVideos')

if (!existsSync(mediaDir)) {
  console.log(`No media directory found at ${mediaDir}`)
  process.exit(0)
}

const entries = readdirSync(mediaDir)
const heicFiles = entries.filter((entry) => ['.heic', '.heif'].includes(extname(entry).toLowerCase()))

let converted = 0
let copied = 0
let skipped = 0
let failed = 0

function isLikelyJpeg(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
}

for (const file of heicFiles) {
  const sourcePath = join(mediaDir, file)
  const sourceStat = statSync(sourcePath)
  if (!sourceStat.isFile()) continue

  const targetName = `${basename(file, extname(file))}.jpg`
  const targetPath = join(mediaDir, targetName)

  if (existsSync(targetPath)) {
    skipped += 1
    continue
  }

  try {
    const input = readFileSync(sourcePath)
    if (isLikelyJpeg(input)) {
      copyFileSync(sourcePath, targetPath)
      copied += 1
      continue
    }

    const outputBuffer = await convert({
      buffer: input,
      format: 'JPEG',
      quality: 0.82,
    })
    writeFileSync(targetPath, outputBuffer)
    converted += 1
  } catch (error) {
    failed += 1
    console.error(`Failed to convert ${file}:`, error instanceof Error ? error.message : error)
  }
}

console.log(
  `Media prepare complete. Copied: ${copied}, converted: ${converted}, skipped: ${skipped}, failed: ${failed}, total HEIC/HEIF: ${heicFiles.length}`,
)

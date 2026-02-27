import type { Project } from '../data/projects'

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'])
const VIDEO_EXTENSIONS = new Set(['mp4', 'mov', 'webm'])
const FILENAME_REGEX = /\.(heic|heif|jpg|jpeg|png|webp|gif|avif|mp4|mov|webm)$/i

export type ProjectMediaItem = {
  filename: string
  kind: 'image' | 'video' | 'file'
  previewable: boolean
  href: string
}

function getExtension(filename: string) {
  const parts = filename.toLowerCase().split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

function toPublicMediaHref(filename: string) {
  return `${import.meta.env.BASE_URL}PicturesandVideos/${encodeURIComponent(filename)}`
}

export function getProjectMediaItems(project: Project): ProjectMediaItem[] {
  const albumSection = project.details.find((section) => section.heading.toLowerCase().includes('album media'))
  if (!albumSection) return []

  const filenames = albumSection.bullets
    .map((bullet) => bullet.trim())
    .filter((bullet) => FILENAME_REGEX.test(bullet))

  const uniqueFilenames = [...new Set(filenames)]

  return uniqueFilenames.map((filename) => {
    const extension = getExtension(filename)

    if (VIDEO_EXTENSIONS.has(extension)) {
      return {
        filename,
        kind: 'video',
        previewable: true,
        href: toPublicMediaHref(filename),
      }
    }

    if (IMAGE_EXTENSIONS.has(extension)) {
      return {
        filename,
        kind: 'image',
        previewable: true,
        href: toPublicMediaHref(filename),
      }
    }

    return {
      filename,
      kind: 'file',
      previewable: false,
      href: toPublicMediaHref(filename),
    }
  })
}
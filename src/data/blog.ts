import { renderBlogMarkdown, type BlogTocItem } from '../lib/blogMarkdown'

export const FEATURED_BLOG_SLUG = 'diy-force-feedback-wheel-build-log'

type BlogFrontmatter = {
  title: string
  date: string
  tags: string[]
  summary: string
}

export type BlogPost = BlogFrontmatter & {
  slug: string
  html: string
  markdown: string
  readingMinutes: number
  toc: BlogTocItem[]
}

const blogSources = import.meta.glob('../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const stripQuotes = (value: string) => value.replace(/^['"]|['"]$/g, '').trim()

function parseFrontmatter(rawSource: string) {
  const source = rawSource.replace(/\r\n/g, '\n')
  if (!source.startsWith('---\n')) {
    return { frontmatter: {} as Partial<BlogFrontmatter>, body: source.trim() }
  }

  const endMarkerIndex = source.indexOf('\n---\n', 4)
  if (endMarkerIndex === -1) {
    return { frontmatter: {} as Partial<BlogFrontmatter>, body: source.trim() }
  }

  const frontmatterBlock = source.slice(4, endMarkerIndex)
  const body = source.slice(endMarkerIndex + 5).trim()
  const frontmatter: Partial<BlogFrontmatter> = {}

  let activeListKey: keyof BlogFrontmatter | null = null

  frontmatterBlock.split('\n').forEach((line) => {
    if (!line.trim()) return

    const trimmed = line.trim()
    if (trimmed.startsWith('- ') && activeListKey) {
      const nextItem = stripQuotes(trimmed.slice(2))
      const existing = Array.isArray(frontmatter[activeListKey])
        ? [...(frontmatter[activeListKey] as string[])]
        : []
      existing.push(nextItem)
      frontmatter[activeListKey] = existing as never
      return
    }

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return

    const key = line.slice(0, separatorIndex).trim() as keyof BlogFrontmatter
    const value = line.slice(separatorIndex + 1).trim()
    activeListKey = null

    if (!value) {
      if (key === 'tags') {
        frontmatter.tags = []
        activeListKey = key
      }
      return
    }

    if (key === 'tags') {
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter.tags = value
          .slice(1, -1)
          .split(',')
          .map((entry) => stripQuotes(entry))
          .filter(Boolean)
      } else {
        frontmatter.tags = [stripQuotes(value)]
      }
      return
    }

    frontmatter[key] = stripQuotes(value) as never
  })

  return { frontmatter, body }
}

const readingMinutesFromMarkdown = (markdown: string) => {
  const words = markdown
    .replace(/[`*_>#~\-\[\]\(\)]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

const buildPost = (path: string, rawSource: string): BlogPost => {
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
  const { frontmatter, body } = parseFrontmatter(rawSource)
  const rendered = renderBlogMarkdown(body)

  return {
    slug,
    title: frontmatter.title || '[ADD] Untitled post',
    date: frontmatter.date || '[ADD] Date',
    tags: frontmatter.tags || [],
    summary: frontmatter.summary || '[ADD] Summary',
    markdown: body,
    html: rendered.html,
    toc: rendered.toc,
    readingMinutes: readingMinutesFromMarkdown(body),
  }
}

const timestamp = (date: string) => {
  const value = Date.parse(date)
  return Number.isNaN(value) ? 0 : value
}

export const blogPosts: BlogPost[] = Object.entries(blogSources)
  .map(([path, source]) => buildPost(path, source))
  .sort((first, second) => timestamp(second.date) - timestamp(first.date))

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug)

export const formatBlogDate = (date: string) => {
  const parsed = Date.parse(date)
  if (Number.isNaN(parsed)) return date
  return new Date(parsed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

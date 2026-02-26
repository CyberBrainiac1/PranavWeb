import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import container from 'markdown-it-container'

export type BlogTocItem = {
  id: string
  text: string
  level: 2 | 3
}

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const markdown: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(source: string, language: string): string {
    const validLanguage = Boolean(language) && hljs.getLanguage(language)
    const highlighted = validLanguage
      ? hljs.highlight(source, { language }).value
      : escapeHtml(source)

    const languageClass = validLanguage ? ` language-${language}` : ''
    return `<pre class="hljs"><code class="hljs${languageClass}">${highlighted}</code></pre>`
  },
})

markdown.use(anchor, { slugify: slugifyHeading })

;['note', 'tip', 'warning'].forEach((kind) => {
  markdown.use(container, kind, {
    render(tokens: any[], index: number) {
      const token = tokens[index]
      const info = token.info.trim().slice(kind.length).trim()
      const title = info || kind.toUpperCase()

      if (token.nesting === 1) {
        return `<div class="blog-callout blog-callout-${kind}"><p class="blog-callout-title">${markdown.utils.escapeHtml(title)}</p>\n`
      }

      return '</div>\n'
    },
  })
})

const imageRule = markdown.renderer.rules.image

markdown.renderer.rules.image = (tokens: any[], index: number, options: any, env: any, self: any) => {
  const token = tokens[index]
  const source = token.attrGet('src')

  if (source && source.startsWith('/')) {
    token.attrSet('src', `${import.meta.env.BASE_URL}${source.replace(/^\/+/, '')}`)
  }

  token.attrSet('loading', 'lazy')
  token.attrSet('decoding', 'async')

  if (imageRule) {
    return imageRule(tokens, index, options, env, self)
  }

  return self.renderToken(tokens, index, options)
}

export function renderBlogMarkdown(markdownSource: string) {
  const tokens = markdown.parse(markdownSource, {})
  const toc: BlogTocItem[] = []

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index]
    if (token.type !== 'heading_open') continue
    if (token.tag !== 'h2' && token.tag !== 'h3') continue

    const headingToken = tokens[index + 1]
    if (!headingToken || headingToken.type !== 'inline') continue

    const text = headingToken.content.trim()
    if (!text) continue

    toc.push({
      id: token.attrGet('id') || slugifyHeading(text),
      text,
      level: token.tag === 'h2' ? 2 : 3,
    })
  }

  const html = markdown.render(markdownSource)
  return { html, toc }
}

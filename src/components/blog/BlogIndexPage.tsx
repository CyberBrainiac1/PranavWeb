import { ArrowRight } from 'lucide-react'
import { blogPosts, formatBlogDate } from '../../data/blog'
import { Section } from '../Section'

type BlogIndexPageProps = {
  onOpenPost: (slug: string) => void
}

export function BlogIndexPage({ onOpenPost }: BlogIndexPageProps) {
  return (
    <Section
      id="blog"
      label="FIG.07 / BLOG"
      title="Blog"
      subtitle="Build logs and notes written as a calm reading list."
    >
      <div className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-list-item">
            <p className="blog-list-meta">
              {formatBlogDate(post.date)} · {post.readingMinutes} min read
            </p>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            {post.tags.length ? <p className="blog-list-tags">{post.tags.join(' · ')}</p> : null}
            <button type="button" className="blog-index-open" onClick={() => onOpenPost(post.slug)}>
              Read post <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
    </Section>
  )
}

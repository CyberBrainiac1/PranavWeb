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
      label="BLOG"
      title="Blog"
      subtitle="Build logs and notes written as a calm reading list."
      narrow
    >
      <div className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-list-item">
            <p className="blog-list-meta">
              {formatBlogDate(post.date)} · {post.readingMinutes} min read
            </p>
            <h3 onClick={() => onOpenPost(post.slug)}>{post.title}</h3>
            <p>{post.summary}</p>
            {post.tags.length ? (
              <div className="blog-list-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            ) : null}
            <button type="button" className="blog-index-open" onClick={() => onOpenPost(post.slug)}>
              Read post <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
    </Section>
  )
}

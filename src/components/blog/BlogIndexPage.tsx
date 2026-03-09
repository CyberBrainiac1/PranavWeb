import { ArrowRight } from 'lucide-react'
import { blogPosts, formatBlogDate } from '../../data/blog'

type BlogIndexPageProps = {
  onOpenPost: (slug: string) => void
}

export function BlogIndexPage({ onOpenPost }: BlogIndexPageProps) {
  return (
    <div className="page-shell">
      <div className="blog-index-header">
        <p className="micro-label" style={{ marginBottom: '16px' }}>Writing / Index</p>
        <h1 className="blog-index-title">Build logs and notes.</h1>
        <p className="blog-index-subtitle">
          Honest writing about building, breaking, and fixing things.
        </p>
      </div>

      <div className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-list-item">
            <p className="blog-list-meta">
              {formatBlogDate(post.date)} &nbsp;&middot;&nbsp; {post.readingMinutes} min read
            </p>
            <h3 onClick={() => onOpenPost(post.slug)}>{post.title}</h3>
            <p>{post.summary}</p>
            {post.tags.length > 0 && (
              <ul className="blog-list-tags" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="tag-chip">{tag}</li>
                ))}
              </ul>
            )}
            <button
              type="button"
              className="blog-index-open"
              onClick={() => onOpenPost(post.slug)}
            >
              Read post <ArrowRight size={14} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

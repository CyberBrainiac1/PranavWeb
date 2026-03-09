import { ArrowLeft, Clock3 } from 'lucide-react'
import { formatBlogDate, getBlogPost } from '../../data/blog'

type BlogPostPageProps = {
  slug: string
  onBackToBlog: () => void
}

export function BlogPostPage({ slug, onBackToBlog }: BlogPostPageProps) {
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="page-shell-narrow">
        <div className="blog-not-found">
          <p className="micro-label">/blog/{slug}</p>
          <h2>Post Not Found</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
            This post doesn't exist in the current build.
          </p>
          <button type="button" className="btn-outline" onClick={onBackToBlog}>
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  const openTocItem = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page-shell-narrow">
      <div className="blog-path-row">
        <button type="button" className="blog-back-button" onClick={onBackToBlog}>
          <ArrowLeft size={14} aria-hidden="true" /> Blog
        </button>
        <p className="micro-label">/blog/{post.slug}</p>
      </div>

      <div className="blog-post-header">
        {post.tags.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        )}
        <h1>{post.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '12px', lineHeight: 1.6 }}>
          {post.summary}
        </p>
        <div className="blog-post-meta">
          <span>{formatBlogDate(post.date)}</span>
          <span className="blog-meta-divider">|</span>
          <span className="blog-post-meta-reading">
            <Clock3 size={13} aria-hidden="true" /> {post.readingMinutes} min read
          </span>
        </div>
      </div>

      {post.toc.length > 0 && (
        <div className="blog-toc">
          <p className="blog-toc-title">Table of contents</p>
          <nav aria-label="Table of contents">
            <ul>
              {post.toc.map((item) => (
                <li key={`${post.slug}-${item.id}`}>
                  <button
                    type="button"
                    className={`blog-toc-link${item.level === 3 ? ' blog-toc-link-sub' : ''}`}
                    onClick={() => openTocItem(item.id)}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <article
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  )
}

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
      <section className="page-shell-narrow">
        <div className="blog-not-found">
          <p className="micro-label">/blog/{slug}</p>
          <h2>Post Not Found</h2>
          <p className="section-subtitle">
            This post does not exist in the current build.
          </p>
          <button type="button" className="btn-outline" onClick={onBackToBlog}>
            Back To Blog
          </button>
        </div>
      </section>
    )
  }

  const openTocItem = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="page-shell-narrow">
      <div className="blog-path-row">
        <button type="button" className="blog-back-button" onClick={onBackToBlog}>
          <ArrowLeft size={15} /> Blog
        </button>
        <p className="micro-label">/blog/{post.slug}</p>
      </div>

      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <p>{post.summary}</p>
        <div className="blog-post-meta">
          <span>{formatBlogDate(post.date)}</span>
          <span className="blog-meta-divider">|</span>
          <span className="blog-post-meta-reading">
            <Clock3 size={14} /> {post.readingMinutes} min read
          </span>
        </div>
      </header>

      <div className="blog-layout">
        {post.toc.length ? (
          <aside className="blog-toc">
            <p className="blog-toc-title">Table Of Contents</p>
            <nav>
              <ul>
                {post.toc.map((item) => (
                  <li key={`${post.slug}-${item.id}`}>
                    <button
                      type="button"
                      className={`blog-toc-link ${item.level === 3 ? 'blog-toc-link-sub' : ''}`}
                      onClick={() => openTocItem(item.id)}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        ) : null}

        <article className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </section>
  )
}

import { ArrowRight } from 'lucide-react'
import { blogPosts, formatBlogDate } from '../../data/blog'
import { LabelTag } from '../LabelTag'
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
      subtitle="Long-form build logs, notes, and lessons from projects in progress."
    >
      <div className="grid gap-4">
        {blogPosts.map((post, index) => (
          <article key={post.slug} className="blog-index-card">
            <div className="flex flex-wrap items-center gap-2">
              {index === 0 ? <LabelTag text="LATEST" /> : null}
              <LabelTag text={formatBlogDate(post.date)} />
              <LabelTag text={`${post.readingMinutes} MIN READ`} />
            </div>

            <h3>{post.title}</h3>
            <p>{post.summary}</p>

            {post.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={`${post.slug}-${tag}`} className="blog-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              className="blog-index-open"
              onClick={() => onOpenPost(post.slug)}
            >
              Read Post <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
    </Section>
  )
}

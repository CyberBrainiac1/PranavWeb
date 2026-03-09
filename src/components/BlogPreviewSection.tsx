import { motion } from 'framer-motion'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogPosts, formatBlogDate } from '../data/blog'



const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: PREMIUM_EASE } },
}

export function BlogPreviewSection() {
  const navigate = useNavigate()
  const posts = blogPosts.slice(0, 3)

  return (
    <section id="blog">
      <div className="section-shell-narrow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={itemVariants} className="section-header">
            <span className="section-label">Writing</span>
            <h2 className="section-title">Build logs and notes.</h2>
          </motion.div>

          <div className="blog-preview-list">
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                className="blog-preview-item"
                onClick={() => navigate(`/blog/${post.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigate(`/blog/${post.slug}`)
                }}
              >
                <p className="blog-preview-date">
                  {formatBlogDate(post.date)} &nbsp;&middot;&nbsp; {post.readingMinutes} min read
                </p>
                <h3 className="blog-preview-title">{post.title}</h3>
                <p className="blog-preview-summary">{post.summary}</p>
              </motion.article>
            ))}
          </div>

          <motion.button
            variants={itemVariants}
            type="button"
            className="blog-preview-readall"
            onClick={() => navigate('/blog')}
          >
            All posts <ArrowRight size={14} aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

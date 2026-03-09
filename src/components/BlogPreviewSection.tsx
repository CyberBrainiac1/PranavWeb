import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/blog'

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function BlogPreviewSection() {
  const navigate = useNavigate()
  const previewPosts = blogPosts.slice(0, 3)

  return (
    <section id="blog">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={itemVariants} className="section-header">
            <span className="section-label">WRITING</span>
            <h2 className="section-title">Build logs &amp; notes.</h2>
          </motion.div>

          <div className="blog-preview-list">
            {previewPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                className="blog-preview-item"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <p className="blog-preview-date">{post.date}</p>
                <h3 className="blog-preview-title">{post.title}</h3>
                <p className="blog-preview-summary">{post.summary}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <button
              type="button"
              className="blog-preview-readall"
              onClick={() => navigate('/blog')}
            >
              Read all posts <ArrowRight size={14} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

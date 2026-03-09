import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function FeaturedProjectSection() {
  const navigate = useNavigate()
  const featuredProject = projects.find((p) => p.featured) ?? projects[0]

  return (
    <section id="featured">
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
            <span className="section-label">FEATURED BUILD</span>
          </motion.div>

          <motion.div variants={itemVariants} className="featured-project-card">
            <p className="micro-label">01 — FEATURED</p>
            <h2 className="featured-project-name">{featuredProject.name}</h2>
            <p className="featured-project-summary">{featuredProject.summary}</p>

            <div className="featured-tags">
              {featuredProject.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>

            <div className="featured-links">
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/blog/diy-force-feedback-wheel-build-log')}
              >
                Read build log
              </button>
              {featuredProject.links?.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'



const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: PREMIUM_EASE },
  },
}

const visualVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.95, ease: PREMIUM_EASE },
  },
}

export function FeaturedProjectSection() {
  const navigate = useNavigate()
  const feat = projects.find((p) => p.featured) ?? projects[0]

  return (
    <section id="featured">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.14 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="section-header">
            <span className="section-label">Featured Build</span>
          </motion.div>

          {/* Two-column cinematic layout */}
          <div className="featured-layout">
            {/* Left: text */}
            <motion.div variants={itemVariants} className="featured-text">
              <p className="micro-label" style={{ marginBottom: '16px' }}>
                01 — {feat.rev} / {feat.spec}
              </p>

              <h2 className="featured-name">{feat.name}</h2>

              <p className="featured-summary">{feat.summary}</p>

              <p className="featured-meta">
                Current focus — tuning feel, refining pedal response, and making the
                full setup feel right.
              </p>

              <div className="featured-tags">
                {feat.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="featured-links">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => navigate(`/projects/${feat.slug ?? feat.id}`)}
                >
                  Full details
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => navigate('/blog/diy-force-feedback-wheel-build-log')}
                >
                  Read build log
                </button>
                {feat.links?.slice(0, 1).map((link) => (
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

            {/* Right: visual area */}
            <motion.div variants={visualVariants} className="featured-visual" aria-hidden="true">
              <span className="featured-visual-label">
                Build in progress
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

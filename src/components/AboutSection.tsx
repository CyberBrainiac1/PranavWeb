import { motion } from 'framer-motion'
import { PREMIUM_EASE } from '../lib/motionConfig'

type AboutSectionProps = {
  aboutParagraphs: string[]
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: PREMIUM_EASE },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13 },
  },
}

export function AboutSection({ aboutParagraphs }: AboutSectionProps) {
  return (
    <section id="about">
      <div className="section-shell-narrow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="section-header">
            <span className="section-label">About</span>
            <h2 className="section-title">Builder at heart.</h2>
          </motion.div>

          <div className="about-paragraphs">
            {aboutParagraphs.map((paragraph, i) => (
              <motion.p key={`about-p-${i}`} variants={itemVariants}>
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div variants={itemVariants} className="about-focus">
            <span className="about-focus-label">Current focus</span>
            <p>
              Sim Racing Wheel + Force Feedback — tuning feel, fixing input mapping, and
              pushing the build further.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

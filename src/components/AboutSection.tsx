import { motion } from 'framer-motion'

type AboutSectionProps = {
  aboutParagraphs: string[]
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function AboutSection({ aboutParagraphs }: AboutSectionProps) {
  return (
    <section id="about">
      <div className="section-shell-narrow">
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
            <span className="section-label">ABOUT</span>
            <h2 className="section-title">Builder at heart.</h2>
          </motion.div>

          <div className="about-content">
            <motion.div variants={itemVariants} className="about-paragraphs">
              {aboutParagraphs.map((paragraph, i) => (
                <motion.p key={`about-p-${i}`} variants={itemVariants}>
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="about-focus-box">
              <span className="micro-label" style={{ marginBottom: '8px', display: 'block' }}>
                CURRENT FOCUS
              </span>
              <p>
                Sim Racing Wheel + Force Feedback — tuning feel, fixing input mapping, and pushing
                the build further.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

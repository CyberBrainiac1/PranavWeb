import { motion } from 'framer-motion'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { skillModules } from '../data/skills'



const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: PREMIUM_EASE } },
}

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="section-shell">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={itemVariants} className="section-header">
            <span className="section-label">Skills</span>
            <h2 className="section-title">Core tools and habits.</h2>
          </motion.div>

          <div className="skills-grid">
            {skillModules.map((module) => (
              <motion.div key={module.id} variants={itemVariants}>
                <span className="skills-group-label">{module.label}</span>
                <p className="skills-group-title">{module.title}</p>
                <ul className="skills-list">
                  {module.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

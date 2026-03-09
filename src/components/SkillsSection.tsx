import { motion } from 'framer-motion'
import { skillModules } from '../data/skills'

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function SkillsSection() {
  return (
    <section id="skills">
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
            <span className="section-label">SKILLS</span>
            <h2 className="section-title">Core tools &amp; disciplines.</h2>
          </motion.div>

          <div className="skills-grid">
            {skillModules.map((module) => (
              <motion.div key={module.id} variants={itemVariants}>
                <p className="skills-group-label">{module.label}</p>
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

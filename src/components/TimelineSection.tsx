import { motion } from 'framer-motion'
import { aboutTimelineEntries } from '../data/aboutTimeline'

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function TimelineSection() {
  return (
    <section id="timeline">
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
            <span className="section-label">TIMELINE</span>
            <h2 className="section-title">How I got here.</h2>
          </motion.div>

          <div className="timeline-track">
            {aboutTimelineEntries.map((entry, i) => (
              <motion.article
                key={`${entry.date}-${i}`}
                variants={itemVariants}
                className="timeline-entry"
              >
                <div className="timeline-dot" />
                <p className="timeline-date">{entry.date}</p>
                <h3 className="timeline-entry-title">{entry.title}</h3>
                <p className="timeline-org">{entry.organization}</p>
                <p className="timeline-note">{entry.notes}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

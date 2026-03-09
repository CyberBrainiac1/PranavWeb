import { motion } from 'framer-motion'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { aboutTimelineEntries } from '../data/aboutTimeline'
import { timeline as linkedinTimeline } from '../data/timeline'



const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: PREMIUM_EASE } },
}

export function TimelineSection() {
  const hasLinkedIn = linkedinTimeline.some(
    (e) => e.date !== '[VERIFY]' && e.organization.toLowerCase() !== 'no imported timeline yet',
  )
  const entries = hasLinkedIn ? linkedinTimeline : aboutTimelineEntries

  return (
    <section id="timeline">
      <div className="section-shell-narrow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.11 } },
          }}
        >
          <motion.div variants={itemVariants} className="section-header">
            <span className="section-label">Timeline</span>
            <h2 className="section-title">Progression over time.</h2>
          </motion.div>

          <div className="timeline-track">
            {entries.map((entry, i) => (
              <motion.article
                key={`${entry.date}-${i}`}
                variants={itemVariants}
                className="timeline-entry"
              >
                <div className="timeline-dot" aria-hidden="true" />
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

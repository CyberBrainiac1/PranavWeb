import { type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'

type ContactStatus = {
  kind: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

type ContactSectionProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  status: ContactStatus
  sending: boolean
  profile: {
    contactEmail: string
    links: { linkedin: string; github: string }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function ContactSection({ onSubmit, status, sending, profile }: ContactSectionProps) {
  return (
    <section id="contact">
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
            <span className="section-label">CONTACT</span>
            <h2 className="section-title">Get in touch.</h2>
          </motion.div>

          <div className="contact-grid">
            <motion.div variants={itemVariants} className="contact-info">
              <p>Best way to reach me is this form. You can also use the direct links below.</p>
              <div className="contact-links-col">
                <a className="contact-link" href={`mailto:${profile.contactEmail}`}>
                  <Mail size={16} /> Email
                </a>
                <a
                  className="contact-link"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  className="contact-link"
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
              <p className="contact-small-note">
                Based near San Jose. I usually reply fastest through email.
              </p>
            </motion.div>

            <motion.form variants={itemVariants} onSubmit={onSubmit} className="contact-form">
              <label className="field-group">
                <span>Name</span>
                <input className="field" name="name" required placeholder="Name" />
              </label>
              <label className="field-group">
                <span>Email</span>
                <input
                  className="field"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                />
              </label>
              <label className="field-group">
                <span>Message</span>
                <textarea
                  className="field"
                  name="message"
                  required
                  placeholder="Your message..."
                  rows={5}
                />
              </label>
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

              {status.kind !== 'idle' && (
                <div className={`form-status ${status.kind}`}>
                  {status.kind === 'success' && <CheckCircle2 size={16} />}
                  {status.kind === 'error' && <AlertTriangle size={16} />}
                  {status.kind === 'sending' && (
                    <Loader2 size={16} className="spin-icon" />
                  )}
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={sending}
                style={{ width: 'fit-content' }}
              >
                {sending ? (
                  <Loader2 size={16} className="spin-icon" />
                ) : (
                  <Send size={16} />
                )}
                {sending ? 'Sending...' : 'Send message'}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

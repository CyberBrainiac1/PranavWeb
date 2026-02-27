import { motion } from 'framer-motion'

type HeroProps = {
  name: string
  location: string
  introText: string
  aboutParagraphs: string[]
  links: { linkedin: string; github: string }
  onOpenProjects: () => void
  onOpenBlog: () => void
  onOpenSkills: () => void
  onContact: () => void
}

export function Hero({
  name,
  location,
  introText,
  aboutParagraphs,
  links,
  onOpenProjects,
  onOpenBlog,
  onOpenSkills,
  onContact,
}: HeroProps) {
  const homeParagraphs =
    aboutParagraphs.length > 0
      ? aboutParagraphs.filter((paragraph) => paragraph.trim() !== introText.trim())
      : []
  const profileImageSrc = `${import.meta.env.BASE_URL}PFP.jpg`

  return (
    <section id="home" className="minimal-home-shell">
      <div className="minimal-home-grid">
        <aside className="minimal-profile-col">
          <div className="minimal-dot-row" aria-hidden="true">
            <span className="minimal-dot minimal-dot-amber" />
            <span className="minimal-dot minimal-dot-lime" />
            <span className="minimal-dot minimal-dot-magenta" />
          </div>

          <h1 className="minimal-profile-name">{name}</h1>
          <p className="minimal-profile-role">Robotics builder</p>
          <p className="minimal-profile-location">{location}</p>

          <nav aria-label="Home quick links">
            <ul className="minimal-link-list">
              <li>
                <button type="button" onClick={onOpenProjects} className="minimal-link">
                  Projects
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenSkills} className="minimal-link">
                  Skills
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenBlog} className="minimal-link">
                  Blog
                </button>
              </li>
              <li>
                <button type="button" onClick={onContact} className="minimal-link">
                  Contact
                </button>
              </li>
              <li>
                <a className="minimal-link" href={links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="minimal-link" href={links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div className="minimal-profile-photo">
            <img
              src={profileImageSrc}
              alt={`${name} profile`}
              loading="lazy"
              onError={(event) => {
                ;(event.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        </aside>

        <motion.article
          className="minimal-copy-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
        >
          <p className="minimal-lede">{introText}</p>

          {homeParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <p className="minimal-focus-line">
            Current focus: Sim Racing Wheel + Force Feedback - tuning feel and fixing input mapping.
          </p>

          <div className="minimal-action-row">
            <button type="button" onClick={onOpenProjects} className="btn-primary-mag">
              View Projects
            </button>
            <button type="button" onClick={onContact} className="btn-outline-mag">
              Contact
            </button>
          </div>

          <p className="minimal-signoff">
            If you want to connect, head to the Contact tab and send me a message.
          </p>
        </motion.article>
      </div>
    </section>
  )
}

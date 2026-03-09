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
  onContact,
}: HeroProps) {
  const homeParagraphs =
    aboutParagraphs.length > 0
      ? aboutParagraphs.filter((paragraph) => paragraph.trim() !== introText.trim()).slice(0, 3)
      : []
  const profileImageSrc = `${import.meta.env.BASE_URL}PFP.jpg`

  return (
    <section id="home" className="page-shell">
      <div className="home-grid">
        <aside className="home-sidebar">
          <p className="micro-label">NAV / INDEX</p>
          <h1 className="home-sidebar-name">{name}</h1>
          <p className="home-sidebar-role">Robotics builder · {location}</p>

          <nav aria-label="Home quick links">
            <ul className="home-sidebar-links">
              <li>
                <button type="button" onClick={onOpenBlog}>Blog</button>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
              </li>
              <li>
                <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
            </ul>
          </nav>

          <div className="home-sidebar-photo">
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
          className="home-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p className="home-lede">{introText}</p>

          {homeParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="current-focus-row">
            <p className="micro-label">CURRENT FOCUS</p>
            <p>
              Sim Racing Wheel + Force Feedback — tuning feel, fixing input mapping, and pushing the build further.
            </p>
          </div>

          <div className="home-action-row">
            <button type="button" onClick={onOpenProjects} className="btn-primary">
              View Projects
            </button>
            <button type="button" onClick={onContact} className="btn-outline">
              Contact
            </button>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

type HeroProps = {
  name: string
  location: string
  introText: string
  aboutParagraphs: string[]
  links: { linkedin: string; github: string }
  contactEmail?: string
  onOpenProjects: () => void
  onOpenBlog: () => void
  onOpenSkills: () => void
  onContact: () => void
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero({ name, links, contactEmail = 'emmadipranav@gmail.com' }: HeroProps) {
  const profileImageSrc = `${import.meta.env.BASE_URL}PFP.jpg`

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <section id="home" className="cover-section">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
      >
        <motion.img
          variants={itemVariants}
          src={profileImageSrc}
          alt={`${name} profile photo`}
          className="cover-photo"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />

        <motion.h1 variants={itemVariants} className="cover-name">
          {name}
        </motion.h1>

        <motion.p variants={itemVariants} className="cover-subtitle">
          Robotics Builder
        </motion.p>

        <motion.div variants={itemVariants} className="cover-socials">
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="cover-social-link">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="cover-social-link">
            <Github size={16} /> GitHub
          </a>
          <button type="button" className="cover-social-link" onClick={() => scrollTo('blog')}>
            Blog
          </button>
          <a href={`mailto:${contactEmail}`} className="cover-social-link">
            <Mail size={16} /> Email
          </a>
        </motion.div>
      </motion.div>

      <div className="cover-scroll-cue" aria-hidden="true">
        <div className="cover-scroll-dot" />
        <div className="cover-scroll-dot" />
        <div className="cover-scroll-dot" />
      </div>
    </section>
  )
}

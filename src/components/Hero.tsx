import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PREMIUM_EASE } from '../lib/motionConfig'

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

export function Hero({ name, links, contactEmail = 'emmadipranav@gmail.com' }: HeroProps) {
  const profileImageSrc = `${import.meta.env.BASE_URL}PFP.jpg`
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Hide scroll cue once user starts scrolling
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80 && scrollCueRef.current) {
        scrollCueRef.current.style.opacity = '0'
        scrollCueRef.current.style.transition = 'opacity 500ms ease'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: PREMIUM_EASE },
    },
  }

  return (
    <section id="home" className="cover-section">
      <motion.div
        className="cover-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Micro label */}
        <motion.p variants={itemVariants} className="cover-micro">
          Pranav Emmadi / Index
        </motion.p>

        {/* Profile photo — softly rounded rectangle */}
        <motion.img
          variants={itemVariants}
          src={profileImageSrc}
          alt="Pranav Emmadi"
          className="cover-photo"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />

        {/* Name */}
        <motion.h1 variants={itemVariants} className="cover-name">
          {name}
        </motion.h1>

        {/* Socials */}
        <motion.div variants={itemVariants} className="cover-socials">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="cover-social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="cover-social-link"
            aria-label="GitHub"
          >
            <Github size={15} aria-hidden="true" />
            GitHub
          </a>
          <button
            type="button"
            className="cover-social-link"
            onClick={() => navigate('/writing')}
            aria-label="Jump to blog"
          >
            Blog
          </button>
          <a
            href={`mailto:${contactEmail}`}
            className="cover-social-link"
            aria-label="Send email"
          >
            <Mail size={15} aria-hidden="true" />
            Email
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue — navigates to About section */}
      <div
        ref={scrollCueRef}
        className="cover-scroll-cue cover-scroll-cue-clickable"
        aria-label="Go to About section"
        onClick={() => navigate('/about')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigate('/about')
          }
        }}
      >
        <div className="cover-scroll-line" />
      </div>
    </section>
  )
}

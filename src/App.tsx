import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { BlueprintBackground } from './components/BlueprintBackground'
import { BlogIndexPage } from './components/blog/BlogIndexPage'
import { BlogPostPage } from './components/blog/BlogPostPage'
import { DevSettingsPage } from './components/DevSettingsPage'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectsHorizontalScroll } from './components/ProjectsHorizontalScroll'
import { Section } from './components/Section'
import { aboutTimelineEntries } from './data/aboutTimeline'
import { designedItems } from './data/designed'
import { profileInfo } from './data/profile'
import { projects } from './data/projects'
import { skillModules } from './data/skills'
import { timeline as linkedinTimeline } from './data/timeline'
import { loadRuntimeConfig, RUNTIME_CONFIG_EVENT } from './lib/runtimeConfig'

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
]

const scrollRouteOrder = navItems.map((item) => item.path)

// Scroll-based route navigation thresholds:
// 88% down means user has scrolled nearly to bottom before auto-advancing
// 10% up means user is near top and scrolling up to go back
const DOWN_THRESHOLD = 0.88
const UP_THRESHOLD = 0.1
const NAV_COOLDOWN_MS = 950
const SCROLL_DELTA_THRESHOLD = 20
const WHEEL_NAV_TRIGGER_DELTA = 240
const WHEEL_ACCUMULATION_RESET_MS = 260
const HIDDEN_DEV_TAP_TARGET = 5
const HIDDEN_DEV_TAP_WINDOW_MS = 1400

function canUseRouteScrollTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return true
  return !target.closest(
    'input, textarea, select, [contenteditable="true"], .projects-horizontal, [data-disable-route-scroll]',
  )
}

function getCanonicalRoute(pathname: string) {
  if (pathname === '/') return '/home'
  if (pathname.startsWith('/blog/')) return '/blog'
  return pathname
}

function getAdjacentRoute(pathname: string, direction: 1 | -1) {
  const routeIndex = scrollRouteOrder.indexOf(pathname)
  if (routeIndex === -1) return null
  const nextIndex = routeIndex + direction
  if (nextIndex < 0 || nextIndex >= scrollRouteOrder.length) return null
  return scrollRouteOrder[nextIndex]
}

type ContactStatus = {
  kind: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

type ContactPageProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  status: ContactStatus
  sending: boolean
  profile: {
    contactEmail: string
    links: { linkedin: string; github: string }
  }
}

type RenderProfile = {
  name: string
  location: string
  summary: string
  heroHeadlineLines: string[]
  heroIntroText: string
  aboutParagraphs: string[]
  storyBeats: Array<{ label: string; title: string; text: string }>
  contactEmail: string
  links: { linkedin: string; github: string }
}

function HomePage({
  profile,
  onOpenProjectsPage,
  onOpenBlogPage,
  onOpenSkillsPage,
  onOpenContactPage,
}: {
  profile: RenderProfile
  onOpenProjectsPage: () => void
  onOpenBlogPage: () => void
  onOpenSkillsPage: () => void
  onOpenContactPage: () => void
}) {
  return (
    <Hero
      name={profile.name}
      location={profile.location}
      introText={profile.heroIntroText}
      aboutParagraphs={profile.aboutParagraphs}
      links={profile.links}
      onOpenProjects={onOpenProjectsPage}
      onOpenBlog={onOpenBlogPage}
      onOpenSkills={onOpenSkillsPage}
      onContact={onOpenContactPage}
    />
  )
}

function BlogPostRoute({ onBackToBlog }: { onBackToBlog: () => void }) {
  const { slug = '' } = useParams()
  return <BlogPostPage slug={slug} onBackToBlog={onBackToBlog} />
}

function ProjectsPage() {
  const navigate = useNavigate()
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]
  const handleBoundaryScroll = (direction: 1 | -1) => {
    const adjacentRoute = getAdjacentRoute('/projects', direction)
    if (adjacentRoute) {
      navigate(adjacentRoute)
    }
  }

  return (
    <Section
      id="projects"
      label="PROJECTS"
      title="Projects"
      subtitle="A rolling view of what I'm building right now."
    >
      <article className="project-featured">
        <p className="micro-label">Featured</p>
        <h3>{featuredProject.name}</h3>
        <p>{featuredProject.summary}</p>
        <p className="project-focus-line">
          This one has most of my attention right now. I keep tuning feel and cleaning up input behavior.
        </p>
        <div className="home-action-row">
          <button
            type="button"
            onClick={() => navigate('/blog/diy-force-feedback-wheel-build-log')}
            className="btn-primary"
          >
            Read build log
          </button>
          <button type="button" onClick={() => navigate('/contact')} className="btn-outline">
            Contact
          </button>
        </div>
      </article>

      <div className="content-divider" />

      <ProjectsHorizontalScroll projects={projects} onBoundaryScroll={handleBoundaryScroll} />
    </Section>
  )
}

function SkillsPage() {
  return (
    <Section
      id="skills"
      label="SKILLS"
      title="Skills"
      subtitle="Core tools and habits I use across builds."
    >
      <div className="skills-grid">
        {skillModules.map((module) => (
          <div key={module.id} className="skills-group">
            <h3>{module.title}</h3>
            <ul>
              {module.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TimelinePage() {
  const hasRealLinkedInTimeline = linkedinTimeline.some(
    (entry) =>
      entry.date !== '[VERIFY]' &&
      entry.organization.toLowerCase() !== 'no imported timeline yet',
  )
  const entries = hasRealLinkedInTimeline ? linkedinTimeline : aboutTimelineEntries

  return (
    <Section
      id="timeline"
      label="TIMELINE"
      title="Timeline"
      subtitle="A simple timeline of what I've worked on so far."
      narrow
    >
      <div className="timeline-list">
        {entries.map((entry, index) => (
          <article key={`${entry.date}-${entry.title}-${index}`} className="timeline-item">
            <p className="timeline-date">{entry.date}</p>
            <h3>{entry.title}</h3>
            <p className="timeline-org">{entry.organization}</p>
            <p className="timeline-note">{entry.notes}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function DesignedPage() {
  return (
    <Section
      id="designed"
      label="DESIGNED"
      title="Things I Designed"
      subtitle="A quick list of designs I'm proud of."
      narrow
    >
      <div className="list-section">
        {designedItems.map((item) => (
          <article key={item.id} className="list-row">
            <h3>{item.title}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function ContactPage({
  onSubmit,
  status,
  sending,
  profile,
}: ContactPageProps) {
  return (
    <Section
      id="contact"
      label="CONTACT"
      title="Contact"
      subtitle="Send a message and I'll get it by email."
    >
      <div className="contact-grid">
        <div className="contact-info">
          <p>
            Best way to reach me is this form. You can also use the direct links below.
          </p>
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
        </div>

        <form onSubmit={onSubmit} className="contact-form">
          <label className="field-group">
            <span>Name</span>
            <input className="field" name="name" required placeholder="Name" />
          </label>
          <label className="field-group">
            <span>Email</span>
            <input className="field" type="email" name="email" required placeholder="Email" />
          </label>
          <label className="field-group">
            <span>Message</span>
            <textarea
              className="field"
              name="message"
              required
              placeholder="Message"
              rows={5}
            />
          </label>

          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />

          <button
            type="submit"
            className="btn-primary"
            disabled={sending}
          >
            {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            {sending ? 'Sending...' : 'Send Message'}
          </button>

          {status.kind !== 'idle' ? (
            <div className={`contact-status ${status.kind === 'success' ? 'contact-status-success' : 'contact-status-error'}`}>
              <p className="contact-status-heading">
                {status.kind === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                {status.kind === 'success' ? 'Message sent' : 'Send failed'}
              </p>
              <p className="contact-status-detail">{status.message}</p>
            </div>
          ) : null}
        </form>
      </div>
    </Section>
  )
}

function App() {
  const [contactStatus, setContactStatus] = useState<ContactStatus>({
    kind: 'idle',
    message: '',
  })
  const [contactSending, setContactSending] = useState(false)
  const [runtimeConfig, setRuntimeConfig] = useState(() => loadRuntimeConfig())
  const routeScrollCooldownRef = useRef(0)
  const lastScrollDirectionRef = useRef<1 | -1 | 0>(0)
  const wheelDeltaAccumulatorRef = useRef(0)
  const wheelAccumulatorTimestampRef = useRef(0)
  const hiddenDevTapCountRef = useRef(0)
  const hiddenDevTapTimeRef = useRef(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [mobileLayout, setMobileLayout] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const canonicalRoute = getCanonicalRoute(location.pathname)
  const routeIndex = scrollRouteOrder.indexOf(canonicalRoute)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      setPrefersReducedMotion(media.matches)
    }
    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => {
      media.removeEventListener('change', syncPreference)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const widthMedia = window.matchMedia('(max-width: 900px)')
    const pointerMedia = window.matchMedia('(pointer: coarse)')

    const syncMobileLayout = () => {
      setMobileLayout(widthMedia.matches || pointerMedia.matches)
    }

    syncMobileLayout()
    widthMedia.addEventListener('change', syncMobileLayout)
    pointerMedia.addEventListener('change', syncMobileLayout)

    return () => {
      widthMedia.removeEventListener('change', syncMobileLayout)
      pointerMedia.removeEventListener('change', syncMobileLayout)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion || mobileLayout ? 'auto' : 'smooth' })
  }, [location.pathname, prefersReducedMotion, mobileLayout])

  useEffect(() => {
    if (prefersReducedMotion || mobileLayout || routeIndex === -1 || canonicalRoute === '/projects') return

    wheelDeltaAccumulatorRef.current = 0
    wheelAccumulatorTimestampRef.current = 0

    const tryNavigateByThreshold = () => {
      const direction = lastScrollDirectionRef.current
      if (!direction) return

      const now = Date.now()
      if (now < routeScrollCooldownRef.current) return

      let nextPath = ''
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

      if (maxScroll <= 18) {
        if (direction > 0 && routeIndex < scrollRouteOrder.length - 1) {
          nextPath = scrollRouteOrder[routeIndex + 1]
        }
        if (direction < 0 && routeIndex > 0) {
          nextPath = scrollRouteOrder[routeIndex - 1]
        }
      } else {
        const progress = window.scrollY / maxScroll
        if (direction > 0 && progress >= DOWN_THRESHOLD && routeIndex < scrollRouteOrder.length - 1) {
          nextPath = scrollRouteOrder[routeIndex + 1]
        }
        if (direction < 0 && progress <= UP_THRESHOLD && routeIndex > 0) {
          nextPath = scrollRouteOrder[routeIndex - 1]
        }
      }

      if (!nextPath || nextPath === canonicalRoute) return
      routeScrollCooldownRef.current = now + NAV_COOLDOWN_MS
      navigate(nextPath)
    }

    const onWheel = (event: WheelEvent) => {
      if (!canUseRouteScrollTarget(event.target)) return
      if (Math.abs(event.deltaY) < SCROLL_DELTA_THRESHOLD) return

      const now = Date.now()
      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1
      const previousDirection = wheelDeltaAccumulatorRef.current > 0 ? 1 : wheelDeltaAccumulatorRef.current < 0 ? -1 : 0

      if (now - wheelAccumulatorTimestampRef.current > WHEEL_ACCUMULATION_RESET_MS || (previousDirection !== 0 && previousDirection !== direction)) {
        wheelDeltaAccumulatorRef.current = 0
      }

      wheelAccumulatorTimestampRef.current = now
      wheelDeltaAccumulatorRef.current += event.deltaY

      if (Math.abs(wheelDeltaAccumulatorRef.current) < WHEEL_NAV_TRIGGER_DELTA) return

      lastScrollDirectionRef.current = direction
      wheelDeltaAccumulatorRef.current = 0
      tryNavigateByThreshold()
    }

    const onScroll = () => {
      tryNavigateByThreshold()
    }

    let touchStartY: number | null = null
    const onTouchStart = (event: TouchEvent) => {
      if (!canUseRouteScrollTarget(event.target)) return
      touchStartY = event.touches[0]?.clientY ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!canUseRouteScrollTarget(event.target)) return
      if (touchStartY === null) return
      const currentY = event.touches[0]?.clientY ?? touchStartY
      const delta = touchStartY - currentY
      if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return
      lastScrollDirectionRef.current = delta > 0 ? 1 : -1
      tryNavigateByThreshold()
    }

    const onTouchEnd = () => {
      touchStartY = null
      lastScrollDirectionRef.current = 0
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [canonicalRoute, navigate, prefersReducedMotion, mobileLayout, routeIndex])

  useEffect(() => {
    const syncRuntimeConfig = () => {
      setRuntimeConfig(loadRuntimeConfig())
    }
    window.addEventListener(RUNTIME_CONFIG_EVENT, syncRuntimeConfig)
    return () => {
      window.removeEventListener(RUNTIME_CONFIG_EVENT, syncRuntimeConfig)
    }
  }, [])

  const renderProfile: RenderProfile = {
    name: runtimeConfig.profileName || profileInfo.name,
    location: runtimeConfig.profileLocation || profileInfo.location,
    summary: runtimeConfig.profileSummary || profileInfo.summary,
    heroHeadlineLines:
      runtimeConfig.heroHeadlineLines.length
        ? runtimeConfig.heroHeadlineLines
        : ['PRANAV EMMADI', 'ROBOTICS BUILDER'],
    heroIntroText:
      runtimeConfig.heroIntroText ||
      'I build robots and hardware projects, and I care a lot about making things work outside perfect demos. Most of what I learn comes from building, breaking, testing, and fixing.',
    aboutParagraphs:
      runtimeConfig.aboutParagraphs.length
        ? runtimeConfig.aboutParagraphs
        : profileInfo.aboutParagraphs,
    storyBeats:
      runtimeConfig.storyBeats.length
        ? runtimeConfig.storyBeats
        : profileInfo.storyBeats,
    contactEmail: runtimeConfig.contactEmail || 'emmadipranav@gmail.com',
    links: {
      linkedin: runtimeConfig.linkedinUrl || profileInfo.links.linkedin,
      github: runtimeConfig.githubUrl || profileInfo.links.github,
    },
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactSending) return

    const contactServiceKey = runtimeConfig.contactServiceKey.trim()

    if (!contactServiceKey) {
      setContactStatus({
        kind: 'error',
        message: 'Contact form is not available right now. Please use email or LinkedIn below.',
      })
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const botcheck = String(data.get('botcheck') ?? '').trim()

    if (botcheck) return

    setContactSending(true)
    setContactStatus({ kind: 'sending', message: 'Sending now...' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: contactServiceKey,
          from_name: name,
          email,
          subject: `Portfolio message from ${name || 'Visitor'}`,
          message,
          botcheck: '',
        }),
      })

      const result = (await response.json()) as { success?: boolean; message?: string }

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'The message did not send.')
      }

      form.reset()
      setContactStatus({
        kind: 'success',
        message: 'Message sent. Thanks for reaching out.',
      })
    } catch (error) {
      setContactStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Could not send right now. Try again in a minute.',
      })
    } finally {
      setContactSending(false)
    }
  }

  const handleHiddenDevTap = () => {
    const now = Date.now()
    if (now - hiddenDevTapTimeRef.current > HIDDEN_DEV_TAP_WINDOW_MS) {
      hiddenDevTapCountRef.current = 0
    }

    hiddenDevTapTimeRef.current = now
    hiddenDevTapCountRef.current += 1

    if (hiddenDevTapCountRef.current >= HIDDEN_DEV_TAP_TARGET) {
      hiddenDevTapCountRef.current = 0
      navigate('/dev')
    }
  }

  return (
    <div className="relative min-h-screen">
      <BlueprintBackground />

      <Navbar
        items={navItems}
        currentPath={location.pathname}
        onNavigate={(path) => navigate(path)}
      />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route
                path="/home"
                element={
                  <HomePage
                    profile={renderProfile}
                    onOpenProjectsPage={() => navigate('/projects')}
                    onOpenBlogPage={() => navigate('/blog')}
                    onOpenSkillsPage={() => navigate('/skills')}
                    onOpenContactPage={() => navigate('/contact')}
                  />
                }
              />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route
                path="/blog"
                element={<BlogIndexPage onOpenPost={(slug) => navigate(`/blog/${slug}`)} />}
              />
              <Route
                path="/blog/:slug"
                element={<BlogPostRoute onBackToBlog={() => navigate('/blog')} />}
              />
              <Route path="/designed" element={<DesignedPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/dev" element={<DevSettingsPage />} />
              <Route
                path="/contact"
                element={
                  <ContactPage
                    onSubmit={handleContactSubmit}
                    status={contactStatus}
                    sending={contactSending}
                    profile={renderProfile}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <div className="footer-row">
          <p>© {new Date().getFullYear()} {renderProfile.name}</p>
          <div className="footer-links">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="footer-blog-link"
            >
              Blog
            </button>
            <p className="footer-tagline">Build · Iterate · Test</p>
          </div>
        </div>
        <div className="footer-bottom-row">
          <button
            type="button"
            onClick={handleHiddenDevTap}
            className="footer-hidden-btn"
            aria-label="Hidden settings access"
          >
            built with care
          </button>
        </div>
      </footer>

      {routeIndex >= 0 ? (
        <div className="route-progress-indicator" aria-hidden="true">
          {String(routeIndex + 1).padStart(2, '0')} / {String(scrollRouteOrder.length).padStart(2, '0')}
        </div>
      ) : null}
    </div>
  )
}

export default App

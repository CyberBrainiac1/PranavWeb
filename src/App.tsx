import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  BookOpenText,
  CheckCircle2,
  ExternalLink,
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
import { AssistantPanel } from './components/AssistantPanel'
import { DevSettingsPage } from './components/DevSettingsPage'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectsHorizontalScroll } from './components/ProjectsHorizontalScroll'
import { Section } from './components/Section'
import { aboutTimelineEntries } from './data/aboutTimeline'
import { boredIdeas } from './data/bored'
import { designedItems } from './data/designed'
import { experienceItems } from './data/experiences'
import { profileInfo } from './data/profile'
import { projects } from './data/projects'
import { skillModules } from './data/skills'
import { timeline as linkedinTimeline } from './data/timeline'
import { loadRuntimeConfig, RUNTIME_CONFIG_EVENT } from './lib/runtimeConfig'

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/designed', label: 'Designed' },
  { path: '/blog', label: 'Blog' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/experiences', label: 'Experiences' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
]

const scrollRouteOrder = [
  '/home',
  '/projects',
  '/designed',
  '/blog',
  '/timeline',
  '/experiences',
  '/skills',
  '/contact',
]

const DOWN_THRESHOLD = 0.9
const UP_THRESHOLD = 0.1
const NAV_COOLDOWN_MS = 950
const SCROLL_DELTA_THRESHOLD = 16

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
    navigate(direction > 0 ? '/designed' : '/home')
  }

  return (
    <Section
      id="projects"
      label="FIG.02 / PROJECTS"
      title="Projects"
      subtitle="A rolling view of what I am building right now."
    >
      <article className="project-featured">
        <p className="micro-label">Featured</p>
        <h3>{featuredProject.name}</h3>
        <p>{featuredProject.summary}</p>
        <p className="project-focus-line">
          This one has most of my attention right now. I keep tuning feel and cleaning up input behavior.
        </p>
        <div className="minimal-action-row">
          <button
            type="button"
            onClick={() => navigate('/blog/diy-force-feedback-wheel-build-log')}
            className="btn-primary-mag"
          >
            Read build log
          </button>
          <button type="button" onClick={() => navigate('/contact')} className="btn-outline-mag">
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
      label="FIG.03 / SKILLS"
      title="Skills"
      subtitle="Core tools and habits I use across builds."
    >
      <div className="skills-minimal-grid">
        {skillModules.map((module) => (
          <article key={module.id} className="skills-block">
            <p className="micro-label">{module.label}</p>
            <h3>{module.title}</h3>
            <ul>
              {module.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
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
      label="FIG.04 / TIMELINE"
      title="Timeline"
      subtitle="A simple timeline of what I have worked on so far."
    >
      <div className="timeline-clean">
        {entries.map((entry, index) => (
          <article key={`${entry.date}-${entry.title}-${index}`} className="timeline-clean-item">
            <p className="timeline-clean-date">{entry.date}</p>
            <div>
              <h3>{entry.title}</h3>
              <p className="timeline-clean-org">{entry.organization}</p>
              <p className="timeline-clean-note">{entry.notes}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function ExperiencesPage() {
  return (
    <Section
      id="experiences"
      label="FIG.05 / EXPERIENCES"
      title="Experiences"
      subtitle="A few programs and events that shaped how I build."
    >
      <div className="list-section">
        {experienceItems.map((item) => (
          <article key={item.id} className="list-row">
            <h3>{item.title}</h3>
            <p>{item.blurb}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function BoredPage() {
  return (
    <Section
      id="bored"
      label="FIG.06 / BORED LIST"
      title="Things To Do When Bored"
      subtitle="Quick options when you want something fun, useful, or both."
    >
      <div className="list-section">
        {boredIdeas.map((idea) => (
          <article key={idea.id} className="list-row">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            {idea.link ? (
              <a
                href={idea.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm"
              >
                Open <ExternalLink size={14} />
              </a>
            ) : (
              <p className="text-xs opacity-70">No link needed. Just start.</p>
            )}
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
      label="FIG.07 / DESIGNED"
      title="Cool Things I Personally Designed"
      subtitle="A quick list of designs I am proud of."
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
  const statusTone =
    status.kind === 'success'
      ? 'border-sky-200/40 bg-sky-300/10 text-sky-50'
      : 'border-amber-200/35 bg-amber-300/10 text-amber-50'

  return (
    <Section
      id="contact"
      label="FIG.09 / CONTACT"
      title="Contact"
      subtitle="Send a message and I&apos;ll get it by email."
    >
      <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.1fr)]">
        <div className="blueprint-panel space-y-3 sm:space-y-4">
          <p className="text-sm text-slate-300">
            Best way to reach me is this form. You can also use the direct links below.
          </p>
          <div className="grid gap-3">
            <a className="contact-button" href={`mailto:${profile.contactEmail}`}>
              <Mail size={16} /> Email
            </a>
            <a
              className="contact-button"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              className="contact-button"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
          <p className="text-xs text-slate-400">
            Based near San Jose. I usually reply fastest through email.
          </p>
        </div>

        <form onSubmit={onSubmit} className="blueprint-panel min-w-0 space-y-3 sm:space-y-4">
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
              className="field min-h-28 resize-y sm:min-h-36"
              name="message"
              required
              placeholder="Message"
            />
          </label>

          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />

          <button
            type="submit"
            className="btn-primary-mag w-full justify-center sm:w-auto"
            disabled={sending}
          >
            {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
            {sending ? 'Sending...' : 'Send Message'}
          </button>

          {status.kind !== 'idle' ? (
            <div className={`rounded-xl border p-3 text-sm ${statusTone}`}>
              <p className="flex items-center gap-2 font-medium">
                {status.kind === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                {status.kind === 'success' ? 'Message sent' : 'Send failed'}
              </p>
              <p className="mt-1 text-xs text-slate-200">{status.message}</p>
            </div>
          ) : null}
        </form>
      </div>

      <AssistantPanel />
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [location.pathname, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || routeIndex === -1) return

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
      lastScrollDirectionRef.current = event.deltaY > 0 ? 1 : -1
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
  }, [canonicalRoute, navigate, prefersReducedMotion, routeIndex])

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
      'I’m Pranav Emmadi, a robotics builder near San Jose. I like building things that work outside perfect demos.',
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
        message:
          'Contact form key is missing. Click codex in the footer and set your Web3Forms key.',
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

  return (
    <div className="relative min-h-screen text-slate-100">
      <BlueprintBackground />

      <main className="app-scroll mx-auto w-full max-w-[92rem] px-3 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-10 xl:px-12">
        <Navbar
          items={navItems}
          currentPath={location.pathname}
          onNavigate={(path) => navigate(path)}
        />

        <AnimatePresence mode="wait">
          <motion.div
            className="route-page"
            key={location.pathname}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -12 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: 'easeOut' }}
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
              <Route path="/bored" element={<BoredPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
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

        <footer className="mt-8 border-t border-sky-200/20 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
            <p>© {new Date().getFullYear()} {renderProfile.name}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-1 font-mono text-sky-100/85 transition hover:text-sky-50"
              >
                <BookOpenText size={14} /> Blog
              </button>
              <p className="font-mono text-sky-100/80">Build / Iterate / Test</p>
            </div>
          </div>
          <p className="mt-2 text-right text-[11px] lowercase tracking-[0.08em] text-slate-500">
            vibe coded by{' '}
            <button
              type="button"
              onClick={() => navigate('/dev')}
              className="font-mono text-slate-400 transition hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
              aria-label="Open hidden dev settings"
            >
              codex
            </button>
          </p>
        </footer>

        {routeIndex >= 0 ? (
          <div className="route-progress-indicator" aria-hidden="true">
            {String(routeIndex + 1).padStart(2, '0')} / {String(scrollRouteOrder.length).padStart(2, '0')}
          </div>
        ) : null}
      </main>

    </div>
  )
}

export default App

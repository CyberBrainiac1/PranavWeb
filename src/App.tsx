import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { BlueprintBackground } from './components/BlueprintBackground'
import { Hero } from './components/Hero'
import { LabelTag } from './components/LabelTag'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDetailsDialog } from './components/ProjectDetailsDialog'
import { ProjectRail } from './components/ProjectRail'
import { Section } from './components/Section'
import { profileInfo } from './data/profile'
import { projects, type Project } from './data/projects'
import { skillModules } from './data/skills'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
]

const STORAGE_KEYS = {
  contactKey: 'pranav_contact_form_key',
}

const CONTACT_SERVICE_KEY_DEFAULT =
  profileInfo.contactServiceKey.trim() ||
  (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim()

type ContactStatus = {
  kind: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

type ContactPageProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  status: ContactStatus
  sending: boolean
  contactKeyOverride: string
  onContactKeyOverrideChange: (value: string) => void
  hasBuiltInContactKey: boolean
}

const readStorage = (key: string) => {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(key) ?? ''
}

const writeStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  if (value.trim()) {
    window.localStorage.setItem(key, value)
    return
  }
  window.localStorage.removeItem(key)
}

function HomePage({
  onViewProjects,
  onViewSkills,
  onContact,
  onSeeBuild,
  onOpenProject,
}: {
  onViewProjects: () => void
  onViewSkills: () => void
  onContact: () => void
  onSeeBuild: () => void
  onOpenProject: (project: Project) => void
}) {
  const quickProjects = projects.slice(0, 3)

  return (
    <>
      <Hero onViewProjects={onViewProjects} onContact={onContact} onSeeBuild={onSeeBuild} />

      <Section
        id="home-overview"
        label="FIG.02 / QUICK ROUTES"
        title="Simple Navigation"
        subtitle="Four pages only: Home, Projects, Skills, and Contact."
      >
        <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
          <article className="blueprint-panel space-y-3">
            <LabelTag text="FEATURED" />
            <h3 className="text-xl font-semibold text-white">Sim Wheel Build</h3>
            <p className="text-sm text-slate-300">
              Open the featured Sim Racing Wheel + Force Feedback project details directly.
            </p>
            <button
              type="button"
              onClick={onSeeBuild}
              className="btn-outline-mag mt-1 w-full justify-center sm:w-auto"
            >
              Open Featured <ArrowRight size={14} />
            </button>
          </article>

          <article className="blueprint-panel space-y-3">
            <LabelTag text="PROJECTS" />
            <h3 className="text-xl font-semibold text-white">Browse Projects</h3>
            <p className="text-sm text-slate-300">
              View all projects with side-scroll cards and detailed spec dialogs.
            </p>
            <button
              type="button"
              onClick={onViewProjects}
              className="btn-outline-mag mt-1 w-full justify-center sm:w-auto"
            >
              Open Projects <ArrowRight size={14} />
            </button>
          </article>

          <article className="blueprint-panel space-y-3">
            <LabelTag text="SKILLS" />
            <h3 className="text-xl font-semibold text-white">Core Skills</h3>
            <p className="text-sm text-slate-300">
              See the practical skills stack across design, fabrication, and electronics.
            </p>
            <button
              type="button"
              onClick={onViewSkills}
              className="btn-outline-mag mt-1 w-full justify-center sm:w-auto"
            >
              Open Skills <ArrowRight size={14} />
            </button>
          </article>

          <article className="blueprint-panel space-y-3">
            <LabelTag text="CONTACT" />
            <h3 className="text-xl font-semibold text-white">Send A Message</h3>
            <p className="text-sm text-slate-300">
              Use the contact page to send messages directly to inbox.
            </p>
            <button
              type="button"
              onClick={onContact}
              className="btn-outline-mag mt-1 w-full justify-center sm:w-auto"
            >
              Contact <ArrowRight size={14} />
            </button>
          </article>
        </div>
      </Section>

      <Section
        id="home-featured"
        label="FIG.03 / PREVIEW"
        title="Project Preview"
        subtitle="Top builds shown here. Open Projects for full view."
      >
        <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr))]">
          {quickProjects.map((project) => (
            <motion.div key={project.id} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <ProjectCard project={project} onOpen={onOpenProject} />
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  )
}

function ProjectsPage({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]
  const railProjects = projects.filter((project) => project.id !== featuredProject.id)

  return (
    <Section
      id="projects"
      label="FIG.04 / PROJECT INDEX"
      title="Projects"
      subtitle="Featured build first, then side-scroll through the rest."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ProjectCard project={featuredProject} onOpen={onOpenProject} />

        <article className="blueprint-panel space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <LabelTag text="FEATURED" />
            <LabelTag text="REV 2" />
          </div>
          <h3 className="text-2xl font-semibold text-white">Sim Racing Wheel + Force Feedback</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            This is the top-priority build and has the most complete detail modal.
          </p>
          <button
            type="button"
            onClick={() => onOpenProject(featuredProject)}
            className="btn-primary-mag w-full justify-center sm:w-auto"
          >
            Open Featured Build
          </button>
        </article>
      </div>

      <div className="mt-5">
        <ProjectRail projects={railProjects} onOpen={onOpenProject} />
      </div>
    </Section>
  )
}

function SkillsPage() {
  return (
    <Section
      id="skills"
      label="FIG.05 / SKILLS"
      title="Skills"
      subtitle="Core skills grouped into practical build modules."
    >
      <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
        {skillModules.map((module) => (
          <article key={module.id} className="blueprint-panel">
            <LabelTag text={module.label} />
            <h3 className="mt-3 text-xl font-semibold text-white">{module.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {module.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
  contactKeyOverride,
  onContactKeyOverrideChange,
  hasBuiltInContactKey,
}: ContactPageProps) {
  const statusTone =
    status.kind === 'success'
      ? 'border-emerald-200/40 bg-emerald-300/10 text-emerald-50'
      : 'border-amber-200/35 bg-amber-300/10 text-amber-50'

  return (
    <Section
      id="contact"
      label="FIG.06 / CONTACT"
      title="Contact"
      subtitle="Send a message directly to inbox through the form service."
    >
      <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
            <a className="contact-button" href="mailto:emmadipranav@gmail.com">
              <Mail size={16} /> Email
            </a>
            <a
              className="contact-button"
              href="https://www.linkedin.com/in/pranav-emmadi-874723399/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              className="contact-button"
              href="https://github.com/CyberBrainiac1"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
          </div>

          <details className="blueprint-panel">
            <summary className="cursor-pointer text-sm font-semibold text-white">
              Owner Setup
            </summary>
            <div className="mt-3 space-y-2">
              <label className="field-group">
                <span>FORM SERVICE KEY (OPTIONAL OVERRIDE)</span>
                <input
                  className="field"
                  type="password"
                  value={contactKeyOverride}
                  onChange={(event) => onContactKeyOverrideChange(event.target.value)}
                  placeholder="Paste key to this browser"
                  autoComplete="off"
                />
              </label>
              <p className="text-xs text-slate-300">
                Built-in key detected: {hasBuiltInContactKey ? 'Yes' : 'No'} (site config or env)
              </p>
            </div>
          </details>
        </div>

        <form onSubmit={onSubmit} className="blueprint-panel min-w-0 space-y-3 sm:space-y-4">
          <label className="field-group">
            <span>NAME / ID</span>
            <input className="field" name="name" required placeholder="Name" />
          </label>
          <label className="field-group">
            <span>EMAIL / ROUTE</span>
            <input className="field" type="email" name="email" required placeholder="Email" />
          </label>
          <label className="field-group">
            <span>MESSAGE / NOTES</span>
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
    </Section>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [contactStatus, setContactStatus] = useState<ContactStatus>({
    kind: 'idle',
    message: '',
  })
  const [contactSending, setContactSending] = useState(false)
  const [contactKeyOverride, setContactKeyOverride] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    [],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    setContactKeyOverride(readStorage(STORAGE_KEYS.contactKey))
  }, [])

  const handleContactKeyOverrideChange = (value: string) => {
    setContactKeyOverride(value)
    writeStorage(STORAGE_KEYS.contactKey, value.trim())
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactSending) return

    const activeContactKey = contactKeyOverride.trim() || CONTACT_SERVICE_KEY_DEFAULT
    if (!activeContactKey) {
      setContactStatus({
        kind: 'error',
        message: 'Add a form service key first in Owner Setup, then submit again.',
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
          access_key: activeContactKey,
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
        message: 'Your message has been delivered.',
      })
    } catch (error) {
      setContactStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to send right now. Please try again in a moment.',
      })
    } finally {
      setContactSending(false)
    }
  }

  const openFeaturedFromHero = () => {
    navigate('/projects')
    setTimeout(() => setSelectedProject(featuredProject), 260)
  }

  return (
    <div className="relative min-h-screen text-slate-100">
      <BlueprintBackground />

      <main className="mx-auto w-full max-w-[92rem] px-3 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-10 xl:px-12">
        <Navbar
          items={navItems}
          currentPath={location.pathname}
          onNavigate={(path) => navigate(path)}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -34 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <HomePage
                    onViewProjects={() => navigate('/projects')}
                    onViewSkills={() => navigate('/skills')}
                    onContact={() => navigate('/contact')}
                    onSeeBuild={openFeaturedFromHero}
                    onOpenProject={setSelectedProject}
                  />
                }
              />
              <Route path="/projects" element={<ProjectsPage onOpenProject={setSelectedProject} />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route
                path="/contact"
                element={
                  <ContactPage
                    onSubmit={handleContactSubmit}
                    status={contactStatus}
                    sending={contactSending}
                    contactKeyOverride={contactKeyOverride}
                    onContactKeyOverrideChange={handleContactKeyOverrideChange}
                    hasBuiltInContactKey={Boolean(CONTACT_SERVICE_KEY_DEFAULT)}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <footer className="mt-8 border-t border-emerald-200/20 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
            <p>© {new Date().getFullYear()} Pranav Emmadi</p>
            <p className="font-mono text-emerald-100/80">Build / Iterate / Test</p>
          </div>
        </footer>
      </main>

      <ProjectDetailsDialog
        project={selectedProject}
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null)
          }
        }}
      />
    </div>
  )
}

export default App

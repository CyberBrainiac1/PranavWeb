import { useEffect, useState, type FormEvent } from 'react'
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
import { Hero } from './components/Hero'
import { LabelTag } from './components/LabelTag'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDetailsDialog } from './components/ProjectDetailsDialog'
import { ProjectRail } from './components/ProjectRail'
import { ProjectStoryScroll } from './components/ProjectStoryScroll'
import { Section } from './components/Section'
import { FEATURED_BLOG_SLUG } from './data/blog'
import { boredIdeas } from './data/bored'
import { profileInfo } from './data/profile'
import { projects, type Project } from './data/projects'
import { skillModules } from './data/skills'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/bored', label: 'Bored' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
]

const CONTACT_SERVICE_KEY =
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
}

function HomePage({
  onOpenProject,
  onOpenProjectsPage,
  onOpenFeaturedStory,
  onOpenContactPage,
}: {
  onOpenProject: (project: Project) => void
  onOpenProjectsPage: () => void
  onOpenFeaturedStory: () => void
  onOpenContactPage: () => void
}) {
  const scrollToStory = () => {
    document.getElementById('build-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToContact = () => {
    document.getElementById('home-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Hero
        onStartStory={scrollToStory}
        onOpenFeaturedStory={onOpenFeaturedStory}
        onContact={scrollToContact}
      />

      <Section
        id="build-story"
        label="FIG.02 / ABOUT"
        title="My Build Story"
        subtitle="This is the flow I follow every time I make something new."
      >
        <div className="story-flow-grid">
          <article className="blueprint-panel about-copy story-main-copy">
            {profileInfo.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>

          {profileInfo.storyBeats.map((beat, index) => (
            <motion.article
              key={beat.title}
              className="story-flow-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
            >
              <span className="story-flow-rotate" aria-hidden="true">
                {beat.label}
              </span>
              <p className="story-flow-index">0{index + 1}</p>
              <h3>{beat.title}</h3>
              <p>{beat.text}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <ProjectStoryScroll
        projects={projects}
        onOpenProject={onOpenProject}
        onOpenProjectsPage={onOpenProjectsPage}
      />

      <Section
        id="home-contact"
        label="FIG.04 / CONTACT"
        title="Let’s Connect"
        subtitle="If you want to collaborate, ask questions, or just say hi, reach out."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a className="contact-button" href="mailto:emmadipranav@gmail.com">
            <Mail size={16} /> Email
          </a>
          <a
            className="contact-button"
            href={profileInfo.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            className="contact-button"
            href={profileInfo.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> GitHub
          </a>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={onOpenContactPage}
            className="btn-outline-mag w-full justify-center sm:w-auto"
          >
            Open Full Contact Form
          </button>
        </div>
      </Section>
    </>
  )
}

function BlogPostRoute({ onBackToBlog }: { onBackToBlog: () => void }) {
  const { slug = '' } = useParams()
  return <BlogPostPage slug={slug} onBackToBlog={onBackToBlog} />
}

function ProjectsPage({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const navigate = useNavigate()
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]
  const railProjects = projects.filter((project) => project.id !== featuredProject.id)

  return (
    <Section
      id="projects"
      label="FIG.04 / PROJECT INDEX"
      title="Projects"
      subtitle="Main build first, then scroll through the rest."
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
            This is the build I&apos;m spending the most time on right now.
          </p>
          <button
            type="button"
            onClick={() => onOpenProject(featuredProject)}
            className="btn-primary-mag w-full justify-center sm:w-auto"
          >
            Open Featured Build
          </button>
          <button
            type="button"
            onClick={() => navigate(`/blog/${FEATURED_BLOG_SLUG}`)}
            className="btn-outline-mag w-full justify-center sm:w-auto"
          >
            Read Build Log
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
      subtitle="The main skills I use across my projects."
    >
      <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
        {skillModules.map((module) => (
          <article key={module.id} className="blueprint-panel">
            <LabelTag text={module.label} />
            <h3 className="mt-3 text-xl font-semibold text-white">{module.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {module.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-sky-200" />
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

function BoredPage() {
  return (
    <Section
      id="bored"
      label="FIG.08 / BORED LIST"
      title="Things To Do When Bored"
      subtitle="Quick options when you want something fun, useful, or both."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {boredIdeas.map((idea) => (
          <article key={idea.id} className="blueprint-panel space-y-2.5">
            <h3 className="text-lg font-semibold text-white">{idea.title}</h3>
            <p className="text-sm text-slate-300">{idea.description}</p>
            {idea.link ? (
              <a
                href={idea.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-100 transition hover:text-white"
              >
                Open <ExternalLink size={14} />
              </a>
            ) : (
              <p className="text-xs text-slate-400">No link needed. Just start.</p>
            )}
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
}: ContactPageProps) {
  const statusTone =
    status.kind === 'success'
      ? 'border-sky-200/40 bg-sky-300/10 text-sky-50'
      : 'border-amber-200/35 bg-amber-300/10 text-amber-50'

  return (
    <Section
      id="contact"
      label="FIG.06 / CONTACT"
      title="Contact"
      subtitle="Send a message and I&apos;ll get it by email."
    >
      <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.1fr)]">
        <div className="blueprint-panel space-y-3 sm:space-y-4">
          <p className="text-sm text-slate-300">
            Best way to reach me is this form. You can also use the direct links below.
          </p>
          <div className="grid gap-3">
            <a className="contact-button" href="mailto:emmadipranav@gmail.com">
              <Mail size={16} /> Email
            </a>
            <a
              className="contact-button"
              href={profileInfo.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              className="contact-button"
              href={profileInfo.links.github}
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

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactSending) return

    if (!CONTACT_SERVICE_KEY) {
      setContactStatus({
        kind: 'error',
        message: 'Contact form key is not set yet. Add it in site config and try again.',
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
          access_key: CONTACT_SERVICE_KEY,
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
                    onOpenProject={setSelectedProject}
                    onOpenProjectsPage={() => navigate('/projects')}
                    onOpenFeaturedStory={() => navigate(`/blog/${FEATURED_BLOG_SLUG}`)}
                    onOpenContactPage={() => navigate('/contact')}
                  />
                }
              />
              <Route path="/projects" element={<ProjectsPage onOpenProject={setSelectedProject} />} />
              <Route
                path="/blog"
                element={<BlogIndexPage onOpenPost={(slug) => navigate(`/blog/${slug}`)} />}
              />
              <Route
                path="/blog/:slug"
                element={<BlogPostRoute onBackToBlog={() => navigate('/blog')} />}
              />
              <Route path="/bored" element={<BoredPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route
                path="/contact"
                element={
                  <ContactPage
                    onSubmit={handleContactSubmit}
                    status={contactStatus}
                    sending={contactSending}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <footer className="mt-8 border-t border-sky-200/20 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
            <p>© {new Date().getFullYear()} Pranav Emmadi</p>
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

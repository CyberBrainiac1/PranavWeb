import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { BlueprintBackground } from './components/BlueprintBackground'
import { Hero } from './components/Hero'
import { LabelTag } from './components/LabelTag'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDetailsDialog } from './components/ProjectDetailsDialog'
import { ProjectRail } from './components/ProjectRail'
import { Section } from './components/Section'
import { experiments } from './data/experiments'
import { projects, type Project } from './data/projects'
import { skillModules } from './data/skills'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/teams', label: 'Teams' },
  { path: '/skills', label: 'Skills' },
  { path: '/experiments', label: 'Experiments' },
  { path: '/contact', label: 'Contact' },
]

const teams = [
  {
    label: 'SECTION A',
    name: 'FTC: Evergreen Dragons',
    bullets: [
      'Founder + active builder with mechanism-first workflows.',
      'Rapid CAD-to-hardware iteration for competition-ready systems.',
      'Focus on builds that perform outside ideal demo conditions.',
    ],
  },
  {
    label: 'SECTION B',
    name: 'FRC: 2854 Prototypes',
    bullets: [
      'Prototype contribution across mechanism concepts and integration tasks.',
      'Build-for-reliability mindset during concept validation.',
      'Practical iteration loops before committing final architecture.',
    ],
  },
]

type ContactDraft = {
  subject: string
  body: string
}

type ContactPageProps = {
  contactDraft: ContactDraft | null
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCopyDraft: () => void
}

function HomePage({
  onViewProjects,
  onContact,
  onSeeBuild,
  onOpenProject,
}: {
  onViewProjects: () => void
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
        title="Explore By Page"
        subtitle="Each tab is now a dedicated page with focused content."
      >
        <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
          <article className="blueprint-panel space-y-3">
            <LabelTag text="PROJECTS / RAIL" />
            <h3 className="text-xl font-semibold text-white">Side-Scroll Builds</h3>
            <p className="text-sm text-slate-300">
              Open projects to use the interactive left/right project rail with drag + arrow
              controls.
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
            <LabelTag text="TEAMS / CAD" />
            <h3 className="text-xl font-semibold text-white">Team Workflows</h3>
            <p className="text-sm text-slate-300">
              FTC and FRC context is separated into its own page for cleaner browsing.
            </p>
          </article>

          <article className="blueprint-panel space-y-3">
            <LabelTag text="CONTACT / READY" />
            <h3 className="text-xl font-semibold text-white">Reach Out Fast</h3>
            <p className="text-sm text-slate-300">
              Open the contact page for direct links and an email-ready draft form.
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
        label="FIG.03 / FEATURE PREVIEW"
        title="Top Projects Preview"
        subtitle="Featured sim wheel first, followed by the next priority builds."
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
      label="FIG.02 / PROJECT INDEX"
      title="Projects"
      subtitle="Dedicated projects page with a featured card and horizontal side-scroll rail."
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
            This is the top-priority build and has the most complete detail modal. Use the button
            below to jump directly into the full spec sheet and narrative tabs.
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

function TeamsPage() {
  return (
    <Section
      id="teams"
      label="FIG.03 / TEAM PANELS"
      title="Teams"
      subtitle="Current team contexts and contribution scope."
    >
      <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,20rem),1fr))]">
        {teams.map((team) => (
          <article key={team.name} className="blueprint-panel">
            <LabelTag text={team.label} />
            <h3 className="mt-3 text-2xl font-semibold text-white">{team.name}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {team.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

function SkillsPage() {
  return (
    <Section
      id="skills"
      label="FIG.04 / MODULE GRID"
      title="Skills"
      subtitle="Deduped into module cards for CAD, fabrication, electronics, embedded work, and iteration."
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

function ExperimentsPage() {
  return (
    <Section
      id="experiments"
      label="FIG.05 / LAB LOGS"
      title="Experiments"
      subtitle="Test logs and active investigation tracks."
    >
      <div className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))]">
        {experiments.map((experiment) => (
          <article key={experiment.id} className="blueprint-panel">
            <div className="flex items-center justify-between gap-2">
              <LabelTag text={experiment.label} />
              <LabelTag text={experiment.status} />
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{experiment.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {experiment.notes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

function ContactPage({ contactDraft, onSubmit, onCopyDraft }: ContactPageProps) {
  return (
    <Section
      id="contact"
      label="FIG.06 / CONTACT"
      title="Contact"
      subtitle="Direct links + a client-only draft form for email handoff."
    >
      <div className="grid gap-4 lg:gap-5 xl:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.1fr)]">
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
          <button type="submit" className="btn-primary-mag w-full justify-center sm:w-auto">
            Draft Message
          </button>

          {contactDraft ? (
            <div className="rounded-xl border border-emerald-200/30 bg-emerald-300/10 p-3 text-sm text-slate-200">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-100">
                Ready to send
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Subject: <span className="text-emerald-100">{contactDraft.subject}</span>
              </p>
              <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap">
                <button
                  type="button"
                  className="btn-outline-mag w-full justify-center sm:w-auto"
                  onClick={onCopyDraft}
                >
                  <Copy size={14} /> Copy message to email
                </button>
                <a
                  className="btn-outline-mag w-full justify-center sm:w-auto"
                  href={`mailto:emmadipranav@gmail.com?subject=${encodeURIComponent(contactDraft.subject)}&body=${encodeURIComponent(contactDraft.body)}`}
                >
                  Open Email
                </a>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </Section>
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [contactDraft, setContactDraft] = useState<ContactDraft | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    [],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = `Portfolio message from ${name || '[ADD NAME]'}`
    const body = `${message}\n\nName: ${name}\nEmail: ${email}`

    setContactDraft({ subject, body })
  }

  const copyDraft = async () => {
    if (!contactDraft) return
    try {
      await navigator.clipboard.writeText(
        `Subject: ${contactDraft.subject}\n\n${contactDraft.body}`,
      )
    } catch {
      // Keep UI functional if clipboard permissions are blocked.
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
                    onContact={() => navigate('/contact')}
                    onSeeBuild={openFeaturedFromHero}
                    onOpenProject={setSelectedProject}
                  />
                }
              />
              <Route path="/projects" element={<ProjectsPage onOpenProject={setSelectedProject} />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/experiments" element={<ExperimentsPage />} />
              <Route
                path="/contact"
                element={
                  <ContactPage
                    contactDraft={contactDraft}
                    onSubmit={handleContactSubmit}
                    onCopyDraft={copyDraft}
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



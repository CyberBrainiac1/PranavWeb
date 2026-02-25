import { useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Copy, Github, Linkedin, Mail } from 'lucide-react'
import { BlueprintBackground } from './components/BlueprintBackground'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDetailsDialog } from './components/ProjectDetailsDialog'
import { Section } from './components/Section'
import { LabelTag } from './components/LabelTag'
import { projects, type Project } from './data/projects'
import { skillModules } from './data/skills'
import { experiments } from './data/experiments'
import { useActiveSection } from './hooks/useActiveSection'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'teams', label: 'Teams' },
  { id: 'skills', label: 'Skills' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'contact', label: 'Contact' },
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

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [contactDraft, setContactDraft] = useState<ContactDraft | null>(null)
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSeeBuild = () => {
    scrollToSection('projects')
    setTimeout(() => {
      setSelectedProject(featuredProject)
    }, 260)
  }

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

  return (
    <div className="relative min-h-screen text-slate-100">
      <BlueprintBackground />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-7 lg:px-12">
        <Navbar items={navItems} activeSection={activeSection} onNavigate={scrollToSection} />

        <Hero
          onViewProjects={() => scrollToSection('projects')}
          onContact={() => scrollToSection('contact')}
          onSeeBuild={handleSeeBuild}
        />

        <Section
          id="projects"
          label="FIG.02 / PROJECT INDEX"
          title="Projects"
          subtitle="Featured work first, deduped from legacy pages and organized into a single source of truth."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          id="teams"
          label="FIG.03 / TEAM PANELS"
          title="Teams"
          subtitle="Current team contexts and contribution scope."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {teams.map((team) => (
              <article key={team.name} className="blueprint-panel">
                <LabelTag text={team.label} />
                <h3 className="mt-3 text-2xl font-semibold text-white">{team.name}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {team.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="skills"
          label="FIG.04 / MODULE GRID"
          title="Skills"
          subtitle="Deduped into module cards for CAD, fabrication, electronics, embedded work, and iteration."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillModules.map((module) => (
              <article key={module.id} className="blueprint-panel">
                <LabelTag text={module.label} />
                <h3 className="mt-3 text-xl font-semibold text-white">{module.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {module.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="experiments"
          label="FIG.05 / LAB LOGS"
          title="Experiments"
          subtitle="Test logs and active investigation tracks."
        >
          <div className="grid gap-4 md:grid-cols-3">
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
                      <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          label="FIG.06 / CONTACT"
          title="Contact"
          subtitle="Direct links + a client-only draft form for email handoff."
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
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

            <form onSubmit={handleContactSubmit} className="blueprint-panel space-y-3">
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
                  className="field min-h-28 resize-y"
                  name="message"
                  required
                  placeholder="Message"
                />
              </label>
              <button type="submit" className="btn-primary-mag">
                Draft Message
              </button>

              {contactDraft ? (
                <div className="rounded-xl border border-cyan-200/30 bg-cyan-300/10 p-3 text-sm text-slate-200">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-100">
                    Ready to send
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Subject: <span className="text-cyan-100">{contactDraft.subject}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className="btn-outline-mag" onClick={copyDraft}>
                      <Copy size={14} /> Copy message to email
                    </button>
                    <a
                      className="btn-outline-mag"
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

        <footer className="mt-8 border-t border-cyan-200/20 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
            <p>© {new Date().getFullYear()} Pranav Emmadi</p>
            <p className="font-mono text-cyan-100/80">Build / Iterate / Test</p>
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

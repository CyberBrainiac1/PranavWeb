import { type FormEvent, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Code2,
  Cpu,
  ChevronRight,
  DraftingCompass,
  ExternalLink,
  Github,
  GraduationCap,
  Hammer,
  Mail,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { projects, type Project } from './data/projects'
import { skills } from './data/skills'
import { timeline } from './data/timeline'

const blogPosts = [
  {
    title: 'Making a DIY Racing Rig (Simple)',
    date: '2026-03-02',
    excerpt:
      'A simple racing wheel and pedal build focused on low-cost parts, clean wiring, and quick iteration.',
  },
  {
    title: 'Budget DIY Sim Racing Rig: Steering Wheel + Pedals with XIAO RP2040',
    date: '2026-01-16',
    excerpt:
      'Full build notes on steering encoder mapping, pedal tuning, USB HID output, and reliability upgrades.',
  },
]

const bucketList = [
  'Program a humanoid',
  'Use RL to train a robot',
  'Go to BWSI',
  'Design my very own robot arm',
  'Design my very own robot hand',
]

const teams = [
  {
    name: 'FTC Evergreen Dragons',
    subtitle: 'Founder + builder',
    bullets: [
      'Lead mechanism-heavy builds for competitive robotics.',
      'Drive integration across CAD, fabrication, and subsystem testing.',
      'Focus on designs that survive real match conditions.',
    ],
  },
  {
    name: 'FRC 2854 Prototypes',
    subtitle: 'Prototype support',
    bullets: [
      'Contribute to mechanism prototype experiments.',
      'Validate manufacturability and reliability through fast test loops.',
      'Capture lessons that translate into stronger next revisions.',
    ],
  },
]

const research = {
  title: '[VERIFY] Working Paper: Real-Time Embedded Vision for Low-Cost Robotics',
  bullets: [
    'Primary direction: image classification that can run on constrained hardware.',
    'Current status: test framework and measurement notes in progress.',
    'Planned extension: Isaac Sim-backed synthetic evaluation workflows.',
  ],
}

const statusStyles: Record<Project['status'], string> = {
  active: 'bg-emerald-300/15 text-emerald-200 border-emerald-300/25',
  team: 'bg-sky-300/15 text-sky-200 border-sky-300/25',
  'in-progress': 'bg-amber-300/15 text-amber-200 border-amber-300/25',
}

const statusLabel: Record<Project['status'], string> = {
  active: 'Active',
  team: 'Team',
  'in-progress': 'In Progress',
}

const skillIconByKey = {
  cad: DraftingCompass,
  fabrication: Hammer,
  embedded: Cpu,
  software: Code2,
  systems: Boxes,
}

const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]
  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, typeof skills>>((acc, skill) => {
      if (!acc[skill.group]) {
        acc[skill.group] = []
      }
      acc[skill.group].push(skill)
      return acc
    }, {})
  }, [])

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Website visitor'}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.location.href = `mailto:emmadipranav@gmail.com?subject=${subject}&body=${body}`
    form.reset()
  }

  return (
    <div className="app-shell text-slate-100">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-7 sm:px-8 lg:px-12">
        <header className="sticky top-4 z-30 mb-8 rounded-full border border-cyan-200/20 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-xl tracking-wide text-cyan-100">Pranav Emmadi</p>
            <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-300">
              <button type="button" className="nav-chip" onClick={() => scrollToSection('projects')}>
                Projects
              </button>
              <button type="button" className="nav-chip" onClick={() => scrollToSection('teams')}>
                Teams
              </button>
              <button type="button" className="nav-chip" onClick={() => scrollToSection('research')}>
                Research
              </button>
              <button type="button" className="nav-chip" onClick={() => scrollToSection('skills')}>
                Skills
              </button>
              <button type="button" className="nav-chip" onClick={() => scrollToSection('timeline')}>
                Timeline
              </button>
              <button type="button" className="nav-chip" onClick={() => scrollToSection('contact')}>
                Contact
              </button>
            </nav>
          </div>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative mb-10 grid gap-8 rounded-3xl border border-cyan-200/20 bg-slate-950/55 p-6 shadow-2xl shadow-black/40 lg:grid-cols-[1.1fr_0.9fr] lg:p-10"
        >
          <span className="hero-rail">FTC / FRC / MAKER</span>
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles size={14} />
              Robotics + Hardware
            </p>
            <h1 className="font-display text-[clamp(3rem,12vw,7.5rem)] leading-[0.86] text-white">
              <span className="block">ROBOTICS</span>
              <span className="block text-cyan-200">BUILDER</span>
              <span className="block text-slate-200">MECH + CODE</span>
            </h1>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={() => scrollToSection('projects')}>
                View Projects
              </button>
              <button type="button" className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Contact
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="max-w-xs overflow-hidden rounded-2xl border border-cyan-200/25 bg-slate-900/65">
              <img src="/PFP.jpg" alt="Pranav Emmadi portrait" className="h-36 w-full object-cover" />
            </div>
            <p className="text-lg leading-relaxed text-slate-100">
              I&apos;m Pranav Emmadi. I build robots and hardware projects and I like making things
              that work outside perfect demos. I&apos;m based near San Jose.
            </p>
            <div className="rounded-2xl border border-cyan-200/20 bg-slate-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">Featured</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Featured: Sim Racing Wheel + Force Feedback
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-cyan-200 transition hover:text-cyan-100"
                onClick={() => setActiveProject(featuredProject)}
              >
                See the Build <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="stat-chip">Sim Wheel: Force Feedback</div>
              <div className="stat-chip">CAD: SolidWorks + Onshape</div>
              <div className="stat-chip">Embedded: ESP32 + Python</div>
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" {...fadeInUp} className="section-card">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Projects</p>
              <h2 className="section-title">Builds That Ship</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">
              Single source of truth from <code>src/data/projects.ts</code>, with duplicate entries
              merged and sim wheel prioritized.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.slug}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`rounded-2xl border p-4 ${
                  project.featured
                    ? 'border-cyan-200/35 bg-cyan-200/10'
                    : 'border-cyan-200/15 bg-slate-900/55'
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <span className={`status-pill ${statusStyles[project.status]}`}>
                    {statusLabel[project.status]}
                  </span>
                </div>
                <p className="mb-4 text-sm text-slate-300">{project.summary}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
                >
                  Open details <ExternalLink size={14} />
                </button>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="teams" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Teams</p>
          <h2 className="section-title">FTC + FRC</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {teams.map((team) => (
              <article key={team.name} className="rounded-2xl border border-cyan-200/15 bg-slate-900/55 p-5">
                <h3 className="text-lg font-semibold text-white">{team.name}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.15em] text-cyan-200">{team.subtitle}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {team.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="research" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Research</p>
          <h2 className="section-title">{research.title}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {research.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <BrainCircuit className="mt-0.5 shrink-0 text-cyan-200" size={16} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section id="skills" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Skills</p>
          <h2 className="section-title">Build Stack</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(groupedSkills).map(([group, items]) => (
              <article key={group} className="rounded-2xl border border-cyan-200/15 bg-slate-900/55 p-4">
                <h3 className="mb-3 text-base font-semibold text-white">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => {
                    const Icon = skillIconByKey[skill.icon]
                    return (
                      <span key={skill.name} className="skill-pill">
                        <Icon size={14} />
                        {skill.name}
                      </span>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="timeline" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Timeline</p>
          <h2 className="section-title">LinkedIn Import</h2>
          <p className="mt-2 text-sm text-slate-300">
            Data comes from <code>src/data/timeline.ts</code>, generated by{' '}
            <code>npm run timeline:generate</code>.
          </p>
          <div className="mt-5 space-y-3">
            {timeline.map((entry) => (
              <article key={`${entry.date}-${entry.title}`} className="rounded-2xl border border-cyan-200/15 bg-slate-900/55 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{entry.date}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{entry.title}</h3>
                <p className="text-sm text-slate-300">{entry.organization}</p>
                <p className="mt-2 text-sm text-slate-400">{entry.notes}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="blog" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Blog</p>
          <h2 className="section-title">Build Logs</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article key={post.title} className="rounded-2xl border border-cyan-200/15 bg-slate-900/55 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{post.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section id="bucket" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Bucket List</p>
          <h2 className="section-title">Robotics Goals</h2>
          <div className="mt-5 grid gap-2">
            {bucketList.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-cyan-200/15 bg-slate-900/55 px-4 py-3 text-sm text-slate-300">
                <span className="inline-block h-3 w-3 rounded-sm border border-cyan-200/40 bg-slate-950" />
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" {...fadeInUp} className="section-card mt-6">
          <p className="kicker">Contact</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Client-side form opens your email app. You can also contact me directly on LinkedIn or GitHub.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              <a className="contact-link" href="mailto:emmadipranav@gmail.com">
                <Mail size={16} /> emmadipranav@gmail.com
              </a>
              <a className="contact-link" href="https://github.com/CyberBrainiac1" target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub
              </a>
              <a className="contact-link" href="https://linkedin.com" target="_blank" rel="noreferrer">
                <GraduationCap size={16} /> LinkedIn
              </a>
            </div>
            <form onSubmit={handleContact} className="grid gap-3 rounded-2xl border border-cyan-200/15 bg-slate-900/55 p-4">
              <input className="field" name="name" placeholder="Name" required />
              <input className="field" name="email" type="email" placeholder="Email" required />
              <textarea className="field min-h-28 resize-y" name="message" placeholder="Message" required />
              <button type="submit" className="btn-primary mt-1 justify-center">
                Send
              </button>
            </form>
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <motion.dialog
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              open
              className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-cyan-200/25 bg-slate-900/95 p-6 shadow-2xl shadow-black/50"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="kicker">Project Detail</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{activeProject.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{activeProject.summary}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  className="rounded-full border border-cyan-200/25 p-2 text-slate-200 transition hover:bg-cyan-200/10"
                  onClick={() => setActiveProject(null)}
                >
                  <X size={16} />
                </button>
              </div>

              {activeProject.details.map((section) => (
                <section key={section.heading} className="mb-5 rounded-2xl border border-cyan-200/15 bg-slate-950/55 p-4">
                  <h4 className="text-lg font-medium text-cyan-100">{section.heading}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ChevronRight size={16} className="mt-0.5 shrink-0 text-cyan-200" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  {section.placeholders?.length ? (
                    <div className="mt-4 grid gap-2">
                      {section.placeholders.map((placeholder) => (
                        <div key={placeholder} className="rounded-xl border border-dashed border-cyan-200/30 bg-cyan-200/5 px-3 py-2 text-xs text-cyan-100/90">
                          {placeholder}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}

              {activeProject.codeUpdate?.length ? (
                <aside className="mb-4 rounded-2xl border border-cyan-200/30 bg-cyan-200/10 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-100">
                    V2 Code Update
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-200">
                    {activeProject.codeUpdate.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Wrench size={14} className="mt-1 shrink-0 text-cyan-100" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}

              {activeProject.links?.length ? (
                <div className="flex flex-wrap gap-3">
                  {activeProject.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="btn-secondary"
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </motion.dialog>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default App

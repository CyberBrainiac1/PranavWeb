import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Bot,
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
import { experiments } from './data/experiments'
import { profileInfo } from './data/profile'
import { projects, type Project } from './data/projects'
import { skillModules } from './data/skills'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/teams', label: 'Teams' },
  { path: '/skills', label: 'Skills' },
  { path: '/experiments', label: 'Experiments' },
  { path: '/assistant', label: 'Assistant' },
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

const STORAGE_KEYS = {
  contactKey: 'pranav_contact_form_key',
  chatApiKey: 'pranav_chat_api_key',
  chatEndpoint: 'pranav_chat_endpoint',
  chatModel: 'pranav_chat_model',
}

const CONTACT_SERVICE_KEY_DEFAULT = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim()
const CHAT_ENDPOINT_DEFAULT = (
  import.meta.env.VITE_CHAT_ENDPOINT ?? 'https://api.openai.com/v1/chat/completions'
).trim()
const CHAT_MODEL_DEFAULT = (import.meta.env.VITE_CHAT_MODEL ?? 'gpt-4.1-mini').trim()

type ContactStatus = {
  kind: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
}

type ContactPageProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  status: ContactStatus
  sending: boolean
  contactKeyOverride: string
  onContactKeyOverrideChange: (value: string) => void
  hasBuiltInContactKey: boolean
}

type AssistantPageProps = {
  messages: ChatMessage[]
  prompt: string
  onPromptChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  busy: boolean
  apiKey: string
  onApiKeyChange: (value: string) => void
  endpoint: string
  onEndpointChange: (value: string) => void
  model: string
  onModelChange: (value: string) => void
  onReset: () => void
}

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
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

const toAssistantText = (value: unknown): string => {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) {
    return value
      .map((part) => {
        if (typeof part === 'string') return part
        if (
          typeof part === 'object' &&
          part &&
          'text' in part &&
          typeof (part as { text?: unknown }).text === 'string'
        ) {
          return (part as { text: string }).text
        }
        return ''
      })
      .join('\n')
      .trim()
  }
  return ''
}

function HomePage({
  onViewProjects,
  onContact,
  onSeeBuild,
  onOpenProject,
  onOpenAssistant,
}: {
  onViewProjects: () => void
  onContact: () => void
  onSeeBuild: () => void
  onOpenProject: (project: Project) => void
  onOpenAssistant: () => void
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
            <LabelTag text="ASSISTANT / CHAT" />
            <h3 className="text-xl font-semibold text-white">Ask The Site Assistant</h3>
            <p className="text-sm text-slate-300">
              Ask questions about projects, teams, and current experiments from a single panel.
            </p>
            <button
              type="button"
              onClick={onOpenAssistant}
              className="btn-outline-mag mt-1 w-full justify-center sm:w-auto"
            >
              Open Assistant <ArrowRight size={14} />
            </button>
          </article>

          <article className="blueprint-panel space-y-3">
            <LabelTag text="CONTACT / LIVE" />
            <h3 className="text-xl font-semibold text-white">Send Directly</h3>
            <p className="text-sm text-slate-300">
              Contact page sends messages through a form service so inquiries land directly in
              inbox.
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
      label="FIG.07 / CONTACT"
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
                Built-in key detected: {hasBuiltInContactKey ? 'Yes' : 'No'}
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

function AssistantPage({
  messages,
  prompt,
  onPromptChange,
  onSubmit,
  busy,
  apiKey,
  onApiKeyChange,
  endpoint,
  onEndpointChange,
  model,
  onModelChange,
  onReset,
}: AssistantPageProps) {
  const chatScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chatWindow = chatScrollRef.current
    if (!chatWindow) return
    chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  return (
    <Section
      id="assistant"
      label="FIG.06 / ASSISTANT"
      title="Site Assistant"
      subtitle="Ask about projects, teams, build goals, and current experiments."
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)]">
        <article className="blueprint-panel space-y-3">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-emerald-100" />
            <p className="text-sm font-semibold text-white">Assistant Setup</p>
          </div>
          <p className="text-xs text-slate-300">
            Keys are stored on this device only. Add your key once, then chat.
          </p>
          <label className="field-group">
            <span>API KEY</span>
            <input
              className="field"
              type="password"
              value={apiKey}
              onChange={(event) => onApiKeyChange(event.target.value)}
              placeholder="Paste API key"
              autoComplete="off"
            />
          </label>
          <label className="field-group">
            <span>ENDPOINT</span>
            <input
              className="field"
              value={endpoint}
              onChange={(event) => onEndpointChange(event.target.value)}
              placeholder="https://api.openai.com/v1/chat/completions"
            />
          </label>
          <label className="field-group">
            <span>MODEL</span>
            <input
              className="field"
              value={model}
              onChange={(event) => onModelChange(event.target.value)}
              placeholder="gpt-4.1-mini"
            />
          </label>
          <button type="button" onClick={onReset} className="btn-outline-mag w-full justify-center">
            Reset Chat
          </button>
        </article>

        <article className="blueprint-panel flex min-h-[26rem] flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <LabelTag text="PROFILE CHAT" />
            <p className="text-xs text-slate-300">Grounded on site content</p>
          </div>

          <div ref={chatScrollRef} className="chat-window flex-1 space-y-2 overflow-y-auto rounded-xl border border-emerald-200/20 bg-slate-950/40 p-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-xl border px-3 py-2 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'ml-auto border-emerald-200/35 bg-emerald-300/12 text-emerald-50'
                    : 'mr-auto border-emerald-200/20 bg-slate-900/70 text-slate-100'
                }`}
              >
                {message.text}
              </div>
            ))}
            {busy ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-xl border border-emerald-200/20 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              className="field"
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              placeholder="Ask about projects, teams, or current build direction"
            />
            <button type="submit" className="btn-primary-mag w-full justify-center sm:w-auto" disabled={busy}>
              <Send size={15} /> Send
            </button>
          </form>
        </article>
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
  const [chatApiKey, setChatApiKey] = useState('')
  const [chatEndpoint, setChatEndpoint] = useState(CHAT_ENDPOINT_DEFAULT)
  const [chatModel, setChatModel] = useState(CHAT_MODEL_DEFAULT)
  const [chatPrompt, setChatPrompt] = useState('')
  const [chatBusy, setChatBusy] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: 'assistant',
      text: 'Hey, I can answer questions about Pranav, his projects, and what he is building right now.',
    },
  ])

  const location = useLocation()
  const navigate = useNavigate()
  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    [],
  )

  const assistantContext = useMemo(() => {
    const teamLines = teams.map((team) => `- ${team.name}: ${team.bullets.join(' ')}`).join('\n')
    const projectLines = projects
      .map((project) => `- ${project.name}: ${project.summary}`)
      .join('\n')
    const skillLines = skillModules
      .map((module) => `- ${module.title}: ${module.items.join(', ')}`)
      .join('\n')
    const experimentLines = experiments
      .map((experiment) => `- ${experiment.title}: ${experiment.notes.join(' ')}`)
      .join('\n')

    return [
      `Name: ${profileInfo.name}`,
      `Location: ${profileInfo.location}`,
      `Profile: ${profileInfo.summary}`,
      'Teams:',
      teamLines,
      'Projects:',
      projectLines,
      'Skills:',
      skillLines,
      'Experiments:',
      experimentLines,
      `Links: LinkedIn ${profileInfo.links.linkedin}, GitHub ${profileInfo.links.github}`,
    ].join('\n')
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    setContactKeyOverride(readStorage(STORAGE_KEYS.contactKey))
    setChatApiKey(readStorage(STORAGE_KEYS.chatApiKey))
    setChatEndpoint(readStorage(STORAGE_KEYS.chatEndpoint) || CHAT_ENDPOINT_DEFAULT)
    setChatModel(readStorage(STORAGE_KEYS.chatModel) || CHAT_MODEL_DEFAULT)
  }, [])

  const handleContactKeyOverrideChange = (value: string) => {
    setContactKeyOverride(value)
    writeStorage(STORAGE_KEYS.contactKey, value.trim())
  }

  const handleChatApiKeyChange = (value: string) => {
    setChatApiKey(value)
    writeStorage(STORAGE_KEYS.chatApiKey, value.trim())
  }

  const handleChatEndpointChange = (value: string) => {
    setChatEndpoint(value)
    writeStorage(STORAGE_KEYS.chatEndpoint, value.trim())
  }

  const handleChatModelChange = (value: string) => {
    setChatModel(value)
    writeStorage(STORAGE_KEYS.chatModel, value.trim())
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

  const handleAssistantSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (chatBusy) return

    const question = chatPrompt.trim()
    if (!question) return

    const userMessage: ChatMessage = { id: createId(), role: 'user', text: question }
    const nextHistory = [...chatMessages, userMessage]
    setChatMessages(nextHistory)
    setChatPrompt('')

    if (!chatApiKey.trim()) {
      setChatMessages((previous) => [
        ...previous,
        {
          id: createId(),
          role: 'assistant',
          text: 'Add an API key in Assistant Setup first, then ask again.',
        },
      ])
      return
    }

    setChatBusy(true)

    try {
      const recentHistory = nextHistory.slice(-10).map((message) => ({
        role: message.role,
        content: message.text,
      }))

      const response = await fetch(chatEndpoint || CHAT_ENDPOINT_DEFAULT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${chatApiKey.trim()}`,
        },
        body: JSON.stringify({
          model: chatModel || CHAT_MODEL_DEFAULT,
          temperature: 0.35,
          messages: [
            {
              role: 'system',
              content: `You are the site assistant for Pranav Emmadi.
Use only the context below when answering.
Do not invent awards, dates, team results, or technical specs.
If the detail is missing, reply: "I do not have that detail on the site yet."
Keep replies concise and clear.

Context:
${assistantContext}`,
            },
            ...recentHistory,
          ],
        }),
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(
          payload?.error?.message ||
            payload?.message ||
            'The assistant request failed.',
        )
      }

      const assistantText =
        toAssistantText(payload?.choices?.[0]?.message?.content) ||
        toAssistantText(payload?.output_text) ||
        'I do not have that detail on the site yet.'

      setChatMessages((previous) => [
        ...previous,
        { id: createId(), role: 'assistant', text: assistantText },
      ])
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : 'The assistant request could not complete.'
      setChatMessages((previous) => [
        ...previous,
        {
          id: createId(),
          role: 'assistant',
          text: `I could not answer right now. ${fallback}`,
        },
      ])
    } finally {
      setChatBusy(false)
    }
  }

  const resetAssistantChat = () => {
    setChatMessages([
      {
        id: createId(),
        role: 'assistant',
        text: 'Chat reset. Ask anything about Pranav, projects, teams, or current build work.',
      },
    ])
    setChatPrompt('')
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
                    onOpenAssistant={() => navigate('/assistant')}
                  />
                }
              />
              <Route path="/projects" element={<ProjectsPage onOpenProject={setSelectedProject} />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/experiments" element={<ExperimentsPage />} />
              <Route
                path="/assistant"
                element={
                  <AssistantPage
                    messages={chatMessages}
                    prompt={chatPrompt}
                    onPromptChange={setChatPrompt}
                    onSubmit={handleAssistantSubmit}
                    busy={chatBusy}
                    apiKey={chatApiKey}
                    onApiKeyChange={handleChatApiKeyChange}
                    endpoint={chatEndpoint}
                    onEndpointChange={handleChatEndpointChange}
                    model={chatModel}
                    onModelChange={handleChatModelChange}
                    onReset={resetAssistantChat}
                  />
                }
              />
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

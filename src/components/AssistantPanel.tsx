import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Bot, Loader2, Send, Sparkles } from 'lucide-react'
import { designedItems } from '../data/designed'
import { projects } from '../data/projects'
import { skillModules } from '../data/skills'
import { loadRuntimeConfig, RUNTIME_CONFIG_EVENT, type RuntimeConfig } from '../lib/runtimeConfig'

type ChatMessage = {
  role: 'user' | 'assistant'
  text: string
}

type BotSettings = {
  endpoint: string
  model: string
  apiKey: string
  rememberKey: boolean
}

const MESSAGES_STORAGE_KEY = 'pranav_bot_messages_v1'

const starterMessages: ChatMessage[] = [
  {
    role: 'assistant',
    text: 'Hey! I can answer questions about Pranav, his projects, and also general robotics/build questions.',
  },
]

function buildKnowledgeContext(config: RuntimeConfig) {
  const featured = projects.find((project) => project.featured) ?? projects[0]
  const projectSummary = projects
    .map(
      (project) =>
        `- ${project.name}: ${project.summary}\n  Tags: ${project.tags.join(', ')}\n  Details: ${project.details
          .map((section) => `${section.heading}: ${section.bullets.join('; ')}`)
          .join(' | ')}`,
    )
    .join('\n')
  const skillSummary = skillModules
    .map((module) => `- ${module.title}: ${module.items.join(', ')}`)
    .join('\n')
  const designedSummary = designedItems.map((item) => `- ${item.title}: ${item.note}`).join('\n')
  const aboutSummary = config.aboutParagraphs.map((paragraph) => `- ${paragraph}`).join('\n')
  const storySummary = config.storyBeats
    .map((beat) => `- ${beat.label}: ${beat.title} — ${beat.text}`)
    .join('\n')

  return `
Name: ${config.profileName}
Location: ${config.profileLocation}
Bio summary: ${config.profileSummary}

About:
${aboutSummary}

Story beats:
${storySummary}

Important profile rule:
- Do not describe Pranav as a heavy programmer.
- Say he knows the basics and uses a lot of Python.

Featured project:
- ${featured.name}: ${featured.summary}

Projects:
${projectSummary}

Skills:
${skillSummary}

Designed items:
${designedSummary}

Contact:
- Email: ${config.contactEmail}
- LinkedIn: ${config.linkedinUrl}
- GitHub: ${config.githubUrl}

Extra user-provided knowledge:
${config.botKnowledgeText || '[ADD]'}
`.trim()
}

function getLocalAnswer(question: string, config: RuntimeConfig, history: ChatMessage[]) {
  const q = question.toLowerCase().trim()
  const isGeneralQuestion = /\b(what is|explain|compare|difference|how does|how do|why is)\b/.test(q)
  const tokens = q
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2)

  const scoredProjects = projects
    .map((project) => {
      const text = [
        project.name,
        project.summary,
        project.tags.join(' '),
        ...project.details.flatMap((section) => [section.heading, ...section.bullets]),
      ]
        .join(' ')
        .toLowerCase()

      const score = tokens.reduce((total, token) => (text.includes(token) ? total + 1 : total), 0)
      return { project, score }
    })
    .sort((a, b) => b.score - a.score)

  const matchedProjects = scoredProjects.filter((entry) => entry.score > 0).slice(0, 2)
  const recentUserPrompt = [...history]
    .reverse()
    .find((message) => message.role === 'user')
    ?.text.toLowerCase()

  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return `Best way to reach me is ${config.contactEmail}. You can also use LinkedIn (${config.linkedinUrl}) or GitHub (${config.githubUrl}).`
  }

  if (q.includes('ftc') || q.includes('frc') || q.includes('team')) {
    return 'Pranav has worked with FTC Evergreen Dragons and FRC 2854 prototypes, mostly on practical mechanism and build iteration work.'
  }

  if (q.includes('python') || q.includes('coding') || q.includes('programming')) {
    return 'He uses coding as a tool for testing and control work, with a lot of Python and practical embedded integration when needed.'
  }

  if (q.includes('who are you') || q.includes('about you') || q.includes('introduce')) {
    return `${config.profileName} is a robotics builder based in ${config.profileLocation}. ${config.profileSummary}`
  }

  if (q.includes('skill') || q.includes('tools') || q.includes('tech stack')) {
    const topSkills = skillModules
      .slice(0, 3)
      .map((module) => `${module.title}: ${module.items.join(', ')}`)
      .join(' | ')
    return `Core strengths are ${topSkills}.`
  }

  if (isGeneralQuestion && q.includes('pid')) {
    return 'PID control means Proportional, Integral, Derivative control. In robotics it helps drive motors/actuators toward a target smoothly: P reacts to current error, I corrects long-term offset, and D damps oscillation. Practical tuning usually starts with P, then a little D, then I if needed.'
  }

  if (isGeneralQuestion && q.includes('brushed') && q.includes('brushless')) {
    return 'Brushed motors are simpler and cheaper but wear faster due to brushes and usually have lower efficiency. Brushless motors are more efficient, quieter, and longer-lasting, but need an electronic controller. For higher performance and reliability, brushless is usually better; for simple low-cost builds, brushed can still work.'
  }

  if (isGeneralQuestion && (q.includes('control') || q.includes('motor') || q.includes('robotics'))) {
    return 'Good robotics control usually comes from tight sensing, clean mechanical alignment, and iterative tuning. If you want, I can break this down for your exact use case (wheel, arm, hand, or drivetrain).'
  }

  if (matchedProjects.length > 0) {
    const top = matchedProjects[0].project
    const second = matchedProjects[1]?.project
    const topNext = top.details[0]?.bullets?.[0] ?? 'Still iterating and improving each revision.'
    return second
      ? `Closest match is ${top.name}: ${top.summary} Next step: ${topNext} Another related project is ${second.name}.`
      : `Closest match is ${top.name}: ${top.summary} Next step: ${topNext}`
  }

  if (recentUserPrompt && (recentUserPrompt.includes('project') || recentUserPrompt.includes('build'))) {
    const featured = projects.find((project) => project.featured) ?? projects[0]
    return `If you want, I can go deeper on ${featured.name}. Quick summary: ${featured.summary}`
  }

  const quickProjects = projects
    .slice(0, 4)
    .map((project) => project.name)
    .join(', ')
  return `I can answer this better with GPT mode enabled, but I can still help from local data. Try asking about a specific build, skill area, or decision Pranav made. Good starting points: ${quickProjects}.`
}

async function askApiAssistant(
  question: string,
  settings: BotSettings,
  assistantName: string,
  messages: ChatMessage[],
  knowledgeContext: string,
) {
  const payloadMessages = [
    {
      role: 'system',
      content:
        `You are the website assistant for ${assistantName}. ` +
        'Be concise, friendly, and direct. ' +
        'Use the context below as source-of-truth for personal/profile/project details. ' +
        'If the user asks a general question that is not about the profile, answer it normally using general knowledge. ' +
        'If a personal/project detail is missing from context, say you are not sure and suggest checking the relevant project section.\n\n' +
        `Context:\n${knowledgeContext}`,
    },
    ...messages.slice(-6).map((message) => ({
      role: message.role,
      content: message.text,
    })),
    { role: 'user', content: question },
  ]

  const response = await fetch(settings.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      messages: payloadMessages,
      temperature: 0.45,
    }),
  })

  const result = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
    error?: { message?: string }
  }

  const answer = result.choices?.[0]?.message?.content?.trim()
  if (!response.ok || !answer) {
    throw new Error(result.error?.message || 'Bot request failed.')
  }

  return answer
}

export const assistantTestUtils = {
  buildKnowledgeContext,
  getLocalAnswer,
}

export function AssistantPanel() {
  const [runtimeConfig, setRuntimeConfig] = useState(() => loadRuntimeConfig())
  const [settings, setSettings] = useState<BotSettings>(() => {
    const runtime = runtimeConfig
    return {
      endpoint: runtime.botEndpoint,
      model: runtime.botModel,
      apiKey: runtime.botApiKey,
      rememberKey: runtime.botRememberKey,
    }
  })
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages)
  const [prompt, setPrompt] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const knowledgeContext = useMemo(() => buildKnowledgeContext(runtimeConfig), [runtimeConfig])

  useEffect(() => {
    let rawMessages = ''
    try {
      rawMessages = window.localStorage.getItem(MESSAGES_STORAGE_KEY) ?? ''
    } catch {
      rawMessages = ''
    }

    if (rawMessages) {
      try {
        const parsed = JSON.parse(rawMessages) as ChatMessage[]
        if (parsed.length > 0) {
          setMessages(parsed)
        }
      } catch {
        // ignore local parse failures
      }
    }
  }, [])

  useEffect(() => {
    const syncFromRuntime = () => {
      const runtime = loadRuntimeConfig()
      setRuntimeConfig(runtime)
      setSettings({
        endpoint: runtime.botEndpoint,
        model: runtime.botModel,
        apiKey: runtime.botApiKey,
        rememberKey: runtime.botRememberKey,
      })
    }

    window.addEventListener(RUNTIME_CONFIG_EVENT, syncFromRuntime)
    return () => {
      window.removeEventListener(RUNTIME_CONFIG_EVENT, syncFromRuntime)
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages.slice(-16)))
    } catch {
      // ignore storage write failures
    }
  }, [messages])

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return

    const question = prompt.trim()
    if (!question) return

    const userMessage: ChatMessage = { role: 'user', text: question }
    setMessages((current) => [...current, userMessage])
    setPrompt('')
    setSending(true)
    setError('')

    try {
      const answer = settings.apiKey.trim()
        ? await askApiAssistant(
            question,
            settings,
            runtimeConfig.profileName || 'Pranav Emmadi',
            [...messages, userMessage],
            knowledgeContext,
          )
        : getLocalAnswer(question, runtimeConfig, messages)

      setMessages((current) => [...current, { role: 'assistant', text: answer }])
    } catch (apiError) {
      const fallbackAnswer = getLocalAnswer(question, runtimeConfig, messages)
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: fallbackAnswer },
      ])
      setError(apiError instanceof Error ? apiError.message : 'Bot request failed.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="blueprint-panel mt-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-sky-200" />
          <h3 className="text-lg font-semibold text-white">Ask Pranav Bot</h3>
        </div>
        <p className="inline-flex items-center gap-1 rounded-full border border-sky-200/35 px-2.5 py-1 text-xs text-sky-100/90">
          <Sparkles size={13} /> Assistant
        </p>
      </div>

      <p className="text-sm text-slate-300">
        Ask about projects, skills, teams, or contact info.
      </p>

      <div className="max-h-72 space-y-2 overflow-y-auto rounded-lg border border-sky-200/20 bg-slate-950/45 p-3">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'assistant'
                ? 'rounded-lg border border-sky-200/20 bg-slate-900/75 p-2.5 text-sm text-slate-100'
                : 'ml-auto max-w-[92%] rounded-lg border border-sky-300/35 bg-sky-500/18 p-2.5 text-sm text-sky-50'
            }
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex flex-col gap-2 sm:flex-row">
        <input
          className="field"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Ask about projects, skills, teams, or contact..."
        />
        <button
          type="submit"
          className="btn-primary-mag w-full justify-center sm:w-auto"
          disabled={sending}
        >
          {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          {sending ? 'Thinking...' : 'Send'}
        </button>
      </form>

      {error ? (
        <p className="text-xs text-amber-200">
          I answered from local facts.
        </p>
      ) : null}
    </div>
  )
}

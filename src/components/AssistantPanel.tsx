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
    text: 'Hey, I am the site bot. Ask me about projects, skills, teams, or contact info.',
  },
]

function buildKnowledgeContext(config: RuntimeConfig) {
  const featured = projects.find((project) => project.featured) ?? projects[0]
  const projectSummary = projects
    .map((project) => `- ${project.name}: ${project.summary}`)
    .join('\n')
  const skillSummary = skillModules
    .map((module) => `- ${module.title}: ${module.items.join(', ')}`)
    .join('\n')
  const designedSummary = designedItems.map((item) => `- ${item.title}: ${item.note}`).join('\n')

  return `
Name: ${config.profileName}
Location: ${config.profileLocation}
Bio summary: ${config.profileSummary}

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

function getLocalAnswer(question: string, config: RuntimeConfig) {
  const q = question.toLowerCase()
  const featured = projects.find((project) => project.featured) ?? projects[0]

  if (q.includes('sim') || q.includes('wheel') || q.includes('force feedback')) {
    return `The main focus is ${featured.name}. ${featured.summary}`
  }

  if (q.includes('project')) {
    const names = projects.slice(0, 5).map((project) => project.name).join(', ')
    return `Top projects right now: ${names}.`
  }

  if (q.includes('skill') || q.includes('cad') || q.includes('esp32') || q.includes('python')) {
    return 'Core skills: CAD (SolidWorks + Onshape), prototyping, electronics, ESP32/Raspberry Pi work, and Python used a lot for testing and tuning.'
  }

  if (q.includes('design') || q.includes('designed')) {
    const items = designedItems.map((item) => item.title).join(', ')
    return `Designed highlights: ${items}.`
  }

  if (q.includes('team') || q.includes('ftc') || q.includes('frc')) {
    return 'Teams include FTC Evergreen Dragons and FRC 2854 Prototypes.'
  }

  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return `Best contact is ${config.contactEmail}. You can also use LinkedIn and GitHub from the contact section.`
  }

  if (q.includes('programming') || q.includes('coding') || q.includes('code')) {
    return 'He keeps that side simple, knows the basics, and uses a lot of Python when needed.'
  }

  return 'I can help with projects, skills, designed builds, teams, and contact info. Ask me one of those and I can give a cleaner answer.'
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
        'Only use facts from the context below. Be concise and casual. ' +
        'If a detail is missing, respond with [ADD].\n\n' +
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
      temperature: 0.3,
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

  const modeLabel = settings.apiKey.trim() ? 'AI mode' : 'Local mode'
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
        : getLocalAnswer(question, runtimeConfig)

      setMessages((current) => [...current, { role: 'assistant', text: answer }])
    } catch (apiError) {
      const fallbackAnswer = getLocalAnswer(question, runtimeConfig)
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
          <Sparkles size={13} /> {modeLabel}
        </p>
      </div>

      <p className="text-sm text-slate-300">
        Local mode works without any key. For settings, click the codex word in the footer.
      </p>

      <div className="blueprint-panel">
        <p className="text-xs text-slate-300">
          Current mode: <span className="font-semibold text-slate-100">{modeLabel}</span> |
          Endpoint: <span className="font-mono text-slate-200">{settings.endpoint}</span> |
          Model: <span className="font-mono text-slate-200">{settings.model}</span>
        </p>
      </div>

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
          AI request failed, so I answered from local facts. Error: {error}
        </p>
      ) : null}
    </div>
  )
}

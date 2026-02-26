import { profileInfo } from '../data/profile'

export const RUNTIME_CONFIG_STORAGE_KEY = 'pranav_runtime_config_v1'
export const RUNTIME_CONFIG_EVENT = 'runtime-config-updated'

export type RuntimeStoryBeat = {
  label: string
  title: string
  text: string
}

export type RuntimeConfig = {
  contactServiceKey: string
  contactEmail: string
  profileName: string
  profileLocation: string
  profileSummary: string
  heroHeadlineLines: string[]
  heroIntroText: string
  aboutParagraphs: string[]
  storyBeats: RuntimeStoryBeat[]
  linkedinUrl: string
  githubUrl: string
  botEndpoint: string
  botModel: string
  botApiKey: string
  botRememberKey: boolean
  botKnowledgeText: string
}

export function getDefaultRuntimeConfig(): RuntimeConfig {
  return {
    contactServiceKey:
      profileInfo.contactServiceKey.trim() ||
      (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim(),
    contactEmail: 'emmadipranav@gmail.com',
    profileName: profileInfo.name,
    profileLocation: profileInfo.location,
    profileSummary: profileInfo.summary,
    heroHeadlineLines: ['PRANAV EMMADI', 'ROBOTICS BUILDER'],
    heroIntroText:
      'I’m Pranav Emmadi. I love building robots and hardware that actually works when it matters. I’m based near San Jose, and I care most about clean design, fast testing, and real results.',
    aboutParagraphs: profileInfo.aboutParagraphs,
    storyBeats: profileInfo.storyBeats,
    linkedinUrl: profileInfo.links.linkedin,
    githubUrl: profileInfo.links.github,
    botEndpoint:
      (import.meta.env.VITE_BOT_ENDPOINT ?? '').trim() ||
      'https://ai.hackclub.com/proxy/v1/chat/completions',
    botModel:
      (import.meta.env.VITE_BOT_MODEL ?? '').trim() ||
      'openai/gpt-oss-120b',
    botApiKey:
      (import.meta.env.VITE_BOT_API_KEY ?? '').trim(),
    botRememberKey: false,
    botKnowledgeText: [
      'Pranav is a hardware-focused robotics builder near San Jose.',
      'He knows the basics and uses a lot of Python when needed.',
      'Top focus project is Sim Racing Wheel + Force Feedback.',
      'Teams: FTC Evergreen Dragons and FRC 2854 Prototypes.',
      'Shooter work exists under FTC Evergreen Dragons, but full shooter specs are still being finalized.',
      'DIY Robotic Hand goal is replicating human hand movement.',
      'Robotic Arm project includes servo channel mapping and gripper behavior checks.',
      'Preferred CAD: SolidWorks and Onshape.',
    ].join('\n'),
  }
}

function normalizeStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback
  const cleaned = value
    .map((item) => String(item).trim())
    .filter(Boolean)
  return cleaned.length ? cleaned : fallback
}

function normalizeStoryBeats(value: unknown, fallback: RuntimeStoryBeat[]) {
  if (!Array.isArray(value)) return fallback
  const cleaned = value
    .map((item) => ({
      label: String((item as RuntimeStoryBeat)?.label ?? '').trim(),
      title: String((item as RuntimeStoryBeat)?.title ?? '').trim(),
      text: String((item as RuntimeStoryBeat)?.text ?? '').trim(),
    }))
    .filter((item) => item.title && item.text)
  return cleaned.length ? cleaned : fallback
}

export function loadRuntimeConfig(): RuntimeConfig {
  const defaults = getDefaultRuntimeConfig()

  if (typeof window === 'undefined') {
    return defaults
  }

  let raw = ''
  try {
    raw = window.localStorage.getItem(RUNTIME_CONFIG_STORAGE_KEY) ?? ''
  } catch {
    return defaults
  }

  if (!raw) {
    return defaults
  }

  try {
    const parsed = JSON.parse(raw) as Partial<RuntimeConfig>
    return {
      contactServiceKey: (parsed.contactServiceKey ?? defaults.contactServiceKey).trim(),
      contactEmail: (parsed.contactEmail ?? defaults.contactEmail).trim(),
      profileName: (parsed.profileName ?? defaults.profileName).trim(),
      profileLocation: (parsed.profileLocation ?? defaults.profileLocation).trim(),
      profileSummary: (parsed.profileSummary ?? defaults.profileSummary).trim(),
      heroHeadlineLines: normalizeStringArray(parsed.heroHeadlineLines, defaults.heroHeadlineLines),
      heroIntroText: (parsed.heroIntroText ?? defaults.heroIntroText).trim(),
      aboutParagraphs: normalizeStringArray(parsed.aboutParagraphs, defaults.aboutParagraphs),
      storyBeats: normalizeStoryBeats(parsed.storyBeats, defaults.storyBeats),
      linkedinUrl: (parsed.linkedinUrl ?? defaults.linkedinUrl).trim(),
      githubUrl: (parsed.githubUrl ?? defaults.githubUrl).trim(),
      botEndpoint: (parsed.botEndpoint ?? defaults.botEndpoint).trim(),
      botModel: (parsed.botModel ?? defaults.botModel).trim(),
      botApiKey: parsed.botRememberKey ? (parsed.botApiKey ?? '').trim() : '',
      botRememberKey: Boolean(parsed.botRememberKey),
      botKnowledgeText: String(parsed.botKnowledgeText ?? defaults.botKnowledgeText).trim(),
    }
  } catch {
    return defaults
  }
}

export function saveRuntimeConfig(config: RuntimeConfig) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(RUNTIME_CONFIG_STORAGE_KEY, JSON.stringify(config))
    window.dispatchEvent(new CustomEvent(RUNTIME_CONFIG_EVENT))
  } catch {
    // ignore storage write failures
  }
}

export function clearRuntimeConfig() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(RUNTIME_CONFIG_STORAGE_KEY)
    window.dispatchEvent(new CustomEvent(RUNTIME_CONFIG_EVENT))
  } catch {
    // ignore storage write failures
  }
}

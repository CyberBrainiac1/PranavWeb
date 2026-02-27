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
      'qwen/qwen3-vl-235b-a22b-instruct',
    botApiKey:
      (import.meta.env.VITE_BOT_API_KEY ?? '').trim(),
    botRememberKey: false,
    botKnowledgeText: [
      'Identity: Name is Pranav Emmadi. Location is Evergreen, San Jose (California).',
      'Student status: student builder, previously described as advanced 9th grade level.',
      'Builder style: hands-on maker workflow = build -> test -> break -> fix -> iterate.',
      'Performance mindset: cares about repeatable real performance, not one-time success.',
      'Specs mindset: values part numbers, gear ratios, encoder counts, wiring, constraints, and tuning details.',
      'Teams: FTC Evergreen Dragons and FRC 2854 Prototypes (mechanical-focused).',
      'Leadership goals: mechanical lead by 10th grade, team captain by 11th grade (FTC + FRC).',
      'Career direction: mechanical engineer with strong computer science for software-hardware bridging.',
      'Primary projects include: DIY Robotic Hand, Robotic Arm, FTC Shooter subsystem work, DIY Sim Racing Wheel + pedals.',
      'DIY Robotic Hand goal: replicate human hand movement. Research paper title: Engineering a DIY Robotic Hand: Design, Mechanics, and Control.',
      'Robotic hand exploration: differential mechanisms, 3D-printable design, tolerances, materials, assembly order, and load considerations.',
      'Robotic hand unknowns: tendon/linkage choice, DOF per finger, actuator placement/type, sensing stack, board/power, and CAD maturity state.',
      'Robotic Arm work: servo channel mapping/testing and exploration of continuous-rotation claw option.',
      'Robotic Arm unknowns: exact DOF/joint count, torque/model selections, geometry, linkage strategy, controller/power, and teleop vs autonomous mode split.',
      'FTC shooter context: exists under Evergreen Dragons; exact shooter architecture and tuning specs still being finalized.',
      'Sim racing stack: Arduino Leonardo + BTS7960 + quadrature encoder A/B with CPR = PPR x 4 rule.',
      'Motor setup context: 12V brushed DC planetary gearmotors around 312 RPM output class.',
      'Encoder reference mentioned: 537.7 PPR output and about 2150.8 CPR after quadrature scaling.',
      'Dual-motor in progress: both motors geared into shared shaft for summed torque, intended synchronized command behavior.',
      'Known sim bugs: angle scaling drift (180 shown as ~379 or ~21), pedal axis/binding issues in Assetto Corsa, inconsistent FFB feel.',
      'Brake wiring detail noted: encoder on D2/D3, brake button on D4, pressed = HIGH to 3V3.',
      'Rig constraints: wood-only rig using only 2x4s, limited tools (mainly drill), plus laptop stand plan.',
      'Related sim interests: handbrake STEP, paddle shifters with limit switches, tensioners CAD, old drill reuse, ESP32 wireless ideas.',
      'Broader interests: quadrupeds, robot arms, autonomy, PCB integration, aeronautics curiosity, Isaac Sim + ROS2 style thinking.',
      'CAD strengths: SolidWorks and Onshape.',
      'Code preference: Raspberry Pi and Python examples preferred when possible; also has ESP32 + Dabble + stepper experience.',
      'Budget tendency: likes useful sub-$20 parts and practical component packs.',
      'Common parts around projects: MG90S, HC-SR04, TB6612, 28BYJ, N20 class motors.',
      'Spring preference: stiff springs with larger range of motion.',
      'Academic direction: interested in professor networking, high-value research programs, and practical outcomes over generic branding.',
      'Response style preference: rewrite whole output when asked (not patch style), ask clarifying questions before final robotics/code outputs when needed, follow strict word counts when requested, and match his natural voice.',
      'Contact identity: use name Pranav Emmadi and LinkedIn URL from profile links.',
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
      botApiKey: (parsed.botApiKey ?? defaults.botApiKey).trim(),
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

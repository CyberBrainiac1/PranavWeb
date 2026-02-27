import { useEffect, useState, type FormEvent } from 'react'
import { Eye, EyeOff, Lock, Save, ShieldAlert, Trash2 } from 'lucide-react'
import {
  clearRuntimeConfig,
  getDefaultRuntimeConfig,
  loadRuntimeConfig,
  saveRuntimeConfig,
  type RuntimeConfig,
} from '../lib/runtimeConfig'
import { Section } from './Section'

const DEV_UNLOCK_SESSION_KEY = 'pranav_dev_unlocked_v1'
const DEV_PASSWORD_SHA256 = 'df5f6e554528c26eda45d913156a8872df9c43ae3049390dcdc441994dc78b3b'

async function sha256Hex(input: string) {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')
}

export function DevSettingsPage() {
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [showContactKey, setShowContactKey] = useState(false)
  const [showBotKey, setShowBotKey] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.sessionStorage.getItem(DEV_UNLOCK_SESSION_KEY) === '1'
    } catch {
      return false
    }
  })
  const [config, setConfig] = useState<RuntimeConfig>(() => loadRuntimeConfig())

  const setHeroLinesFromText = (value: string) => {
    setConfig((current) => ({
      ...current,
      heroHeadlineLines: value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    }))
  }

  const setAboutParagraphsFromText = (value: string) => {
    setConfig((current) => ({
      ...current,
      aboutParagraphs: value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    }))
  }

  const updateStoryBeat = (
    index: number,
    field: 'label' | 'title' | 'text',
    value: string,
  ) => {
    setConfig((current) => ({
      ...current,
      storyBeats: current.storyBeats.map((beat, beatIndex) =>
        beatIndex === index ? { ...beat, [field]: value } : beat,
      ),
    }))
  }

  const addStoryBeat = () => {
    setConfig((current) => ({
      ...current,
      storyBeats: [...current.storyBeats, { label: 'STEP', title: '', text: '' }],
    }))
  }

  const removeStoryBeat = (index: number) => {
    setConfig((current) => ({
      ...current,
      storyBeats: current.storyBeats.filter((_, beatIndex) => beatIndex !== index),
    }))
  }

  const normalizeConfig = (current: RuntimeConfig): RuntimeConfig => ({
    contactServiceKey: current.contactServiceKey.trim(),
    contactEmail: current.contactEmail.trim(),
    profileName: current.profileName.trim(),
    profileLocation: current.profileLocation.trim(),
    profileSummary: current.profileSummary.trim(),
    heroHeadlineLines: current.heroHeadlineLines.map((line) => line.trim()).filter(Boolean),
    heroIntroText: current.heroIntroText.trim(),
    aboutParagraphs: current.aboutParagraphs.map((line) => line.trim()).filter(Boolean),
    storyBeats: current.storyBeats
      .map((beat) => ({
        label: beat.label.trim(),
        title: beat.title.trim(),
        text: beat.text.trim(),
      }))
      .filter((beat) => beat.title && beat.text),
    linkedinUrl: current.linkedinUrl.trim(),
    githubUrl: current.githubUrl.trim(),
    botEndpoint: current.botEndpoint.trim(),
    botModel: current.botModel.trim(),
    botApiKey: current.botApiKey.trim(),
    botRememberKey: current.botRememberKey,
    botKnowledgeText: current.botKnowledgeText.trim(),
  })

  useEffect(() => {
    if (!isUnlocked) return
    saveRuntimeConfig(normalizeConfig(config))
  }, [config, isUnlocked])

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const inputHash = await sha256Hex(passwordInput)
    if (inputHash === DEV_PASSWORD_SHA256) {
      setIsUnlocked(true)
      setPasswordError('')
      setPasswordInput('')
      try {
        window.sessionStorage.setItem(DEV_UNLOCK_SESSION_KEY, '1')
      } catch {
        // ignore session storage failures
      }
      setConfig(loadRuntimeConfig())
      return
    }

    setPasswordError('Wrong password.')
  }

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextConfig = normalizeConfig(config)
    saveRuntimeConfig(nextConfig)
    setConfig(nextConfig)
    setStatusMessage('Saved. Live sync is already active.')
  }

  const handleReset = () => {
    const defaults = getDefaultRuntimeConfig()
    saveRuntimeConfig(defaults)
    setConfig(defaults)
    setStatusMessage('Reset to defaults.')
  }

  const handleClearSaved = () => {
    clearRuntimeConfig()
    const defaults = getDefaultRuntimeConfig()
    setConfig(defaults)
    setStatusMessage('Cleared all saved overrides.')
  }

  const handleLock = () => {
    setIsUnlocked(false)
    setPasswordError('')
    setStatusMessage('')
    try {
      window.sessionStorage.removeItem(DEV_UNLOCK_SESSION_KEY)
    } catch {
      // ignore session storage failures
    }
  }

  if (!isUnlocked) {
    return (
      <Section
        id="dev"
        label="FIG.10 / DEV"
        title="Dev Settings"
        subtitle="Unlock this tab to edit form and bot keys from the UI."
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <article className="blueprint-panel space-y-3">
            <p className="text-sm text-slate-300">
              This password lock is client-side only. It is meant for convenience, not strong security.
            </p>
            <p className="text-sm text-slate-300">Dev password is hidden and no longer shown in UI.</p>
          </article>

          <form onSubmit={handleUnlock} className="blueprint-panel space-y-3">
            <label className="field-group">
              <span>Dev password</span>
              <input
                className="field"
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                placeholder="Enter password"
                required
              />
            </label>
            <button type="submit" className="btn-primary-mag w-full justify-center sm:w-auto">
              <Lock size={16} /> Unlock Dev Tab
            </button>
            {passwordError ? <p className="text-xs text-amber-200">{passwordError}</p> : null}
          </form>
        </div>
      </Section>
    )
  }

  return (
    <Section
      id="dev"
      label="FIG.10 / DEV"
      title="Dev Settings"
      subtitle="Edit major site content, links, form keys, and bot behavior. Changes apply live."
    >
      <form onSubmit={handleSave} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <article className="blueprint-panel space-y-3">
          <h3 className="text-lg font-semibold text-white">Profile Basics</h3>
          <label className="field-group">
            <span>Name</span>
            <input
              className="field"
              value={config.profileName}
              onChange={(event) =>
                setConfig((current) => ({ ...current, profileName: event.target.value }))
              }
              placeholder="Pranav Emmadi"
            />
          </label>
          <label className="field-group">
            <span>Location</span>
            <input
              className="field"
              value={config.profileLocation}
              onChange={(event) =>
                setConfig((current) => ({ ...current, profileLocation: event.target.value }))
              }
              placeholder="Near San Jose, California"
            />
          </label>
          <label className="field-group">
            <span>Summary</span>
            <textarea
              className="field min-h-24 resize-y"
              value={config.profileSummary}
              onChange={(event) =>
                setConfig((current) => ({ ...current, profileSummary: event.target.value }))
              }
              placeholder="Short profile summary..."
            />
          </label>
        </article>

        <article className="blueprint-panel space-y-3">
          <h3 className="text-lg font-semibold text-white">Contact + Links</h3>
          <label className="field-group">
            <span>Contact email</span>
            <input
              className="field"
              value={config.contactEmail}
              onChange={(event) =>
                setConfig((current) => ({ ...current, contactEmail: event.target.value }))
              }
              placeholder="you@email.com"
            />
          </label>
          <label className="field-group">
            <span>LinkedIn URL</span>
            <input
              className="field"
              value={config.linkedinUrl}
              onChange={(event) =>
                setConfig((current) => ({ ...current, linkedinUrl: event.target.value }))
              }
              placeholder="https://linkedin.com/in/..."
            />
          </label>
          <label className="field-group">
            <span>GitHub URL</span>
            <input
              className="field"
              value={config.githubUrl}
              onChange={(event) =>
                setConfig((current) => ({ ...current, githubUrl: event.target.value }))
              }
              placeholder="https://github.com/..."
            />
          </label>
          <label className="field-group">
            <span>Web3Forms key</span>
            <div className="flex gap-2">
              <input
                className="field"
                type={showContactKey ? 'text' : 'password'}
                value={config.contactServiceKey}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, contactServiceKey: event.target.value }))
                }
                placeholder="Web3Forms access key"
              />
              <button
                type="button"
                className="btn-outline-mag"
                onClick={() => setShowContactKey((current) => !current)}
                aria-label={showContactKey ? 'Hide contact key' : 'Show contact key'}
              >
                {showContactKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>
        </article>

        <article className="blueprint-panel space-y-3 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white">Home Content</h3>
          <label className="field-group">
            <span>Hero headline lines (one per line)</span>
            <textarea
              className="field min-h-20 resize-y"
              value={config.heroHeadlineLines.join('\n')}
              onChange={(event) => setHeroLinesFromText(event.target.value)}
              placeholder={'PRANAV EMMADI\nROBOTICS BUILDER'}
            />
          </label>
          <label className="field-group">
            <span>Hero intro text</span>
            <textarea
              className="field min-h-24 resize-y"
              value={config.heroIntroText}
              onChange={(event) =>
                setConfig((current) => ({ ...current, heroIntroText: event.target.value }))
              }
              placeholder="Intro text shown on home hero..."
            />
          </label>
          <label className="field-group">
            <span>About paragraphs (one per line)</span>
            <textarea
              className="field min-h-32 resize-y"
              value={config.aboutParagraphs.join('\n')}
              onChange={(event) => setAboutParagraphsFromText(event.target.value)}
              placeholder="About paragraph line 1..."
            />
          </label>
        </article>

        <article className="blueprint-panel space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-white">Story Beats</h3>
            <button type="button" className="btn-outline-mag" onClick={addStoryBeat}>
              Add Beat
            </button>
          </div>

          <div className="grid gap-3">
            {config.storyBeats.map((beat, index) => (
              <div key={`${beat.title}-${index}`} className="rounded-lg border border-sky-200/20 p-3">
                <div className="grid gap-3 lg:grid-cols-[10rem_minmax(0,1fr)]">
                  <label className="field-group">
                    <span>Label</span>
                    <input
                      className="field"
                      value={beat.label}
                      onChange={(event) => updateStoryBeat(index, 'label', event.target.value)}
                      placeholder="IDEA"
                    />
                  </label>
                  <label className="field-group">
                    <span>Title</span>
                    <input
                      className="field"
                      value={beat.title}
                      onChange={(event) => updateStoryBeat(index, 'title', event.target.value)}
                      placeholder="Beat title"
                    />
                  </label>
                </div>
                <label className="field-group mt-3">
                  <span>Text</span>
                  <textarea
                    className="field min-h-20 resize-y"
                    value={beat.text}
                    onChange={(event) => updateStoryBeat(index, 'text', event.target.value)}
                    placeholder="Beat description..."
                  />
                </label>
                <button
                  type="button"
                  className="btn-outline-mag mt-3"
                  onClick={() => removeStoryBeat(index)}
                >
                  Remove Beat
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="blueprint-panel space-y-3">
          <h3 className="text-lg font-semibold text-white">Bot Settings</h3>
          <label className="field-group">
            <span>API endpoint</span>
            <input
              className="field"
              value={config.botEndpoint}
              onChange={(event) =>
                setConfig((current) => ({ ...current, botEndpoint: event.target.value }))
              }
              placeholder="https://ai.hackclub.com/proxy/v1/chat/completions"
            />
          </label>
          <label className="field-group">
            <span>Model</span>
            <input
              className="field"
              value={config.botModel}
              onChange={(event) =>
                setConfig((current) => ({ ...current, botModel: event.target.value }))
              }
              placeholder="qwen/qwen3-vl-235b-a22b-instruct"
            />
          </label>
          <label className="field-group">
            <span>API key</span>
            <div className="flex gap-2">
              <input
                className="field"
                type={showBotKey ? 'text' : 'password'}
                value={config.botApiKey}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, botApiKey: event.target.value }))
                }
                placeholder="sk-..."
              />
              <button
                type="button"
                className="btn-outline-mag"
                onClick={() => setShowBotKey((current) => !current)}
                aria-label={showBotKey ? 'Hide bot key' : 'Show bot key'}
              >
                {showBotKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={config.botRememberKey}
              onChange={(event) =>
                setConfig((current) => ({ ...current, botRememberKey: event.target.checked }))
              }
            />
            Remember bot API key on this device
          </label>
        </article>

        <article className="blueprint-panel space-y-3">
          <h3 className="text-lg font-semibold text-white">Bot Knowledge Base</h3>
          <label className="field-group">
            <span>What the bot should know about you</span>
            <textarea
              className="field min-h-48 resize-y"
              value={config.botKnowledgeText}
              onChange={(event) =>
                setConfig((current) => ({ ...current, botKnowledgeText: event.target.value }))
              }
              placeholder="Add facts, achievements, project notes, FAQ answers..."
            />
          </label>
          <p className="text-xs text-slate-300">
            Use plain bullets or short lines. Keep facts accurate.
          </p>
        </article>

        <div className="blueprint-panel flex flex-wrap items-center gap-2 lg:col-span-2">
          <button type="submit" className="btn-primary-mag">
            <Save size={16} /> Save Settings
          </button>
          <button type="button" className="btn-outline-mag" onClick={handleReset}>
            <ShieldAlert size={16} /> Reset Defaults
          </button>
          <button type="button" className="btn-outline-mag" onClick={handleClearSaved}>
            <Trash2 size={16} /> Clear Saved Overrides
          </button>
          <button type="button" className="btn-outline-mag" onClick={handleLock}>
            <Lock size={16} /> Lock Dev Tab
          </button>
        </div>
      </form>

      {statusMessage ? (
        <p className="mt-3 text-xs text-sky-100">{statusMessage}</p>
      ) : null}
      <p className="mt-2 text-xs text-slate-300">
        Live sync is on: every change here updates the website right away on this device.
      </p>
    </Section>
  )
}

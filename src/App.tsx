import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { GlobalBackground } from './components/GlobalBackground'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'
import { FeaturedProjectSection } from './components/FeaturedProjectSection'
import { HorizontalProjectsSection } from './components/HorizontalProjectsSection'
import { BlogPreviewSection } from './components/BlogPreviewSection'
import { SkillsSection } from './components/SkillsSection'
import { TimelineSection } from './components/TimelineSection'
import { ContactSection } from './components/ContactSection'
import { Navbar } from './components/Navbar'
import { BlogIndexPage } from './components/blog/BlogIndexPage'
import { BlogPostPage } from './components/blog/BlogPostPage'
import { DevSettingsPage } from './components/DevSettingsPage'
import { AppErrorBoundary } from './components/AppErrorBoundary'
import { profileInfo } from './data/profile'
import { loadRuntimeConfig, RUNTIME_CONFIG_EVENT } from './lib/runtimeConfig'

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/blog', label: 'Blog' },
]

type ContactStatus = {
  kind: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

type RenderProfile = {
  name: string
  location: string
  summary: string
  heroHeadlineLines: string[]
  heroIntroText: string
  aboutParagraphs: string[]
  storyBeats: Array<{ label: string; title: string; text: string }>
  contactEmail: string
  links: { linkedin: string; github: string }
}

function BlogPostRoute({ onBackToBlog }: { onBackToBlog: () => void }) {
  const { slug = '' } = useParams()
  return <BlogPostPage slug={slug} onBackToBlog={onBackToBlog} />
}

function FooterMinimal({ name, onHiddenTap }: { name: string; onHiddenTap: () => void }) {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--hairline-subtle)',
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
        © {new Date().getFullYear()} {name}
      </p>
      <button
        type="button"
        onClick={onHiddenTap}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.06em',
        }}
      >
        built with care
      </button>
    </footer>
  )
}

function HomePage({
  profile,
  onSubmit,
  status,
  sending,
}: {
  profile: RenderProfile
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  status: ContactStatus
  sending: boolean
}) {
  const navigate = useNavigate()

  return (
    <>
      <GlobalBackground />
      <Navbar items={navItems} currentPath="/home" onNavigate={(path) => navigate(path)} />
      <Hero
        name={profile.name}
        location={profile.location}
        introText={profile.heroIntroText}
        aboutParagraphs={profile.aboutParagraphs}
        links={profile.links}
        contactEmail={profile.contactEmail}
        onOpenProjects={() => {}}
        onOpenBlog={() => navigate('/blog')}
        onOpenSkills={() => {}}
        onContact={() =>
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }
      />
      <AboutSection aboutParagraphs={profile.aboutParagraphs} />
      <FeaturedProjectSection />
      <HorizontalProjectsSection />
      <BlogPreviewSection />
      <SkillsSection />
      <TimelineSection />
      <ContactSection
        onSubmit={onSubmit}
        status={status}
        sending={sending}
        profile={profile}
      />
    </>
  )
}

function App() {
  const navigate = useNavigate()
  const [contactStatus, setContactStatus] = useState<ContactStatus>({
    kind: 'idle',
    message: '',
  })
  const [contactSending, setContactSending] = useState(false)
  const [runtimeConfig, setRuntimeConfig] = useState(loadRuntimeConfig)
  const hiddenDevTapCountRef = useRef(0)
  const hiddenDevTapTimeRef = useRef(0)

  const HIDDEN_DEV_TAP_TARGET = 5
  const HIDDEN_DEV_TAP_WINDOW_MS = 1400

  useEffect(() => {
    const handler = () => setRuntimeConfig(loadRuntimeConfig())
    window.addEventListener(RUNTIME_CONFIG_EVENT, handler)
    return () => window.removeEventListener(RUNTIME_CONFIG_EVENT, handler)
  }, [])

  const renderProfile: RenderProfile = {
    name: runtimeConfig.profileName || profileInfo.name,
    location: runtimeConfig.profileLocation || profileInfo.location,
    summary: runtimeConfig.profileSummary || profileInfo.summary,
    heroHeadlineLines: runtimeConfig.heroHeadlineLines.length
      ? runtimeConfig.heroHeadlineLines
      : ['PRANAV EMMADI', 'ROBOTICS BUILDER'],
    heroIntroText:
      runtimeConfig.heroIntroText ||
      'I build robots and hardware projects, and I care a lot about making things work outside perfect demos.',
    aboutParagraphs: runtimeConfig.aboutParagraphs.length
      ? runtimeConfig.aboutParagraphs
      : profileInfo.aboutParagraphs,
    storyBeats: runtimeConfig.storyBeats.length
      ? runtimeConfig.storyBeats
      : profileInfo.storyBeats,
    contactEmail: runtimeConfig.contactEmail || 'emmadipranav@gmail.com',
    links: {
      linkedin: runtimeConfig.linkedinUrl || profileInfo.links.linkedin,
      github: runtimeConfig.githubUrl || profileInfo.links.github,
    },
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactSending) return

    const contactServiceKey = runtimeConfig.contactServiceKey.trim()

    if (!contactServiceKey) {
      setContactStatus({
        kind: 'error',
        message:
          'Contact form is not available right now. Please use email or LinkedIn below.',
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
          access_key: contactServiceKey,
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
      setContactStatus({ kind: 'success', message: 'Message sent. Thanks for reaching out.' })
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

  const handleHiddenDevTap = () => {
    const now = Date.now()
    if (now - hiddenDevTapTimeRef.current > HIDDEN_DEV_TAP_WINDOW_MS) {
      hiddenDevTapCountRef.current = 0
    }
    hiddenDevTapTimeRef.current = now
    hiddenDevTapCountRef.current += 1
    if (hiddenDevTapCountRef.current >= HIDDEN_DEV_TAP_TARGET) {
      hiddenDevTapCountRef.current = 0
      navigate('/dev')
    }
  }

  return (
    <AppErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <>
              <HomePage
                profile={renderProfile}
                onSubmit={handleContactSubmit}
                status={contactStatus}
                sending={contactSending}
              />
              <FooterMinimal name={renderProfile.name} onHiddenTap={handleHiddenDevTap} />
            </>
          }
        />
        <Route
          path="/blog"
          element={<BlogIndexPage onOpenPost={(slug) => navigate(`/blog/${slug}`)} />}
        />
        <Route
          path="/blog/:slug"
          element={<BlogPostRoute onBackToBlog={() => navigate('/blog')} />}
        />
        <Route path="/dev" element={<DevSettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppErrorBoundary>
  )
}

export default App

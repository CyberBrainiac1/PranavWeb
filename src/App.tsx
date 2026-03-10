import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { GlobalBackground } from './components/GlobalBackground'
import { HomeSectionIndicator } from './components/SectionIndicator'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'

import { HorizontalProjectsSection } from './components/HorizontalProjectsSection'
import { BlogPreviewSection } from './components/BlogPreviewSection'
import { SkillsSection } from './components/SkillsSection'
import { TimelineSection } from './components/TimelineSection'
import { ContactSection } from './components/ContactSection'
import { BlogIndexPage } from './components/blog/BlogIndexPage'
import { BlogPostPage } from './components/blog/BlogPostPage'
import { DevSettingsPage } from './components/DevSettingsPage'
import { ProjectDetailPage } from './components/ProjectDetailPage'
import { PageTransition } from './components/PageTransition'
import { profileInfo } from './data/profile'
import { loadRuntimeConfig, RUNTIME_CONFIG_EVENT } from './lib/runtimeConfig'

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

function ProjectDetailRoute() {
  const { slug = '', section } = useParams()
  return <ProjectDetailPage slug={slug} section={section} />
}

function FooterMinimal({ name, onHiddenTap }: { name: string; onHiddenTap: () => void }) {
  return (
    <footer className="footer-minimal">
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} {name}
      </p>
      <button
        type="button"
        onClick={onHiddenTap}
        className="footer-hidden-btn"
        aria-label="Hidden settings"
      >
        built with care
      </button>
    </footer>
  )
}

/** Routes that show the section indicator dots */
const SECTION_ROUTES = ['/', '/about', '/projects', '/writing', '/skills', '/timeline', '/contact']

function App() {
  const navigate = useNavigate()
  const location = useLocation()
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
        message: 'Contact form is not available right now. Please use email or LinkedIn.',
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
    setContactStatus({ kind: 'sending', message: 'Sending...' })

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

  const handleHiddenTap = () => {
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
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed background layers — always visible */}
      <GlobalBackground />

      {/* Section indicator — only on section routes */}
      {SECTION_ROUTES.includes(location.pathname) && <HomeSectionIndicator />}

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Section pages — each section is its own route */}
            <Route
              path="/"
              element={
                <PageTransition pageKey="home">
                  <Hero
                    name={renderProfile.name}
                    location={renderProfile.location}
                    introText={renderProfile.heroIntroText}
                    aboutParagraphs={renderProfile.aboutParagraphs}
                    links={renderProfile.links}
                    contactEmail={renderProfile.contactEmail}
                    onOpenProjects={() => navigate('/projects')}
                    onOpenBlog={() => navigate('/writing')}
                    onOpenSkills={() => navigate('/skills')}
                    onContact={() => navigate('/contact')}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition pageKey="about">
                  <AboutSection aboutParagraphs={renderProfile.aboutParagraphs} />
                </PageTransition>
              }
            />
            <Route
              path="/projects"
              element={
                <PageTransition pageKey="projects">
                  <HorizontalProjectsSection />
                </PageTransition>
              }
            />
            <Route
              path="/writing"
              element={
                <PageTransition pageKey="writing">
                  <BlogPreviewSection />
                </PageTransition>
              }
            />
            <Route
              path="/skills"
              element={
                <PageTransition pageKey="skills">
                  <SkillsSection />
                </PageTransition>
              }
            />
            <Route
              path="/timeline"
              element={
                <PageTransition pageKey="timeline">
                  <TimelineSection />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition pageKey="contact">
                  <ContactSection
                    onSubmit={handleContactSubmit}
                    status={contactStatus}
                    sending={contactSending}
                    profile={renderProfile}
                  />
                </PageTransition>
              }
            />

            {/* Existing non-section routes */}
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/blog"
              element={
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <BlogIndexPage onOpenPost={(slug) => navigate(`/blog/${slug}`)} />
                </div>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <BlogPostRoute onBackToBlog={() => navigate('/blog')} />
                </div>
              }
            />
            <Route path="/dev" element={<DevSettingsPage />} />
            <Route
              path="/projects/:slug"
              element={
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <ProjectDetailRoute />
                </div>
              }
            />
            <Route
              path="/projects/:slug/:section"
              element={
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <ProjectDetailRoute />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer — only on section routes */}
      {SECTION_ROUTES.includes(location.pathname) && (
        <FooterMinimal name={renderProfile.name} onHiddenTap={handleHiddenTap} />
      )}
    </div>
  )
}

export default App

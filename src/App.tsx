import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { GlobalBackground } from './components/GlobalBackground'
import { HomeSectionIndicator } from './components/SectionIndicator'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'

import { HorizontalProjectsSection } from './components/HorizontalProjectsSection'
import { BlogIndexPage } from './components/blog/BlogIndexPage'
import { BlogPostPage } from './components/blog/BlogPostPage'
import { DevSettingsPage } from './components/DevSettingsPage'
import { ProjectDetailPage } from './components/ProjectDetailPage'
import { profileInfo } from './data/profile'
import { loadRuntimeConfig, RUNTIME_CONFIG_EVENT } from './lib/runtimeConfig'

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

function HomeExperiencePage({
  profile,
}: {
  profile: RenderProfile
}) {
  return (
    <>
      {/* Cover — first screen only: name, photo, socials */}
      <HomeSectionIndicator />
      <Hero
        name={profile.name}
        location={profile.location}
        introText={profile.heroIntroText}
        aboutParagraphs={profile.aboutParagraphs}
        links={profile.links}
        contactEmail={profile.contactEmail}
        onOpenProjects={() => {}}
        onOpenBlog={() => {}}
        onOpenSkills={() => {}}
        onContact={() => {}}
      />
      <AboutSection aboutParagraphs={profile.aboutParagraphs} />
      <HorizontalProjectsSection />
    </>
  )
}

function App() {
  const navigate = useNavigate()
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

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <HomeExperiencePage
                profile={renderProfile}
              />
            }
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
      </main>

      {/* Footer — only on home page */}
      <Routes>
        <Route
          path="/home"
          element={
            <FooterMinimal name={renderProfile.name} onHiddenTap={handleHiddenTap} />
          }
        />
        <Route path="*" element={null} />
      </Routes>
    </div>
  )
}

export default App

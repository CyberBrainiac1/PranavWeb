import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { useInView } from 'react-intersection-observer'
import { type Project, projects } from '../data/projects'
import { getBlogPost, formatBlogDate } from '../data/blog'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { getProjectMediaItems } from '../lib/projectMedia'
import { LabelTag } from './LabelTag'
import { headingToSlug } from '../lib/utils'
import ContentLoader from 'react-content-loader'

// Shared typewriter timing constants
const TYPEWRITER = {
  /** Characters typed per second (higher = faster) */
  SPEED: 52,
  /** Characters deleted per second */
  DELETE_SPEED: 60,
} as const

// ─── helpers ────────────────────────────────────────────────────────────────

type SectionEntry = {
  slug: string
  heading: string
  bullets: string[]
  isAlbum: boolean
}

function buildSections(project: Project): SectionEntry[] {
  const extras: SectionEntry[] = []

  if (project.overview) {
    extras.push({ slug: 'overview', heading: 'Overview', bullets: [], isAlbum: false })
  }
  if (project.whyBuilt) {
    extras.push({ slug: 'why-i-built-it', heading: 'Why I built it', bullets: [], isAlbum: false })
  }

  const fromDetails = project.details.map((s) => ({
    slug: headingToSlug(s.heading),
    heading: s.heading,
    bullets: s.bullets,
    isAlbum: s.heading.toLowerCase().includes('album'),
  }))

  const all = [...extras, ...fromDetails]

  if (project.currentState) {
    all.push({ slug: 'current-state', heading: 'Current state', bullets: [], isAlbum: false })
  }
  if (project.nextSteps) {
    all.push({ slug: 'what-im-doing-next', heading: "What I'm doing next", bullets: [], isAlbum: false })
  }

  const relatedBlogPosts = (project.relatedPosts ?? [])
    .map((s) => getBlogPost(s))
    .filter(Boolean)
  if (relatedBlogPosts.length > 0) {
    all.push({ slug: 'related-writing', heading: 'Related writing', bullets: [], isAlbum: false })
  }

  const media = getProjectMediaItems(project)
  if (media.length > 0 && !all.some((s) => s.isAlbum)) {
    all.push({ slug: 'gallery', heading: 'Gallery', bullets: [], isAlbum: true })
  }

  return all
}

function getContent(project: Project, section: SectionEntry): React.ReactNode {
  if (section.slug === 'overview') {
    return <ProseBlock text={project.overview ?? ''} />
  }
  if (section.slug === 'why-i-built-it') {
    return <ProseBlock text={project.whyBuilt ?? ''} />
  }
  if (section.slug === 'current-state') {
    return <ProseBlock text={project.currentState ?? ''} />
  }
  if (section.slug === 'what-im-doing-next') {
    return <ProseBlock text={project.nextSteps ?? ''} />
  }
  if (section.slug === 'related-writing') {
    const posts = (project.relatedPosts ?? []).map((s) => getBlogPost(s)).filter(Boolean) as NonNullable<ReturnType<typeof getBlogPost>>[]
    return <RelatedPosts posts={posts} />
  }
  if (section.isAlbum || section.slug === 'gallery') {
    return <Gallery project={project} />
  }
  return <BulletList bullets={section.bullets} />
}

// ─── sub-components ─────────────────────────────────────────────────────────

function SkeletonLine({ width = '80%', height = 14 }: { width?: string; height?: number }) {
  return (
    <ContentLoader
      speed={1.4}
      width="100%"
      height={height + 6}
      backgroundColor="rgba(77,141,255,0.08)"
      foregroundColor="rgba(77,141,255,0.15)"
      style={{ display: 'block', marginBottom: 8 }}
    >
      <rect x="0" y="3" rx="4" ry="4" width={width} height={height} />
    </ContentLoader>
  )
}

function SectionSkeleton() {
  return (
    <div style={{ paddingTop: 8 }}>
      <SkeletonLine width="60%" height={12} />
      <SkeletonLine width="90%" />
      <SkeletonLine width="75%" />
      <SkeletonLine width="85%" />
      <SkeletonLine width="50%" />
    </div>
  )
}

function ProseBlock({ text }: { text: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.p
      ref={ref}
      className="project-detail-prose"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: PREMIUM_EASE }}
    >
      {text}
    </motion.p>
  )
}

function BulletList({ bullets }: { bullets: string[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <ul ref={ref} className="project-detail-bullets">
      {bullets.map((bullet, i) => (
        <motion.li
          key={bullet}
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease: PREMIUM_EASE, delay: i * 0.055 }}
        >
          <span className="project-detail-bullet-dot" aria-hidden="true" />
          <span>{bullet}</span>
        </motion.li>
      ))}
    </ul>
  )
}

function Gallery({ project }: { project: Project }) {
  const mediaItems = getProjectMediaItems(project)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  if (!mediaItems.length) return <p className="project-detail-prose" style={{ color: 'var(--text-muted)' }}>No media yet.</p>
  return (
    <div ref={ref} className="project-detail-gallery">
      {mediaItems.map((item, i) => (
        <motion.a
          key={item.filename}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="project-detail-gallery-item"
          title={item.filename}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, ease: PREMIUM_EASE, delay: i * 0.06 }}
        >
          {item.kind === 'image' && item.previewable ? (
            <img src={item.href} alt={item.filename} loading="lazy" />
          ) : item.kind === 'video' ? (
            <video src={item.href} muted playsInline preload="metadata" />
          ) : (
            <span className="project-detail-gallery-fallback">{item.filename}</span>
          )}
        </motion.a>
      ))}
    </div>
  )
}

function RelatedPosts({ posts }: { posts: NonNullable<ReturnType<typeof getBlogPost>>[] }) {
  const navigate = useNavigate()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <div ref={ref} className="project-detail-related-posts">
      {posts.map((post, i) => (
        <motion.button
          key={post.slug}
          type="button"
          className="project-detail-related-post"
          onClick={() => navigate(`/blog/${post.slug}`)}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: PREMIUM_EASE, delay: i * 0.08 }}
        >
          <p className="project-detail-related-post-date">
            {formatBlogDate(post.date)} · {post.readingMinutes} min read
          </p>
          <p className="project-detail-related-post-title">{post.title}</p>
          <p className="project-detail-related-post-summary">{post.summary}</p>
        </motion.button>
      ))}
    </div>
  )
}

// ─── Section page ────────────────────────────────────────────────────────────

const sectionPageVariants = {
  enter: { opacity: 0, y: 28, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: PREMIUM_EASE } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.25, ease: PREMIUM_EASE } },
}

function SectionPage({
  project,
  section,
  allSections,
  onNavigate,
}: {
  project: Project
  section: SectionEntry
  allSections: SectionEntry[]
  onNavigate: (to: string) => void
}) {
  const idx = allSections.findIndex((s) => s.slug === section.slug)
  const prev = idx > 0 ? allSections[idx - 1] : null
  const next = idx < allSections.length - 1 ? allSections[idx + 1] : null

  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60)
    return () => clearTimeout(t)
  }, [section.slug])

  // Build the typewriter sequence: heading → retype heading (subtle loop)
  const headingSequence: (string | number)[] = [
    section.heading,
    2000,
    '',
    400,
    section.heading,
    4000,
  ]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.slug}
        variants={sectionPageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="section-page"
      >
        {/* Section counter */}
        <p className="section-page-counter">
          {String(idx + 1).padStart(2, '0')} / {String(allSections.length).padStart(2, '0')}
        </p>

        {/* Heading with typewriter */}
        <h2 className="section-page-heading">
          <TypeAnimation
            sequence={headingSequence}
            wrapper="span"
            speed={TYPEWRITER.SPEED}
            deletionSpeed={TYPEWRITER.DELETE_SPEED}
            repeat={Infinity}
            cursor={true}
          />
        </h2>

        {/* Animated separator */}
        <motion.div
          className="section-page-sep"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, ease: PREMIUM_EASE, delay: 0.15 }}
        />

        {/* Content — skeleton while waiting */}
        <div className="section-page-body">
          {!ready ? <SectionSkeleton /> : getContent(project, section)}
        </div>

        {/* Prev / Next navigation */}
        <div className="section-page-nav">
          {prev ? (
            <button
              type="button"
              className="section-nav-btn"
              onClick={() => onNavigate(`/projects/${project.slug ?? project.id}/${prev.slug}`)}
            >
              <ArrowLeft size={14} />
              <span>{prev.heading}</span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              className="section-nav-btn is-next"
              onClick={() => onNavigate(`/projects/${project.slug ?? project.id}/${next.slug}`)}
            >
              <span>{next.heading}</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <span />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Status dot ──────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: Project['status'] }) {
  const colorMap: Record<Project['status'], string> = {
    featured: '#4D8DFF',
    active: '#34D399',
    team: '#A78BFA',
    'in-progress': '#FBBF24',
  }
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: colorMap[status],
        marginRight: 6,
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    />
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

type ProjectDetailPageProps = {
  slug: string
  section?: string
}

export function ProjectDetailPage({ slug, section: sectionSlug }: ProjectDetailPageProps) {
  const navigate = useNavigate()

  const project = projects.find((p) => (p.slug ?? p.id) === slug)

  if (!project) {
    return (
      <div className="project-detail-shell" style={{ paddingTop: 80, minHeight: '60vh' }}>
        <div className="project-detail-nav">
          <button type="button" onClick={() => navigate('/home')} className="project-detail-back">
            <ArrowLeft size={16} /> Back
          </button>
        </div>
        <p style={{ color: 'var(--text-muted)', padding: '40px clamp(24px,5vw,80px)' }}>
          Project not found.
        </p>
      </div>
    )
  }

  const allSections = buildSections(project)
  const activeSection = sectionSlug
    ? allSections.find((s) => s.slug === sectionSlug) ?? allSections[0]
    : null

  const relatedBlogPosts = (project.relatedPosts ?? [])
    .map((s) => getBlogPost(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getBlogPost>>[]

  // Build the project name typewriter sequence (types, pauses, rewrites)
  const nameSequence: (string | number)[] = [project.name, 3500, '', 300, project.name, 99999]

  return (
    <div className="project-detail-shell">
      {/* ── Top nav ── */}
      <div className="project-detail-nav">
        <button type="button" onClick={() => navigate('/home')} className="project-detail-back">
          <ArrowLeft size={15} /> Back to home
        </button>
        {activeSection && (
          <button
            type="button"
            onClick={() => navigate(`/projects/${project.slug ?? project.id}`)}
            className="project-detail-back"
            style={{ marginLeft: 20 }}
          >
            <Home size={13} /> Project overview
          </button>
        )}
      </div>

      <div className="project-detail-content">
        {/* ── Header (always visible) ── */}
        <motion.header
          className="project-detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        >
          <div className="project-detail-meta-row">
            <LabelTag text={project.rev} />
            <LabelTag text={project.spec} />
            {project.featured && <LabelTag text="FEATURED" />}
          </div>

          {/* Typewriter title */}
          <h1 className="project-detail-title">
            <TypeAnimation
              sequence={nameSequence}
              wrapper="span"
              speed={TYPEWRITER.SPEED}
              deletionSpeed={TYPEWRITER.DELETE_SPEED}
              repeat={Infinity}
              cursor={true}
            />
          </h1>

          <p className="project-detail-summary">{project.summary}</p>

          <div className="project-detail-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        </motion.header>

        {/* ── Two-column body ── */}
        <div className="project-detail-body">
          {/* ── Sidebar ── */}
          <motion.aside
            className="project-detail-sidebar"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE, delay: 0.15 }}
          >
            {/* Section navigator */}
            <div className="project-detail-sidebar-block">
              <p className="project-detail-sidebar-label">Sections</p>
              <nav className="section-nav-list" aria-label="Project sections">
                {allSections.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    className={`section-nav-item${activeSection?.slug === s.slug ? ' is-active' : ''}`}
                    onClick={() =>
                      navigate(`/projects/${project.slug ?? project.id}/${s.slug}`)
                    }
                  >
                    {s.heading}
                  </button>
                ))}
              </nav>
            </div>

            {/* Status */}
            <div className="project-detail-sidebar-block">
              <p className="project-detail-sidebar-label">Status</p>
              <p className="project-detail-sidebar-value">
                <StatusDot status={project.status} />
                {project.spec.replace('STATUS / ', '')}
              </p>
            </div>

            {/* Stack */}
            {project.stack && project.stack.length > 0 && (
              <div className="project-detail-sidebar-block">
                <p className="project-detail-sidebar-label">Software</p>
                <ul className="project-detail-sidebar-list">
                  {project.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            )}

            {/* Hardware */}
            {project.hardware && project.hardware.length > 0 && (
              <div className="project-detail-sidebar-block">
                <p className="project-detail-sidebar-label">Hardware</p>
                <ul className="project-detail-sidebar-list">
                  {project.hardware.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            )}

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div className="project-detail-sidebar-block">
                <p className="project-detail-sidebar-label">Links</p>
                <ul className="project-detail-sidebar-links">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer" className="project-detail-link">
                        <ExternalLink size={11} /> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Repos */}
            {project.relatedRepos && project.relatedRepos.length > 0 && (
              <div className="project-detail-sidebar-block">
                <p className="project-detail-sidebar-label">Repos</p>
                <ul className="project-detail-sidebar-links">
                  {project.relatedRepos.map((repo) => (
                    <li key={repo.href}>
                      <a href={repo.href} target="_blank" rel="noreferrer" className="project-detail-link">
                        <Github size={11} /> {repo.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.aside>

          {/* ── Main area ── */}
          <div className="project-detail-main">
            {activeSection ? (
              /* ── SECTION PAGE MODE ── */
              <SectionPage
                project={project}
                section={activeSection}
                allSections={allSections}
                onNavigate={navigate}
              />
            ) : (
              /* ── OVERVIEW MODE (no section selected) ── */
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.2 }}
                className="project-overview-grid"
              >
                {/* Overview blurb */}
                {project.overview && (
                  <div className="project-detail-section">
                    <h2 className="project-detail-section-heading">Overview</h2>
                    <p className="project-detail-prose">{project.overview}</p>
                  </div>
                )}

                {/* Section cards — click to open that section page */}
                <div className="project-detail-section">
                  <h2 className="project-detail-section-heading">Sections</h2>
                  <div className="section-card-grid">
                    {allSections.map((s, i) => (
                      <motion.button
                        key={s.slug}
                        type="button"
                        className="section-card"
                        onClick={() =>
                          navigate(`/projects/${project.slug ?? project.id}/${s.slug}`)
                        }
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, ease: PREMIUM_EASE, delay: 0.25 + i * 0.05 }}
                        whileHover={{ y: -3, transition: { duration: 0.18 } }}
                      >
                        <span className="section-card-index">{String(i + 1).padStart(2, '0')}</span>
                        <span className="section-card-title">{s.heading}</span>
                        <ArrowRight size={13} className="section-card-arrow" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Related writing preview */}
                {relatedBlogPosts.length > 0 && (
                  <div className="project-detail-section">
                    <h2 className="project-detail-section-heading">Related writing</h2>
                    <RelatedPosts posts={relatedBlogPosts} />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

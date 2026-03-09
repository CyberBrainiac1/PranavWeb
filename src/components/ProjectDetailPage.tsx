import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { type Project, projects } from '../data/projects'
import { getBlogPost, formatBlogDate } from '../data/blog'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { getProjectMediaItems } from '../lib/projectMedia'
import { LabelTag } from './LabelTag'

type ProjectDetailPageProps = {
  slug: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: PREMIUM_EASE } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

function StatusDot({ status }: { status: Project['status'] }) {
  const colorMap: Record<Project['status'], string> = {
    featured: '#4D8DFF',
    active: '#34D399',
    team: '#A78BFA',
    'in-progress': '#FBBF24',
  }
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: colorMap[status],
        marginRight: 6,
        verticalAlign: 'middle',
      }}
    />
  )
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const navigate = useNavigate()
  const project = projects.find((p) => (p.slug ?? p.id) === slug)

  if (!project) {
    return (
      <div className="page-shell" style={{ paddingTop: '80px', minHeight: '60vh' }}>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="project-detail-back"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <p style={{ color: 'var(--text-muted)', marginTop: '32px' }}>Project not found.</p>
      </div>
    )
  }

  const mediaItems = getProjectMediaItems(project)
  const relatedBlogPosts = (project.relatedPosts ?? [])
    .map((s) => getBlogPost(s))
    .filter(Boolean) as ReturnType<typeof getBlogPost>[]

  // Filter out 'Album media' sections from details — media is shown separately
  const contentSections = project.details.filter(
    (s) => s.heading.toLowerCase() !== 'album media',
  )

  return (
    <div className="project-detail-shell">
      {/* Back button */}
      <div className="project-detail-nav">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="project-detail-back"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>
      </div>

      <motion.div
        className="project-detail-content"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Header */}
        <motion.header variants={fadeUp} className="project-detail-header">
          <div className="project-detail-meta-row">
            <LabelTag text={project.rev} />
            <LabelTag text={project.spec} />
            {project.featured && <LabelTag text="FEATURED" />}
          </div>
          <h1 className="project-detail-title">{project.name}</h1>
          <p className="project-detail-summary">{project.summary}</p>
          <div className="project-detail-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        <div className="project-detail-body">
          {/* Sidebar */}
          <motion.aside variants={fadeUp} className="project-detail-sidebar">
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
                <p className="project-detail-sidebar-label">Software Stack</p>
                <ul className="project-detail-sidebar-list">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hardware */}
            {project.hardware && project.hardware.length > 0 && (
              <div className="project-detail-sidebar-block">
                <p className="project-detail-sidebar-label">Hardware</p>
                <ul className="project-detail-sidebar-list">
                  {project.hardware.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
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
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="project-detail-link"
                      >
                        <ExternalLink size={12} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Repos */}
            {project.relatedRepos && project.relatedRepos.length > 0 && (
              <div className="project-detail-sidebar-block">
                <p className="project-detail-sidebar-label">Repos</p>
                <ul className="project-detail-sidebar-links">
                  {project.relatedRepos.map((repo) => (
                    <li key={repo.href}>
                      <a
                        href={repo.href}
                        target="_blank"
                        rel="noreferrer"
                        className="project-detail-link"
                      >
                        <Github size={12} />
                        {repo.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.aside>

          {/* Main content */}
          <motion.div variants={fadeUp} className="project-detail-main">
            {/* Overview */}
            {project.overview && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-heading">Overview</h2>
                <p className="project-detail-prose">{project.overview}</p>
              </section>
            )}

            {/* Why built */}
            {project.whyBuilt && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-heading">Why I built it</h2>
                <p className="project-detail-prose">{project.whyBuilt}</p>
              </section>
            )}

            {/* Detail sections */}
            {contentSections.map((section) => (
              <section key={section.heading} className="project-detail-section">
                <h2 className="project-detail-section-heading">{section.heading}</h2>
                <ul className="project-detail-bullets">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span className="project-detail-bullet-dot" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Current state */}
            {project.currentState && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-heading">Current state</h2>
                <p className="project-detail-prose">{project.currentState}</p>
              </section>
            )}

            {/* Next steps */}
            {project.nextSteps && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-heading">What I'm doing next</h2>
                <p className="project-detail-prose">{project.nextSteps}</p>
              </section>
            )}

            {/* Media gallery */}
            {mediaItems.length > 0 && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-heading">Gallery</h2>
                <div className="project-detail-gallery">
                  {mediaItems.map((item) => (
                    <a
                      key={item.filename}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="project-detail-gallery-item"
                      title={item.filename}
                    >
                      {item.kind === 'image' && item.previewable ? (
                        <img src={item.href} alt={item.filename} loading="lazy" />
                      ) : item.kind === 'video' ? (
                        <video src={item.href} muted playsInline preload="metadata" />
                      ) : (
                        <span className="project-detail-gallery-fallback">{item.filename}</span>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Related writing */}
            {relatedBlogPosts.length > 0 && (
              <section className="project-detail-section">
                <h2 className="project-detail-section-heading">Related writing</h2>
                <div className="project-detail-related-posts">
                  {relatedBlogPosts.map((post) => (
                    <button
                      key={post!.slug}
                      type="button"
                      className="project-detail-related-post"
                      onClick={() => navigate(`/blog/${post!.slug}`)}
                    >
                      <p className="project-detail-related-post-date">
                        {formatBlogDate(post!.date)} · {post!.readingMinutes} min read
                      </p>
                      <p className="project-detail-related-post-title">{post!.title}</p>
                      <p className="project-detail-related-post-summary">{post!.summary}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

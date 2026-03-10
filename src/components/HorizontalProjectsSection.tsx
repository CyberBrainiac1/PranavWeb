import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { projects, type Project } from '../data/projects'
import { PREMIUM_EASE } from '../lib/motionConfig'
import { ProjectDetailsDialog } from './ProjectDetailsDialog'

/** Proportion of remaining distance to travel per animation frame (0–1).
 *  Higher = snappier / more responsive to scroll input. */
const LERP_FACTOR = 0.14

/**
 * Linear interpolation — moves `current` toward `target` by `factor` each frame.
 */
function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor
}

export function HorizontalProjectsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const currentXRef = useRef(0)
  const targetXRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project)
    setDialogOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) setSelectedProject(null)
  }

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMobile = () => setIsMobile(mq.matches)
    const syncMotion = () => setPrefersReducedMotion(rm.matches)
    syncMobile(); syncMotion()
    mq.addEventListener('change', syncMobile)
    rm.addEventListener('change', syncMotion)
    return () => {
      mq.removeEventListener('change', syncMobile)
      rm.removeEventListener('change', syncMotion)
    }
  }, [])

  const computeTargetX = useCallback(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return
    const wrapperRect = wrapper.getBoundingClientRect()
    const wrapperTop = window.scrollY + wrapperRect.top
    const wrapperHeight = wrapper.offsetHeight
    const windowHeight = window.innerHeight
    const scrollableDistance = wrapperHeight - windowHeight
    if (scrollableDistance <= 0) return
    const scrolled = window.scrollY - wrapperTop
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance))
    const trackWidth = track.scrollWidth
    const maxTranslate = -(trackWidth - window.innerWidth)
    targetXRef.current = progress * maxTranslate
  }, [])

  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      cancelAnimationFrame(rafRef.current)
      if (trackRef.current) {
        trackRef.current.style.transform = 'translateX(0px)'
      }
      return
    }
    currentXRef.current = 0
    targetXRef.current = 0
    let active = true
    const animate = () => {
      if (!active) return
      computeTargetX()
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, LERP_FACTOR)
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentXRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, prefersReducedMotion, computeTargetX])

  const panelCount = projects.length
  const SCROLL_PER_PANEL_VH = 40
  const wrapperVH = Math.max(250, panelCount * SCROLL_PER_PANEL_VH)
  const wrapperHeight = isMobile ? 'auto' : `${wrapperVH}vh`

  return (
    <section id="projects">
      <motion.div
        className="section-shell"
        style={{ paddingBottom: 0 }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
      >
        <div className="section-header" style={{ marginBottom: 0 }}>
          <span className="section-label">All Projects</span>
          <h2 className="section-title">What I've built.</h2>
          {!isMobile && !prefersReducedMotion && (
            <p className="micro-label" style={{ marginTop: '8px', color: 'var(--text-muted)', opacity: 0.7 }}>
              Scroll to explore
            </p>
          )}
        </div>
      </motion.div>

      <div ref={wrapperRef} className="horiz-section-wrapper" style={{ height: wrapperHeight }}>
        <div className="horiz-section-sticky">
          <div className="horiz-viewport">
            <div ref={trackRef} className="horiz-track">
              {projects.map((project, i) => (
                <Tilt
                  key={project.id}
                  tiltMaxAngleX={isMobile ? 0 : 6}
                  tiltMaxAngleY={isMobile ? 0 : 6}
                  glareEnable={!isMobile}
                  glareMaxOpacity={0.07}
                  glareColor="rgba(77,141,255,0.8)"
                  glarePosition="all"
                  glareBorderRadius="16px"
                  scale={1.015}
                  transitionSpeed={600}
                  style={{ transformStyle: 'preserve-3d', flexShrink: 0 }}
                >
                  <article
                    className="horiz-panel horiz-panel-clickable"
                    onClick={() => handleOpenProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleOpenProject(project)
                      }
                    }}
                  >
                    <p className="horiz-panel-index">{String(i + 1).padStart(2, '0')}</p>
                    <span className={`horiz-panel-status${project.featured ? ' featured' : ''}`}>
                      {project.status === 'featured' ? 'in progress' : project.status}
                    </span>
                    <h3 className="horiz-panel-title">{project.name}</h3>
                    <p className="horiz-panel-summary">{project.summary}</p>
                    <div className="horiz-panel-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                    <div className="horiz-panel-footer">
                      <span className="horiz-panel-open">
                        View details
                      </span>
                      {project.links && project.links.length > 0 && (
                        <div className="horiz-panel-links">
                          {project.links.slice(0, 1).map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="horiz-panel-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.label} &rarr;
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Tilt>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={handleDialogChange}
      />
    </section>
  )
}

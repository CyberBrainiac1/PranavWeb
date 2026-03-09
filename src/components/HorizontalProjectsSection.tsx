import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function HorizontalProjectsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const currentXRef = useRef(0)
  const targetXRef = useRef(0)
  const rafRef = useRef<number>(0)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      const wrapper = wrapperRef.current
      const track = trackRef.current
      if (!wrapper || !track) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const wrapperHeight = wrapper.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const wrapperTop = scrollY + wrapperRect.top

      const scrollableDistance = wrapperHeight - windowHeight
      const scrolled = scrollY - wrapperTop
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance))

      const trackWidth = track.scrollWidth
      const maxTranslate = -(trackWidth - window.innerWidth)
      targetXRef.current = progress * maxTranslate
    }

    const animate = () => {
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.1)
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentXRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [prefersReducedMotion])

  const panelCount = projects.length
  // Each panel needs ~50vh of vertical scroll space to translate through
  const SCROLL_HEIGHT_PER_PANEL_VH = 50
  const wrapperHeight = `${Math.max(300, panelCount * SCROLL_HEIGHT_PER_PANEL_VH)}vh`

  return (
    <section id="projects">
      <div className="section-shell" style={{ paddingBottom: 0 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <span className="section-label">ALL PROJECTS</span>
          <h2 className="section-title">What I've built.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
            Scroll to explore →
          </p>
        </motion.div>
      </div>

      <div ref={wrapperRef} className="horiz-section-wrapper" style={{ height: wrapperHeight }}>
        <div className="horiz-section-sticky">
          <div ref={trackRef} className="horiz-track">
            {projects.map((project, i) => (
              <div key={project.id} className="horiz-panel">
                <p className="horiz-panel-index">{String(i + 1).padStart(2, '0')}</p>
                <span className={`horiz-panel-status ${project.status}`}>{project.status}</span>
                <h3 className="horiz-panel-title">{project.name}</h3>
                <p className="horiz-panel-summary">{project.summary}</p>
                <div className="horiz-panel-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.links && project.links.length > 0 && (
                  <div className="horiz-panel-links">
                    {project.links.slice(0, 2).map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="horiz-panel-link"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

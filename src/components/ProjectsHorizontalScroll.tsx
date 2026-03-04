import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { Project } from '../data/projects'
import { getProjectMediaItems } from '../lib/projectMedia'

type ProjectsHorizontalScrollProps = {
  projects: Project[]
  onBoundaryScroll: (direction: 1 | -1) => void
}

const BOUNDARY_COOLDOWN_MS = 900

export function ProjectsHorizontalScroll({ projects, onBoundaryScroll }: ProjectsHorizontalScrollProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', skipSnaps: false })
  const boundaryCooldownRef = useRef(0)
  const [hintVisible, setHintVisible] = useState(true)
  const [mobileLayout, setMobileLayout] = useState(false)
  const [mediaAspectMap, setMediaAspectMap] = useState<Record<string, number>>({})
  const [mediaErrorMap, setMediaErrorMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHintVisible(false)
    }, 5200)
    return () => { window.clearTimeout(timer) }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const widthMedia = window.matchMedia('(max-width: 900px)')
    const pointerMedia = window.matchMedia('(pointer: coarse)')

    const syncMobileLayout = () => {
      setMobileLayout(widthMedia.matches || pointerMedia.matches)
    }

    syncMobileLayout()
    widthMedia.addEventListener('change', syncMobileLayout)
    pointerMedia.addEventListener('change', syncMobileLayout)

    return () => {
      widthMedia.removeEventListener('change', syncMobileLayout)
      pointerMedia.removeEventListener('change', syncMobileLayout)
    }
  }, [])

  const triggerBoundaryScroll = useCallback((direction: 1 | -1) => {
    const now = Date.now()
    if (now < boundaryCooldownRef.current) return
    boundaryCooldownRef.current = now + BOUNDARY_COOLDOWN_MS
    onBoundaryScroll(direction)
  }, [onBoundaryScroll])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      if (hintVisible) setHintVisible(false)
    }
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, hintVisible])

  useEffect(() => {
    if (mobileLayout || !emblaApi) return

    const rootNode = emblaApi.rootNode()

    const onWheel = (event: globalThis.WheelEvent) => {
      const targetElement = event.target instanceof HTMLElement ? event.target : null
      if (targetElement?.closest('input, textarea, select, [contenteditable="true"]')) return

      const rect = rootNode.getBoundingClientRect()
      const visible = rect.bottom > window.innerHeight * 0.14 && rect.top < window.innerHeight * 0.86
      if (!visible) return

      const dominantDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (Math.abs(dominantDelta) < 10) return

      event.preventDefault()

      const canScrollNext = emblaApi.canScrollNext()
      const canScrollPrev = emblaApi.canScrollPrev()

      if (dominantDelta > 0 && !canScrollNext) {
        triggerBoundaryScroll(1)
        return
      }
      if (dominantDelta < 0 && !canScrollPrev) {
        triggerBoundaryScroll(-1)
        return
      }

      if (dominantDelta > 0) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollPrev()
      }

      if (hintVisible) setHintVisible(false)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => { window.removeEventListener('wheel', onWheel) }
  }, [emblaApi, mobileLayout, hintVisible, triggerBoundaryScroll])

  const renderProjectPanel = (project: Project, index: number) => {
    const mediaItems = getProjectMediaItems(project)
    const getMediaTileClassName = (filename: string) => {
      const aspect = mediaAspectMap[filename]
      if (!aspect) return 'projects-panel-media-link'
      if (aspect >= 1.45) return 'projects-panel-media-link is-wide'
      if (aspect <= 0.78) return 'projects-panel-media-link is-tall'
      return 'projects-panel-media-link is-square'
    }

    return (
    <article key={project.id} className={`projects-panel ${project.featured ? 'is-featured' : ''}`}>
      <p className="projects-panel-index">{String(index + 1).padStart(2, '0')}</p>
      <h4>{project.name}</h4>
      <p>{project.summary}</p>
      <p className="projects-panel-tags">{project.tags.join(' · ')}</p>

      {mediaItems.length ? (
        <div className="projects-panel-media-grid">
          {mediaItems.slice(0, 4).map((item) => (
            <a
              key={`${project.id}-${item.filename}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={getMediaTileClassName(item.filename)}
              title={item.filename}
            >
              {item.kind === 'image' && item.previewable && !mediaErrorMap[item.filename] ? (
                <img
                  src={item.href}
                  alt={item.filename}
                  loading="lazy"
                  onLoad={(event) => {
                    const image = event.currentTarget
                    if (!image.naturalWidth || !image.naturalHeight) return
                    const aspect = image.naturalWidth / image.naturalHeight
                    setMediaAspectMap((current) =>
                        current[item.filename] === aspect
                          ? current
                          : { ...current, [item.filename]: aspect },
                    )
                  }}
                  onError={() => {
                    setMediaErrorMap((current) =>
                      current[item.filename] ? current : { ...current, [item.filename]: true },
                    )
                  }}
                />
              ) : item.kind === 'video' && !mediaErrorMap[item.filename] ? (
                <video
                  src={item.href}
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => {
                    const video = event.currentTarget
                    if (!video.videoWidth || !video.videoHeight) return
                    const aspect = video.videoWidth / video.videoHeight
                    setMediaAspectMap((current) =>
                        current[item.filename] === aspect
                          ? current
                          : { ...current, [item.filename]: aspect },
                    )
                  }}
                  onError={() => {
                    setMediaErrorMap((current) =>
                      current[item.filename] ? current : { ...current, [item.filename]: true },
                    )
                  }}
                />
              ) : (
                <span className="projects-panel-media-fallback">{item.filename}</span>
              )}
            </a>
          ))}
        </div>
      ) : null}

      {project.links?.length ? (
        <div className="projects-panel-links">
          {project.links.map((link) => {
            const isExternal = link.href.startsWith('http')
            return (
              <a
                key={`${project.id}-${link.href}`}
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      ) : null}

      <details className="projects-panel-details">
        <summary>Details</summary>
        {project.details.slice(0, 2).map((section) => (
          <div key={`${project.id}-${section.heading}`} className="projects-panel-detail-block">
            <p>{section.heading}</p>
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </details>
    </article>
    )
  }

  return (
    <section className="projects-horizontal" data-disable-route-scroll>
      <div className="projects-track-header">
        <p className="micro-label">Project gallery</p>
        {!mobileLayout && hintVisible ? (
          <p className="projects-scroll-hint">scroll up or down to move sideways -&gt;</p>
        ) : null}
      </div>

      {mobileLayout ? (
        <div className="projects-stack">{projects.map((project, index) => renderProjectPanel(project, index))}</div>
      ) : (
        <div className="projects-embla" ref={emblaRef}>
          <div className="projects-track">
            {projects.map((project, index) => renderProjectPanel(project, index))}
          </div>
        </div>
      )}
    </section>
  )
}

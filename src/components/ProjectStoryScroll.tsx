import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { type Project } from '../data/projects'
import { Chip } from './Chip'
import { CornerBracketsSVG } from './CornerBracketsSVG'
import { LabelTag } from './LabelTag'

type ProjectStoryScrollProps = {
  projects: Project[]
  onOpenProject: (project: Project) => void
  onOpenProjectsPage: () => void
}

const statusLabel: Record<Project['status'], string> = {
  featured: 'FEATURED',
  active: 'ACTIVE',
  team: 'TEAM',
  'in-progress': 'IN PROGRESS',
}

export function ProjectStoryScroll({
  projects,
  onOpenProject,
  onOpenProjectsPage,
}: ProjectStoryScrollProps) {
  const stageRef = useRef<HTMLElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [travelDistance, setTravelDistance] = useState(0)
  const [isCompact, setIsCompact] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const horizontalMode = !isCompact && !prefersReducedMotion

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -travelDistance])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)')
    const onModeChange = () => setIsCompact(media.matches)
    onModeChange()
    media.addEventListener('change', onModeChange)

    return () => {
      media.removeEventListener('change', onModeChange)
    }
  }, [])

  useEffect(() => {
    if (!horizontalMode) {
      setTravelDistance(0)
      return
    }

    const updateDistance = () => {
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!viewport || !track) return

      const nextDistance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      setTravelDistance(nextDistance)
    }

    updateDistance()

    const resizeObserver = new ResizeObserver(updateDistance)
    if (viewportRef.current) resizeObserver.observe(viewportRef.current)
    if (trackRef.current) resizeObserver.observe(trackRef.current)
    window.addEventListener('resize', updateDistance)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDistance)
    }
  }, [horizontalMode, projects.length])

  const sectionHeight = horizontalMode ? `calc(100vh + ${Math.max(travelDistance, 900)}px)` : 'auto'

  return (
    <section
      id="story-projects"
      ref={stageRef}
      className="project-story-stage"
      style={{ height: sectionHeight }}
    >
      <div ref={viewportRef} className="project-story-sticky">
        <CornerBracketsSVG className="opacity-80" />
        <span className="project-story-side-word" aria-hidden="true">
          PROJECT FLOW
        </span>
        <div className="relative z-[1] space-y-4">
          <div className="project-story-header">
            <div className="space-y-3">
              <LabelTag text="FIG.03 / PROJECT STORY" />
              <h2 className="project-story-title">Projects In Motion</h2>
              <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
                Scroll down and the project lineup moves sideways. It is a quick visual run through
                what I am building right now.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenProjectsPage}
              className="btn-outline-mag w-full justify-center sm:w-auto"
            >
              Open Projects Page
            </button>
          </div>

          <div className="project-story-window">
            <motion.div
              ref={trackRef}
              className="project-story-track"
              style={horizontalMode ? { x } : undefined}
            >
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="project-story-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="project-story-card-head">
                    <LabelTag text={statusLabel[project.status]} />
                    <LabelTag text={project.rev} />
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Chip key={`${project.id}-${tag}`} text={tag} />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="project-story-open"
                  >
                    Open Details <ArrowRight size={15} />
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

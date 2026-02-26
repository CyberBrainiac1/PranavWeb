import { useRef, type WheelEvent } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type Project } from '../data/projects'
import { ProjectCard } from './ProjectCard'

type ProjectRailProps = {
  projects: Project[]
  onOpen: (project: Project) => void
}

export function ProjectRail({ projects, onOpen }: ProjectRailProps) {
  const railRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (direction: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.max(280, rail.clientWidth * 0.78)
    rail.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current
    if (!rail) return

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      rail.scrollBy({ left: event.deltaY, behavior: 'auto' })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-100/90">
          Drag or use arrows for side-scroll
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rail-arrow-button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll projects left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="rail-arrow-button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll projects right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <motion.div
        ref={railRef}
        onWheel={handleWheel}
        className="project-rail"
        drag="x"
        dragConstraints={{ left: -160, right: 160 }}
        dragElastic={0.08}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-rail-item"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
          >
            <ProjectCard project={project} onOpen={onOpen} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}



import { ArrowUpRight } from 'lucide-react'
import { type Project } from '../data/projects'
import { Chip } from './Chip'
import { LabelTag } from './LabelTag'
import { cn } from '../lib/utils'

type ProjectCardProps = {
  project: Project
  onOpen: (project: Project) => void
}

const statusLabel: Record<Project['status'], string> = {
  featured: 'FEATURE',
  active: 'ACTIVE',
  team: 'TEAM',
  'in-progress': 'IN PROGRESS',
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const isFeatured = project.featured

  return (
    <article
      className={cn(
        'project-mag-card relative overflow-hidden rounded-2xl p-4 transition',
        isFeatured && 'md:col-span-2 lg:col-span-2',
      )}
    >
      <div className="relative z-[1] flex h-full flex-col">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <LabelTag text={statusLabel[project.status]} />
          <LabelTag text={project.rev} />
        </div>
        <div className="project-mag-thumb relative mb-4 h-40 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_22px,rgba(168,226,255,0.08)_22px_23px)]" />
          <div className="absolute inset-x-0 bottom-2 px-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-100/90">
              {project.spec}
            </p>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Chip key={`${project.id}-${tag}`} text={tag} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="project-mag-open mt-auto inline-flex items-center gap-2 pt-5 text-sm uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
        >
          Details <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  )
}


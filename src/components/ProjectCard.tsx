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
        'relative overflow-hidden rounded-2xl border border-sky-200/20 bg-slate-950/62 p-4 shadow-lg shadow-black/35 transition hover:border-sky-200/40 hover:shadow-sky-500/10',
        isFeatured && 'md:col-span-2 lg:col-span-2',
      )}
    >
      <div className="relative z-[1] flex h-full flex-col">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <LabelTag text={statusLabel[project.status]} />
          <LabelTag text={project.rev} />
        </div>
        <div className="relative mb-4 h-40 overflow-hidden rounded-xl border border-sky-200/20 bg-slate-950/70">
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
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm uppercase tracking-[0.14em] text-sky-100 transition hover:text-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
        >
          Details <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  )
}


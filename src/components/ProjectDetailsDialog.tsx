import { ExternalLink } from 'lucide-react'
import { type Project } from '../data/projects'
import { getProjectMediaItems } from '../lib/projectMedia'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { LabelTag } from './LabelTag'

type ProjectDetailsDialogProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  if (!project) {
    return null
  }

  const mediaItems = getProjectMediaItems(project)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <LabelTag text={project.rev} />
            <LabelTag text={project.spec} />
            <LabelTag text="SPEC SHEET" />
          </div>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.summary}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="spec" className="mt-4">
          <TabsList>
            <TabsTrigger value="spec">Overview</TabsTrigger>
            <TabsTrigger value="narrative">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="spec">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <aside className="rounded-xl border border-sky-200/15 bg-slate-950/55 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-200">
                  QUICK INFO
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <LabelTag key={`${project.id}-tag-${tag}`} text={tag} />
                  ))}
                </div>
                <div className="mt-5 space-y-2 text-sm text-slate-300">
                  <p>
                    <span className="text-sky-100">ID:</span> {project.id}
                  </p>
                  <p>
                    <span className="text-sky-100">REV:</span> {project.rev}
                  </p>
                  <p>
                    <span className="text-sky-100">STATUS:</span> {project.spec}
                  </p>
                </div>
              </aside>

              <div className="rounded-xl border border-sky-200/15 bg-slate-950/55 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-200">
                  NOTES
                </p>
                <ul className="mt-3 space-y-3 text-sm text-slate-300">
                  {project.details.map((section) => (
                    <li key={section.heading}>
                      <p className="text-sky-100">{section.heading}</p>
                      <p className="mt-1 text-slate-300">{section.bullets[0] ?? '[ADD]'}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="narrative">
            <Accordion type="single" collapsible className="space-y-2">
              {project.details.map((section, index) => (
                <AccordionItem key={`${project.id}-${section.heading}`} value={`item-${index}`}>
                  <AccordionTrigger>{section.heading}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-200" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>

        {mediaItems.length ? (
          <div className="project-dialog-media">
            <p className="project-dialog-media-title">Album media</p>
            <div className="project-dialog-media-grid">
              {mediaItems.map((item) => (
                <a
                  key={`${project.id}-${item.filename}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-dialog-media-link"
                  title={item.filename}
                >
                  {item.kind === 'image' && item.previewable ? (
                    <img src={item.href} alt={item.filename} loading="lazy" />
                  ) : item.kind === 'video' ? (
                    <video src={item.href} muted playsInline preload="metadata" />
                  ) : (
                    <span>{item.filename}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {project.links?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <a
                  key={`${project.id}-${link.href}`}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-200/30 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-sky-100 transition hover:border-sky-100/70 hover:text-sky-50 sm:w-auto"
                >
                  {link.label} {external ? <ExternalLink size={12} /> : null}
                </a>
              )
            })}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}


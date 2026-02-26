import { motion } from 'framer-motion'
import { LabelTag } from './LabelTag'

type HeroProps = {
  onOpenProjects: () => void
  onOpenFeaturedStory: () => void
  onContact: () => void
  headlineLines: string[]
  introText: string
}

export function Hero({
  onOpenProjects,
  onOpenFeaturedStory,
  onContact,
  headlineLines,
  introText,
}: HeroProps) {
  const safeHeadlineLines = headlineLines.length ? headlineLines : ['PRANAV EMMADI', 'ROBOTICS BUILDER']

  return (
    <section id="home" className="hero-shell relative overflow-hidden">
      <div className="relative z-[1] grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-5">
          <div className="flex items-center">
            <LabelTag text="Home" />
          </div>
          <h1 className="space-y-1">
            {safeHeadlineLines.map((line, index) => (
              <motion.span
                key={line}
                className="headline-line glitch-line block"
                data-text={line}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.14 * index, duration: 0.45, ease: 'easeOut' }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <p className="hero-intro">{introText}</p>
          <div className="blueprint-panel space-y-3">
            <LabelTag text="Current Focus" />
            <p className="text-sm leading-relaxed text-slate-300">
              Main build right now: Sim Racing Wheel + Force Feedback. I&apos;m tuning it to feel
              smooth, responsive, and easy to keep upgrading.
            </p>
            <button
              type="button"
              onClick={onOpenFeaturedStory}
              className="btn-outline-mag w-full justify-center sm:w-auto"
            >
              Read Wheel Build Log
            </button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onOpenProjects}
              className="btn-primary-mag w-full justify-center sm:w-auto"
            >
              View Projects
            </button>
            <button
              type="button"
              onClick={onContact}
              className="btn-outline-mag w-full justify-center sm:w-auto"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CornerBracketsSVG } from './CornerBracketsSVG'
import { LabelTag } from './LabelTag'

type HeroProps = {
  onViewProjects: () => void
  onContact: () => void
  onSeeBuild: () => void
}

const headlineLines = ['ROBOTICS', 'BUILDER', 'MECH + CONTROL']

export function Hero({ onViewProjects, onContact, onSeeBuild }: HeroProps) {
  return (
    <section id="home" className="hero-shell relative overflow-hidden">
      <CornerBracketsSVG className="opacity-85" />
      <div className="measurement-strip" aria-hidden="true">
        <span>FTC / FRC / MAKER</span>
        <div className="measurement-ticks" />
      </div>
      <div className="relative z-[1] grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-5">
          <div className="flex items-center">
            <LabelTag text="FIG.01 / HERO" />
          </div>
          <h1 className="space-y-1">
            {headlineLines.map((line, index) => (
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
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={onViewProjects}
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

        <div className="space-y-3.5 sm:space-y-4">
          <p className="hero-intro">
            I&apos;m Pranav Emmadi. I build robots, test ideas quickly, and keep what actually
            works in real conditions. I&apos;m based near San Jose.
          </p>
          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="featured-callout"
          >
            <LabelTag text="SPEC" />
            <h2>Featured: Sim Racing Wheel + Force Feedback</h2>
            <p>
              This is my main build right now. I&apos;m focused on making it feel good to drive and
              easy to upgrade over time.
            </p>
            <button
              type="button"
              onClick={onSeeBuild}
              className="inline-flex items-center gap-2 text-emerald-100"
            >
              See the Build <ArrowRight size={15} />
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

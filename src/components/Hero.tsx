import { motion } from 'framer-motion'
import { CornerBracketsSVG } from './CornerBracketsSVG'
import { LabelTag } from './LabelTag'

type HeroProps = {
  onContact: () => void
}

const headlineLines = ['PRANAV', 'EMMADI', 'ROBOTICS BUILDER']

export function Hero({ onContact }: HeroProps) {
  return (
    <section id="home" className="hero-shell relative overflow-hidden">
      <CornerBracketsSVG className="opacity-85" />
      <div className="measurement-strip" aria-hidden="true">
        <span>FTC / MAKER</span>
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
        </div>

        <div className="space-y-4 sm:space-y-5">
          <p className="hero-intro">
            I&apos;m Pranav Emmadi. I love building robots and hardware that actually works when
            it matters. I&apos;m based near San Jose, and I care most about clean design, fast
            testing, and real results.
          </p>
          <div className="blueprint-panel space-y-3">
            <LabelTag text="CURRENT FOCUS" />
            <p className="text-sm leading-relaxed text-slate-300">
              Main build right now: Sim Racing Wheel + Force Feedback. I&apos;m tuning it to feel
              smooth, responsive, and easy to keep upgrading.
            </p>
          </div>
          <button type="button" onClick={onContact} className="btn-primary-mag w-full justify-center sm:w-auto">
            Scroll to Contact
          </button>
        </div>
      </div>
    </section>
  )
}

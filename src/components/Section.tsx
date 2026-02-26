import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LabelTag } from './LabelTag'

type SectionProps = {
  id: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, label, title, subtitle, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="section-shell relative"
    >
      <div className="relative z-[1] space-y-4">
        <LabelTag text={label} />
        <div className="space-y-2">
          <h2 className="section-title">{title}</h2>
          {subtitle ? <p className="max-w-3xl text-sm text-slate-300">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </motion.section>
  )
}

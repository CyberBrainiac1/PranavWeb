import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type SectionProps = {
  id: string
  label: string
  title: string
  subtitle?: string
  children: ReactNode
  narrow?: boolean
}

export function Section({ id, label, title, subtitle, children, narrow }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={narrow ? 'page-shell-narrow' : 'page-shell'}
    >
      <div className="section-label" style={{ marginBottom: 12 }}>{label}</div>
      <h2 style={{ marginBottom: subtitle ? 8 : 24 }}>{title}</h2>
      {subtitle ? (
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
          {subtitle}
        </p>
      ) : null}
      {children}
    </motion.section>
  )
}

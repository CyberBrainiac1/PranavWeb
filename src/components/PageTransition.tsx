import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { PREMIUM_EASE } from '../lib/motionConfig'

type PageTransitionProps = {
  children: ReactNode
  /** Unique key to trigger animation on route change */
  pageKey: string
}

/**
 * Apple-style page transition wrapper.
 * Fades in with a subtle upward slide, fades out quickly.
 */
export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: PREMIUM_EASE,
      }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

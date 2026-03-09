/**
 * Shared motion configuration for consistent animation feel across all sections.
 * Matches Apple-like premium ease-out quality.
 */

/** Premium ease-out cubic-bezier — smooth, restrained, non-bouncy */
export const PREMIUM_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Standard reveal variants for section entries */
export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: PREMIUM_EASE },
  },
} as const

/** Standard stagger container */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
} as const

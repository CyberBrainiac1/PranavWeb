import { cn } from '../lib/utils'

type CornerBracketsSVGProps = {
  className?: string
}

export function CornerBracketsSVG({ className }: CornerBracketsSVGProps) {
  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="rgba(134,220,255,0.5)" strokeWidth="0.32" fill="none">
        <path d="M1 10 V1 H10" />
        <path d="M90 1 H99 V10" />
        <path d="M99 90 V99 H90" />
        <path d="M10 99 H1 V90" />
      </g>
      <g stroke="rgba(134,220,255,0.26)" strokeWidth="0.2" fill="none" strokeDasharray="1.2 0.8">
        <path d="M16 5 H84" />
        <path d="M16 95 H84" />
      </g>
    </svg>
  )
}

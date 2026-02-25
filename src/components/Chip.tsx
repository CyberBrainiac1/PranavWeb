import { cn } from '../lib/utils'

type ChipProps = {
  text: string
  className?: string
}

export function Chip({ text, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-cyan-200/20 bg-slate-900/70 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-cyan-100',
        className,
      )}
    >
      {text}
    </span>
  )
}

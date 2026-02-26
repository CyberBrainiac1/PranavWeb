import { cn } from '../lib/utils'

type ChipProps = {
  text: string
  className?: string
}

export function Chip({ text, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-slate-500/35 bg-slate-900/30 px-2 py-0.5 text-[11px] tracking-[0.03em] text-slate-200',
        className,
      )}
    >
      {text}
    </span>
  )
}


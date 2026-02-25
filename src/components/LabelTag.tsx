import { cn } from '../lib/utils'

type LabelTagProps = {
  text: string
  className?: string
}

export function LabelTag({ text, className }: LabelTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-cyan-200/30 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-100',
        className,
      )}
    >
      {text}
    </span>
  )
}

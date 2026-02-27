import { cn } from '../lib/utils'

type LabelTagProps = {
  text: string
  className?: string
}

export function LabelTag({ text, className }: LabelTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-[10px] uppercase tracking-[0.22em] text-sky-200/80',
        className,
      )}
    >
      {text}
    </span>
  )
}


import { cn } from '../lib/utils'

type LabelTagProps = {
  text: string
  className?: string
}

export function LabelTag({ text, className }: LabelTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-slate-400/35 bg-transparent px-2 py-0.5 text-[11px] font-medium tracking-[0.04em] text-slate-200',
        className,
      )}
    >
      {text}
    </span>
  )
}


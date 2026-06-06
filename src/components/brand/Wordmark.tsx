import { clsx } from 'clsx/lite'

export type WordmarkSize = 'sm' | 'lg'

export interface WordmarkProps {
  /** Drop the mono subtitle line. */
  compact?: boolean
  size?: WordmarkSize
  className?: string
}

const wordSize: Record<WordmarkSize, string> = {
  sm: 'text-2xl',
  lg: 'text-5xl',
}

export function Wordmark({ compact = false, size = 'lg', className = '' }: WordmarkProps) {
  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      <span
        className={clsx(
          'font-serif leading-none tracking-tight text-mauve-900 dark:text-mauve-100',
          wordSize[size]
        )}
      >
        Pristine <span className="text-rose-700 italic dark:text-rose-300">Machine</span>
      </span>
      {!compact && (
        <span className="font-mono text-xs tracking-widest text-mauve-500 uppercase">
          Software · Interfaces · Craft
        </span>
      )}
    </div>
  )
}

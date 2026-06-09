import { clsx } from 'clsx/lite'

export type WordmarkSize = 'sm' | 'lg'

/** Lock the wordmark to a theme, or follow the ambient one (`auto`). */
export type WordmarkTheme = 'auto' | 'light' | 'dark'

export interface WordmarkProps {
  /** Drop the mono subtitle line. */
  compact?: boolean
  size?: WordmarkSize
  /** Pin the colors to one theme instead of following `.dark`. */
  theme?: WordmarkTheme
  className?: string
}

const wordSize: Record<WordmarkSize, string> = {
  sm: 'text-2xl',
  lg: 'text-5xl',
}

const wordColor: Record<WordmarkTheme, string> = {
  auto: 'text-mauve-900 dark:text-mauve-100',
  light: 'text-mauve-900',
  dark: 'text-mauve-100',
}

const accentColor: Record<WordmarkTheme, string> = {
  auto: 'text-rose-700 dark:text-rose-300',
  light: 'text-rose-700',
  dark: 'text-rose-300',
}

export function Wordmark({
  compact = false,
  size = 'lg',
  theme = 'auto',
  className = '',
}: WordmarkProps) {
  return (
    <div className={clsx('inline-flex flex-col gap-1', className)}>
      <span
        className={clsx('font-serif leading-none tracking-tight', wordColor[theme], wordSize[size])}
      >
        Pristine <span className={clsx('italic', accentColor[theme])}>Machine</span>
      </span>
      {!compact && (
        <span className="font-mono text-xs tracking-widest text-mauve-500 uppercase">
          Software · Interfaces · Craft
        </span>
      )}
    </div>
  )
}

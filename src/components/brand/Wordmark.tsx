import { clsx } from 'clsx/lite'

import { BrandMark } from '@/components/brand/BrandMark'

export type WordmarkSize = 'sm' | 'lg'

/** Lock the wordmark to a theme, or follow the ambient one (`auto`). */
export type WordmarkTheme = 'auto' | 'light' | 'dark'

export type WordmarkProps = {
  size?: WordmarkSize
  /** Pin the colors to one theme instead of following `.dark`. */
  theme?: WordmarkTheme
  /** Show the brand mark before the wordmark. */
  withMark?: boolean
  className?: string
}

const markSize: Record<WordmarkSize, string> = {
  sm: 'size-8',
  lg: 'size-14',
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
  size = 'lg',
  theme = 'auto',
  withMark = false,
  className = '',
}: WordmarkProps) {
  const word = (
    <span
      className={clsx('font-serif leading-none tracking-tight', wordColor[theme], wordSize[size])}
    >
      Pristine <span className={clsx('italic', accentColor[theme])}>Machine</span>
    </span>
  )

  if (!withMark) {
    return <div className={clsx('inline-flex', className)}>{word}</div>
  }

  return (
    <div className={clsx('inline-flex items-center gap-3', className)}>
      <BrandMark variant="outline" theme={theme} className={clsx('shrink-0', markSize[size])} />
      {word}
    </div>
  )
}

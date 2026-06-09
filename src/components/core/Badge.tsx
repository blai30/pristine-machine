import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

import { semanticTone, type SemanticTone } from '@/lib/styles'

export type BadgeVariant =
  | 'neutral'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'solid'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  /** Show a leading status dot in the current text color. */
  dot?: boolean
  /** API parity with the source system; corners are squared either way. */
  square?: boolean
}

const base =
  'inline-flex items-center gap-1 h-6 px-2 rounded-none border font-mono text-xs font-medium tracking-wide leading-none whitespace-nowrap'

const semantic = (tone: SemanticTone) =>
  clsx('border-transparent', semanticTone[tone].fill, semanticTone[tone].fg)

const variants: Record<BadgeVariant, string> = {
  neutral:
    'bg-mauve-200 text-mauve-600 border-mauve-200 dark:bg-mauve-700 dark:text-mauve-400 dark:border-mauve-700',
  accent: 'border-transparent bg-rose-50 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
  success: semantic('success'),
  warning: semantic('warning'),
  danger: semantic('danger'),
  info: semantic('info'),
  solid: 'border-transparent bg-rose-500 text-white dark:bg-rose-400 dark:text-rose-950',
}

export function Badge({
  children,
  variant = 'neutral',
  dot = false,
  square = false,
  className = '',
  ...rest
}: BadgeProps) {
  void square
  return (
    <span className={clsx(base, variants[variant], className)} {...rest}>
      {dot && <span className="size-1.5 shrink-0 bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}

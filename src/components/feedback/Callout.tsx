import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'

import { semanticTone, type SemanticTone } from '@/lib/styles'

export type CalloutVariant = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CalloutVariant
  title?: ReactNode
  icon?: ReactNode
}

const base =
  'flex gap-3 px-4 py-3.5 rounded-none border border-l-4 font-sans text-base leading-normal text-mauve-900 dark:text-mauve-100'

const semantic = (tone: SemanticTone) => ({
  box: clsx(semanticTone[tone].fill, semanticTone[tone].border),
  icon: semanticTone[tone].fg,
})

const tones: Record<CalloutVariant, { box: string; icon: string }> = {
  neutral: {
    box: 'bg-mauve-200 border-mauve-300 dark:bg-mauve-700 dark:border-mauve-600',
    icon: 'text-mauve-600 dark:text-mauve-400',
  },
  accent: {
    box: 'bg-rose-50 border-rose-400 dark:bg-rose-400/15 dark:border-rose-600',
    icon: 'text-rose-500 dark:text-rose-400',
  },
  info: semantic('info'),
  success: semantic('success'),
  warning: semantic('warning'),
  danger: semantic('danger'),
}

export function Callout({
  children,
  title,
  variant = 'neutral',
  icon = null,
  className = '',
  ...rest
}: CalloutProps) {
  const tone = tones[variant]
  return (
    <div className={clsx(base, tone.box, className)} role="note" {...rest}>
      {icon && (
        <span
          className={clsx('mt-px inline-flex shrink-0 [&_svg]:size-4.5', tone.icon)}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <div>
        {title && <div className="mb-0.5 font-semibold">{title}</div>}
        <div className="text-mauve-600 dark:text-mauve-400">{children}</div>
      </div>
    </div>
  )
}

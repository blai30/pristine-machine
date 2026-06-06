import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'

export type CalloutVariant = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CalloutVariant
  title?: ReactNode
  icon?: ReactNode
}

const base =
  'flex gap-3 px-4 py-3.5 rounded-none border border-l-4 font-sans text-base leading-normal text-mauve-900 dark:text-mauve-100'

const tones: Record<CalloutVariant, { box: string; icon: string }> = {
  neutral: {
    box: 'bg-mauve-200 border-mauve-300 dark:bg-mauve-700 dark:border-mauve-600',
    icon: 'text-mauve-600 dark:text-mauve-400',
  },
  accent: {
    box: 'bg-rose-50 border-rose-400 dark:bg-rose-400/15 dark:border-rose-600',
    icon: 'text-rose-500 dark:text-rose-400',
  },
  info: {
    box: 'bg-blue-50 border-blue-400 dark:bg-blue-400/15 dark:border-blue-600',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    box: 'bg-emerald-50 border-emerald-400 dark:bg-emerald-400/15 dark:border-emerald-600',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    box: 'bg-amber-50 border-amber-400 dark:bg-amber-400/15 dark:border-amber-600',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  danger: {
    box: 'bg-red-50 border-red-400 dark:bg-red-400/15 dark:border-red-600',
    icon: 'text-red-600 dark:text-red-400',
  },
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

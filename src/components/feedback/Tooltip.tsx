import type { HTMLAttributes, ReactNode } from 'react'

import { clsx } from 'clsx/lite'

export type TooltipPlacement = 'top' | 'bottom'

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode
  placement?: TooltipPlacement
}

const bubbleBase =
  'pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-none bg-mauve-900 px-2 py-1.5 font-mono text-xs leading-tight text-mauve-50 opacity-0 shadow-md shadow-rose-900/20 transition duration-150 ease-out dark:bg-mauve-100 dark:text-mauve-900'

const placements: Record<TooltipPlacement, { bubble: string; arrow: string }> = {
  top: {
    bubble:
      'bottom-full mb-2 translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100',
    arrow: 'top-full -translate-y-1/2',
  },
  bottom: {
    bubble:
      'top-full mt-2 -translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100',
    arrow: 'bottom-full translate-y-1/2',
  },
}

export function Tooltip({
  children,
  label,
  placement = 'top',
  className = '',
  ...rest
}: TooltipProps) {
  const place = placements[placement]
  return (
    <span className={clsx('group relative inline-flex', className)} {...rest}>
      {children}
      <span role="tooltip" className={clsx(bubbleBase, place.bubble)}>
        {label}
        <span
          aria-hidden="true"
          className={clsx(
            'absolute left-1/2 size-2 -translate-x-1/2 rotate-45 bg-mauve-900 dark:bg-mauve-100',
            place.arrow
          )}
        />
      </span>
    </span>
  )
}

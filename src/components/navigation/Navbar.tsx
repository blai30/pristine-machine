import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'

import { focusRing } from '@/lib/styles'

export interface NavbarItem {
  id: string
  label: ReactNode
}

export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  items?: NavbarItem[]
  /** Id of the active item — highlighted in the accent color with an underline. */
  activeId?: string
  onNavigate?: (id: string) => void
  /** Leading slot, e.g. a brand mark. */
  start?: ReactNode
  /** Trailing slot, e.g. actions. */
  end?: ReactNode
  /** Pin to the top of the scroll container (default true). */
  sticky?: boolean
}

export function Navbar({
  items = [],
  activeId,
  onNavigate,
  start,
  end,
  sticky = true,
  className = '',
  ...rest
}: NavbarProps) {
  return (
    <header
      className={clsx(
        'z-20 flex items-center gap-6 border-b border-mauve-300 bg-mauve-100/90 px-6 py-3 backdrop-blur-xl sm:px-10 dark:border-mauve-700 dark:bg-mauve-900/90',
        sticky ? 'sticky top-0' : 'relative',
        className
      )}
      {...rest}
    >
      {start && <div className="shrink-0">{start}</div>}
      {items.length > 0 && (
        <nav
          aria-label="Sections"
          className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-7 gap-y-1"
        >
          {items.map((item) => {
            const active = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => onNavigate?.(item.id)}
                className={clsx(
                  'rounded-none py-1 font-mono text-xs font-medium tracking-widest whitespace-nowrap uppercase transition-colors duration-150 ease-out',
                  active
                    ? 'text-rose-600 dark:text-rose-300'
                    : 'text-mauve-500 hover:text-mauve-900 dark:text-mauve-400 dark:hover:text-mauve-100',
                  focusRing
                )}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      )}
      {end && <div className="ml-auto flex shrink-0 items-center gap-3">{end}</div>}
    </header>
  )
}

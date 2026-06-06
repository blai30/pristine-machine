import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'

import { focusRing } from '@/lib/styles'

export interface SideNavItem {
  id: string
  label: ReactNode
}

export interface SideNavSection {
  id: string
  label: ReactNode
  /** Optional ordinal, rendered before the label in the accent color. */
  number?: number
  items?: SideNavItem[]
}

export interface SideNavProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  sections: SideNavSection[]
  /** Id of the currently active item (or section) — highlighted in the accent color. */
  activeId?: string
  /** Called with the id when a link is activated. */
  onNavigate?: (id: string) => void
}

export function SideNav({ sections, activeId, onNavigate, className = '', ...rest }: SideNavProps) {
  return (
    <nav aria-label="Sections" className={clsx('flex flex-col gap-7', className)} {...rest}>
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-2.5">
          <a
            href={`#${section.id}`}
            onClick={() => onNavigate?.(section.id)}
            className={clsx(
              'font-mono text-xs font-medium tracking-widest uppercase transition-colors duration-150 ease-out',
              activeId === section.id
                ? 'text-mauve-900 dark:text-mauve-100'
                : 'text-mauve-500 hover:text-mauve-900 dark:hover:text-mauve-100',
              focusRing
            )}
          >
            {section.number != null && (
              <span className="text-rose-500 dark:text-rose-400">{section.number}.</span>
            )}{' '}
            {section.label}
          </a>
          {section.items && section.items.length > 0 && (
            <ul className="flex flex-col">
              {section.items.map((item) => {
                const active = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active ? 'true' : undefined}
                      onClick={() => onNavigate?.(item.id)}
                      className={clsx(
                        'block border-l py-1.5 pl-3 font-sans text-sm transition-colors duration-150 ease-out',
                        active
                          ? 'border-rose-500 text-rose-700 dark:border-rose-400 dark:text-rose-300'
                          : 'border-mauve-200 text-mauve-600 hover:border-mauve-400 hover:text-mauve-900 dark:border-mauve-700 dark:text-mauve-400 dark:hover:text-mauve-100',
                        focusRing
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )
}

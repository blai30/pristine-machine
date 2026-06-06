import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

/**
 * Sticky full-height sidebar shell with a vertical rail. Compose a brand mark,
 * SideNav, and footer inside it. Pass `className` to control display/width
 * (e.g. `hidden lg:flex` to hide it on small screens).
 */
export function Sidebar({ children, className = 'flex', ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={clsx(
        'sticky top-0 h-screen w-64 shrink-0 flex-col gap-8 overflow-y-auto border-r border-mauve-300 p-6 dark:border-mauve-700',
        className
      )}
      {...rest}
    >
      {children}
    </aside>
  )
}

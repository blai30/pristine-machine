import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'
import { useEffect } from 'react'

export type DrawerSide = 'left' | 'right'

export interface DrawerProps extends HTMLAttributes<HTMLElement> {
  open: boolean
  onClose: () => void
  /** Edge the panel slides in from (default left). */
  side?: DrawerSide
  children: ReactNode
}

const sides: Record<DrawerSide, { edge: string; closed: string }> = {
  left: { edge: 'left-0 border-r', closed: '-translate-x-full' },
  right: { edge: 'right-0 border-l', closed: 'translate-x-full' },
}

/**
 * Off-canvas overlay drawer — slides a panel in from a screen edge over a dimmed scrim.
 * Controlled via `open`/`onClose`; closes on scrim click or Escape. Compose any content
 * inside (e.g. a `SideNav`). Width/layout can be overridden via `className`.
 */
export function Drawer({
  open,
  onClose,
  side = 'left',
  className = '',
  children,
  ...rest
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const place = sides[side]
  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={clsx(
          'fixed inset-0 z-40 bg-mauve-950/50 transition-opacity duration-200 ease-out',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />
      <aside
        inert={!open}
        className={clsx(
          'fixed inset-y-0 z-50 flex w-72 flex-col gap-8 overflow-y-auto border-mauve-300 bg-mauve-100 p-6 transition-transform duration-200 ease-out dark:border-mauve-700 dark:bg-mauve-900',
          place.edge,
          open ? 'translate-x-0' : place.closed,
          className
        )}
        {...rest}
      >
        {children}
      </aside>
    </>
  )
}

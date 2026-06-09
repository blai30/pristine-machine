import { Dialog } from '@base-ui/react/dialog'
import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'

export type DrawerSide = 'left' | 'right'

export type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean
  onClose: () => void
  /** Edge the panel slides in from (default left). */
  side?: DrawerSide
  children: ReactNode
}

const sides: Record<DrawerSide, { edge: string; offscreen: string }> = {
  left: {
    edge: 'left-0 border-r',
    offscreen: 'data-starting-style:-translate-x-full data-ending-style:-translate-x-full',
  },
  right: {
    edge: 'right-0 border-l',
    offscreen: 'data-starting-style:translate-x-full data-ending-style:translate-x-full',
  },
}

/**
 * Off-canvas overlay drawer — slides a panel in from a screen edge over a dimmed scrim.
 * Controlled via `open`/`onClose`; built on Base UI Dialog, so it traps focus, locks page
 * scroll, restores focus on close, and dismisses on scrim click or Escape. Compose any
 * content inside (e.g. a `SideNav`). Width/layout can be overridden via `className`.
 */
export function Drawer({
  open,
  onClose,
  side = 'left',
  className = '',
  children,
  ...rest
}: DrawerProps) {
  const place = sides[side]
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-mauve-950/50 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className={clsx(
            'fixed inset-y-0 z-50 flex w-72 flex-col gap-8 overflow-y-auto border-mauve-300 bg-mauve-100 p-6 transition-transform duration-200 ease-out outline-none dark:border-mauve-700 dark:bg-mauve-900',
            place.edge,
            place.offscreen,
            className
          )}
          {...rest}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

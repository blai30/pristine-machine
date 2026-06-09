import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export type ScrollAreaProps = {
  children: ReactNode
  /** Size the scroll region here (e.g. `h-48`). */
  className?: string
}

const scrollbar =
  'flex touch-none p-0.5 opacity-0 transition-opacity delay-300 select-none data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:opacity-100 data-scrolling:delay-0'

const thumb = 'rounded-none bg-mauve-300 dark:bg-mauve-600'

/**
 * Scrollable region with plum-tinted overlay scrollbars, built on Base UI ScrollArea.
 * Set the bounding size via `className` (e.g. `h-48 w-full`); the content scrolls within.
 */
export function ScrollArea({ children, className = '' }: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root className={clsx('relative overflow-hidden', className)}>
      <BaseScrollArea.Viewport className="size-full overscroll-contain rounded-none focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:focus-visible:ring-rose-400/25">
        {children}
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar orientation="vertical" className={clsx('w-2', scrollbar)}>
        <BaseScrollArea.Thumb className={clsx('w-full', thumb)} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar
        orientation="horizontal"
        className={clsx('h-2 flex-col', scrollbar)}
      >
        <BaseScrollArea.Thumb className={clsx('h-full', thumb)} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner />
    </BaseScrollArea.Root>
  )
}

import { clsx } from 'clsx/lite'
import type { HTMLAttributes, ReactNode } from 'react'

export type PlusCorner = 'tl' | 'tr' | 'bl' | 'br'

const cornerPos: Record<PlusCorner, string> = {
  tl: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  tr: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  bl: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  br: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
}

// Centered on the rails horizontally, but kept inside the frame vertically so the
// top/bottom ticks never overflow and extend the page height.
const cornerPosInsetY: Record<PlusCorner, string> = {
  tl: 'top-0 left-0 -translate-x-1/2',
  tr: 'top-0 right-0 translate-x-1/2',
  bl: 'bottom-0 left-0 -translate-x-1/2',
  br: 'bottom-0 right-0 translate-x-1/2',
}

/** A plum "+" junction tick, 14px (space-3.5) with a 2px (border-2) stroke, centered on a corner point. */
export function PlusTick({
  corner,
  insetY = false,
  className,
}: {
  corner: PlusCorner
  /** Keep the tick inside the frame vertically (no top/bottom overflow). */
  insetY?: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute z-10 size-3.5',
        (insetY ? cornerPosInsetY : cornerPos)[corner],
        className
      )}
    >
      <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-rose-500 dark:bg-rose-400" />
      <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-rose-500 dark:bg-rose-400" />
    </span>
  )
}

/** Full-bleed horizontal divider; optionally drops "+" ticks where it meets the rails. */
export function BlueprintDivider({
  ticked = false,
  className,
}: {
  ticked?: boolean
  className?: string
}) {
  return (
    <div className={clsx('relative border-t border-mauve-200 dark:border-mauve-700', className)}>
      {ticked && (
        <>
          <PlusTick corner="tl" />
          <PlusTick corner="tr" />
        </>
      )}
    </div>
  )
}

/** Signature blueprint page frame: a centered column bounded by vertical rails with corner "+" ticks. */
export function BlueprintFrame({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-mauve-100 dark:bg-mauve-900">
      {/* "Out of bounds" diagonal hatch — fills the gutters; the solid frame masks the center. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0,currentColor_0.03125rem,currentColor_0.09375rem,transparent_0.125rem,transparent_0.875rem)] text-mauve-300/70 dark:text-mauve-700/70"
      />
      <div
        className={clsx(
          'relative mx-auto min-h-screen max-w-6xl border-x border-mauve-200 bg-mauve-100 dark:border-mauve-700 dark:bg-mauve-900',
          className
        )}
        {...rest}
      >
        <PlusTick corner="tl" insetY />
        <PlusTick corner="tr" insetY />
        <PlusTick corner="bl" insetY />
        <PlusTick corner="br" insetY />
        {children}
      </div>
    </div>
  )
}

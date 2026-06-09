import { clsx } from 'clsx/lite'

import { BrandMark } from '@/components/brand/BrandMark'
import type { BrandMarkTheme } from '@/components/brand/BrandMark'

export type SpinnerProps = {
  /** Pin colors to one theme instead of following `.dark`. */
  theme?: BrandMarkTheme
  /** Accessible status label. */
  label?: string
  className?: string
}

const arcColor: Record<BrandMarkTheme, string> = {
  auto: 'stroke-rose-500/40 dark:stroke-rose-400/40',
  light: 'stroke-rose-500/40',
  dark: 'stroke-rose-400/40',
}

/**
 * Loading state: a static brand mark under a sweeping arc that rotates via the
 * built-in `animate-spin`. No custom keyframes.
 */
export function Spinner({ theme = 'auto', label = 'Loading', className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={clsx('relative inline-flex size-10 items-center justify-center', className)}
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 size-full origin-center animate-spin"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="70 220"
          className={arcColor[theme]}
        />
      </svg>
      <BrandMark theme={theme} className="size-6" />
    </span>
  )
}

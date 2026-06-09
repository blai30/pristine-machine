/**
 * Shared Tailwind class fragments for recurring Pristine Machine tokens.
 * Translating the design's CSS-variable patterns once, reused across components.
 */

/** --ring: plum-tinted focus ring (rose-tinted, squared corners). */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 dark:focus-visible:ring-rose-400/25'

/** Mono eyebrow label — uppercase, wide tracking (--tracking-label 0.14em). */
export const eyebrow = 'font-mono text-xs font-medium uppercase tracking-widest text-mauve-500'

/** The four status hues that share the documented semantic ramp. */
export type SemanticTone = 'info' | 'success' | 'warning' | 'danger'

/**
 * The documented semantic ramp, one entry per status hue. `fill` is the soft surface
 * (50, or 400 at 15% in dark), `fg` the 600/400 foreground step, `border` the all-sides
 * 400/600 edge, and `edge` that same step as a left-only accent bar. Literal strings so
 * Tailwind's JIT can see every class.
 */
export const semanticTone: Record<
  SemanticTone,
  { fill: string; fg: string; border: string; edge: string }
> = {
  info: {
    fill: 'bg-blue-50 dark:bg-blue-400/15',
    fg: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-400 dark:border-blue-600',
    edge: 'border-l-blue-400 dark:border-l-blue-600',
  },
  success: {
    fill: 'bg-emerald-50 dark:bg-emerald-400/15',
    fg: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-400 dark:border-emerald-600',
    edge: 'border-l-emerald-400 dark:border-l-emerald-600',
  },
  warning: {
    fill: 'bg-amber-50 dark:bg-amber-400/15',
    fg: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-400 dark:border-amber-600',
    edge: 'border-l-amber-400 dark:border-l-amber-600',
  },
  danger: {
    fill: 'bg-red-50 dark:bg-red-400/15',
    fg: 'text-red-600 dark:text-red-400',
    border: 'border-red-400 dark:border-red-600',
    edge: 'border-l-red-400 dark:border-l-red-600',
  },
}

import { clsx } from 'clsx/lite'
import { useId } from 'react'

/** Lock the mark to a theme, or follow the ambient one (`auto`). */
export type BrandMarkTheme = 'auto' | 'light' | 'dark'

/** `filled` = solid figure with negative-space detailing; `outline` = line-work. */
export type BrandMarkVariant = 'filled' | 'outline'

export interface BrandMarkProps {
  variant?: BrandMarkVariant
  /** Pin the colors to one theme instead of following `.dark`. */
  theme?: BrandMarkTheme
  className?: string
}

const LOBE = 'M50 50 C 36 46, 31 30, 40 20 C 45 14, 55 14, 60 20 C 69 30, 64 46, 50 50 Z'

const ANGLES = [0, 1, 2, 3, 4]

const SPOKES = ANGLES.map((index) => {
  const angle = (index * 72 - 90) * (Math.PI / 180)
  return { x: +(50 + 18 * Math.cos(angle)).toFixed(2), y: +(50 + 18 * Math.sin(angle)).toFixed(2) }
})

const fillColor: Record<BrandMarkTheme, string> = {
  auto: 'fill-rose-500 dark:fill-rose-400',
  light: 'fill-rose-500',
  dark: 'fill-rose-400',
}

const lobeStroke: Record<BrandMarkTheme, string> = {
  auto: 'stroke-rose-500 dark:stroke-rose-400',
  light: 'stroke-rose-500',
  dark: 'stroke-rose-400',
}

const spokeColor: Record<BrandMarkTheme, string> = {
  auto: 'stroke-rose-700 fill-rose-700 dark:stroke-rose-300 dark:fill-rose-300',
  light: 'stroke-rose-700 fill-rose-700',
  dark: 'stroke-rose-300 fill-rose-300',
}

/**
 * The Pristine Machine brand mark. `filled` (default) is a solid figure with the
 * interior spokes knocked out as negative space; `outline` is the line-work form.
 * Geometry lives in SVG attributes (unitless vector coords, never px); color lives
 * in Tailwind classes.
 */
export function BrandMark({ variant = 'filled', theme = 'auto', className }: BrandMarkProps) {
  const maskId = useId()

  if (variant === 'outline') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true" className={clsx('size-6', className)}>
        {ANGLES.map((index) => (
          <path
            key={index}
            d={LOBE}
            fill="none"
            strokeWidth={1.7}
            strokeLinejoin="round"
            transform={`rotate(${index * 72} 50 50)`}
            className={lobeStroke[theme]}
          />
        ))}
        {SPOKES.map((point, index) => (
          <line
            key={index}
            x1="50"
            y1="50"
            x2={point.x}
            y2={point.y}
            strokeWidth={1.1}
            className={spokeColor[theme]}
          />
        ))}
        {SPOKES.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={1.7} className={spokeColor[theme]} />
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={clsx('size-6', className)}>
      <mask id={maskId}>
        <rect x="0" y="0" width="100" height="100" fill="white" />
        {SPOKES.map((point, index) => (
          <line
            key={index}
            x1="50"
            y1="50"
            x2={point.x}
            y2={point.y}
            stroke="black"
            strokeWidth={2.6}
            strokeLinecap="round"
          />
        ))}
        {SPOKES.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={3} fill="black" />
        ))}
        <circle cx="50" cy="50" r="2.4" fill="black" />
      </mask>
      <g mask={`url(#${maskId})`} className={fillColor[theme]}>
        {ANGLES.map((index) => (
          <path key={index} d={LOBE} transform={`rotate(${index * 72} 50 50)`} />
        ))}
      </g>
    </svg>
  )
}

import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

// Hand-drawn ability icons for the PreviewCard hotbar demo. Three tones only:
// dark mauve (the tile), white (primary forms), rose (accents) - all via Tailwind
// fill-*/stroke-* utilities so they track the palette and respond to nothing but the art.

const tile = 'grid shrink-0 place-items-center rounded-none border border-mauve-700 bg-mauve-900'

// Reusable 4-point sparkle, centred on the origin (translate/scale into place).
const sparkle =
  'M0 -5 C 0.6 -1.6 1.6 -0.6 5 0 C 1.6 0.6 0.6 1.6 0 5 C -0.6 1.6 -1.6 0.6 -5 0 C -1.6 -0.6 -0.6 -1.6 0 -5 Z'

const art: Record<string, ReactNode> = {
  // Petal Slash - a sweeping double slash with a plum blossom flung off the tip.
  Q: (
    <>
      <path
        className="fill-none stroke-white"
        strokeWidth={2.4}
        strokeLinecap="round"
        d="M4 18.5 A 14.5 14.5 0 0 1 18.5 4"
      />
      <path
        className="fill-none stroke-white/55"
        strokeWidth={1.3}
        strokeLinecap="round"
        d="M7.5 20.5 A 13 13 0 0 1 20.5 7.5"
      />
      <g transform="translate(18.4 5.6)">
        <g className="fill-rose-400">
          <circle cx="0" cy="-2.3" r="1.5" />
          <circle cx="2.19" cy="-0.71" r="1.5" />
          <circle cx="1.35" cy="1.86" r="1.5" />
          <circle cx="-1.35" cy="1.86" r="1.5" />
          <circle cx="-2.19" cy="-0.71" r="1.5" />
        </g>
        <circle className="fill-white" cx="0" cy="0" r="1.1" />
      </g>
    </>
  ),
  // Enchant Weapon - an upright blade haloed by sparks of magic.
  W: (
    <>
      <g className="fill-white">
        <path d="M12 2.4 L 13.5 6 L 13.5 14.4 L 12 16.4 L 10.5 14.4 L 10.5 6 Z" />
        <path d="M7.5 14.2 H 16.5 V 15.9 H 7.5 Z" />
        <path d="M11.2 15.9 H 12.8 V 19.4 H 11.2 Z" />
        <circle cx="12" cy="20.6" r="1.4" />
      </g>
      <path className="fill-rose-400" transform="translate(18.2 5) scale(0.85)" d={sparkle} />
      <path className="fill-rose-400" transform="translate(6 9.5) scale(0.55)" d={sparkle} />
    </>
  ),
  // Serene Flash - a bright spark streaking past trailing motion lines.
  E: (
    <>
      <g className="fill-none stroke-white" strokeWidth={2} strokeLinecap="round">
        <path d="M3 8 H 10.5" />
        <path d="M4.5 12 H 13" />
        <path d="M3 16 H 9.5" />
      </g>
      <path className="fill-rose-400" transform="translate(17.5 12) scale(1.35)" d={sparkle} />
    </>
  ),
  // Blade Dance - twin blades crossed inside a spinning ring.
  R: (
    <>
      <path
        className="fill-none stroke-rose-400"
        strokeWidth={2}
        strokeLinecap="round"
        d="M18.6 8.4 A 8.6 8.6 0 1 1 10.8 3.6"
      />
      <g className="fill-white" transform="translate(12 12.5) rotate(-32)">
        <polygon points="0,-11 1.1,-2 1.1,3 -1.1,3 -1.1,-2" />
        <rect x="-3.6" y="3" width="7.2" height="1.5" />
        <rect x="-0.9" y="4.5" width="1.8" height="3.6" />
        <circle cx="0" cy="9" r="1.2" />
      </g>
      <g className="fill-white" transform="translate(12 12.5) rotate(32)">
        <polygon points="0,-11 1.1,-2 1.1,3 -1.1,3 -1.1,-2" />
        <rect x="-3.6" y="3" width="7.2" height="1.5" />
        <rect x="-0.9" y="4.5" width="1.8" height="3.6" />
        <circle cx="0" cy="9" r="1.2" />
      </g>
    </>
  ),
}

export type SkillIconProps = {
  /** Hotbar key (Q/W/E/R) selecting which ability art to render. */
  skillKey: string
  /** Sizes the square tile (e.g. `size-12`). */
  className?: string
}

export function SkillIcon({ skillKey, className = '' }: SkillIconProps) {
  return (
    <span className={clsx(tile, className)}>
      <svg viewBox="0 0 24 24" className="size-2/3" aria-hidden="true">
        {art[skillKey]}
      </svg>
    </span>
  )
}

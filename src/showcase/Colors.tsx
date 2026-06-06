import { clsx } from 'clsx/lite'

import { Section, Spec } from '@/showcase/ui'

type Swatch = { step: string; bg: string; text: string }

const roseRamp: Swatch[] = [
  { step: '50', bg: 'bg-rose-50', text: 'text-rose-700' },
  { step: '100', bg: 'bg-rose-100', text: 'text-rose-700' },
  { step: '200', bg: 'bg-rose-200', text: 'text-rose-700' },
  { step: '300', bg: 'bg-rose-300', text: 'text-rose-800' },
  { step: '400', bg: 'bg-rose-400', text: 'text-white' },
  { step: '500', bg: 'bg-rose-500', text: 'text-white' },
  { step: '600', bg: 'bg-rose-600', text: 'text-white' },
  { step: '700', bg: 'bg-rose-700', text: 'text-white' },
  { step: '800', bg: 'bg-rose-800', text: 'text-white' },
  { step: '900', bg: 'bg-rose-900', text: 'text-white' },
  { step: '950', bg: 'bg-rose-950', text: 'text-white' },
]

const mauveRamp: Swatch[] = [
  { step: '50', bg: 'bg-mauve-50', text: 'text-mauve-700' },
  { step: '100', bg: 'bg-mauve-100', text: 'text-mauve-700' },
  { step: '200', bg: 'bg-mauve-200', text: 'text-mauve-700' },
  { step: '300', bg: 'bg-mauve-300', text: 'text-mauve-800' },
  { step: '400', bg: 'bg-mauve-400', text: 'text-white' },
  { step: '500', bg: 'bg-mauve-500', text: 'text-white' },
  { step: '600', bg: 'bg-mauve-600', text: 'text-white' },
  { step: '700', bg: 'bg-mauve-700', text: 'text-white' },
  { step: '800', bg: 'bg-mauve-800', text: 'text-white' },
  { step: '900', bg: 'bg-mauve-900', text: 'text-white' },
  { step: '950', bg: 'bg-mauve-950', text: 'text-white' },
]

const lightSurfaces = [
  { name: 'well', note: 'over-extend', bg: 'bg-mauve-50' },
  { name: 'bg', note: 'canvas', bg: 'bg-mauve-100' },
  { name: 'surface', note: 'cards', bg: 'bg-white' },
  { name: 'surface-2', note: 'sunken', bg: 'bg-mauve-200' },
  { name: 'accent-soft', note: 'tint', bg: 'bg-rose-50' },
]

const darkSurfaces = [
  { name: 'well', note: 'over-extend', bg: 'bg-mauve-950' },
  { name: 'bg', note: 'canvas', bg: 'bg-mauve-900' },
  { name: 'surface', note: 'cards', bg: 'bg-mauve-800' },
  { name: 'surface-2', note: 'sunken', bg: 'bg-mauve-700' },
  { name: 'accent-soft', note: 'tint', bg: 'bg-rose-400/15' },
]

const semantics = [
  {
    name: 'Success',
    solid: 'bg-emerald-400',
    soft: 'bg-emerald-50 dark:bg-emerald-400/15',
    label: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'Warning',
    solid: 'bg-amber-400',
    soft: 'bg-amber-50 dark:bg-amber-400/15',
    label: 'text-amber-600 dark:text-amber-400',
  },
  {
    name: 'Danger',
    solid: 'bg-red-400',
    soft: 'bg-red-50 dark:bg-red-400/15',
    label: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'Info',
    solid: 'bg-blue-400',
    soft: 'bg-blue-50 dark:bg-blue-400/15',
    label: 'text-blue-600 dark:text-blue-400',
  },
]

function Ramp({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="flex w-full overflow-hidden rounded-none border border-mauve-200 shadow-sm shadow-rose-900/10 dark:border-mauve-700">
      {swatches.map((swatch) => (
        <div
          key={swatch.step}
          className={clsx(
            'flex h-20 flex-1 items-end p-2 font-mono text-xs',
            swatch.bg,
            swatch.text
          )}
        >
          {swatch.step}
        </div>
      ))}
    </div>
  )
}

function SurfaceTiles({
  tiles,
  backing,
  text,
}: {
  tiles: { name: string; note: string; bg: string }[]
  backing: string
  text: string
}) {
  return (
    <div
      className={clsx(
        'flex flex-wrap gap-2 rounded-none border border-mauve-200 p-2 dark:border-mauve-700',
        backing
      )}
    >
      {tiles.map((tile) => (
        <div
          key={tile.name}
          className={clsx(
            'flex h-24 flex-1 flex-col justify-end gap-0.5 rounded-none border border-mauve-300/40 p-2.5',
            tile.bg
          )}
        >
          <span className={clsx('font-mono text-xs font-medium', text)}>{tile.name}</span>
          <span className={clsx('font-mono text-xs opacity-70', text)}>{tile.note}</span>
        </div>
      ))}
    </div>
  )
}

export function Colors() {
  return (
    <Section
      id="colors"
      label="Color"
      title="Plum blossom, on Tailwind's spectrums"
      emphasis="blossom"
      subtitle="Rose carries the blossom accent; mauve supplies the plum-tinted neutrals. Semantics borrow emerald, amber, red and blue — softened to suit the palette."
    >
      <div className="flex flex-col gap-10">
        <Spec name="Rose · blossom accent" row={false}>
          <Ramp swatches={roseRamp} />
        </Spec>

        <Spec name="Mauve · plum neutrals" row={false}>
          <Ramp swatches={mauveRamp} />
        </Spec>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Spec name="Surfaces · light" row={false}>
            <SurfaceTiles tiles={lightSurfaces} backing="bg-mauve-100" text="text-mauve-700" />
          </Spec>
          <Spec name="Surfaces · dark" row={false}>
            <SurfaceTiles tiles={darkSurfaces} backing="bg-mauve-900" text="text-mauve-200" />
          </Spec>
        </div>

        <Spec name="Semantic states" row={false}>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {semantics.map((tone) => (
              <div key={tone.name} className="flex flex-col gap-2">
                <span
                  className={clsx(
                    'font-mono text-xs font-medium tracking-widest uppercase',
                    tone.label
                  )}
                >
                  {tone.name}
                </span>
                <div className={clsx('h-14 rounded-none', tone.solid)} />
                <div
                  className={clsx(
                    'h-8 rounded-none border border-mauve-200 dark:border-mauve-700',
                    tone.soft
                  )}
                />
              </div>
            ))}
          </div>
        </Spec>
      </div>
    </Section>
  )
}

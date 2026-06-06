import { clsx } from 'clsx/lite'

import { Section, Spec } from '@/showcase/ui'

const shadows = [
  { name: 'xs', cls: 'shadow-xs shadow-rose-900/10' },
  { name: 'sm', cls: 'shadow-sm shadow-rose-900/10' },
  { name: 'md', cls: 'shadow-md shadow-rose-900/15' },
  { name: 'lg', cls: 'shadow-lg shadow-rose-900/20' },
  { name: 'xl', cls: 'shadow-xl shadow-rose-900/25' },
  { name: '2xl', cls: 'shadow-2xl shadow-rose-900/30' },
]

export function Scales() {
  return (
    <Section
      id="measure"
      label="Corners & Elevation"
      title="Corners and elevation"
      emphasis="elevation"
      subtitle="Corners are squared by default, though the full Tailwind radius scale stays available. Shadows keep Tailwind's geometry but are tinted with plum ink instead of neutral black."
    >
      <div className="flex flex-col gap-12">
        <Spec name="Radii · squared by default" row={false}>
          <div className="flex flex-wrap items-center gap-8">
            <span className="font-serif text-5xl leading-none tracking-tight text-mauve-900 dark:text-mauve-100">
              Squared.
            </span>
            <div className="flex items-center gap-3">
              <span className="rounded-none border border-mauve-300 bg-white px-6 py-4 font-mono text-rose-700 shadow-sm shadow-rose-900/10 dark:border-mauve-700 dark:bg-mauve-800 dark:text-rose-200">
                rounded-none
              </span>
            </div>
          </div>
        </Spec>

        <Spec name="Elevation · plum-tinted" row={false}>
          <div className="flex flex-wrap gap-8 rounded-none bg-mauve-100 p-6 dark:bg-mauve-900">
            {shadows.map((shadow) => (
              <div key={shadow.name} className="flex flex-col items-center gap-3">
                <span
                  className={clsx(
                    'size-20 rounded-none border border-mauve-200 bg-white dark:border-mauve-700 dark:bg-mauve-800',
                    shadow.cls
                  )}
                />
                <span className="font-mono text-xs text-mauve-500">shadow-{shadow.name}</span>
              </div>
            ))}
          </div>
        </Spec>
      </div>
    </Section>
  )
}

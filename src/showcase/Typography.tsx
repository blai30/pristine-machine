import type { ReactNode } from 'react'

import { clsx } from 'clsx/lite'
import { syntax } from '@/components'
import type { SyntaxKind } from '@/components'
import { CodeSpecimen } from '@/showcase/CodeSpecimen'
import { Section } from '@/showcase/ui'

const legend: SyntaxKind[] = ['keyword', 'func', 'string', 'number', 'property', 'comment', 'punctuation']

function SpecimenLine({ token, children }: { token: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-mauve-200 py-2 dark:border-mauve-700">
      <span className="w-44 shrink-0 font-mono text-xs text-mauve-500">{token}</span>
      <span className="min-w-0 truncate text-mauve-900 dark:text-mauve-100">{children}</span>
    </div>
  )
}

const display = 'font-serif tracking-tight'

export function Typography() {
  return (
    <Section
      id="type"
      label="Typography"
      title="Editorial serif, grotesque body, mono notes"
      emphasis="grotesque"
      subtitle="Instrument Serif sets the display voice (large only). Geist carries UI and long-form. JetBrains Mono speaks in labels, code and metadata. Sizes follow Tailwind's scale exactly."
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <span className="mb-2 font-mono text-xs tracking-widest text-mauve-400 uppercase">
            Display — Instrument Serif
          </span>
          <SpecimenLine token="text-7xl · 72">
            <span className={clsx(display, 'text-7xl leading-20')}>
              Build <span className="text-rose-700 italic dark:text-rose-300">pristine</span> web
              software.
            </span>
          </SpecimenLine>
          <SpecimenLine token="text-5xl · 48">
            <span className={clsx(display, 'text-5xl leading-14')}>A measured interface</span>
          </SpecimenLine>
          <SpecimenLine token="text-3xl · 30">
            <span className={clsx(display, 'text-3xl leading-10')}>Quietly precise machine</span>
          </SpecimenLine>
        </div>

        <div className="flex flex-col gap-1">
          <span className="mb-2 font-mono text-xs tracking-widest text-mauve-400 uppercase">
            Body &amp; UI — Geist
          </span>
          <SpecimenLine token="text-2xl · 24 / 600">
            <span className="font-sans text-2xl font-semibold">Section heading</span>
          </SpecimenLine>
          <SpecimenLine token="text-xl · 20 / 500">
            <span className="font-sans text-xl font-medium">Lead-in &amp; subheads</span>
          </SpecimenLine>
          <SpecimenLine token="text-lg · 18 / 400">
            <span className="font-sans text-lg">Comfortable long-form body</span>
          </SpecimenLine>
          <SpecimenLine token="text-base · 16 / 400">
            <span className="font-sans text-base">Default UI text for controls</span>
          </SpecimenLine>
          <SpecimenLine token="text-sm · 14 / 400">
            <span className="font-sans text-sm">Secondary &amp; helper copy</span>
          </SpecimenLine>
        </div>

        <div className="flex flex-col gap-1">
          <span className="mb-2 font-mono text-xs tracking-widest text-mauve-400 uppercase">
            Mono — JetBrains Mono
          </span>
          <SpecimenLine token="text-xs · label">
            <span className="font-mono text-xs tracking-widest uppercase">Label / metadata</span>
          </SpecimenLine>
          <SpecimenLine token="text-sm · code">
            <span className="font-mono text-sm">const machine = build(parts)</span>
          </SpecimenLine>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs tracking-widest text-mauve-400 uppercase">
            Code block — syntax highlighting
          </span>
          <CodeSpecimen />
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legend.map((kind) => (
              <span key={kind} className={clsx('font-mono text-xs', syntax[kind])}>
                {kind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

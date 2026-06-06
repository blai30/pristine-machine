import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

import { eyebrow } from '@/lib/styles'

/** Strip punctuation and lowercase, so "Tailwind's" / "blossom," match cleanly. */
const core = (word: string) => word.replace(/[^a-z0-9]/gi, '').toLowerCase()

/**
 * Index of the word to emphasize. If `emphasis` is given, match that word;
 * otherwise pick a "significant" word (≥ 4 letters) deterministically from the title,
 * so a section always emphasizes the same word.
 */
function pickEmphasis(words: string[], emphasis?: string): number {
  if (emphasis) {
    const target = core(emphasis)
    const match = words.findIndex((word) => core(word) === target)
    if (match !== -1) return match
  }
  const candidates = words
    .map((word, index) => ({ index, length: core(word).length }))
    .filter(({ length }) => length >= 4)
    .map(({ index }) => index)
  if (candidates.length === 0) return -1
  const seed = [...words.join('')].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return candidates[seed % candidates.length]
}

/** Renders a title with one word emphasized in serif italic accent. */
function EmphasizedTitle({ title, emphasis }: { title: string; emphasis?: string }) {
  const words = title.split(' ')
  const chosen = pickEmphasis(words, emphasis)
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 && ' '}
          {index === chosen ? (
            <span className="text-rose-700 italic dark:text-rose-300">{word}</span>
          ) : (
            word
          )}
        </Fragment>
      ))}
    </>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={clsx(eyebrow, className)}>{children}</span>
}

/** A numbered top-level group header, e.g. "1. FOUNDATIONS" with the ordinal in the accent color. */
export function SectionGroup({
  id,
  number,
  label,
  children,
}: {
  id: string
  number: number
  label: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <header className="px-6 pt-16 pb-2 sm:px-10">
        <span className="font-mono text-sm font-medium tracking-widest uppercase">
          <span className="text-rose-700 dark:text-rose-300">
            {String(number).padStart(2, '0')}
          </span>{' '}
          <span className="text-mauve-400">{label}</span>
        </span>
      </header>
      {children}
    </section>
  )
}

/** A top-level showcase section with a mono eyebrow and serif heading. */
export function Section({
  id,
  label,
  title,
  emphasis,
  subtitle,
  children,
}: {
  id?: string
  label: string
  title: string
  /** Word in `title` to emphasize (serif italic accent). Falls back to a stable auto-pick. */
  emphasis?: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-14 sm:px-10">
      <header className="mb-10 flex flex-col gap-2">
        <Eyebrow>{label}</Eyebrow>
        <h2 className="font-serif text-4xl leading-9 tracking-tight text-mauve-900 dark:text-mauve-100">
          <EmphasizedTitle title={title} emphasis={emphasis} />
        </h2>
        {subtitle && (
          <p className="max-w-2xl font-sans text-base text-mauve-600 dark:text-mauve-400">
            {subtitle}
          </p>
        )}
      </header>
      {children}
    </section>
  )
}

/** A labeled specimen block within a section. `row` lays children out as a wrapping flex row. */
export function Spec({
  name,
  children,
  row = true,
  className = '',
}: {
  name: string
  children: ReactNode
  row?: boolean
  className?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow className="text-mauve-400">{name}</Eyebrow>
      <div className={clsx(row && 'flex flex-wrap items-center gap-4', className)}>{children}</div>
    </div>
  )
}

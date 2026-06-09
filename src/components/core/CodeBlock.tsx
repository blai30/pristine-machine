import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

/**
 * Token color classes for hand-highlighted code, tuned to the Pristine Machine palette:
 * rose keywords, blueprint-blue functions, jade strings, amber numbers, mauve structure.
 */
export const syntax = {
  plain: 'text-mauve-800 dark:text-mauve-200',
  comment: 'italic text-mauve-400 dark:text-mauve-500',
  keyword: 'text-rose-700 dark:text-rose-300',
  string: 'text-yellow-700 dark:text-yellow-300',
  number: 'text-purple-700 dark:text-purple-300',
  func: 'text-blue-700 dark:text-blue-300',
  property: 'text-mauve-700 dark:text-mauve-300',
  punctuation: 'text-mauve-500 dark:text-mauve-400',
} as const

export type SyntaxKind = keyof typeof syntax

export type CodeBlockProps = {
  /** Each entry is one rendered (pre-highlighted) line. */
  lines: ReactNode[]
  filename?: string
  lang?: string
  className?: string
}

/** A recessed code surface (the over-extend "well") with an optional editor header and line gutter. */
export function CodeBlock({ lines, filename, lang, className = '' }: CodeBlockProps) {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-none border border-mauve-200 bg-mauve-50 dark:border-mauve-700 dark:bg-mauve-950',
        className
      )}
    >
      {(filename || lang) && (
        <div className="flex items-center justify-between gap-4 border-b border-mauve-200 px-4 py-2.5 dark:border-mauve-700">
          <span className="font-mono text-xs text-mauve-500">{filename}</span>
          {lang && (
            <span className="font-mono text-xs font-medium tracking-widest text-mauve-400 uppercase">
              {lang}
            </span>
          )}
        </div>
      )}
      <div className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
        <div className="min-w-max">
          {lines.map((line, index) => (
            <div key={index} className="flex gap-4">
              <span className="w-6 shrink-0 text-right text-mauve-300 select-none dark:text-mauve-600">
                {index + 1}
              </span>
              <span className="whitespace-pre text-mauve-800 dark:text-mauve-200">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

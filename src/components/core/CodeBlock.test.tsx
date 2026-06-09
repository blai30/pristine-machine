import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { CodeBlock, syntax } from './CodeBlock'

describe('CodeBlock', () => {
  it('renders one numbered row per line', () => {
    const { getByText } = render(<CodeBlock lines={['const a = 1', 'const b = 2']} />)
    expect(getByText('const a = 1')).toBeInTheDocument()
    expect(getByText('const b = 2')).toBeInTheDocument()
    // Line gutter numbers.
    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
  })

  it('shows the header when a filename or lang is given', () => {
    const { getByText } = render(<CodeBlock lines={['x']} filename="app.ts" lang="ts" />)
    expect(getByText('app.ts')).toBeInTheDocument()
    expect(getByText('ts')).toBeInTheDocument()
  })

  it('omits the header when neither filename nor lang is given', () => {
    const { container } = render(<CodeBlock lines={['x']} />)
    // Only the code body remains, with no header row carrying the bottom border divider.
    expect(container.querySelectorAll('.border-b')).toHaveLength(0)
  })

  it('renders highlighted token spans passed as line content', () => {
    const { getByText } = render(
      <CodeBlock lines={[<span className={syntax.keyword}>const</span>]} />
    )
    expect(getByText('const')).toHaveClass('text-rose-700')
  })
})

describe('syntax map', () => {
  it('defines a class for every documented token kind', () => {
    const kinds = [
      'plain',
      'comment',
      'keyword',
      'string',
      'number',
      'func',
      'property',
      'punctuation',
    ]
    expect(Object.keys(syntax).sort()).toEqual([...kinds].sort())
    for (const value of Object.values(syntax)) {
      expect(value).toContain('dark:')
    }
  })
})

import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Callout } from './Callout'

describe('Callout', () => {
  it('renders as a note with its body content', () => {
    const { getByText, getByRole } = render(<Callout>Heads up</Callout>)
    expect(getByRole('note')).toBeInTheDocument()
    expect(getByText('Heads up')).toBeInTheDocument()
  })

  it('renders the title when provided', () => {
    const { getByText } = render(<Callout title="Note title">Body</Callout>)
    expect(getByText('Note title')).toBeInTheDocument()
  })

  it('defaults to the neutral variant', () => {
    const { getByRole } = render(<Callout>Neutral</Callout>)
    expect(getByRole('note')).toHaveClass('bg-mauve-200')
  })

  it('sources semantic variants from the shared tone ramp', () => {
    const { getByRole } = render(<Callout variant="success">Done</Callout>)
    const note = getByRole('note')
    expect(note).toHaveClass('bg-emerald-50')
    expect(note).toHaveClass('border-emerald-400')
  })

  it('renders a decorative icon wrapper when an icon is passed', () => {
    const { container } = render(<Callout icon={<svg data-testid="i" />}>Body</Callout>)
    const iconWrapper = container.querySelector('[aria-hidden="true"]')
    expect(iconWrapper).toBeInTheDocument()
  })
})

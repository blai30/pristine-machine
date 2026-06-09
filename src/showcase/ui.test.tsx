import { describe, expect, it } from 'vitest'

import { Section, SectionGroup } from '@/showcase/ui'
import { render } from '@/test/render'

/** The emphasized word is the only element rendered with the italic accent class. */
function emphasizedWord(container: HTMLElement): string | null {
  return container.querySelector('.italic')?.textContent ?? null
}

describe('Section emphasis', () => {
  it('emphasizes the explicitly requested word', () => {
    const { container } = render(
      <Section label="set" title="Pristine Machine Design" emphasis="machine">
        body
      </Section>
    )
    expect(emphasizedWord(container)).toBe('Machine')
  })

  it('matches the emphasis word ignoring punctuation and case', () => {
    const { container } = render(
      <Section label="set" title="Tailwind blossom, today" emphasis="BLOSSOM">
        body
      </Section>
    )
    expect(emphasizedWord(container)).toBe('blossom,')
  })

  it('auto-picks deterministically - same title yields the same word', () => {
    const first = render(
      <Section label="set" title="Structural blueprint linework">
        body
      </Section>
    )
    const second = render(
      <Section label="set" title="Structural blueprint linework">
        body
      </Section>
    )
    expect(emphasizedWord(first.container)).toBe(emphasizedWord(second.container))
  })

  it('auto-pick only ever falls on a word of at least four letters', () => {
    const { container } = render(
      <Section label="set" title="to be or epic">
        body
      </Section>
    )
    expect(emphasizedWord(container)).toBe('epic')
  })

  it('renders the subtitle when provided', () => {
    const { getByText } = render(
      <Section label="set" title="Some Title" subtitle="A short description">
        body
      </Section>
    )
    expect(getByText('A short description')).toBeInTheDocument()
  })
})

describe('SectionGroup', () => {
  it('zero-pads single-digit ordinals', () => {
    const { getByText } = render(
      <SectionGroup id="g" number={2} label="Foundations">
        body
      </SectionGroup>
    )
    expect(getByText('02')).toBeInTheDocument()
  })

  it('leaves two-digit ordinals unpadded', () => {
    const { getByText } = render(
      <SectionGroup id="g" number={10} label="Foundations">
        body
      </SectionGroup>
    )
    expect(getByText('10')).toBeInTheDocument()
  })
})

import { describe, expect, it } from 'vitest'

import { eyebrow, focusRing, semanticTone } from '@/lib/styles'

describe('focusRing', () => {
  it('is a non-empty class fragment with a focus-visible ring', () => {
    expect(focusRing).toContain('focus-visible:ring-2')
    expect(focusRing).toContain('focus-visible:outline-none')
  })

  it('carries a dark-mode counterpart', () => {
    expect(focusRing).toContain('dark:focus-visible:ring')
  })
})

describe('eyebrow', () => {
  it('is the documented mono uppercase label', () => {
    expect(eyebrow).toContain('font-mono')
    expect(eyebrow).toContain('uppercase')
    expect(eyebrow).toContain('tracking-widest')
    expect(eyebrow).toContain('text-mauve-500')
  })
})

describe('semanticTone', () => {
  const tones = ['info', 'success', 'warning', 'danger'] as const

  it('has exactly the four documented status hues', () => {
    expect(Object.keys(semanticTone).sort()).toEqual([...tones].sort())
  })

  it('exposes fill/fg/border/edge for every tone', () => {
    for (const tone of tones) {
      const facets = semanticTone[tone]
      expect(facets.fill).toBeTruthy()
      expect(facets.fg).toBeTruthy()
      expect(facets.border).toBeTruthy()
      expect(facets.edge).toBeTruthy()
    }
  })

  it('pairs every facet with a dark-mode variant', () => {
    for (const tone of tones) {
      const facets = semanticTone[tone]
      for (const facet of Object.values(facets)) {
        expect(facet, `${tone} facet "${facet}" needs a dark: counterpart`).toContain('dark:')
      }
    }
  })

  it('uses the left-only border utility for the edge accent bar', () => {
    for (const tone of tones) {
      expect(semanticTone[tone].edge).toContain('border-l-')
    }
  })
})

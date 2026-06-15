import { describe, expect, it } from 'vitest'

import { DEMO_NAV_SECTIONS, NAV_ITEMS, NAV_SECTIONS, SPY_IDS } from '@/showcase/nav'

describe('NAV_SECTIONS', () => {
  it('has the three numbered top-level groups in order', () => {
    expect(NAV_SECTIONS.map((section) => section.id)).toEqual([
      'foundations',
      'components',
      'live-preview',
    ])
    expect(NAV_SECTIONS.map((section) => section.number)).toEqual([1, 2, 3])
  })

  it('gives every section a label and unique ids across sections and items', () => {
    const ids: string[] = []
    for (const section of NAV_SECTIONS) {
      expect(section.label).toBeTruthy()
      ids.push(section.id)
      for (const item of section.items ?? []) {
        expect(item.label).toBeTruthy()
        ids.push(item.id)
      }
    }
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('NAV_ITEMS', () => {
  it('mirrors the top-level sections', () => {
    expect(NAV_ITEMS).toEqual([
      { id: 'foundations', label: 'Foundations', href: '#foundations' },
      { id: 'components', label: 'Components', href: '#components' },
      { id: 'live-preview', label: 'Live Preview', href: '#live-preview' },
    ])
  })
})

describe('SPY_IDS', () => {
  it('matches the top-level section ids', () => {
    expect(SPY_IDS).toEqual(NAV_SECTIONS.map((section) => section.id))
  })
})

describe('DEMO_NAV_SECTIONS', () => {
  it('uses distinct -demo ids that never collide with the real nav', () => {
    const realIds = new Set<string>()
    for (const section of NAV_SECTIONS) {
      realIds.add(section.id)
      for (const item of section.items ?? []) realIds.add(item.id)
    }
    for (const section of DEMO_NAV_SECTIONS) {
      expect(realIds.has(section.id)).toBe(false)
      for (const item of section.items ?? []) {
        expect(realIds.has(item.id)).toBe(false)
      }
    }
  })
})

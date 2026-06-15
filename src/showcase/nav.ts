/** A numbered nav section with optional nested items — the showcase's own nav shape. */
export type NavSection = {
  id: string
  label: string
  number?: number
  items?: { id: string; label: string }[]
}

/** Numbered top-level sections and their subsections, shared by the sidebar and scrollspy. */
export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'foundations',
    number: 1,
    label: 'Foundations',
    items: [
      { id: 'colors', label: 'Color' },
      { id: 'type', label: 'Typography' },
      { id: 'measure', label: 'Corners & Elevation' },
      { id: 'brand', label: 'Brand' },
    ],
  },
  {
    id: 'components',
    number: 2,
    label: 'Components',
    items: [
      { id: 'core', label: 'Core' },
      { id: 'forms', label: 'Forms' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'overlays', label: 'Overlays' },
      { id: 'disclosure', label: 'Disclosure' },
    ],
  },
  {
    id: 'live-preview',
    number: 3,
    label: 'Live Preview',
  },
]

/** Top-level sections shown in the navbar. */
export const NAV_ITEMS = NAV_SECTIONS.map((section) => ({
  id: section.id,
  label: section.label,
  href: `#${section.id}`,
}))

/** Top-level section ids tracked by the scrollspy. */
export const SPY_IDS = NAV_ITEMS.map((item) => item.id)

/** Stand-in nav tree for the SideNav / Drawer specimens, kept off the real `-demo`-free ids. */
export const DEMO_NAV_SECTIONS: NavSection[] = [
  {
    id: 'foundations-demo',
    number: 1,
    label: 'Foundations',
    items: [
      { id: 'colors-demo', label: 'Color' },
      { id: 'type-demo', label: 'Typography' },
    ],
  },
  {
    id: 'components-demo',
    number: 2,
    label: 'Components',
    items: [
      { id: 'core-demo', label: 'Core' },
      { id: 'forms-demo', label: 'Forms' },
    ],
  },
]

import type { NavbarItem, SideNavSection } from '@/components'

/** Numbered top-level sections and their subsections, shared by the sidebar and scrollspy. */
export const NAV_SECTIONS: SideNavSection[] = [
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
export const NAV_ITEMS: NavbarItem[] = NAV_SECTIONS.map((section) => ({
  id: section.id,
  label: section.label,
}))

/** Top-level section ids tracked by the scrollspy. */
export const SPY_IDS = NAV_ITEMS.map((item) => item.id)

/** Stand-in nav tree for the SideNav / Drawer specimens, kept off the real `-demo`-free ids. */
export const DEMO_NAV_SECTIONS: SideNavSection[] = [
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

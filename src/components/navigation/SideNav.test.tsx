import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { SideNav } from './SideNav'

const sections = [
  {
    id: 'foundations',
    number: 1,
    label: 'Foundations',
    items: [
      { id: 'colors', label: 'Color' },
      { id: 'type', label: 'Typography' },
    ],
  },
]

describe('SideNav', () => {
  it('renders section and item links', () => {
    const { getByRole } = render(<SideNav sections={sections} />)
    expect(getByRole('link', { name: /Foundations/ })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Color' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Typography' })).toBeInTheDocument()
  })

  it('marks the active item with aria-current', () => {
    const { getByRole } = render(<SideNav sections={sections} activeId="type" />)
    expect(getByRole('link', { name: 'Typography' })).toHaveAttribute('aria-current', 'true')
    expect(getByRole('link', { name: 'Color' })).not.toHaveAttribute('aria-current')
  })

  it('fires onNavigate with the item id on click', async () => {
    const user = setupUser()
    const onNavigate = vi.fn()
    const { getByRole } = render(<SideNav sections={sections} onNavigate={onNavigate} />)
    await user.click(getByRole('link', { name: 'Color' }))
    expect(onNavigate).toHaveBeenCalledWith('colors')
  })

  it('fires onNavigate with the section id when a section header is clicked', async () => {
    const user = setupUser()
    const onNavigate = vi.fn()
    const { getByRole } = render(<SideNav sections={sections} onNavigate={onNavigate} />)
    await user.click(getByRole('link', { name: /Foundations/ }))
    expect(onNavigate).toHaveBeenCalledWith('foundations')
  })
})

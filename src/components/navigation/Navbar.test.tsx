import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Navbar } from './Navbar'

const items = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'components', label: 'Components' },
]

describe('Navbar', () => {
  it('renders a link per item', () => {
    const { getByRole } = render(<Navbar items={items} />)
    expect(getByRole('link', { name: 'Foundations' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Components' })).toBeInTheDocument()
  })

  it('marks the active item with aria-current', () => {
    const { getByRole } = render(<Navbar items={items} activeId="components" />)
    expect(getByRole('link', { name: 'Components' })).toHaveAttribute('aria-current', 'true')
  })

  it('fires onNavigate on click', async () => {
    const user = setupUser()
    const onNavigate = vi.fn()
    const { getByRole } = render(<Navbar items={items} onNavigate={onNavigate} />)
    await user.click(getByRole('link', { name: 'Components' }))
    expect(onNavigate).toHaveBeenCalledWith('components')
  })

  it('renders the start and end slots', () => {
    const { getByTestId } = render(
      <Navbar items={items} start={<span data-testid="brand" />} end={<span data-testid="cta" />} />
    )
    expect(getByTestId('brand')).toBeInTheDocument()
    expect(getByTestId('cta')).toBeInTheDocument()
  })

  it('renders without a nav when no items are given', () => {
    const { container } = render(<Navbar start={<span>Brand</span>} />)
    expect(container.querySelector('nav')).toBeNull()
  })
})

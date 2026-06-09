import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { BrandMark } from './BrandMark'

describe('BrandMark', () => {
  it('renders a decorative svg', () => {
    const { container } = render(<BrandMark />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('filled variant knocks out the spokes with a mask', () => {
    const { container } = render(<BrandMark variant="filled" />)
    expect(container.querySelector('mask')).toBeInTheDocument()
  })

  it('outline variant draws line-work spokes instead of a mask', () => {
    const { container } = render(<BrandMark variant="outline" />)
    expect(container.querySelector('mask')).toBeNull()
    expect(container.querySelectorAll('line').length).toBeGreaterThan(0)
  })

  it('pins colors when given an explicit theme', () => {
    const { container } = render(<BrandMark theme="light" />)
    const group = container.querySelector('g')
    expect(group?.getAttribute('class')).toContain('fill-rose-500')
    expect(group?.getAttribute('class')).not.toContain('dark:')
  })

  it('merges a custom className onto the svg', () => {
    const { container } = render(<BrandMark className="size-10" />)
    expect(container.querySelector('svg')).toHaveClass('size-10')
  })
})

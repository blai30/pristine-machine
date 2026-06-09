import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its children', () => {
    const { getByText } = render(<Badge>Stable</Badge>)
    expect(getByText('Stable')).toBeInTheDocument()
  })

  it('defaults to the neutral variant', () => {
    const { getByText } = render(<Badge>Neutral</Badge>)
    expect(getByText('Neutral')).toHaveClass('bg-mauve-200')
  })

  it('sources semantic variants from the shared tone ramp', () => {
    const { getByText } = render(<Badge variant="success">Live</Badge>)
    expect(getByText('Live')).toHaveClass('bg-emerald-50')
    expect(getByText('Live')).toHaveClass('text-emerald-600')
  })

  it('applies the solid accent variant', () => {
    const { getByText } = render(<Badge variant="solid">New</Badge>)
    expect(getByText('New')).toHaveClass('bg-rose-500')
  })

  it('renders a decorative status dot when dot is set', () => {
    const { container } = render(<Badge dot>Online</Badge>)
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('bg-current')
  })

  it('omits the dot by default', () => {
    const { container } = render(<Badge>Plain</Badge>)
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('accepts the square prop without changing rendering', () => {
    const { getByText } = render(<Badge square>Squared</Badge>)
    expect(getByText('Squared')).toBeInTheDocument()
  })
})

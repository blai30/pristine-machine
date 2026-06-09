import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { BlueprintDivider, BlueprintFrame, PlusTick } from './Blueprint'

describe('PlusTick', () => {
  it('positions itself at the requested corner', () => {
    const { container } = render(<PlusTick corner="tr" />)
    const tick = container.firstElementChild
    expect(tick).toHaveClass('right-0')
    expect(tick).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps the tick inside the frame vertically when insetY is set', () => {
    const { container } = render(<PlusTick corner="bl" insetY />)
    // insetY drops the vertical translate that would straddle the edge.
    expect(container.firstElementChild).not.toHaveClass('translate-y-1/2')
  })
})

describe('BlueprintDivider', () => {
  it('renders a plain rule by default with no ticks or mark', () => {
    const { container } = render(<BlueprintDivider />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
    expect(container.querySelector('svg')).toBeNull()
  })

  it('drops corner ticks when ticked', () => {
    const { container } = render(<BlueprintDivider ticked />)
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0)
  })

  it('seats the brand mark at the center when mark is set', () => {
    const { container } = render(<BlueprintDivider mark />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('BlueprintFrame', () => {
  it('renders its children inside the framed column', () => {
    const { getByText } = render(<BlueprintFrame>framed content</BlueprintFrame>)
    expect(getByText('framed content')).toBeInTheDocument()
  })

  it('renders the four corner ticks', () => {
    const { container } = render(<BlueprintFrame>x</BlueprintFrame>)
    // Four PlusTicks (aria-hidden), plus the hatch overlay (also aria-hidden).
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(4)
  })
})

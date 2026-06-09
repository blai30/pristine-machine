import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Separator } from './Separator'

describe('Separator', () => {
  it('renders a horizontal rule by default', () => {
    const { container } = render(<Separator />)
    const rule = container.firstElementChild
    expect(rule).toHaveClass('h-px')
    expect(rule).toHaveClass('w-full')
  })

  it('renders a vertical rule when oriented vertically', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const rule = container.firstElementChild
    expect(rule).toHaveClass('w-px')
    expect(rule).toHaveClass('h-full')
    expect(rule).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('merges a custom className', () => {
    const { container } = render(<Separator className="custom-x" />)
    expect(container.firstElementChild).toHaveClass('custom-x')
  })
})

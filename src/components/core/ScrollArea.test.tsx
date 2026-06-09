import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { ScrollArea } from './ScrollArea'

describe('ScrollArea', () => {
  it('renders its children', () => {
    const { getByText } = render(<ScrollArea>scrollable content</ScrollArea>)
    expect(getByText('scrollable content')).toBeInTheDocument()
  })

  it('applies the sizing className to the root', () => {
    const { container } = render(<ScrollArea className="h-48">content</ScrollArea>)
    expect(container.firstElementChild).toHaveClass('h-48')
  })
})

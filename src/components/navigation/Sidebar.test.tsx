import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders its children inside an aside landmark', () => {
    const { getByText, container } = render(<Sidebar>nav content</Sidebar>)
    expect(getByText('nav content')).toBeInTheDocument()
    expect(container.querySelector('aside')).toBeInTheDocument()
  })

  it('overrides the default display class via className', () => {
    const { container } = render(<Sidebar className="hidden lg:flex">x</Sidebar>)
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('hidden')
    expect(aside).not.toHaveClass('flex')
  })
})

import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Wordmark } from './Wordmark'

describe('Wordmark', () => {
  it('renders the full wordmark text', () => {
    const { getByText } = render(<Wordmark />)
    expect(getByText(/Pristine/)).toBeInTheDocument()
    expect(getByText('Machine')).toBeInTheDocument()
  })

  it('omits the brand mark by default', () => {
    const { container } = render(<Wordmark />)
    expect(container.querySelector('svg')).toBeNull()
  })

  it('shows the brand mark when withMark is set', () => {
    const { container } = render(<Wordmark withMark />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('emits only light utilities when pinned to the light theme', () => {
    const { getByText } = render(<Wordmark theme="light" />)
    expect(getByText('Machine').getAttribute('class')).not.toContain('dark:')
  })

  it('applies the size scale', () => {
    const { getByText } = render(<Wordmark size="sm" />)
    expect(getByText(/Pristine/)).toHaveClass('text-2xl')
  })
})

import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Avatar } from './Avatar'

describe('Avatar initials fallback', () => {
  it('uses the first and last initial for a multi-word name', () => {
    const { getByText } = render(<Avatar name="Mei Lin" />)
    expect(getByText('ML')).toBeInTheDocument()
  })

  it('uses the first two letters for a single-word name', () => {
    const { getByText } = render(<Avatar name="Mei" />)
    expect(getByText('ME')).toBeInTheDocument()
  })

  it('collapses internal whitespace before deriving initials', () => {
    const { getByText } = render(<Avatar name="  Mei   Lin  " />)
    expect(getByText('ML')).toBeInTheDocument()
  })

  it('falls back to a question mark for an empty name', () => {
    const { getByText } = render(<Avatar name="   " />)
    expect(getByText('?')).toBeInTheDocument()
  })

  it('applies the size class to the root', () => {
    const { container } = render(<Avatar name="Mei Lin" size="lg" />)
    expect(container.firstElementChild).toHaveClass('size-12')
  })
})

describe('Avatar image', () => {
  // Base UI only swaps the <img> into the DOM once it loads, which never happens
  // under jsdom, so the initials fallback must remain visible meanwhile.
  it('keeps the initials fallback visible while an image source is unloaded', () => {
    const { getByText } = render(<Avatar name="Mei Lin" src="/mei.png" />)
    expect(getByText('ML')).toBeInTheDocument()
  })
})

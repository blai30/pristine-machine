import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Kbd } from './Kbd'

describe('Kbd', () => {
  it('renders children inside a kbd element', () => {
    const { getByText } = render(<Kbd>Esc</Kbd>)
    const key = getByText('Esc')
    expect(key.tagName).toBe('KBD')
  })

  it('merges a custom className', () => {
    const { getByText } = render(<Kbd className="custom-x">A</Kbd>)
    expect(getByText('A')).toHaveClass('custom-x')
  })
})

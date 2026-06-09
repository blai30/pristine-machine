import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('exposes a status role with a default label', () => {
    const { getByRole } = render(<Spinner />)
    expect(getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('accepts a custom label', () => {
    const { getByRole } = render(<Spinner label="Deploying" />)
    expect(getByRole('status')).toHaveAttribute('aria-label', 'Deploying')
  })

  it('renders a spinning arc over the brand mark', () => {
    const { getByRole } = render(<Spinner />)
    // The rotating arc svg plus the brand mark svg.
    expect(getByRole('status').querySelectorAll('svg').length).toBeGreaterThanOrEqual(2)
  })
})

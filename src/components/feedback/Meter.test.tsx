import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Meter } from './Meter'

describe('Meter', () => {
  it('renders a label when provided', () => {
    const { getByText } = render(<Meter value={70} label="Disk" />)
    expect(getByText('Disk')).toBeInTheDocument()
  })

  it('shows the formatted value when showValue is set', () => {
    const { container } = render(<Meter value={70} showValue />)
    expect(container.querySelector('.text-mauve-500')).toBeInTheDocument()
  })

  it('renders without a label row when neither label nor showValue is set', () => {
    const { container } = render(<Meter value={70} />)
    expect(container.querySelector('.text-mauve-500')).toBeNull()
  })
})

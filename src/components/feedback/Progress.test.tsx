import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Progress } from './Progress'

describe('Progress', () => {
  it('renders a label when provided', () => {
    const { getByText } = render(<Progress value={40} label="Uploading" />)
    expect(getByText('Uploading')).toBeInTheDocument()
  })

  it('shows the formatted value when showValue is set', () => {
    const { container } = render(<Progress value={40} showValue />)
    expect(container.querySelector('.text-mauve-500')).toBeInTheDocument()
  })

  it('marks the indicator indeterminate when value is null', () => {
    const { container } = render(<Progress value={null} />)
    expect(container.querySelector('[data-indeterminate]')).toBeInTheDocument()
  })

  it('is determinate when given a numeric value', () => {
    const { container } = render(<Progress value={50} />)
    expect(container.querySelector('[data-indeterminate]')).toBeNull()
  })
})

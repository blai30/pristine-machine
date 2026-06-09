import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Slider } from './Slider'

describe('Slider', () => {
  it('renders a single thumb by default', () => {
    const { getAllByRole } = render(<Slider defaultValue={40} />)
    expect(getAllByRole('slider')).toHaveLength(1)
  })

  it('renders one thumb per value for a range slider', () => {
    const { getAllByRole } = render(<Slider defaultValue={[20, 80]} />)
    expect(getAllByRole('slider')).toHaveLength(2)
  })

  it('renders a label when provided', () => {
    const { getByText } = render(<Slider defaultValue={40} label="Volume" />)
    expect(getByText('Volume')).toBeInTheDocument()
  })

  it('shows the formatted value when showValue is set', () => {
    const { container } = render(<Slider defaultValue={40} showValue />)
    expect(container.querySelector('.text-mauve-500')).toBeInTheDocument()
  })
})

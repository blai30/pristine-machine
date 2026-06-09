import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { SegmentedControl } from './SegmentedControl'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
]

describe('SegmentedControl', () => {
  it('renders a toggle per option', () => {
    const { getAllByRole } = render(<SegmentedControl options={options} />)
    expect(getAllByRole('button')).toHaveLength(2)
  })

  it('presses the first option by default', () => {
    const { getByRole } = render(<SegmentedControl options={options} />)
    expect(getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('honours an explicit defaultValue', () => {
    const { getByRole } = render(<SegmentedControl options={options} defaultValue="week" />)
    expect(getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('fires onChange when a segment is selected', async () => {
    const user = setupUser()
    const onChange = vi.fn()
    const { getByRole } = render(<SegmentedControl options={options} onChange={onChange} />)
    await user.click(getByRole('button', { name: 'Week' }))
    expect(onChange).toHaveBeenCalledWith('week')
  })

  it('reflects a controlled value', () => {
    const { getByRole } = render(
      <SegmentedControl options={options} value="week" onChange={() => {}} />
    )
    expect(getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'true')
  })
})

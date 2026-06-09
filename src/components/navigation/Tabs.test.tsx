import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Tabs } from './Tabs'

const items = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
]

describe('Tabs', () => {
  it('renders a tab per item', () => {
    const { getAllByRole } = render(<Tabs items={items} />)
    expect(getAllByRole('tab')).toHaveLength(2)
  })

  it('selects the first item by default', () => {
    const { getByRole } = render(<Tabs items={items} />)
    expect(getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
  })

  it('honours an explicit defaultValue', () => {
    const { getByRole } = render(<Tabs items={items} defaultValue="activity" />)
    expect(getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true')
  })

  it('fires onChange and moves selection on click', async () => {
    const user = setupUser()
    const onChange = vi.fn()
    const { getByRole } = render(<Tabs items={items} onChange={onChange} />)
    await user.click(getByRole('tab', { name: 'Activity' }))
    expect(onChange).toHaveBeenCalledWith('activity')
    expect(getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true')
  })

  it('reflects a controlled value', () => {
    const { getByRole } = render(<Tabs items={items} value="activity" onChange={() => {}} />)
    expect(getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true')
  })
})

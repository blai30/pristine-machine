import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Select } from './Select'

const items = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' },
]

describe('Select (native)', () => {
  it('renders a native combobox with all options', () => {
    const { getByRole } = render(<Select native items={items} />)
    const select = getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select.querySelectorAll('option')).toHaveLength(2)
  })

  it('renders a disabled placeholder option when a placeholder is given', () => {
    const { getByRole } = render(<Select native items={items} placeholder="Pick one" />)
    expect(getByRole('combobox').querySelectorAll('option')).toHaveLength(3)
  })

  it('fires onValueChange when an option is selected', async () => {
    const user = setupUser()
    const onValueChange = vi.fn()
    const { getByRole } = render(<Select native items={items} onValueChange={onValueChange} />)
    await user.selectOptions(getByRole('combobox'), 'b')
    expect(onValueChange).toHaveBeenCalledWith('b')
  })

  it('reflects a controlled value', () => {
    const { getByRole } = render(<Select native items={items} value="b" onValueChange={() => {}} />)
    expect(getByRole('combobox')).toHaveValue('b')
  })
})

describe('Select (styled)', () => {
  it('shows the placeholder on the trigger', () => {
    const { getByText } = render(<Select items={items} placeholder="Choose…" />)
    expect(getByText('Choose…')).toBeInTheDocument()
  })

  it('opens the listbox and selects an item', async () => {
    const user = setupUser()
    const onValueChange = vi.fn()
    const { getByRole, findByRole } = render(<Select items={items} onValueChange={onValueChange} />)
    await user.click(getByRole('combobox'))
    const option = await findByRole('option', { name: 'Beta' })
    await user.click(option)
    expect(onValueChange).toHaveBeenCalledWith('b')
  })
})

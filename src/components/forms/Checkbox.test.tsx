import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Checkbox, Radio, RadioGroup } from './Checkbox'

describe('Checkbox', () => {
  it('renders its label and a checkbox control', () => {
    const { getByRole, getByText } = render(<Checkbox label="Accept terms" />)
    expect(getByRole('checkbox')).toBeInTheDocument()
    expect(getByText('Accept terms')).toBeInTheDocument()
  })

  it('reflects the uncontrolled default checked state', () => {
    const { getByRole } = render(<Checkbox defaultChecked />)
    expect(getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles and fires onCheckedChange', async () => {
    const user = setupUser()
    const onCheckedChange = vi.fn()
    const { getByRole } = render(<Checkbox onCheckedChange={onCheckedChange} />)
    await user.click(getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
    expect(getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('does not fire when disabled', async () => {
    const user = setupUser()
    const onCheckedChange = vi.fn()
    const { getByRole } = render(<Checkbox disabled onCheckedChange={onCheckedChange} />)
    await user.click(getByRole('checkbox'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})

describe('Radio + RadioGroup', () => {
  it('renders all radios in the group', () => {
    const { getAllByRole } = render(
      <RadioGroup defaultValue="a">
        <Radio value="a" label="First" />
        <Radio value="b" label="Second" />
      </RadioGroup>
    )
    expect(getAllByRole('radio')).toHaveLength(2)
  })

  it('marks the default value as checked', () => {
    const { getByRole } = render(
      <RadioGroup defaultValue="a">
        <Radio value="a" label="First" />
        <Radio value="b" label="Second" />
      </RadioGroup>
    )
    expect(getByRole('radio', { name: 'First' })).toHaveAttribute('aria-checked', 'true')
    expect(getByRole('radio', { name: 'Second' })).toHaveAttribute('aria-checked', 'false')
  })

  it('selects a radio and fires onValueChange', async () => {
    const user = setupUser()
    const onValueChange = vi.fn()
    const { getByRole } = render(
      <RadioGroup defaultValue="a" onValueChange={onValueChange}>
        <Radio value="a" label="First" />
        <Radio value="b" label="Second" />
      </RadioGroup>
    )
    await user.click(getByRole('radio', { name: 'Second' }))
    expect(onValueChange).toHaveBeenCalledWith('b', expect.anything())
    expect(getByRole('radio', { name: 'Second' })).toHaveAttribute('aria-checked', 'true')
  })
})

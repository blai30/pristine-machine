import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Switch } from './Switch'

describe('Switch', () => {
  it('renders its label and a switch control', () => {
    const { getByRole, getByText } = render(<Switch label="Wi-Fi" />)
    expect(getByRole('switch')).toBeInTheDocument()
    expect(getByText('Wi-Fi')).toBeInTheDocument()
  })

  it('reflects the uncontrolled default checked state', () => {
    const { getByRole } = render(<Switch defaultChecked />)
    expect(getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles and fires onCheckedChange on click', async () => {
    const user = setupUser()
    const onCheckedChange = vi.fn()
    const { getByRole } = render(<Switch onCheckedChange={onCheckedChange} />)
    const control = getByRole('switch')
    expect(control).toHaveAttribute('aria-checked', 'false')

    await user.click(control)

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
    expect(control).toHaveAttribute('aria-checked', 'true')
  })

  it('does not fire when disabled', async () => {
    const user = setupUser()
    const onCheckedChange = vi.fn()
    const { getByRole } = render(<Switch disabled onCheckedChange={onCheckedChange} />)
    await user.click(getByRole('switch'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })
})

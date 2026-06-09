import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Popover } from './Popover'

function Example() {
  return (
    <Popover.Root>
      <Popover.Trigger>Details</Popover.Trigger>
      <Popover.Popup>
        <Popover.Title>About</Popover.Title>
        <Popover.Description>More information here.</Popover.Description>
        <Popover.Close>Dismiss</Popover.Close>
      </Popover.Popup>
    </Popover.Root>
  )
}

describe('Popover', () => {
  it('is closed initially', () => {
    const { queryByText } = render(<Example />)
    expect(queryByText('More information here.')).toBeNull()
  })

  it('opens on trigger click', async () => {
    const user = setupUser()
    const { getByRole, findByText } = render(<Example />)
    await user.click(getByRole('button', { name: 'Details' }))
    expect(await findByText('More information here.')).toBeInTheDocument()
  })

  it('closes via the Close action', async () => {
    const user = setupUser()
    const { getByRole, findByText, queryByText } = render(<Example />)
    await user.click(getByRole('button', { name: 'Details' }))
    await findByText('More information here.')
    await user.click(getByRole('button', { name: 'Dismiss' }))
    expect(queryByText('More information here.')).toBeNull()
  })
})

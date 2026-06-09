import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Dialog } from './Dialog'

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Description>Are you sure?</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  )
}

describe('Dialog', () => {
  it('is closed until the trigger is pressed', () => {
    const { queryByRole } = render(<Example />)
    expect(queryByRole('dialog')).toBeNull()
  })

  it('opens on trigger click and shows its content', async () => {
    const user = setupUser()
    const { getByRole, findByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'Open dialog' }))
    const dialog = await findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Confirm' })).toBeInTheDocument()
  })

  it('closes via the Close action', async () => {
    const user = setupUser()
    const { getByRole, findByRole, queryByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'Open dialog' }))
    await findByRole('dialog')
    await user.click(getByRole('button', { name: 'Close' }))
    expect(queryByRole('dialog')).toBeNull()
  })

  it('light-dismisses on Escape', async () => {
    const user = setupUser()
    const { getByRole, findByRole, queryByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'Open dialog' }))
    await findByRole('dialog')
    await user.keyboard('{Escape}')
    expect(queryByRole('dialog')).toBeNull()
  })
})

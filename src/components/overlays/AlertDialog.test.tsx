import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { AlertDialog } from './AlertDialog'

function Example() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
      <AlertDialog.Popup>
        <AlertDialog.Title>Delete project?</AlertDialog.Title>
        <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
        <AlertDialog.Close>Cancel</AlertDialog.Close>
      </AlertDialog.Popup>
    </AlertDialog.Root>
  )
}

describe('AlertDialog', () => {
  it('opens on trigger click with the alertdialog role', async () => {
    const user = setupUser()
    const { getByRole, findByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'Delete' }))
    expect(await findByRole('alertdialog')).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Delete project?' })).toBeInTheDocument()
  })

  it('does not light-dismiss when the backdrop is clicked', async () => {
    const user = setupUser()
    const { getByRole, findByRole, queryByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'Delete' }))
    await findByRole('alertdialog')
    // The backdrop is the dimmed scrim behind the popup; clicking it must not close.
    const backdrop = document.querySelector('[class*="bg-mauve-950"]')
    expect(backdrop).not.toBeNull()
    await user.click(backdrop as Element)
    expect(queryByRole('alertdialog')).toBeInTheDocument()
  })

  it('closes via an explicit action', async () => {
    const user = setupUser()
    const { getByRole, findByRole, queryByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'Delete' }))
    await findByRole('alertdialog')
    await user.click(getByRole('button', { name: 'Cancel' }))
    expect(queryByRole('alertdialog')).toBeNull()
  })
})

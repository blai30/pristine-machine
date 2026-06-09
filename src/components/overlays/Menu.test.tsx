import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Menu } from './Menu'

describe('Menu', () => {
  it('opens on trigger click and shows its items', async () => {
    const user = setupUser()
    const { getByRole, findByRole } = render(
      <Menu.Root>
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Popup>
          <Menu.Item>Rename</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Delete</Menu.Item>
        </Menu.Popup>
      </Menu.Root>
    )
    await user.click(getByRole('button', { name: 'Actions' }))
    expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument()
  })

  it('fires an item action and closes the menu', async () => {
    const user = setupUser()
    const onClick = vi.fn()
    const { getByRole, findByRole, queryByRole } = render(
      <Menu.Root>
        <Menu.Trigger>Actions</Menu.Trigger>
        <Menu.Popup>
          <Menu.Item onClick={onClick}>Rename</Menu.Item>
        </Menu.Popup>
      </Menu.Root>
    )
    await user.click(getByRole('button', { name: 'Actions' }))
    await user.click(await findByRole('menuitem', { name: 'Rename' }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(queryByRole('menuitem')).toBeNull()
  })

  it('toggles a checkbox item', async () => {
    const user = setupUser()
    const onCheckedChange = vi.fn()
    const { getByRole, findByRole } = render(
      <Menu.Root>
        <Menu.Trigger>View</Menu.Trigger>
        <Menu.Popup>
          <Menu.CheckboxItem onCheckedChange={onCheckedChange}>Show grid</Menu.CheckboxItem>
        </Menu.Popup>
      </Menu.Root>
    )
    await user.click(getByRole('button', { name: 'View' }))
    await user.click(await findByRole('menuitemcheckbox', { name: 'Show grid' }))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })
})

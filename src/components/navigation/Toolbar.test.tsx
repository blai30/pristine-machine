import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Toolbar } from './Toolbar'

describe('Toolbar', () => {
  it('renders a toolbar with its controls', () => {
    const { getByRole } = render(
      <Toolbar.Root>
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Italic</Toolbar.Button>
      </Toolbar.Root>
    )
    expect(getByRole('toolbar')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Bold' })).toBeInTheDocument()
    expect(getByRole('button', { name: 'Italic' })).toBeInTheDocument()
  })

  it('fires a button onClick', async () => {
    const user = setupUser()
    const onClick = vi.fn()
    const { getByRole } = render(
      <Toolbar.Root>
        <Toolbar.Button onClick={onClick}>Save</Toolbar.Button>
      </Toolbar.Root>
    )
    await user.click(getByRole('button', { name: 'Save' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders a group wrapping controls', () => {
    const { getByRole } = render(
      <Toolbar.Root>
        <Toolbar.Group>
          <Toolbar.Button>One</Toolbar.Button>
        </Toolbar.Group>
      </Toolbar.Root>
    )
    expect(getByRole('group')).toBeInTheDocument()
  })
})

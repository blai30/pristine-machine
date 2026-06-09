import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('does not render its content while closed', () => {
    const { queryByText } = render(
      <Drawer open={false} onClose={() => {}}>
        panel content
      </Drawer>
    )
    expect(queryByText('panel content')).toBeNull()
  })

  it('renders its content while open', () => {
    const { getByText } = render(
      <Drawer open onClose={() => {}}>
        panel content
      </Drawer>
    )
    expect(getByText('panel content')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', async () => {
    const user = setupUser()
    const onClose = vi.fn()
    render(
      <Drawer open onClose={onClose}>
        panel content
      </Drawer>
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
})

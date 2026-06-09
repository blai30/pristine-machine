import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Collapsible } from './Collapsible'

function Example() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>Toggle</Collapsible.Trigger>
      <Collapsible.Panel>Hidden body</Collapsible.Panel>
    </Collapsible.Root>
  )
}

describe('Collapsible', () => {
  it('renders a collapsed trigger by default', () => {
    const { getByRole } = render(<Example />)
    expect(getByRole('button', { name: 'Toggle' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands and collapses on trigger click', async () => {
    const user = setupUser()
    const { getByRole } = render(<Example />)
    const trigger = getByRole('button', { name: 'Toggle' })

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})

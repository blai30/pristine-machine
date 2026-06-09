import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Accordion } from './Accordion'

function Example({ multiple = false }: { multiple?: boolean }) {
  return (
    <Accordion.Root multiple={multiple}>
      <Accordion.Item value="one">
        <Accordion.Trigger>First</Accordion.Trigger>
        <Accordion.Panel>First body</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Trigger>Second</Accordion.Trigger>
        <Accordion.Panel>Second body</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}

describe('Accordion', () => {
  it('renders a trigger per item, collapsed by default', () => {
    const { getByRole } = render(<Example />)
    expect(getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands a panel when its trigger is clicked', async () => {
    const user = setupUser()
    const { getByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'First' }))
    expect(getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses the previous panel when single (default)', async () => {
    const user = setupUser()
    const { getByRole } = render(<Example />)
    await user.click(getByRole('button', { name: 'First' }))
    await user.click(getByRole('button', { name: 'Second' }))
    expect(getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false')
    expect(getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps multiple panels open when multiple is set', async () => {
    const user = setupUser()
    const { getByRole } = render(<Example multiple />)
    await user.click(getByRole('button', { name: 'First' }))
    await user.click(getByRole('button', { name: 'Second' }))
    expect(getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true')
    expect(getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true')
  })
})

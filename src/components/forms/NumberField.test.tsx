import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { NumberField } from './NumberField'

describe('NumberField', () => {
  it('renders a labelled input', () => {
    const { getByText, container } = render(<NumberField label="Quantity" id="qty" />)
    expect(getByText('Quantity')).toBeInTheDocument()
    expect(container.querySelector('input')).toBeInTheDocument()
  })

  it('renders decrement and increment buttons', () => {
    const { getAllByRole } = render(<NumberField label="Quantity" />)
    expect(getAllByRole('button')).toHaveLength(2)
  })

  it('increments the value when the increment button is pressed', async () => {
    const user = setupUser()
    const { getAllByRole, container } = render(<NumberField label="Quantity" defaultValue={5} />)
    const increment = getAllByRole('button')[1]
    await user.click(increment)
    expect(container.querySelector('input')).toHaveValue('6')
  })

  it('decrements the value when the decrement button is pressed', async () => {
    const user = setupUser()
    const { getAllByRole, container } = render(<NumberField label="Quantity" defaultValue={5} />)
    const decrement = getAllByRole('button')[0]
    await user.click(decrement)
    expect(container.querySelector('input')).toHaveValue('4')
  })
})

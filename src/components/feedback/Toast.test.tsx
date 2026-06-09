import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { ToastProvider, useToast } from './Toast'

function Trigger() {
  const toast = useToast()
  return (
    <button
      onClick={() =>
        toast.add({ title: 'Saved', description: 'Your changes were saved', type: 'success' })
      }
    >
      Notify
    </button>
  )
}

function Example() {
  return (
    <ToastProvider timeout={0}>
      <Trigger />
    </ToastProvider>
  )
}

describe('Toast', () => {
  it('enqueues a toast with its title and description', async () => {
    const user = setupUser()
    const { getByRole, findByText, getByText } = render(<Example />)
    await user.click(getByRole('button', { name: 'Notify' }))
    expect(await findByText('Saved')).toBeInTheDocument()
    expect(getByText('Your changes were saved')).toBeInTheDocument()
  })

  it('dismisses a toast via its close button', async () => {
    const user = setupUser()
    const { getByRole, findByText, queryByText } = render(<Example />)
    await user.click(getByRole('button', { name: 'Notify' }))
    await findByText('Saved')
    // Base UI keeps the toast's controls out of the a11y tree until focused, so the
    // close button is aria-hidden, so reach it directly by its label.
    const dismiss = document.querySelector('[aria-label="Dismiss"]')
    expect(dismiss).not.toBeNull()
    await user.click(dismiss as Element)
    expect(queryByText('Saved')).toBeNull()
  })
})

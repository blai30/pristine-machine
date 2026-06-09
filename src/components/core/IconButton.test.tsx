import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('exposes the label as both aria-label and title', () => {
    const { getByRole } = render(<IconButton label="Settings" />)
    const button = getByRole('button', { name: 'Settings' })
    expect(button).toHaveAttribute('title', 'Settings')
  })

  it('renders its icon child', () => {
    const { getByTestId } = render(
      <IconButton label="Edit">
        <svg data-testid="icon" />
      </IconButton>
    )
    expect(getByTestId('icon')).toBeInTheDocument()
  })

  it('defaults to the ghost variant', () => {
    const { getByRole } = render(<IconButton label="Ghost" />)
    expect(getByRole('button')).toHaveClass('text-mauve-600')
  })

  it('applies the solid variant classes', () => {
    const { getByRole } = render(<IconButton label="Solid" variant="solid" />)
    expect(getByRole('button')).toHaveClass('bg-rose-500')
  })

  it('applies size classes', () => {
    const { getByRole } = render(<IconButton label="Large" size="lg" />)
    expect(getByRole('button')).toHaveClass('size-11')
  })

  it('fires onClick', async () => {
    const user = setupUser()
    const onClick = vi.fn()
    const { getByRole } = render(<IconButton label="Press" onClick={onClick} />)
    await user.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})

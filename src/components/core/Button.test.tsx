import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Button } from './Button'

describe('Button', () => {
  it('renders its children inside a button', () => {
    const { getByRole } = render(<Button>Deploy</Button>)
    expect(getByRole('button', { name: 'Deploy' })).toBeInTheDocument()
  })

  it('defaults to the primary variant and medium size', () => {
    const { getByRole } = render(<Button>Go</Button>)
    const button = getByRole('button')
    expect(button).toHaveClass('bg-rose-500')
    expect(button).toHaveClass('h-9')
  })

  it('applies variant-specific classes', () => {
    const { getByRole } = render(<Button variant="danger">Delete</Button>)
    expect(getByRole('button')).toHaveClass('bg-red-500')
  })

  it('applies size-specific classes', () => {
    const { getByRole } = render(<Button size="sm">Small</Button>)
    expect(getByRole('button')).toHaveClass('h-7')
  })

  it('stretches full width when block is set', () => {
    const { getByRole } = render(<Button block>Wide</Button>)
    expect(getByRole('button')).toHaveClass('w-full')
  })

  it('renders leading and trailing icons', () => {
    const { getByTestId } = render(
      <Button iconLeft={<span data-testid="left" />} iconRight={<span data-testid="right" />}>
        Label
      </Button>
    )
    expect(getByTestId('left')).toBeInTheDocument()
    expect(getByTestId('right')).toBeInTheDocument()
  })

  it('fires onClick when pressed', async () => {
    const user = setupUser()
    const onClick = vi.fn()
    const { getByRole } = render(<Button onClick={onClick}>Click</Button>)
    await user.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick when disabled', async () => {
    const user = setupUser()
    const onClick = vi.fn()
    const { getByRole } = render(
      <Button disabled onClick={onClick}>
        Click
      </Button>
    )
    await user.click(getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
    expect(getByRole('button')).toBeDisabled()
  })

  it('merges a custom className', () => {
    const { getByRole } = render(<Button className="custom-x">X</Button>)
    expect(getByRole('button')).toHaveClass('custom-x')
  })
})

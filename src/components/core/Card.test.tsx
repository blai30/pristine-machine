import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Card, CardFooter, CardHeader } from './Card'

describe('Card', () => {
  it('wraps children in a padded body by default', () => {
    const { getByText } = render(<Card>Body</Card>)
    const body = getByText('Body')
    expect(body).toHaveClass('p-5')
  })

  it('renders children directly when padded is false', () => {
    const { getByText } = render(<Card padded={false}>Bare</Card>)
    expect(getByText('Bare')).not.toHaveClass('p-5')
  })

  it('applies the raised variant shadow', () => {
    const { container } = render(<Card variant="raised">Raised</Card>)
    expect(container.firstElementChild).toHaveClass('shadow-md')
  })

  it('applies the flat variant', () => {
    const { container } = render(<Card variant="flat">Flat</Card>)
    expect(container.firstElementChild).toHaveClass('shadow-none')
  })

  it('adds interactive affordance classes when interactive', () => {
    const { container } = render(<Card interactive>Hover</Card>)
    expect(container.firstElementChild).toHaveClass('cursor-pointer')
  })
})

describe('CardHeader', () => {
  it('renders with a bottom border', () => {
    const { getByText } = render(<CardHeader>Header</CardHeader>)
    expect(getByText('Header')).toHaveClass('border-b')
  })
})

describe('CardFooter', () => {
  it('renders with a top border pinned to the bottom', () => {
    const { getByText } = render(<CardFooter>Footer</CardFooter>)
    const footer = getByText('Footer')
    expect(footer).toHaveClass('border-t')
    expect(footer).toHaveClass('mt-auto')
  })
})

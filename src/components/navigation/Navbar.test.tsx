import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { Navbar } from './Navbar'

describe('Navbar.Root', () => {
  it('renders a header element', () => {
    const { container } = render(<Navbar.Root />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('is sticky by default', () => {
    const { container } = render(<Navbar.Root />)
    expect(container.firstChild).toHaveClass('sticky')
  })

  it('is relative when sticky={false}', () => {
    const { container } = render(<Navbar.Root sticky={false} />)
    expect(container.firstChild).toHaveClass('relative')
    expect(container.firstChild).not.toHaveClass('sticky')
  })

  it('forwards className', () => {
    const { container } = render(<Navbar.Root className="max-lg:hidden" />)
    expect(container.firstChild).toHaveClass('max-lg:hidden')
  })
})

describe('Navbar.Link', () => {
  function renderLink(props: React.ComponentPropsWithoutRef<typeof Navbar.Link>) {
    return render(
      <Navbar.Nav>
        <Navbar.List>
          <Navbar.Item>
            <Navbar.Link {...props} />
          </Navbar.Item>
        </Navbar.List>
      </Navbar.Nav>
    )
  }

  it('renders an anchor with the given href', () => {
    const { getByRole } = renderLink({ href: '#foundations', children: 'Foundations' })
    expect(getByRole('link', { name: 'Foundations' })).toHaveAttribute('href', '#foundations')
  })

  it('sets aria-current="page" when active', () => {
    const { getByRole } = renderLink({
      href: '#foundations',
      active: true,
      children: 'Foundations',
    })
    expect(getByRole('link', { name: 'Foundations' })).toHaveAttribute('aria-current', 'page')
  })

  it('does not set aria-current when not active', () => {
    const { getByRole } = renderLink({ href: '#foundations', children: 'Foundations' })
    expect(getByRole('link', { name: 'Foundations' })).not.toHaveAttribute('aria-current')
  })

  it('applies rose accent class when active', () => {
    const { getByRole } = renderLink({
      href: '#foundations',
      active: true,
      children: 'Foundations',
    })
    expect(getByRole('link', { name: 'Foundations' })).toHaveClass('text-rose-600')
  })

  it('applies muted class when not active', () => {
    const { getByRole } = renderLink({ href: '#foundations', children: 'Foundations' })
    expect(getByRole('link', { name: 'Foundations' })).toHaveClass('text-mauve-500')
  })
})

describe('Navbar.Nav', () => {
  it('renders a nav element', () => {
    const { container } = render(<Navbar.Nav />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})

describe('Navbar.List', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Navbar.Nav>
        <Navbar.List>
          <Navbar.Item>
            <Navbar.Link href="#">Item</Navbar.Link>
          </Navbar.Item>
        </Navbar.List>
      </Navbar.Nav>
    )
    expect(getByText('Item')).toBeInTheDocument()
  })
})

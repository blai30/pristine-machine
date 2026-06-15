import { describe, expect, it } from 'vitest'

import { render } from '@/test/render'

import { SideNav } from './SideNav'

describe('SideNav.Root', () => {
  it('renders a nav with the default aria-label', () => {
    const { container } = render(<SideNav.Root />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label', 'Sections')
  })
})

describe('SideNav.GroupLabel', () => {
  it('renders an anchor when href is given', () => {
    const { getByRole } = render(
      <SideNav.GroupLabel href="#foundations">Foundations</SideNav.GroupLabel>
    )
    expect(getByRole('link', { name: /Foundations/ })).toHaveAttribute('href', '#foundations')
  })

  it('renders a non-anchor when no href is given', () => {
    const { queryByRole, getByText } = render(<SideNav.GroupLabel>Foundations</SideNav.GroupLabel>)
    expect(queryByRole('link')).toBeNull()
    expect(getByText('Foundations')).toBeInTheDocument()
  })

  it('shows the ordinal when number is given', () => {
    const { getByText } = render(
      <SideNav.GroupLabel number={2} href="#components">
        Components
      </SideNav.GroupLabel>
    )
    expect(getByText('2.')).toBeInTheDocument()
  })

  it('applies the active class when active', () => {
    const { getByRole } = render(
      <SideNav.GroupLabel href="#foundations" active>
        Foundations
      </SideNav.GroupLabel>
    )
    expect(getByRole('link', { name: /Foundations/ })).toHaveClass('text-mauve-900')
  })

  it('applies the muted class when not active', () => {
    const { getByRole } = render(
      <SideNav.GroupLabel href="#foundations">Foundations</SideNav.GroupLabel>
    )
    expect(getByRole('link', { name: /Foundations/ })).toHaveClass('text-mauve-500')
  })
})

describe('SideNav.Link', () => {
  function renderLink(props: React.ComponentPropsWithoutRef<typeof SideNav.Link>) {
    return render(
      <SideNav.Root>
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link {...props} />
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Root>
    )
  }

  it('renders an anchor with the given href', () => {
    const { getByRole } = renderLink({ href: '#colors', children: 'Color' })
    expect(getByRole('link', { name: 'Color' })).toHaveAttribute('href', '#colors')
  })

  it('sets aria-current="page" and accent classes when active', () => {
    const { getByRole } = renderLink({ href: '#colors', active: true, children: 'Color' })
    const link = getByRole('link', { name: 'Color' })
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).toHaveClass('border-rose-500')
    expect(link).toHaveClass('text-rose-700')
  })

  it('has no aria-current and uses muted border when not active', () => {
    const { getByRole } = renderLink({ href: '#colors', children: 'Color' })
    const link = getByRole('link', { name: 'Color' })
    expect(link).not.toHaveAttribute('aria-current')
    expect(link).toHaveClass('border-mauve-200')
  })
})

describe('SideNav.List', () => {
  it('renders its item and link children', () => {
    const { getByRole } = render(
      <SideNav.Root>
        <SideNav.List>
          <SideNav.Item>
            <SideNav.Link href="#colors">Color</SideNav.Link>
          </SideNav.Item>
          <SideNav.Item>
            <SideNav.Link href="#type">Typography</SideNav.Link>
          </SideNav.Item>
        </SideNav.List>
      </SideNav.Root>
    )
    expect(getByRole('link', { name: 'Color' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Typography' })).toBeInTheDocument()
  })
})

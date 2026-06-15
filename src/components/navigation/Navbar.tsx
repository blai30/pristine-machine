import { NavigationMenu } from '@base-ui/react/navigation-menu'
import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

import { focusRing } from '@/lib/styles'

type RootProps = HTMLAttributes<HTMLElement> & {
  /** Pin to the top of the scroll container (default true). */
  sticky?: boolean
}

function Root({ sticky = true, className = '', children, ...rest }: RootProps) {
  return (
    <header
      className={clsx(
        'flex items-center gap-6 border-b border-mauve-300 bg-mauve-100/90 px-6 py-3 backdrop-blur-xl sm:px-10 dark:border-mauve-700 dark:bg-mauve-900/90',
        sticky ? 'sticky top-0 z-20' : 'relative',
        className
      )}
      {...rest}
    >
      {children}
    </header>
  )
}

type NavProps = Omit<NavigationMenu.Root.Props, 'className' | 'render'> & {
  className?: string
}

function Nav({ className = '', ...rest }: NavProps) {
  return (
    <NavigationMenu.Root
      className={clsx('flex min-w-0 flex-1 items-center', className)}
      {...rest}
    />
  )
}

type ListProps = Omit<NavigationMenu.List.Props, 'className' | 'render'> & {
  className?: string
}

function List({ className = '', ...rest }: ListProps) {
  return (
    <NavigationMenu.List
      className={clsx('flex flex-wrap items-center justify-end gap-x-7 gap-y-1', className)}
      {...rest}
    />
  )
}

type ItemProps = Omit<NavigationMenu.Item.Props, 'className' | 'render'> & {
  className?: string
}

function Item({ className, ...rest }: ItemProps) {
  return <NavigationMenu.Item className={className} {...rest} />
}

type LinkProps = Omit<NavigationMenu.Link.Props, 'className' | 'render'> & {
  /** Highlight as the current section — accent color plus aria-current="page". */
  active?: boolean
  className?: string
}

function Link({ active = false, className = '', ...rest }: LinkProps) {
  return (
    <NavigationMenu.Link
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'rounded-none py-1 font-mono text-xs font-medium tracking-widest whitespace-nowrap uppercase transition-colors duration-150 ease-out hover:duration-0',
        active
          ? 'text-rose-600 dark:text-rose-300'
          : 'text-mauve-500 hover:text-mauve-900 dark:text-mauve-400 dark:hover:text-mauve-100',
        focusRing,
        className
      )}
      {...rest}
    />
  )
}

export const Navbar = { Root, Nav, List, Item, Link }

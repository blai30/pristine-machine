import { NavigationMenu } from '@base-ui/react/navigation-menu'
import { clsx } from 'clsx/lite'
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react'

import { focusRing } from '@/lib/styles'

type RootProps = Omit<NavigationMenu.Root.Props, 'className' | 'render' | 'orientation'> & {
  className?: string
}

function Root({ className = '', 'aria-label': ariaLabel = 'Sections', ...rest }: RootProps) {
  return (
    <NavigationMenu.Root
      orientation="vertical"
      aria-label={ariaLabel}
      className={clsx('flex flex-col gap-7', className)}
      {...rest}
    />
  )
}

type GroupProps = HTMLAttributes<HTMLDivElement>

function Group({ className = '', ...rest }: GroupProps) {
  return <div className={clsx('flex flex-col gap-2.5', className)} {...rest} />
}

type GroupLabelProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
  /** Optional ordinal, rendered before the label in the accent color. */
  number?: number
  /** Highlight as the current section. */
  active?: boolean
  className?: string
}

function GroupLabel({
  number,
  active = false,
  className = '',
  children,
  ...rest
}: GroupLabelProps) {
  const classes = clsx(
    'font-mono text-xs font-medium tracking-widest uppercase transition-colors duration-150 ease-out hover:duration-0',
    active
      ? 'text-mauve-900 dark:text-mauve-100'
      : 'text-mauve-500 hover:text-mauve-900 dark:text-mauve-400 dark:hover:text-mauve-100',
    focusRing,
    className
  )
  const content = (
    <>
      {number != null && <span className="text-rose-500 dark:text-rose-400">{number}.</span>}{' '}
      {children}
    </>
  )

  if (rest.href != null) {
    return (
      <a className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return <span className={classes}>{content}</span>
}

type ListProps = Omit<NavigationMenu.List.Props, 'className' | 'render'> & {
  className?: string
}

function List({ className = '', ...rest }: ListProps) {
  return <NavigationMenu.List className={clsx('flex flex-col', className)} {...rest} />
}

type ItemProps = Omit<NavigationMenu.Item.Props, 'className' | 'render'> & {
  className?: string
}

function Item({ className, ...rest }: ItemProps) {
  return <NavigationMenu.Item className={className} {...rest} />
}

type LinkProps = Omit<NavigationMenu.Link.Props, 'className' | 'render'> & {
  /** Highlight as the current item — accent color plus aria-current="page". */
  active?: boolean
  className?: string
}

function Link({ active = false, className = '', ...rest }: LinkProps) {
  return (
    <NavigationMenu.Link
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'block border-l py-1.5 pl-3 font-sans text-sm transition-colors duration-150 ease-out hover:duration-0',
        active
          ? 'border-rose-500 text-rose-700 dark:border-rose-400 dark:text-rose-300'
          : 'border-mauve-200 text-mauve-600 hover:border-mauve-400 hover:text-mauve-900 dark:border-mauve-700 dark:text-mauve-400 dark:hover:text-mauve-100',
        focusRing,
        className
      )}
      {...rest}
    />
  )
}

export const SideNav = { Root, Group, GroupLabel, List, Item, Link }

import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar'
import { clsx } from 'clsx/lite'

import { focusRing } from '@/lib/styles'

const root =
  'inline-flex items-center gap-1 rounded-none border border-mauve-200 bg-white p-1 dark:border-mauve-700 dark:bg-mauve-800'

const control =
  'inline-flex h-8 items-center justify-center gap-2 rounded-none border border-transparent px-2.5 font-sans text-sm font-medium text-mauve-700 transition-colors ease-out select-none hover:bg-mauve-200 hover:text-mauve-900 hover:duration-0 data-disabled:pointer-events-none data-disabled:opacity-50 data-pressed:bg-rose-50 data-pressed:text-rose-700 dark:text-mauve-300 dark:hover:bg-mauve-700 dark:hover:text-mauve-100 dark:data-pressed:bg-rose-400/15 dark:data-pressed:text-rose-300 [&_svg]:size-4'

type RootProps = Omit<BaseToolbar.Root.Props, 'className'> & { className?: string }

function ToolbarRoot({ className = '', ...rest }: RootProps) {
  return <BaseToolbar.Root className={clsx(root, className)} {...rest} />
}

type ButtonProps = Omit<BaseToolbar.Button.Props, 'className'> & { className?: string }

function ToolbarButton({ className = '', ...rest }: ButtonProps) {
  return <BaseToolbar.Button className={clsx(control, focusRing, className)} {...rest} />
}

type LinkProps = Omit<BaseToolbar.Link.Props, 'className'> & { className?: string }

function ToolbarLink({ className = '', ...rest }: LinkProps) {
  return <BaseToolbar.Link className={clsx(control, focusRing, className)} {...rest} />
}

type SeparatorProps = Omit<BaseToolbar.Separator.Props, 'className'> & { className?: string }

function ToolbarSeparator({ className = '', ...rest }: SeparatorProps) {
  return (
    <BaseToolbar.Separator
      className={clsx('mx-1 h-5 w-px shrink-0 bg-mauve-200 dark:bg-mauve-700', className)}
      {...rest}
    />
  )
}

type GroupProps = Omit<BaseToolbar.Group.Props, 'className'> & { className?: string }

function ToolbarGroup({ className = '', ...rest }: GroupProps) {
  return (
    <BaseToolbar.Group className={clsx('inline-flex items-center gap-1', className)} {...rest} />
  )
}

/**
 * A roving-focus action bar built on Base UI Toolbar. `Button` doubles as a toggle
 * (style its pressed state via `data-pressed`). Compose `Button`, `Link`, `Group`, and
 * `Separator`; arrow keys move focus between controls.
 */
export const Toolbar = {
  Root: ToolbarRoot,
  Button: ToolbarButton,
  Link: ToolbarLink,
  Separator: ToolbarSeparator,
  Group: ToolbarGroup,
}

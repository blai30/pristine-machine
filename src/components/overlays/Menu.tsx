import { Menu as BaseMenu } from '@base-ui/react/menu'
import { clsx } from 'clsx/lite'
import { Check, ChevronRight } from 'lucide-react'

const popup =
  'min-w-44 rounded-none border border-mauve-200 bg-white py-1 text-mauve-900 shadow-md shadow-rose-900/10 outline-none transition duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100'

const item =
  'flex cursor-default items-center gap-2 px-3 py-2 font-sans text-base outline-none select-none data-highlighted:bg-rose-50 data-highlighted:text-rose-700 data-disabled:pointer-events-none data-disabled:opacity-50 dark:data-highlighted:bg-rose-400/15 dark:data-highlighted:text-rose-300'

const indicatorSlot =
  'flex size-4 shrink-0 items-center justify-center text-rose-500 dark:text-rose-400'

type PopupProps = Omit<BaseMenu.Popup.Props, 'className'> & {
  className?: string
  side?: BaseMenu.Positioner.Props['side']
  align?: BaseMenu.Positioner.Props['align']
  sideOffset?: number
}

function MenuPopup({
  className = '',
  side,
  align = 'start',
  sideOffset = 0,
  children,
  ...rest
}: PopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50">
        <BaseMenu.Popup className={clsx(popup, className)} {...rest}>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

type ItemProps = Omit<BaseMenu.Item.Props, 'className'> & { className?: string }

function MenuItem({ className = '', ...rest }: ItemProps) {
  return <BaseMenu.Item className={clsx(item, className)} {...rest} />
}

type SeparatorProps = Omit<BaseMenu.Separator.Props, 'className'> & { className?: string }

function MenuSeparator({ className = '', ...rest }: SeparatorProps) {
  return (
    <BaseMenu.Separator
      className={clsx('my-1 h-px bg-mauve-200 dark:bg-mauve-700', className)}
      {...rest}
    />
  )
}

type GroupLabelProps = Omit<BaseMenu.GroupLabel.Props, 'className'> & { className?: string }

function MenuGroupLabel({ className = '', ...rest }: GroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={clsx(
        'px-3 py-1.5 font-mono text-xs font-medium tracking-widest text-mauve-500 uppercase',
        className
      )}
      {...rest}
    />
  )
}

type CheckboxItemProps = Omit<BaseMenu.CheckboxItem.Props, 'className'> & { className?: string }

function MenuCheckboxItem({ className = '', children, ...rest }: CheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem className={clsx(item, className)} {...rest}>
      <span className={indicatorSlot}>
        <BaseMenu.CheckboxItemIndicator>
          <Check className="size-4" />
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

type RadioItemProps = Omit<BaseMenu.RadioItem.Props, 'className'> & { className?: string }

function MenuRadioItem({ className = '', children, ...rest }: RadioItemProps) {
  return (
    <BaseMenu.RadioItem className={clsx(item, className)} {...rest}>
      <span className={indicatorSlot}>
        <BaseMenu.RadioItemIndicator>
          <span className="size-2 bg-current" />
        </BaseMenu.RadioItemIndicator>
      </span>
      {children}
    </BaseMenu.RadioItem>
  )
}

type SubmenuTriggerProps = Omit<BaseMenu.SubmenuTrigger.Props, 'className'> & { className?: string }

function MenuSubmenuTrigger({ className = '', children, ...rest }: SubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger
      className={clsx(
        item,
        'justify-between data-popup-open:bg-rose-50 dark:data-popup-open:bg-rose-400/15',
        className
      )}
      {...rest}
    >
      {children}
      <ChevronRight className="size-4 shrink-0 text-mauve-500" />
    </BaseMenu.SubmenuTrigger>
  )
}

/**
 * Dropdown menu built on Base UI Menu. `Popup` bundles the portal and positioner;
 * `CheckboxItem` / `RadioItem` ship their own indicators, and `SubmenuTrigger` ships its
 * chevron. `Trigger` is a raw Base UI part - pass `render={<Button />}` to style it.
 */
export const Menu = {
  Root: BaseMenu.Root,
  Trigger: BaseMenu.Trigger,
  Popup: MenuPopup,
  Item: MenuItem,
  Separator: MenuSeparator,
  Group: BaseMenu.Group,
  GroupLabel: MenuGroupLabel,
  CheckboxItem: MenuCheckboxItem,
  RadioGroup: BaseMenu.RadioGroup,
  RadioItem: MenuRadioItem,
  SubmenuRoot: BaseMenu.SubmenuRoot,
  SubmenuTrigger: MenuSubmenuTrigger,
}

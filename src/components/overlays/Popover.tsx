import { Popover as BasePopover } from '@base-ui/react/popover'
import { clsx } from 'clsx/lite'

const popup =
  'max-w-xs rounded-none border border-mauve-200 bg-white p-4 text-mauve-900 shadow-md shadow-rose-900/10 outline-none transition duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100'

const arrow =
  'size-2.5 rotate-45 border-mauve-200 bg-white data-[side=bottom]:bottom-full data-[side=bottom]:translate-y-1/2 data-[side=top]:top-full data-[side=top]:-translate-y-1/2 data-[side=left]:left-full data-[side=left]:-translate-x-1/2 data-[side=right]:right-full data-[side=right]:translate-x-1/2 dark:border-mauve-700 dark:bg-mauve-800'

const title = 'font-sans text-base font-semibold text-mauve-900 dark:text-mauve-100'
const description = 'font-sans text-sm leading-normal text-mauve-600 dark:text-mauve-400'

type PopupProps = Omit<BasePopover.Popup.Props, 'className'> & {
  className?: string
  side?: BasePopover.Positioner.Props['side']
  align?: BasePopover.Positioner.Props['align']
  sideOffset?: number
}

function PopoverPopup({
  className = '',
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  children,
  ...rest
}: PopupProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50">
        <BasePopover.Popup className={clsx(popup, className)} {...rest}>
          <BasePopover.Arrow className={arrow} />
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

type TitleProps = Omit<BasePopover.Title.Props, 'className'> & { className?: string }

function PopoverTitle({ className = '', ...rest }: TitleProps) {
  return <BasePopover.Title className={clsx(title, className)} {...rest} />
}

type DescriptionProps = Omit<BasePopover.Description.Props, 'className'> & { className?: string }

function PopoverDescription({ className = '', ...rest }: DescriptionProps) {
  return <BasePopover.Description className={clsx(description, className)} {...rest} />
}

/**
 * Floating panel anchored to a trigger, built on Base UI Popover. `Popup` bundles the
 * portal, positioner, and arrow; tune placement with `side` / `align` / `sideOffset`.
 * `Trigger` and `Close` are raw Base UI parts - pass `render={<Button />}` to style them.
 */
export const Popover = {
  Root: BasePopover.Root,
  Trigger: BasePopover.Trigger,
  Close: BasePopover.Close,
  Popup: PopoverPopup,
  Title: PopoverTitle,
  Description: PopoverDescription,
}

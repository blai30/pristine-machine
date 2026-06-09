import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { clsx } from 'clsx/lite'

const backdrop =
  'fixed inset-0 z-40 bg-mauve-950/50 transition-opacity duration-200 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0'

const viewport = 'fixed inset-0 z-50 flex items-center justify-center p-4'

const popup =
  'flex w-full max-w-md flex-col gap-4 rounded-none border border-mauve-200 bg-white p-6 shadow-md shadow-rose-900/10 outline-none transition duration-200 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800'

const title = 'font-serif text-2xl leading-tight text-mauve-900 dark:text-mauve-100'
const description = 'font-sans text-base leading-normal text-mauve-600 dark:text-mauve-400'

type PopupProps = Omit<BaseDialog.Popup.Props, 'className'> & { className?: string }

function DialogPopup({ className = '', children, ...rest }: PopupProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={backdrop} />
      <BaseDialog.Viewport className={viewport}>
        <BaseDialog.Popup className={clsx(popup, className)} {...rest}>
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  )
}

type TitleProps = Omit<BaseDialog.Title.Props, 'className'> & { className?: string }

function DialogTitle({ className = '', ...rest }: TitleProps) {
  return <BaseDialog.Title className={clsx(title, className)} {...rest} />
}

type DescriptionProps = Omit<BaseDialog.Description.Props, 'className'> & { className?: string }

function DialogDescription({ className = '', ...rest }: DescriptionProps) {
  return <BaseDialog.Description className={clsx(description, className)} {...rest} />
}

/**
 * Modal dialog built on Base UI Dialog. `Popup` bundles the portal, backdrop, and
 * centered viewport so consumers only compose the body. `Trigger` and `Close` are raw
 * Base UI parts - pass `render={<Button />}` to style them. Light-dismisses by default.
 */
export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Close: BaseDialog.Close,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
}

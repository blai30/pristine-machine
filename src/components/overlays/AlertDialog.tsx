import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { clsx } from 'clsx/lite'

const backdrop =
  'fixed inset-0 z-40 bg-mauve-950/50 transition-opacity duration-200 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0'

const viewport = 'fixed inset-0 z-50 flex items-center justify-center p-4'

const popup =
  'flex w-full max-w-sm flex-col gap-4 rounded-none border border-mauve-200 bg-white p-6 shadow-md shadow-rose-900/10 outline-none transition duration-200 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800'

const title = 'font-serif text-2xl leading-tight text-mauve-900 dark:text-mauve-100'
const description = 'font-sans text-base leading-normal text-mauve-600 dark:text-mauve-400'

type PopupProps = Omit<BaseAlertDialog.Popup.Props, 'className'> & { className?: string }

function AlertDialogPopup({ className = '', children, ...rest }: PopupProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className={backdrop} />
      <BaseAlertDialog.Viewport className={viewport}>
        <BaseAlertDialog.Popup className={clsx(popup, className)} {...rest}>
          {children}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  )
}

type TitleProps = Omit<BaseAlertDialog.Title.Props, 'className'> & { className?: string }

function AlertDialogTitle({ className = '', ...rest }: TitleProps) {
  return <BaseAlertDialog.Title className={clsx(title, className)} {...rest} />
}

type DescriptionProps = Omit<BaseAlertDialog.Description.Props, 'className'> & {
  className?: string
}

function AlertDialogDescription({ className = '', ...rest }: DescriptionProps) {
  return <BaseAlertDialog.Description className={clsx(description, className)} {...rest} />
}

/**
 * Confirmation dialog built on Base UI AlertDialog. Same shape as `Dialog`, but it does
 * not light-dismiss - the user must pick an explicit action, so always include a
 * `Close` (cancel) and a confirm action. Use for destructive or blocking decisions.
 */
export const AlertDialog = {
  Root: BaseAlertDialog.Root,
  Trigger: BaseAlertDialog.Trigger,
  Close: BaseAlertDialog.Close,
  Popup: AlertDialogPopup,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
}

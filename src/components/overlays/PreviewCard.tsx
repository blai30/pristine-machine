import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { clsx } from 'clsx/lite'

const popup =
  'flex w-72 flex-col gap-3 rounded-none border border-mauve-200 bg-white p-4 text-mauve-900 shadow-md shadow-rose-900/10 outline-none transition duration-150 ease-out data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100'

const arrow =
  'size-2.5 rotate-45 border-mauve-200 bg-white data-[side=bottom]:bottom-full data-[side=bottom]:translate-y-1/2 data-[side=top]:top-full data-[side=top]:-translate-y-1/2 data-[side=left]:left-full data-[side=left]:-translate-x-1/2 data-[side=right]:right-full data-[side=right]:translate-x-1/2 dark:border-mauve-700 dark:bg-mauve-800'

type PopupProps = Omit<BasePreviewCard.Popup.Props, 'className'> & {
  className?: string
  side?: BasePreviewCard.Positioner.Props['side']
  align?: BasePreviewCard.Positioner.Props['align']
  sideOffset?: number
}

function PreviewCardPopup({
  className = '',
  side = 'top',
  align = 'center',
  sideOffset = 8,
  children,
  ...rest
}: PopupProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <BasePreviewCard.Popup className={clsx(popup, className)} {...rest}>
          <BasePreviewCard.Arrow className={arrow} />
          {children}
        </BasePreviewCard.Popup>
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  )
}

/**
 * Rich hover preview anchored to an inline trigger (typically a link), built on Base UI
 * PreviewCard. `Popup` bundles the portal, positioner, and arrow; compose the preview
 * body (image, title, blurb) inside it. `Trigger` is a raw Base UI part.
 */
export const PreviewCard = {
  Root: BasePreviewCard.Root,
  Trigger: BasePreviewCard.Trigger,
  Popup: PreviewCardPopup,
}

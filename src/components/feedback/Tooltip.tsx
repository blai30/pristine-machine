import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export type TooltipPlacement = 'top' | 'bottom'

export type TooltipProps = {
  label: ReactNode
  placement?: TooltipPlacement
  children: ReactNode
  className?: string
}

const popup =
  'rounded-none bg-mauve-900 px-2 py-1.5 font-mono text-xs leading-tight text-mauve-50 shadow-md shadow-rose-900/20 transition-opacity duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 dark:bg-mauve-100 dark:text-mauve-900'

export function Tooltip({ label, placement = 'top', children, className = '' }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={<span className={clsx('inline-flex', className)} />}>
        {children}
      </BaseTooltip.Trigger>
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={placement} sideOffset={8} className="z-50">
          <BaseTooltip.Popup className={popup}>
            {label}
            <BaseTooltip.Arrow className="size-2 rotate-45 bg-mauve-900 data-[side=bottom]:bottom-full data-[side=bottom]:translate-y-1/2 data-[side=top]:top-full data-[side=top]:-translate-y-1/2 dark:bg-mauve-100" />
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}

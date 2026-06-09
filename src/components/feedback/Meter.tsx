import { Meter as BaseMeter } from '@base-ui/react/meter'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export type MeterProps = {
  /** The measured value within `min`..`max`. */
  value: number
  min?: number
  max?: number
  label?: ReactNode
  /** Show the formatted value on the right of the label row. */
  showValue?: boolean
  className?: string
}

const track = 'relative h-2 w-full overflow-hidden rounded-none bg-mauve-200 dark:bg-mauve-700'

const indicator = 'h-full bg-rose-500 transition-all duration-300 ease-out dark:bg-rose-400'

export function Meter({
  value,
  min = 0,
  max = 100,
  label,
  showValue = false,
  className = '',
}: MeterProps) {
  return (
    <BaseMeter.Root
      value={value}
      min={min}
      max={max}
      className={clsx('flex w-full flex-col gap-1.5', className)}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2 font-mono text-xs">
          {label ? (
            <BaseMeter.Label className="text-mauve-600 dark:text-mauve-400">
              {label}
            </BaseMeter.Label>
          ) : (
            <span />
          )}
          {showValue && <BaseMeter.Value className="text-mauve-500" />}
        </div>
      )}
      <BaseMeter.Track className={track}>
        <BaseMeter.Indicator className={indicator} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  )
}

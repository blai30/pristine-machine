import { Progress as BaseProgress } from '@base-ui/react/progress'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export type ProgressProps = {
  /** Current value; pass `null` (or omit) for an indeterminate bar. */
  value?: number | null
  min?: number
  max?: number
  label?: ReactNode
  /** Show the formatted percentage on the right of the label row. */
  showValue?: boolean
  className?: string
}

const track = 'relative h-2 w-full overflow-hidden rounded-none bg-mauve-200 dark:bg-mauve-700'

const indicator =
  'h-full bg-rose-500 transition-all duration-300 ease-out data-indeterminate:w-full data-indeterminate:animate-pulse dark:bg-rose-400'

export function Progress({
  value = null,
  min = 0,
  max = 100,
  label,
  showValue = false,
  className = '',
}: ProgressProps) {
  return (
    <BaseProgress.Root
      value={value}
      min={min}
      max={max}
      className={clsx('flex w-full flex-col gap-1.5', className)}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2 font-mono text-xs">
          {label ? (
            <BaseProgress.Label className="text-mauve-600 dark:text-mauve-400">
              {label}
            </BaseProgress.Label>
          ) : (
            <span />
          )}
          {showValue && <BaseProgress.Value className="text-mauve-500" />}
        </div>
      )}
      <BaseProgress.Track className={track}>
        <BaseProgress.Indicator className={indicator} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}

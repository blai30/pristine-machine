import { Slider as BaseSlider } from '@base-ui/react/slider'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export type SliderProps = Omit<BaseSlider.Root.Props, 'className' | 'render'> & {
  label?: ReactNode
  /** Show the formatted value on the right of the label row. */
  showValue?: boolean
  className?: string
}

const thumb =
  'size-4 rounded-none border-2 border-rose-500 bg-white shadow-sm shadow-rose-900/15 transition-colors ease-out hover:bg-rose-50 hover:duration-0 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:border-rose-400 dark:bg-mauve-100 dark:focus-visible:ring-rose-400/25'

export function Slider({
  label,
  showValue = false,
  className = '',
  value,
  defaultValue,
  ...rest
}: SliderProps) {
  const current = value ?? defaultValue
  const thumbCount = Array.isArray(current) ? current.length : 1
  return (
    <BaseSlider.Root
      value={value}
      defaultValue={defaultValue}
      className={clsx('flex w-full flex-col gap-2', className)}
      {...rest}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2 font-mono text-xs">
          {label ? (
            <BaseSlider.Label className="text-mauve-600 dark:text-mauve-400">
              {label}
            </BaseSlider.Label>
          ) : (
            <span />
          )}
          {showValue && <BaseSlider.Value className="text-mauve-500" />}
        </div>
      )}
      <BaseSlider.Control className="flex w-full touch-none items-center py-2 select-none">
        <BaseSlider.Track className="h-1.5 w-full rounded-none bg-mauve-200 dark:bg-mauve-700">
          <BaseSlider.Indicator className="rounded-none bg-rose-500 dark:bg-rose-400" />
          {Array.from({ length: thumbCount }, (_unused, index) => (
            <BaseSlider.Thumb key={index} className={thumb} />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

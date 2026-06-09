import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

import { focusRing } from '@/lib/styles'

export type SegmentOption = {
  label: ReactNode
  value: string
}

export type SegmentedControlProps = {
  options: SegmentOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const segment =
  'rounded-none px-3 py-1.5 font-sans text-sm font-medium transition-colors ease-out hover:duration-0 text-mauve-600 hover:text-mauve-900 data-pressed:bg-rose-50 data-pressed:text-rose-700 dark:text-mauve-400 dark:hover:text-mauve-100 dark:data-pressed:bg-rose-400/15 dark:data-pressed:text-rose-300'

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  className = '',
}: SegmentedControlProps) {
  return (
    <ToggleGroup
      value={value !== undefined ? [value] : undefined}
      defaultValue={value === undefined ? [defaultValue ?? options[0]?.value] : undefined}
      onValueChange={(next) => {
        if (next.length) onChange?.(next[next.length - 1])
      }}
      className={clsx(
        'inline-flex gap-0.5 rounded-none border border-mauve-300 p-0.5 dark:border-mauve-700',
        className
      )}
    >
      {options.map((option) => (
        <Toggle key={option.value} value={option.value} className={clsx(segment, focusRing)}>
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  )
}

import type { HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'

import { clsx } from 'clsx/lite'
import { focusRing } from '@/lib/styles'

export interface SegmentOption {
  label: ReactNode
  value: string
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}: SegmentedControlProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value)
  const active = isControlled ? value : internal

  const select = (next: string) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div
      className={clsx(
        'inline-flex gap-0.5 rounded-none border border-mauve-300 p-0.5 dark:border-mauve-700',
        className
      )}
      role="group"
      {...rest}
    >
      {options.map((option) => {
        const pressed = active === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => select(option.value)}
            className={clsx(
              'rounded-none px-3 py-1.5 font-sans text-sm font-medium transition-colors hover:duration-0 ease-out',
              pressed
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300'
                : 'text-mauve-600 hover:text-mauve-900 dark:text-mauve-400 dark:hover:text-mauve-100',
              focusRing
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

import type { HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'

import { clsx } from 'clsx/lite'
import { focusRing } from '@/lib/styles'

export interface TabItem {
  label: ReactNode
  value: string
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export function Tabs({ items, value, defaultValue, onChange, className = '', ...rest }: TabsProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value)
  const active = isControlled ? value : internal

  const select = (next: string) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div
      className={clsx('flex border-b border-mauve-200 dark:border-mauve-700', className)}
      role="tablist"
      {...rest}
    >
      {items.map((item) => {
        const selected = active === item.value
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => select(item.value)}
            className={clsx(
              'relative rounded-none px-3.5 py-2.5 font-sans text-base font-medium transition-colors hover:duration-0 ease-out',
              selected
                ? 'text-rose-700 dark:text-rose-300'
                : 'text-mauve-600 hover:text-mauve-900 dark:text-mauve-400 dark:hover:text-mauve-100',
              focusRing
            )}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={clsx(
                'pointer-events-none absolute inset-x-2.5 -bottom-px h-0.5 origin-center bg-rose-500 transition-transform duration-200 ease-out dark:bg-rose-400',
                selected ? 'scale-x-100' : 'scale-x-0'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

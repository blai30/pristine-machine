import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

import { focusRing } from '@/lib/styles'

export interface TabItem {
  label: ReactNode
  value: string
}

export interface TabsProps {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

const tab =
  'group relative rounded-none px-3.5 py-2.5 font-sans text-base font-medium transition-colors ease-out hover:duration-0 text-mauve-600 hover:text-mauve-900 data-active:text-rose-700 dark:text-mauve-400 dark:hover:text-mauve-100 dark:data-active:text-rose-300'

const underline =
  'pointer-events-none absolute inset-x-2.5 -bottom-px h-0.5 origin-center scale-x-0 bg-rose-500 transition-transform duration-200 ease-out group-data-active:scale-x-100 dark:bg-rose-400'

export function Tabs({ items, value, defaultValue, onChange, className = '' }: TabsProps) {
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={onChange ? (next) => onChange(String(next)) : undefined}
    >
      <BaseTabs.List
        className={clsx('flex border-b border-mauve-200 dark:border-mauve-700', className)}
      >
        {items.map((item) => (
          <BaseTabs.Tab key={item.value} value={item.value} className={clsx(tab, focusRing)}>
            {item.label}
            <span aria-hidden="true" className={underline} />
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
    </BaseTabs.Root>
  )
}

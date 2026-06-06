import { Select as BaseSelect } from '@base-ui/react/select'
import { clsx } from 'clsx/lite'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

export interface SelectMenuItem {
  label: ReactNode
  value: string
}

export interface SelectMenuProps {
  items: SelectMenuItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: ReactNode
  disabled?: boolean
  name?: string
  className?: string
}

const trigger =
  'flex h-9 w-full items-center justify-between gap-2 rounded-none border border-mauve-300 bg-white px-3 font-sans text-base text-mauve-900 transition ease-out hover:border-mauve-400 hover:duration-0 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none data-popup-open:border-rose-500 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100 dark:hover:border-mauve-600 dark:focus-visible:border-rose-400 dark:focus-visible:ring-rose-400/25 dark:data-popup-open:border-rose-400'

const popup =
  'max-h-80 min-w-(--anchor-width) overflow-y-auto rounded-none border border-mauve-200 bg-white py-1 text-mauve-900 shadow-md shadow-rose-900/10 outline-none transition duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100'

const itemClass =
  'flex cursor-default items-center justify-between gap-3 py-2 pr-3 pl-3 font-sans text-base outline-none select-none data-highlighted:bg-rose-50 data-highlighted:text-rose-700 dark:data-highlighted:bg-rose-400/15 dark:data-highlighted:text-rose-300'

export function SelectMenu({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  disabled = false,
  name,
  className = '',
}: SelectMenuProps) {
  return (
    <BaseSelect.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange
          ? (next) => {
              if (next != null) onValueChange(next)
            }
          : undefined
      }
      disabled={disabled}
      name={name}
    >
      <BaseSelect.Trigger className={clsx(trigger, className)}>
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className="flex shrink-0">
          <span
            aria-hidden="true"
            className="size-2 -translate-y-0.5 rotate-45 border-r-2 border-b-2 border-current text-mauve-500"
          />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className="z-50 outline-none" sideOffset={4}>
          <BaseSelect.Popup className={popup}>
            {items.map((item) => (
              <BaseSelect.Item key={item.value} value={item.value} className={itemClass}>
                <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="flex shrink-0 text-rose-500 dark:text-rose-400">
                  <Check className="size-4" />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

import { Select as BaseSelect } from '@base-ui/react/select'
import { clsx } from 'clsx/lite'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

export interface SelectItem {
  label: ReactNode
  value: string
}

export interface SelectProps {
  items: SelectItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: ReactNode
  disabled?: boolean
  name?: string
  className?: string
  /**
   * Render a native `<select>` instead of the Base UI listbox. Use when the native picker
   * experience is preferable for accessibility (e.g. mobile native pickers, AT familiarity).
   */
  native?: boolean
}

const trigger =
  'flex h-9 w-full items-center justify-between gap-2 rounded-none border border-mauve-300 bg-white px-3 font-sans text-base text-mauve-900 transition ease-out hover:border-mauve-400 hover:duration-0 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none data-popup-open:border-rose-500 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100 dark:hover:border-mauve-600 dark:focus-visible:border-rose-400 dark:focus-visible:ring-rose-400/25 dark:data-popup-open:border-rose-400'

const popup =
  'max-h-80 min-w-(--anchor-width) overflow-y-auto rounded-none border border-mauve-200 bg-white py-1 text-mauve-900 shadow-md shadow-rose-900/10 outline-none transition duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100'

const itemClass =
  'flex cursor-default items-center justify-between gap-3 py-2 pr-3 pl-3 font-sans text-base outline-none select-none data-highlighted:bg-rose-50 data-highlighted:text-rose-700 dark:data-highlighted:bg-rose-400/15 dark:data-highlighted:text-rose-300'

const chevron =
  'pointer-events-none absolute right-2.5 size-2 -translate-y-0.5 rotate-45 border-r-2 border-b-2 border-current text-mauve-500 transition-colors ease-out group-hover:text-mauve-700 group-hover:duration-0 dark:group-hover:text-mauve-300'

function NativeSelect({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled = false,
  name,
  className = '',
}: SelectProps) {
  return (
    <span className={clsx('group relative inline-flex w-full items-center', className)}>
      <select
        value={value}
        defaultValue={value === undefined ? (defaultValue ?? '') : undefined}
        onChange={onValueChange ? (event) => onValueChange(event.target.value) : undefined}
        disabled={disabled}
        name={name}
        className="h-9 w-full appearance-none rounded-none border border-mauve-300 bg-white pr-8 pl-3 font-sans text-base text-mauve-900 transition ease-out hover:border-mauve-400 hover:duration-0 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100 dark:hover:border-mauve-600 dark:focus-visible:border-rose-400 dark:focus-visible:ring-rose-400/25"
      >
        {placeholder != null && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className={chevron} />
    </span>
  )
}

function StyledSelect({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  disabled = false,
  name,
  className = '',
}: SelectProps) {
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

/**
 * A single select with one data-driven API (`items` + `value`/`onValueChange`). Renders the
 * Base UI custom listbox by default; pass `native` for a styled native `<select>` when the
 * native picker is preferable for accessibility (the native experience is kept on purpose).
 */
export function Select(props: SelectProps) {
  return props.native ? <NativeSelect {...props} /> : <StyledSelect {...props} />
}

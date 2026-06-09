import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { clsx } from 'clsx/lite'
import { Minus, Plus } from 'lucide-react'
import type { ReactNode } from 'react'

export interface NumberFieldProps extends Omit<BaseNumberField.Root.Props, 'className' | 'render'> {
  label?: ReactNode
  className?: string
}

const stepButton =
  'inline-flex w-9 shrink-0 items-center justify-center text-mauve-600 transition-colors ease-out hover:bg-mauve-200 hover:text-mauve-900 hover:duration-0 disabled:pointer-events-none disabled:opacity-40 dark:text-mauve-400 dark:hover:bg-mauve-700 dark:hover:text-mauve-100 [&_svg]:size-4'

const group =
  'inline-flex h-9 w-full items-stretch rounded-none border border-mauve-300 bg-white transition ease-out hover:border-mauve-400 hover:duration-0 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/30 dark:border-mauve-700 dark:bg-mauve-800 dark:hover:border-mauve-600 dark:focus-within:border-rose-400 dark:focus-within:ring-rose-400/25'

export function NumberField({ label, className = '', id, ...rest }: NumberFieldProps) {
  return (
    <BaseNumberField.Root id={id} className={clsx('flex flex-col gap-1.5', className)} {...rest}>
      {label && (
        <label
          htmlFor={id}
          className="font-sans text-sm font-medium text-mauve-900 dark:text-mauve-100"
        >
          {label}
        </label>
      )}
      <BaseNumberField.Group className={group}>
        <BaseNumberField.Decrement className={stepButton}>
          <Minus />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="w-full min-w-0 border-x border-mauve-300 bg-transparent px-3 text-center font-sans text-base text-mauve-900 outline-none dark:border-mauve-700 dark:text-mauve-100" />
        <BaseNumberField.Increment className={stepButton}>
          <Plus />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

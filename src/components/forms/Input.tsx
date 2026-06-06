import { Field } from '@base-ui/react/field'
import { clsx } from 'clsx/lite'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  size?: InputSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

const boxBase =
  'flex items-center gap-2 px-3 rounded-none border bg-white text-mauve-900 transition hover:duration-0 ease-out dark:bg-mauve-800 dark:text-mauve-100 aria-disabled:opacity-60 aria-disabled:pointer-events-none'

const boxResting =
  'border-mauve-300 hover:border-mauve-400 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/30 dark:border-mauve-700 dark:hover:border-mauve-600 dark:focus-within:border-rose-400 dark:focus-within:ring-rose-400/25'

const boxError =
  'border-red-600 hover:border-red-700 focus-within:border-red-600 focus-within:ring-2 focus-within:ring-red-500/20 dark:border-red-400 dark:hover:border-red-300 dark:focus-within:border-red-400'

const sizes: Record<InputSize, string> = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-11',
}

export function Input({
  label,
  hint,
  error,
  required = false,
  size = 'md',
  iconLeft = null,
  iconRight = null,
  id,
  className = '',
  disabled = false,
  ...rest
}: InputProps) {
  return (
    <Field.Root
      className={clsx('flex flex-col gap-1.5', className)}
      disabled={disabled}
      invalid={Boolean(error)}
    >
      {label && (
        <Field.Label className="font-sans text-sm font-medium text-mauve-900 dark:text-mauve-100">
          {label}
          {required && <span className="ml-0.5 text-rose-500 dark:text-rose-400">*</span>}
        </Field.Label>
      )}
      <div
        className={clsx(boxBase, sizes[size], error ? boxError : boxResting)}
        aria-disabled={disabled}
      >
        {iconLeft && (
          <span className="inline-flex text-mauve-500 [&_svg]:size-4" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <Field.Control
          id={id}
          required={required}
          disabled={disabled}
          className="min-w-0 flex-1 border-0 bg-transparent font-sans text-base text-inherit outline-none placeholder:text-mauve-400 dark:placeholder:text-mauve-600"
          {...rest}
        />
        {iconRight && (
          <span className="inline-flex text-mauve-500 [&_svg]:size-4" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>
      {error ? (
        <Field.Error match className="font-mono text-xs text-red-600 dark:text-red-400">
          {error}
        </Field.Error>
      ) : (
        hint && (
          <Field.Description className="font-mono text-xs text-mauve-500">{hint}</Field.Description>
        )
      )}
    </Field.Root>
  )
}

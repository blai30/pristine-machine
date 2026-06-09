import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export interface FieldsetProps extends Omit<BaseFieldset.Root.Props, 'className' | 'render'> {
  legend?: ReactNode
  className?: string
}

/**
 * Groups related fields under a legend, built on Base UI Fieldset. Compose `Input`,
 * `Select`, `Switch`, etc. inside; pairs naturally with `Form`.
 */
export function Fieldset({ legend, className = '', children, ...rest }: FieldsetProps) {
  return (
    <BaseFieldset.Root className={clsx('flex flex-col gap-4', className)} {...rest}>
      {legend && (
        <BaseFieldset.Legend className="font-sans text-base font-semibold text-mauve-900 dark:text-mauve-100">
          {legend}
        </BaseFieldset.Legend>
      )}
      {children}
    </BaseFieldset.Root>
  )
}

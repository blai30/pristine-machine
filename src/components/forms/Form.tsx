import { Form as BaseForm } from '@base-ui/react/form'
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export interface FormProps extends Omit<ComponentProps<typeof BaseForm>, 'className'> {
  className?: string
}

/**
 * Thin wrapper over Base UI Form. Coordinates validation across the `Field`-based controls
 * inside it (e.g. `Input`) and maps server-side `errors` back onto the right fields.
 */
export function Form({ className = '', ...rest }: FormProps) {
  return <BaseForm className={clsx('flex flex-col gap-5', className)} {...rest} />
}

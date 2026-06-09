import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

export type CardVariant = 'default' | 'flat' | 'raised'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  /** Lift + accent border on hover. */
  interactive?: boolean
  /** Wrap children in a padded body (default true). Set false to compose header/footer. */
  padded?: boolean
}

const base =
  'flex flex-col rounded-none border border-mauve-200 bg-white dark:border-mauve-700 dark:bg-mauve-800'

const variants: Record<CardVariant, string> = {
  default: 'shadow-sm shadow-rose-900/10',
  flat: 'shadow-none',
  raised: 'shadow-md shadow-rose-900/15',
}

const interactiveCls =
  'cursor-pointer transition duration-200 ease-out hover:border-mauve-300 hover:shadow-md hover:shadow-rose-900/15 hover:-translate-y-0.5 hover:duration-0 dark:hover:border-mauve-700'

export function Card({
  children,
  variant = 'default',
  interactive = false,
  padded = true,
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={clsx(base, variants[variant], interactive && interactiveCls, className)}
      {...rest}
    >
      {padded ? <div className="p-5">{children}</div> : children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('border-b border-mauve-200 px-5 py-4 dark:border-mauve-700', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'mt-auto border-t border-mauve-200 px-5 py-4 dark:border-mauve-700',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

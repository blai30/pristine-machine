import { clsx } from 'clsx/lite'
import type { HTMLAttributes } from 'react'

export function Kbd({ children, className = '', ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={clsx(
        'inline-flex h-6 min-w-6 items-center justify-center rounded-none border border-b-2 border-mauve-300 bg-white px-1.5 font-mono text-xs leading-none font-medium text-mauve-600 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-400',
        className
      )}
      {...rest}
    >
      {children}
    </kbd>
  )
}

import type { HTMLAttributes } from 'react'

import { clsx } from 'clsx/lite'

export function Kbd({ children, className = '', ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={clsx(
        'inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-none border border-b-2 border-mauve-300 bg-white font-mono text-xs font-medium leading-none text-mauve-600 dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-400',
        className
      )}
      {...rest}
    >
      {children}
    </kbd>
  )
}

import type { SelectHTMLAttributes } from 'react'

import { clsx } from 'clsx/lite'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ children, className = '', ...rest }: SelectProps) {
  return (
    <span className={clsx('group relative inline-flex w-full items-center', className)}>
      <select
        className="h-9 w-full appearance-none rounded-none border border-mauve-300 bg-white pr-8 pl-3 font-sans text-base text-mauve-900 transition ease-out hover:border-mauve-400 hover:duration-0 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100 dark:hover:border-mauve-600 dark:focus-visible:border-rose-400 dark:focus-visible:ring-rose-400/25"
        {...rest}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 size-2 -translate-y-0.5 rotate-45 border-r-2 border-b-2 border-current text-mauve-500 transition-colors hover:duration-0 ease-out group-hover:text-mauve-700 dark:group-hover:text-mauve-300"
      />
    </span>
  )
}

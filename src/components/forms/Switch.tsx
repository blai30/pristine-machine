import { clsx } from 'clsx/lite'
import type { InputHTMLAttributes, ReactNode } from 'react'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Switch({ label, disabled = false, className = '', ...rest }: SwitchProps) {
  return (
    <label
      className={clsx(
        'inline-flex items-center gap-2.5 font-sans text-base text-mauve-900 select-none dark:text-mauve-100',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <span className="relative h-6 w-10 shrink-0 rounded-none border border-mauve-300 bg-mauve-200 transition ease-out hover:border-mauve-400 hover:duration-0 has-checked:border-rose-500 has-checked:bg-rose-500 has-focus-visible:ring-2 has-focus-visible:ring-rose-500/30 dark:border-mauve-700 dark:bg-mauve-700 dark:hover:border-mauve-600 dark:has-checked:border-rose-400 dark:has-checked:bg-rose-400 dark:has-focus-visible:ring-rose-400/25">
        <input
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer absolute inset-0 opacity-0"
          {...rest}
        />
        <span className="pointer-events-none absolute top-0.5 left-0.5 size-4.5 rounded-none bg-white shadow-sm shadow-rose-900/15 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-4 dark:bg-mauve-200" />
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}

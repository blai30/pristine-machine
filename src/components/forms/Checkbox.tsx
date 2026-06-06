import type { InputHTMLAttributes, ReactNode } from 'react'

import { clsx } from 'clsx/lite'

export interface CheckControlProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

const labelBase =
  'inline-flex items-start gap-2 select-none font-sans text-base leading-tight text-mauve-900 dark:text-mauve-100'

const boxBase =
  'relative size-5 shrink-0 mt-px rounded-none border-2 border-mauve-300 bg-white transition hover:duration-0 ease-out hover:border-mauve-400 has-[:checked]:border-rose-500 has-[:checked]:bg-rose-500 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-500/30 dark:border-mauve-700 dark:bg-mauve-800 dark:hover:border-mauve-600 dark:has-[:checked]:border-rose-400 dark:has-[:checked]:bg-rose-400 dark:has-[:focus-visible]:ring-rose-400/25'

const nativeInput = 'peer absolute inset-0 opacity-0'

const markBase =
  'pointer-events-none absolute inset-0 flex items-center justify-center scale-0 transition-transform duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:scale-100'

export function Checkbox({ label, disabled = false, className = '', ...rest }: CheckControlProps) {
  return (
    <label className={clsx(labelBase, disabled && 'pointer-events-none opacity-50', className)}>
      <span className={boxBase}>
        <input type="checkbox" disabled={disabled} className={nativeInput} {...rest} />
        <span aria-hidden="true" className={markBase}>
          <span className="h-2.5 w-1.5 -translate-y-px rotate-45 border-r-2 border-b-2 border-white" />
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}

export function Radio({ label, disabled = false, className = '', ...rest }: CheckControlProps) {
  return (
    <label className={clsx(labelBase, disabled && 'pointer-events-none opacity-50', className)}>
      <span className={boxBase}>
        <input type="radio" disabled={disabled} className={nativeInput} {...rest} />
        <span aria-hidden="true" className={markBase}>
          <span className="size-2 bg-white" />
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}

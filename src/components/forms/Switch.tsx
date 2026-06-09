import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

export type SwitchProps = Omit<BaseSwitch.Root.Props, 'className' | 'render'> & {
  label?: ReactNode
  className?: string
}

const track =
  'relative h-6 w-10 shrink-0 rounded-none border border-mauve-300 bg-mauve-200 transition ease-out hover:border-mauve-400 hover:duration-0 data-checked:border-rose-500 data-checked:bg-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:border-mauve-700 dark:bg-mauve-700 dark:hover:border-mauve-600 dark:data-checked:border-rose-400 dark:data-checked:bg-rose-400 dark:focus-visible:ring-rose-400/25'

const thumb =
  'pointer-events-none absolute top-0.5 left-0.5 size-4.5 rounded-none bg-white shadow-sm shadow-rose-900/15 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-checked:translate-x-4 dark:bg-mauve-200'

export function Switch({ label, disabled = false, className = '', ...rest }: SwitchProps) {
  return (
    <label
      className={clsx(
        'inline-flex items-center gap-2.5 font-sans text-base text-mauve-900 select-none dark:text-mauve-100',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <BaseSwitch.Root disabled={disabled} className={track} {...rest}>
        <BaseSwitch.Thumb className={thumb} />
      </BaseSwitch.Root>
      {label && <span>{label}</span>}
    </label>
  )
}

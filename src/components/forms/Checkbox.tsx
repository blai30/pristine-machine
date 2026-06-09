import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'

const labelBase =
  'inline-flex items-start gap-2 select-none font-sans text-base leading-tight text-mauve-900 dark:text-mauve-100'

const boxBase =
  'relative size-5 shrink-0 mt-px rounded-none border-2 border-mauve-300 bg-white p-0 transition hover:duration-0 ease-out hover:border-mauve-400 data-checked:border-rose-500 data-checked:bg-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:border-mauve-700 dark:bg-mauve-800 dark:hover:border-mauve-600 dark:data-checked:border-rose-400 dark:data-checked:bg-rose-400 dark:focus-visible:ring-rose-400/25'

const markBase =
  'pointer-events-none absolute inset-0 flex items-center justify-center scale-0 transition-transform duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-checked:scale-100'

export type CheckboxProps = Omit<BaseCheckbox.Root.Props, 'className' | 'render'> & {
  label?: ReactNode
  className?: string
}

export function Checkbox({ label, disabled = false, className = '', ...rest }: CheckboxProps) {
  return (
    <label className={clsx(labelBase, disabled && 'pointer-events-none opacity-50', className)}>
      <BaseCheckbox.Root disabled={disabled} className={boxBase} {...rest}>
        <BaseCheckbox.Indicator keepMounted className={markBase}>
          <span className="h-2.5 w-1.5 -translate-y-px rotate-45 border-r-2 border-b-2 border-white" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label && <span>{label}</span>}
    </label>
  )
}

export type RadioProps = Omit<BaseRadio.Root.Props, 'className' | 'render'> & {
  label?: ReactNode
  className?: string
}

export function Radio({ label, disabled = false, className = '', ...rest }: RadioProps) {
  return (
    <label className={clsx(labelBase, disabled && 'pointer-events-none opacity-50', className)}>
      <BaseRadio.Root disabled={disabled} className={boxBase} {...rest}>
        <BaseRadio.Indicator keepMounted className={markBase}>
          <span className="size-2 bg-white" />
        </BaseRadio.Indicator>
      </BaseRadio.Root>
      {label && <span>{label}</span>}
    </label>
  )
}

export type RadioGroupProps = Omit<BaseRadioGroup.Props, 'className' | 'render'> & {
  className?: string
}

export function RadioGroup({ className = '', ...rest }: RadioGroupProps) {
  return <BaseRadioGroup className={clsx('flex flex-col gap-3', className)} {...rest} />
}

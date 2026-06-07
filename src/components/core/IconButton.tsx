import { clsx } from 'clsx/lite'
import type { ButtonHTMLAttributes } from 'react'

import { focusRing } from '@/lib/styles'

export type IconButtonVariant = 'ghost' | 'solid' | 'outline'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  /** Required for accessibility — used as aria-label and title. */
  label: string
}

const base =
  'inline-flex items-center justify-center p-0 rounded-none border transition hover:duration-0 ease-out active:scale-[0.94] disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-[1.15em]'

const sizes: Record<IconButtonSize, string> = {
  sm: 'size-7',
  md: 'size-9',
  lg: 'size-11',
}

const variants: Record<IconButtonVariant, string> = {
  ghost:
    'border-transparent text-mauve-600 hover:bg-mauve-200 hover:text-mauve-900 dark:text-mauve-400 dark:hover:bg-mauve-700 dark:hover:text-mauve-100',
  solid:
    'border-transparent bg-rose-500 text-white hover:bg-rose-600 dark:bg-rose-400 dark:text-rose-950 dark:hover:bg-rose-300',
  outline:
    'text-mauve-900 border-mauve-300 hover:bg-mauve-200 dark:text-mauve-100 dark:border-mauve-700 dark:hover:bg-mauve-700',
}

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  label,
  className = '',
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={clsx(base, focusRing, sizes[size], variants[variant], className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  )
}

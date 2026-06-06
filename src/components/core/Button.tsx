import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { clsx } from 'clsx/lite'
import { focusRing } from '@/lib/styles'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accentSoft' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-none border border-transparent font-sans font-medium leading-none whitespace-nowrap select-none transition hover:duration-0 ease-out active:translate-y-px active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-[1.1em]'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-sm',
  md: 'h-9 px-4 text-base',
  lg: 'h-11 px-5 text-lg',
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 dark:bg-rose-400 dark:text-rose-950 dark:hover:bg-rose-300 dark:active:bg-rose-500',
  secondary:
    'bg-white text-mauve-900 border-mauve-300 shadow-xs shadow-rose-900/10 hover:bg-mauve-200 hover:border-mauve-400 dark:bg-mauve-800 dark:text-mauve-100 dark:border-mauve-700 dark:hover:bg-mauve-700 dark:hover:border-mauve-600',
  ghost: 'text-mauve-900 hover:bg-mauve-200 dark:text-mauve-100 dark:hover:bg-mauve-700',
  accentSoft:
    'bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-400/15 dark:text-rose-300 dark:hover:bg-rose-400/20',
  danger:
    'bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:text-red-950 dark:hover:bg-red-300',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        base,
        focusRing,
        sizes[size],
        variants[variant],
        block && 'flex w-full',
        className
      )}
      {...rest}
    >
      {iconLeft}
      {children != null && <span>{children}</span>}
      {iconRight}
    </button>
  )
}

import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export interface SeparatorProps extends Omit<ComponentProps<typeof BaseSeparator>, 'className'> {
  className?: string
}

/** Plain semantic divider. For the decorative ticked rule, use `BlueprintDivider` instead. */
export function Separator({ className = '', orientation = 'horizontal', ...rest }: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={clsx(
        'shrink-0 bg-mauve-200 dark:bg-mauve-700',
        orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        className
      )}
      {...rest}
    />
  )
}

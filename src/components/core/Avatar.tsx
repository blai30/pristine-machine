import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { clsx } from 'clsx/lite'

export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarProps = {
  /** Image source; falls back to initials when absent or it fails to load. */
  src?: string
  /** Used for the alt text and to derive the initials fallback. */
  name: string
  size?: AvatarSize
  className?: string
}

const sizes: Record<AvatarSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const root =
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-none border border-mauve-200 bg-mauve-200 font-mono font-medium text-mauve-600 select-none dark:border-mauve-700 dark:bg-mauve-700 dark:text-mauve-300'

export function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  return (
    <BaseAvatar.Root className={clsx(root, sizes[size], className)}>
      {src && <BaseAvatar.Image src={src} alt={name} className="size-full object-cover" />}
      <BaseAvatar.Fallback className="flex size-full items-center justify-center">
        {initials(name)}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}

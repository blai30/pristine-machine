import { Toast as BaseToast } from '@base-ui/react/toast'
import { clsx } from 'clsx/lite'
import { Check, Info, TriangleAlert, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { semanticTone, type SemanticTone } from '@/lib/styles'

/** Imperative toast manager hook. Call `useToast().add({ title, description, type })`. */
export const useToast = BaseToast.useToastManager

const viewport =
  'fixed top-4 right-4 left-4 z-50 flex flex-col gap-2 outline-none sm:left-auto sm:w-80'

const root =
  'flex items-start gap-3 rounded-none border border-l-4 border-mauve-200 bg-white p-4 shadow-md shadow-rose-900/10 outline-none transition-all duration-200 ease-out data-starting-style:translate-x-full data-starting-style:opacity-0 data-ending-style:translate-x-full data-ending-style:opacity-0 dark:border-mauve-700 dark:bg-mauve-800'

const close =
  'inline-flex size-7 shrink-0 items-center justify-center rounded-none text-mauve-500 transition-colors ease-out hover:bg-mauve-200 hover:text-mauve-900 hover:duration-0 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:hover:bg-mauve-700 dark:hover:text-mauve-100 dark:focus-visible:ring-rose-400/25 [&_svg]:size-4'

const tones: Record<SemanticTone, { edge: string; icon: string; glyph: ReactNode }> = {
  info: {
    edge: semanticTone.info.edge,
    icon: semanticTone.info.fg,
    glyph: <Info className="size-5" />,
  },
  success: {
    edge: semanticTone.success.edge,
    icon: semanticTone.success.fg,
    glyph: <Check className="size-5" />,
  },
  warning: {
    edge: semanticTone.warning.edge,
    icon: semanticTone.warning.fg,
    glyph: <TriangleAlert className="size-5" />,
  },
  danger: {
    edge: semanticTone.danger.edge,
    icon: semanticTone.danger.fg,
    glyph: <TriangleAlert className="size-5" />,
  },
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager()
  return toasts.map((toast) => {
    const tone = tones[toast.type as SemanticTone]
    return (
      <BaseToast.Root
        key={toast.id}
        toast={toast}
        swipeDirection="right"
        className={clsx(root, tone?.edge)}
      >
        {tone && (
          <span className={clsx('mt-px inline-flex shrink-0', tone.icon)} aria-hidden="true">
            {tone.glyph}
          </span>
        )}
        <BaseToast.Content className="flex min-w-0 flex-1 flex-col gap-0.5">
          <BaseToast.Title className="font-sans text-sm font-semibold text-mauve-900 dark:text-mauve-100" />
          <BaseToast.Description className="font-sans text-sm leading-normal text-mauve-600 dark:text-mauve-400" />
        </BaseToast.Content>
        <BaseToast.Close className={close} aria-label="Dismiss">
          <X />
        </BaseToast.Close>
      </BaseToast.Root>
    )
  })
}

export type ToastProviderProps = {
  children: ReactNode
  /** Default auto-dismiss in ms (0 disables). */
  timeout?: number
}

/**
 * Mount once near the app root. Holds the toast manager plus a top-right (full-width on
 * mobile) stacked viewport. Trigger toasts from anywhere below with `useToast().add(...)`,
 * passing `type: 'info' | 'success' | 'warning' | 'danger'` to tint the accent bar.
 */
export function ToastProvider({ children, timeout }: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className={viewport}>
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}

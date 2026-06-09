import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { clsx } from 'clsx/lite'
import { ChevronDown } from 'lucide-react'

const trigger =
  'group flex w-full items-center justify-between gap-3 rounded-none border border-mauve-300 bg-white px-3.5 py-2.5 font-sans text-base font-medium text-mauve-900 transition ease-out select-none hover:border-mauve-400 hover:duration-0 focus-visible:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:border-mauve-700 dark:bg-mauve-800 dark:text-mauve-100 dark:hover:border-mauve-600 dark:focus-visible:border-rose-400 dark:focus-visible:ring-rose-400/25'

// Height animation needs Base UI's exposed panel-height CSS variable; this is the one
// sanctioned arbitrary value (var shorthand + transition-[height]) - see CLAUDE.md.
const panel =
  'h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0'

type TriggerProps = Omit<BaseCollapsible.Trigger.Props, 'className'> & { className?: string }

function CollapsibleTrigger({ className = '', children, ...rest }: TriggerProps) {
  return (
    <BaseCollapsible.Trigger className={clsx(trigger, className)} {...rest}>
      {children}
      <ChevronDown className="size-4 shrink-0 text-mauve-500 transition-transform duration-200 ease-out group-data-panel-open:rotate-180" />
    </BaseCollapsible.Trigger>
  )
}

type PanelProps = Omit<BaseCollapsible.Panel.Props, 'className'> & { className?: string }

function CollapsiblePanel({ className = '', children, ...rest }: PanelProps) {
  return (
    <BaseCollapsible.Panel className={clsx(panel, className)} {...rest}>
      <div className="px-3.5 py-3 font-sans text-base text-mauve-600 dark:text-mauve-400">
        {children}
      </div>
    </BaseCollapsible.Panel>
  )
}

/**
 * A single expandable section built on Base UI Collapsible. `Trigger` ships its rotating
 * chevron; `Panel` animates its height open/closed. The primitive Accordion is built on.
 */
export const Collapsible = {
  Root: BaseCollapsible.Root,
  Trigger: CollapsibleTrigger,
  Panel: CollapsiblePanel,
}

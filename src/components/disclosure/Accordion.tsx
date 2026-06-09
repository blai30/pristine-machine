import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { clsx } from 'clsx/lite'
import { ChevronDown } from 'lucide-react'

const root = 'flex w-full flex-col border border-mauve-200 dark:border-mauve-700'

const itemCls = 'border-b border-mauve-200 last:border-b-0 dark:border-mauve-700'

const trigger =
  'group flex w-full items-center justify-between gap-3 rounded-none bg-transparent px-4 py-3.5 text-left font-sans text-base font-medium text-mauve-900 transition-colors ease-out select-none hover:bg-mauve-100 hover:duration-0 focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:text-mauve-100 dark:hover:bg-mauve-900 dark:focus-visible:ring-rose-400/25'

// Height animation needs Base UI's exposed panel-height CSS variable; this is the one
// sanctioned arbitrary value (var shorthand + transition-[height]) - see CLAUDE.md.
const panel =
  'h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0'

type RootProps = Omit<BaseAccordion.Root.Props, 'className'> & { className?: string }

function AccordionRoot({ className = '', ...rest }: RootProps) {
  return <BaseAccordion.Root className={clsx(root, className)} {...rest} />
}

type ItemProps = Omit<BaseAccordion.Item.Props, 'className'> & { className?: string }

function AccordionItem({ className = '', ...rest }: ItemProps) {
  return <BaseAccordion.Item className={clsx(itemCls, className)} {...rest} />
}

type TriggerProps = Omit<BaseAccordion.Trigger.Props, 'className'> & { className?: string }

function AccordionTrigger({ className = '', children, ...rest }: TriggerProps) {
  return (
    <BaseAccordion.Header>
      <BaseAccordion.Trigger className={clsx(trigger, className)} {...rest}>
        {children}
        <ChevronDown className="size-4 shrink-0 text-mauve-500 transition-transform duration-200 ease-out group-data-panel-open:rotate-180" />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

type PanelProps = Omit<BaseAccordion.Panel.Props, 'className'> & { className?: string }

function AccordionPanel({ className = '', children, ...rest }: PanelProps) {
  return (
    <BaseAccordion.Panel className={clsx(panel, className)} {...rest}>
      <div className="px-4 py-3.5 font-sans text-base text-mauve-600 dark:text-mauve-400">
        {children}
      </div>
    </BaseAccordion.Panel>
  )
}

/**
 * Stacked expandable sections built on Base UI Accordion. `Trigger` bundles the header and
 * its rotating chevron; `Panel` animates its height. Pass `multiple` on `Root` to allow
 * several panels open at once. Compose: `Root > Item > (Trigger, Panel)`.
 */
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
}

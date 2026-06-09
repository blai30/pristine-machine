import { BlueprintDivider, PlusTick, Wordmark } from '@/components'
import { eyebrow } from '@/lib/styles'
import { Section, Spec } from '@/showcase/ui'

export function Brand() {
  return (
    <Section
      id="brand"
      label="Brand"
      title="The page is a drawing"
      emphasis="page"
      subtitle="Structural line-work only — vertical rails, full-bleed dividers, and plum + ticks at the junctions. No grid or hatch fill."
    >
      <div className="flex flex-col gap-12">
        <Spec name="Blueprint page frame" row={false}>
          <div className="relative border border-mauve-200 dark:border-mauve-700">
            <PlusTick corner="tl" />
            <PlusTick corner="tr" />
            <PlusTick corner="bl" />
            <PlusTick corner="br" />
            <div className="px-8 py-5">
              <span className={eyebrow}>Software · Interfaces · Craft</span>
            </div>
            <BlueprintDivider ticked />
            <div className="px-8 py-12">
              <p className="font-serif text-4xl leading-9 tracking-tight text-mauve-900 dark:text-mauve-100">
                A page is a <span className="text-rose-700 italic dark:text-rose-300">drawing</span>
                .
              </p>
            </div>
            <BlueprintDivider ticked />
            <div className="px-8 py-4">
              <span className="font-mono text-xs text-mauve-500">
                vertical rails · dividers · + ticks
              </span>
            </div>
          </div>
        </Spec>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Spec name="On paper (light)" row={false}>
            <div className="flex min-h-full flex-col items-start gap-8 rounded-none border border-mauve-200 bg-white p-8">
              <Wordmark theme="light" />
              <Wordmark theme="light" compact />
            </div>
          </Spec>
          <Spec name="On aubergine (dark)" row={false}>
            <div className="flex min-h-full flex-col items-start gap-8 rounded-none border border-mauve-700 bg-mauve-900 p-8">
              <Wordmark theme="dark" />
              <Wordmark theme="dark" compact />
            </div>
          </Spec>
        </div>
      </div>
    </Section>
  )
}

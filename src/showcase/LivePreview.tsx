import type { ReactNode } from 'react'

import { DataTable } from '@/showcase/previews/DataTable'
import { DeployConsole } from '@/showcase/previews/DeployConsole'
import { Pricing } from '@/showcase/previews/Pricing'
import { ProductPage } from '@/showcase/previews/ProductPage'
import { Section } from '@/showcase/ui'

function PreviewBlock({
  label,
  uses,
  children,
}: {
  label: string
  uses: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 py-8">
        <span className="font-mono text-xs font-medium tracking-widest text-mauve-500 uppercase">
          {label}
        </span>
        <span className="h-px flex-1 bg-mauve-200 dark:bg-mauve-700" />
        <span className="hidden font-mono text-xs text-mauve-400 sm:block">{uses}</span>
      </div>
      {children}
    </div>
  )
}

export function LivePreview() {
  return (
    <Section
      label="In practice"
      title="The pieces, assembled"
      emphasis="assembled"
      subtitle="Real interfaces composed only from system primitives — proof the parts assemble into product surfaces."
    >
      <div className="flex flex-col gap-20">
        <PreviewBlock label="Deploy console" uses="Card · Tabs · Badge · Select · Switch · Callout">
          <DeployConsole />
        </PreviewBlock>

        <PreviewBlock label="Pricing" uses="Card · SegmentedControl · Badge · Button">
          <Pricing />
        </PreviewBlock>

        <PreviewBlock
          label="Team table"
          uses="Card · Input · Checkbox · Badge · Switch · IconButton"
        >
          <DataTable />
        </PreviewBlock>

        <PreviewBlock
          label="Product page"
          uses="Badge · SegmentedControl · Tabs · Callout · Button"
        >
          <ProductPage />
        </PreviewBlock>
      </div>
    </Section>
  )
}

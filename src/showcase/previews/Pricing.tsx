import { clsx } from 'clsx/lite'
import { Check } from 'lucide-react'
import { useState } from 'react'

import { Badge, Button, Card, SegmentedControl } from '@/components'

type Tier = {
  name: string
  tagline: string
  monthly: number
  yearly: number
  cta: string
  features: string[]
  popular?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Hobby',
    tagline: 'For tinkering and small drafts.',
    monthly: 0,
    yearly: 0,
    cta: 'Start free',
    features: ['1 workspace', 'Community support', 'Squared corners, always'],
  },
  {
    name: 'Studio',
    tagline: 'For working designers.',
    monthly: 24,
    yearly: 19,
    cta: 'Choose Studio',
    popular: true,
    features: [
      'Unlimited workspaces',
      'Dark & light themes',
      'Version history',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For teams shipping at scale.',
    monthly: 96,
    yearly: 80,
    cta: 'Contact sales',
    features: ['SSO & audit logs', 'Design tokens API', 'Dedicated support', 'SLA & onboarding'],
  },
]

export function Pricing() {
  const [cycle, setCycle] = useState('yearly')
  const yearly = cycle === 'yearly'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm text-mauve-600 dark:text-mauve-400">
          Billed {yearly ? 'annually — save 20%' : 'monthly'}.
        </p>
        <SegmentedControl
          value={cycle}
          onChange={setCycle}
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            variant={tier.popular ? 'raised' : 'default'}
            className={clsx(tier.popular && 'ring-2 ring-rose-400 dark:ring-rose-400/70')}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-serif text-2xl text-mauve-900 dark:text-mauve-100">
                  {tier.name}
                </h4>
                {tier.popular && <Badge variant="accent">Popular</Badge>}
              </div>
              <p className="font-sans text-sm text-mauve-600 dark:text-mauve-400">{tier.tagline}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-5xl text-mauve-900 dark:text-mauve-100">
                  ${yearly ? tier.yearly : tier.monthly}
                </span>
                <span className="font-mono text-xs text-mauve-500">/ mo</span>
              </div>
              <Button variant={tier.popular ? 'primary' : 'secondary'} block>
                {tier.cta}
              </Button>
              <ul className="flex flex-col gap-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 font-sans text-sm text-mauve-700 dark:text-mauve-300"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-rose-500 dark:text-rose-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

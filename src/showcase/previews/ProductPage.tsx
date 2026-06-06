import { Heart, LampDesk, Minus, Plus, Star, Truck } from 'lucide-react'
import { useState } from 'react'

import { Badge, Button, Callout, IconButton, SegmentedControl, Tabs } from '@/components'
import { clsx } from 'clsx/lite'

const unitPrice = 168

const specs = [
  ['Material', 'Machined aluminium'],
  ['Reach', '62 cm articulated arm'],
  ['Bulb', 'E27 · 9W LED included'],
  ['Warranty', '5 years'],
]

export function ProductPage() {
  const [finish, setFinish] = useState('brass')
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('details')

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex aspect-square items-center justify-center rounded-none border border-mauve-200 bg-mauve-200 dark:border-mauve-700 dark:bg-mauve-800">
          <LampDesk className="size-24 text-mauve-300 dark:text-mauve-700" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              type="button"
              aria-label={`View ${index + 1}`}
              className={clsx(
                'flex aspect-square items-center justify-center rounded-none border bg-mauve-100 transition-colors duration-150 ease-out dark:bg-mauve-700',
                index === 0
                  ? 'border-rose-400'
                  : 'border-mauve-200 hover:border-mauve-400 dark:border-mauve-700',
              )}
            >
              <LampDesk className="size-6 text-mauve-300 dark:text-mauve-600" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Badge variant="accent">New</Badge>
          <div className="flex items-center gap-0.5 text-rose-500 dark:text-rose-400">
            {[0, 1, 2, 3].map((index) => (
              <Star key={index} className="size-4 fill-current" />
            ))}
            <Star className="size-4" />
            <span className="ml-2 font-mono text-xs text-mauve-500">4.0 · 128 reviews</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="font-serif text-3xl leading-none text-mauve-900 dark:text-mauve-100">
            The Draughtsman Lamp
          </h4>
          <p className="font-sans text-sm text-mauve-600 dark:text-mauve-400">
            A pivoting task lamp for precise work — squared, of course.
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-serif text-4xl text-mauve-900 dark:text-mauve-100">${unitPrice}</span>
          <span className="font-mono text-sm text-mauve-400 line-through">$210</span>
          <Badge variant="success">Save 20%</Badge>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-mauve-400">Finish</span>
          <SegmentedControl
            value={finish}
            onChange={setFinish}
            options={[
              { value: 'brass', label: 'Brass' },
              { value: 'steel', label: 'Steel' },
              { value: 'black', label: 'Black' },
            ]}
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-mauve-400">Quantity</span>
            <div className="flex items-center gap-2">
              <IconButton
                label="Decrease quantity"
                variant="outline"
                size="sm"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <Minus />
              </IconButton>
              <span className="w-8 text-center font-mono text-sm text-mauve-900 dark:text-mauve-100">{quantity}</span>
              <IconButton
                label="Increase quantity"
                variant="outline"
                size="sm"
                onClick={() => setQuantity((current) => current + 1)}
              >
                <Plus />
              </IconButton>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3">
            <Button variant="primary" block>
              Add to cart — ${unitPrice * quantity}
            </Button>
            <IconButton label="Save to wishlist" variant="outline">
              <Heart />
            </IconButton>
          </div>
        </div>

        <Callout variant="neutral" icon={<Truck />}>
          Free shipping over $150 · ships in 2–3 days.
        </Callout>

        <div className="flex flex-col gap-4">
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: 'details', label: 'Details' },
              { value: 'specs', label: 'Specs' },
              { value: 'care', label: 'Care' },
            ]}
          />
          {tab === 'details' && (
            <p className="font-sans text-sm leading-relaxed text-mauve-600 dark:text-mauve-400">
              A friction-pivot arm holds any angle without knobs. The shade throws a clean, even pool of light —
              engineered for drafting tables and late-night detailing.
            </p>
          )}
          {tab === 'specs' && (
            <dl className="divide-y divide-mauve-200 dark:divide-mauve-700">
              {specs.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2">
                  <dt className="font-mono text-xs uppercase tracking-widest text-mauve-400">{label}</dt>
                  <dd className="font-sans text-sm text-mauve-700 dark:text-mauve-300">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === 'care' && (
            <p className="font-sans text-sm leading-relaxed text-mauve-600 dark:text-mauve-400">
              Wipe with a dry cloth. Avoid solvents on the brushed finish. The pivot can be re-tensioned with the
              included hex key.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

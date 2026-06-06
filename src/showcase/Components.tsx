import {
  ArrowRight,
  Bell,
  Check,
  Info,
  Menu,
  Plus,
  Search,
  Settings,
  Star,
  TriangleAlert,
  X,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import {
  Badge,
  Button,
  Callout,
  Card,
  CardFooter,
  CardHeader,
  Checkbox,
  Drawer,
  IconButton,
  Input,
  Kbd,
  Navbar,
  Radio,
  RadioGroup,
  SegmentedControl,
  SideNav,
  Select,
  SelectMenu,
  Switch,
  Tabs,
  Tooltip,
  Wordmark,
} from '@/components'
import { eyebrow } from '@/lib/styles'
import { Section, Spec } from '@/showcase/ui'

function Group({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className={eyebrow}>{title}</span>
        <span className="h-px flex-1 bg-mauve-200 dark:bg-mauve-700" />
      </div>
      {children}
    </div>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" iconLeft={<Menu />} onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} aria-label="Demo sections">
        <div className="flex items-center justify-between gap-4">
          <Wordmark compact size="sm" />
          <IconButton label="Close drawer" variant="ghost" onClick={() => setOpen(false)}>
            <X />
          </IconButton>
        </div>
        <SideNav
          activeId="forms-demo"
          onNavigate={() => setOpen(false)}
          sections={[
            {
              id: 'foundations-demo',
              number: 1,
              label: 'Foundations',
              items: [
                { id: 'colors-demo', label: 'Color' },
                { id: 'type-demo', label: 'Typography' },
              ],
            },
            {
              id: 'components-demo',
              number: 2,
              label: 'Components',
              items: [
                { id: 'core-demo', label: 'Core' },
                { id: 'forms-demo', label: 'Forms' },
              ],
            },
          ]}
        />
      </Drawer>
    </>
  )
}

export function Components() {
  return (
    <Section
      label="Library"
      title="Primitives, brought to life"
      emphasis="brought"
      subtitle="Every control rebuilt in Tailwind utilities — squared corners, plum accents, spring-settled motion, and first-class light and dark."
    >
      <div className="flex flex-col gap-16">
        {/* CORE */}
        <Group id="core" title="Core">
          <Spec name="Button · variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accentSoft">Accent soft</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </Spec>
          <Spec name="Button · sizes & icons">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button iconLeft={<Search />}>Search</Button>
            <Button variant="secondary" iconRight={<ArrowRight />}>
              Continue
            </Button>
          </Spec>
          <Spec name="IconButton">
            <IconButton label="Add" variant="solid">
              <Plus />
            </IconButton>
            <IconButton label="Favorite" variant="outline">
              <Star />
            </IconButton>
            <IconButton label="Notifications">
              <Bell />
            </IconButton>
            <IconButton label="Settings" size="lg">
              <Settings />
            </IconButton>
            <IconButton label="Settings" size="sm">
              <Settings />
            </IconButton>
          </Spec>
          <Spec name="Badge">
            <Badge>Neutral</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success" dot>
              Online
            </Badge>
            <Badge variant="warning" dot>
              Degraded
            </Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="solid">Solid</Badge>
          </Spec>
          <Spec name="Kbd">
            <span className="inline-flex items-center gap-1 font-sans text-sm text-mauve-600 dark:text-mauve-400">
              Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search · <Kbd>Esc</Kbd> to close
            </span>
          </Spec>
          <Spec name="Card" row={false}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <h3 className="mb-1 font-sans text-base font-semibold text-mauve-900 dark:text-mauve-100">
                  Default
                </h3>
                <p className="font-sans text-sm text-mauve-600 dark:text-mauve-400">
                  Surface with a subtle plum shadow.
                </p>
              </Card>
              <Card variant="raised" interactive>
                <h3 className="mb-1 font-sans text-base font-semibold text-mauve-900 dark:text-mauve-100">
                  Interactive
                </h3>
                <p className="font-sans text-sm text-mauve-600 dark:text-mauve-400">
                  Hover to lift and sharpen the border.
                </p>
              </Card>
              <Card padded={false}>
                <CardHeader>
                  <span className={eyebrow}>Header</span>
                </CardHeader>
                <div className="p-5 font-sans text-sm text-mauve-600 dark:text-mauve-400">
                  Composed body content.
                </div>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Action
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Spec>
        </Group>

        {/* FORMS */}
        <Group id="forms" title="Forms">
          <Spec name="Input" row={false}>
            <div className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
              <Input
                label="Project name"
                placeholder="Pristine Machine"
                hint="Shown on your public profile"
              />
              <Input
                label="Email"
                type="email"
                required
                placeholder="you@example.com"
                iconLeft={<Search />}
              />
              <Input
                label="Slug"
                defaultValue="not a slug"
                error="Use lowercase letters and dashes."
              />
              <Input label="Disabled" placeholder="Unavailable" disabled />
            </div>
          </Spec>
          <Spec name="Select" row={false}>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <Select defaultValue="serif">
                <option value="serif">Instrument Serif</option>
                <option value="sans">Geist</option>
                <option value="mono">JetBrains Mono</option>
              </Select>
              <SelectMenu
                defaultValue="serif"
                items={[
                  { value: 'serif', label: 'Instrument Serif' },
                  { value: 'sans', label: 'Geist' },
                  { value: 'mono', label: 'JetBrains Mono' },
                ]}
              />
            </div>
          </Spec>
          <Spec name="Switch">
            <Switch label="Off by default" />
            <Switch label="On by default" defaultChecked />
            <Switch label="Disabled" disabled />
          </Spec>
          <Spec name="Checkbox & Radio">
            <div className="flex flex-col gap-3">
              <Checkbox label="Subscribe to updates" defaultChecked />
              <Checkbox label="Ship beta features" />
              <Checkbox label="Disabled" disabled />
            </div>
            <RadioGroup name="plan" defaultValue="month">
              <Radio value="month" label="Monthly" />
              <Radio value="year" label="Yearly" />
              <Radio value="life" label="Lifetime" disabled />
            </RadioGroup>
          </Spec>
        </Group>

        {/* FEEDBACK */}
        <Group id="feedback" title="Feedback">
          <Spec name="Callout" row={false}>
            <div className="flex w-full max-w-3xl flex-col gap-3">
              <Callout variant="accent" title="Plum blossom" icon={<Star />}>
                The accent voice — used sparingly for emphasis and brand moments.
              </Callout>
              <Callout variant="info" title="Heads up" icon={<Info />}>
                Informational context that supports the current task.
              </Callout>
              <Callout variant="success" title="Saved" icon={<Check />}>
                Your changes were written to the source of truth.
              </Callout>
              <Callout variant="warning" title="Check this" icon={<TriangleAlert />}>
                Something needs attention before you continue.
              </Callout>
              <Callout variant="danger" title="Destructive" icon={<TriangleAlert />}>
                This action cannot be undone.
              </Callout>
            </div>
          </Spec>
          <Spec name="Tooltip">
            <Tooltip label="Tooltips reveal on hover or focus" placement="top">
              <Button variant="secondary">Hover me (top)</Button>
            </Tooltip>
            <Tooltip label="Or below the trigger" placement="bottom">
              <Button variant="secondary">Hover me (bottom)</Button>
            </Tooltip>
          </Spec>
        </Group>

        {/* NAVIGATION */}
        <Group id="navigation" title="Navigation">
          <Spec name="Tabs" row={false}>
            <Tabs
              defaultValue="overview"
              items={[
                { value: 'overview', label: 'Overview' },
                { value: 'specs', label: 'Specs' },
                { value: 'activity', label: 'Activity' },
              ]}
            />
          </Spec>
          <Spec name="SegmentedControl">
            <SegmentedControl
              defaultValue="light"
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
            />
          </Spec>
          <Spec name="Navbar" row={false}>
            <div className="w-full overflow-hidden rounded-none border border-mauve-200 dark:border-mauve-700">
              <Navbar
                sticky={false}
                activeId="foundations-demo"
                start={<Wordmark compact size="sm" />}
                items={[
                  { id: 'foundations-demo', label: 'Foundations' },
                  { id: 'components-demo', label: 'Components' },
                  { id: 'live-preview-demo', label: 'Live Preview' },
                ]}
                end={<Badge variant="neutral">v0.1.0</Badge>}
              />
            </div>
          </Spec>
          <Spec name="SideNav" row={false}>
            <div className="w-full max-w-xs rounded-none border border-mauve-200 p-5 dark:border-mauve-700">
              <SideNav
                activeId="forms-demo"
                sections={[
                  {
                    id: 'foundations-demo',
                    number: 1,
                    label: 'Foundations',
                    items: [
                      { id: 'colors-demo', label: 'Color' },
                      { id: 'type-demo', label: 'Typography' },
                    ],
                  },
                  {
                    id: 'components-demo',
                    number: 2,
                    label: 'Components',
                    items: [
                      { id: 'core-demo', label: 'Core' },
                      { id: 'forms-demo', label: 'Forms' },
                    ],
                  },
                ]}
              />
            </div>
          </Spec>
          <Spec name="Drawer">
            <DrawerDemo />
          </Spec>
        </Group>
      </div>
    </Section>
  )
}

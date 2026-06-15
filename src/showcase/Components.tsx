import {
  ArrowRight,
  Bell,
  Bold,
  Check,
  ChevronDown,
  Droplet,
  Info,
  Italic,
  Menu as MenuIcon,
  Plus,
  Search,
  Settings,
  Star,
  Timer,
  TriangleAlert,
  Underline,
  X,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import {
  Accordion,
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Callout,
  Card,
  CardFooter,
  CardHeader,
  Checkbox,
  Collapsible,
  Dialog,
  Drawer,
  IconButton,
  Input,
  Kbd,
  Menu,
  Meter,
  Navbar,
  NumberField,
  Popover,
  PreviewCard,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  SegmentedControl,
  Select,
  Separator,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Toolbar,
  Tooltip,
  useToast,
  Wordmark,
} from '@/components'
import { eyebrow } from '@/lib/styles'
import { DEMO_NAV_SECTIONS } from '@/showcase/nav'
import { SectionNav } from '@/showcase/SectionNav'
import { SkillIcon } from '@/showcase/SkillIcons'
import { Section, Spec } from '@/showcase/ui'

const fontItems = [
  { value: 'serif', label: 'Instrument Serif' },
  { value: 'sans', label: 'Geist' },
  { value: 'mono', label: 'JetBrains Mono' },
]

function Group({
  id,
  title,
  lead,
  children,
}: {
  id: string
  title: string
  // Full-width specimens rendered above the gallery (e.g. Navbar, which must span the group).
  lead?: ReactNode
  children: ReactNode
}) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className={eyebrow}>{title}</span>
        <span className="h-px flex-1 bg-mauve-200 dark:bg-mauve-700" />
      </div>
      {lead}
      {/* Masonry gallery: specimens flow into balanced columns and stay intact. */}
      <div className="columns-1 gap-8 *:mb-8 *:break-inside-avoid lg:columns-2">{children}</div>
    </div>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" iconLeft={<MenuIcon />} onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} aria-label="Demo sections">
        <div className="flex items-center justify-between gap-4">
          <Wordmark size="sm" />
          <IconButton label="Close drawer" variant="ghost" onClick={() => setOpen(false)}>
            <X />
          </IconButton>
        </div>
        <SectionNav
          activeId="forms-demo"
          onNavigate={() => setOpen(false)}
          sections={DEMO_NAV_SECTIONS}
        />
      </Drawer>
    </>
  )
}

function ToastDemo() {
  const toast = useToast()
  return (
    <>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: 'Deployment queued',
            description: 'Build #1287 is on its way.',
            type: 'info',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({ title: 'Saved', description: 'Your changes are live.', type: 'success' })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({ title: 'Heads up', description: 'Quota at 90%.', type: 'warning' })
        }
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.add({
            title: 'Build failed',
            description: 'See the logs for details.',
            type: 'danger',
          })
        }
      >
        Danger
      </Button>
    </>
  )
}

// QWER ability bar, used to demo PreviewCard as a MOBA-style skill tooltip.
const SKILLS = [
  {
    key: 'Q',
    name: 'Petal Slash',
    mana: 30,
    cooldown: '6s',
    effect:
      'Sweep your blade in a wide arc, dealing 120% weapon damage to all enemies in front of you.',
  },
  {
    key: 'W',
    name: 'Enchant Weapon',
    mana: 45,
    cooldown: '14s',
    effect: 'Imbue your blade for 8s, adding 30 magic damage and 15% attack speed to every strike.',
  },
  {
    key: 'E',
    name: 'Serene Flash',
    mana: 60,
    cooldown: '18s',
    effect: 'Blink a short distance, leaving a still afterimage that taunts nearby enemies for 2s.',
  },
  {
    key: 'R',
    name: 'Blade Dance',
    mana: 100,
    cooldown: '90s',
    effect:
      'Dash through all nearby enemies, dealing 180% weapon damage to each. Critical strikes refund 1s of the cooldown.',
  },
]

function HotbarDemo() {
  return (
    <div className="flex items-start gap-3">
      {SKILLS.map((skill) => (
        <div key={skill.key} className="flex flex-col items-center gap-1.5">
          <PreviewCard.Root>
            <PreviewCard.Trigger
              render={
                <button
                  type="button"
                  aria-label={skill.name}
                  className="rounded-none transition ease-out hover:-translate-y-0.5 hover:ring-2 hover:ring-rose-500/30 hover:duration-0 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:outline-none dark:hover:ring-rose-400/25 dark:focus-visible:ring-rose-400/25"
                >
                  <SkillIcon skillKey={skill.key} className="size-12" />
                </button>
              }
            />
            <PreviewCard.Popup>
              <div className="flex items-center gap-3">
                <SkillIcon skillKey={skill.key} className="size-10" />
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-sm font-semibold text-mauve-900 dark:text-mauve-100">
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Droplet className="size-3.5" /> {skill.mana} MP
                    </span>
                    <span className="inline-flex items-center gap-1 text-mauve-500">
                      <Timer className="size-3.5" /> {skill.cooldown} CD
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-sans text-sm leading-normal text-mauve-600 dark:text-mauve-400">
                {skill.effect}
              </p>
            </PreviewCard.Popup>
          </PreviewCard.Root>
          <Kbd className="h-5 min-w-5 px-1">{skill.key}</Kbd>
        </div>
      ))}
    </div>
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
          <Spec name="Avatar">
            <Avatar name="Brian Lai" />
            <Avatar name="Pristine Machine" size="sm" />
            <Avatar name="Plum Blossom" size="lg" />
            <Avatar name="Missing Image" src="/does-not-exist.png" />
          </Spec>
          <Spec name="Card" row={false}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <Spec name="Separator" row={false}>
            <div className="flex w-full max-w-md flex-col gap-3 font-sans text-sm text-mauve-600 dark:text-mauve-400">
              <span>Source of truth</span>
              <Separator />
              <span>Live showcase</span>
              <div className="flex h-6 items-center gap-3">
                <span>Light</span>
                <Separator orientation="vertical" />
                <span>Dark</span>
              </div>
            </div>
          </Spec>
          <Spec name="ScrollArea" row={false}>
            <ScrollArea className="h-40 w-full max-w-md border border-mauve-200 dark:border-mauve-700">
              <div className="flex flex-col gap-2 p-4 font-sans text-sm text-mauve-600 dark:text-mauve-400">
                {Array.from({ length: 16 }, (_unused, index) => (
                  <span key={index}>
                    Line {index + 1}: scroll to reveal the plum-tinted overlay scrollbar.
                  </span>
                ))}
              </div>
            </ScrollArea>
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
              <Select defaultValue="serif" items={fontItems} />
              <Select native defaultValue="serif" items={fontItems} />
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
          <Spec name="Slider" row={false}>
            <div className="flex w-full max-w-md flex-col gap-6">
              <Slider defaultValue={40} label="Opacity" showValue />
              <Slider defaultValue={[20, 70]} label="Price range" showValue />
            </div>
          </Spec>
          <Spec name="NumberField">
            <div className="w-40">
              <NumberField defaultValue={3} min={0} max={10} label="Seats" />
            </div>
          </Spec>
          <Spec name="Fieldset" row={false}>
            <fieldset className="flex w-full max-w-md flex-col gap-4">
              <legend className="font-sans text-base font-semibold text-mauve-900 dark:text-mauve-100">
                Billing contact
              </legend>
              <Input label="Full name" placeholder="Ada Lovelace" />
              <Input label="Email" type="email" placeholder="ada@example.com" />
            </fieldset>
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
          <Spec name="Toast">
            <ToastDemo />
          </Spec>
          <Spec name="Tooltip">
            <Tooltip label="Tooltips reveal on hover or focus" placement="top">
              <Button variant="secondary">Hover me (top)</Button>
            </Tooltip>
            <Tooltip label="Or below the trigger" placement="bottom">
              <Button variant="secondary">Hover me (bottom)</Button>
            </Tooltip>
          </Spec>
          <Spec name="Spinner">
            <Spinner />
            <Spinner className="size-6" />
            <Spinner className="size-16" />
          </Spec>
          <Spec name="Progress" row={false}>
            <div className="flex w-full max-w-md flex-col gap-5">
              <Progress value={64} label="Uploading assets" showValue />
              <Progress value={null} label="Provisioning" />
            </div>
          </Spec>
          <Spec name="Meter" row={false}>
            <div className="flex w-full max-w-md flex-col gap-5">
              <Meter value={72} label="Disk usage" showValue />
              <Meter value={28} max={50} label="Build minutes" showValue />
            </div>
          </Spec>
        </Group>

        {/* NAVIGATION */}
        <Group
          id="navigation"
          title="Navigation"
          lead={
            <Spec name="Navbar" row={false}>
              <div className="w-full overflow-hidden rounded-none border border-mauve-200 dark:border-mauve-700">
                <Navbar.Root sticky={false}>
                  <Wordmark size="sm" />
                  <Navbar.Nav>
                    <Navbar.List>
                      <Navbar.Item>
                        <Navbar.Link href="#foundations-demo" active>
                          Foundations
                        </Navbar.Link>
                      </Navbar.Item>
                      <Navbar.Item>
                        <Navbar.Link href="#components-demo">Components</Navbar.Link>
                      </Navbar.Item>
                      <Navbar.Item>
                        <Navbar.Link href="#live-preview-demo">Live Preview</Navbar.Link>
                      </Navbar.Item>
                    </Navbar.List>
                  </Navbar.Nav>
                  <div className="ml-auto">
                    <Badge variant="neutral">v0.1.0</Badge>
                  </div>
                </Navbar.Root>
              </div>
            </Spec>
          }
        >
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
          <Spec name="Drawer">
            <DrawerDemo />
          </Spec>
          <Spec name="Toolbar">
            <Toolbar.Root aria-label="Text formatting">
              <Toolbar.Group>
                <Toolbar.Button aria-label="Bold">
                  <Bold />
                </Toolbar.Button>
                <Toolbar.Button aria-label="Italic">
                  <Italic />
                </Toolbar.Button>
                <Toolbar.Button aria-label="Underline">
                  <Underline />
                </Toolbar.Button>
              </Toolbar.Group>
              <Toolbar.Separator />
              <Toolbar.Button>Share</Toolbar.Button>
            </Toolbar.Root>
          </Spec>
          <Spec name="SideNav" row={false}>
            <div className="w-full max-w-xs rounded-none border border-mauve-200 p-5 dark:border-mauve-700">
              <SectionNav activeId="forms-demo" sections={DEMO_NAV_SECTIONS} />
            </div>
          </Spec>
        </Group>

        {/* OVERLAYS */}
        <Group id="overlays" title="Overlays">
          <Spec name="Dialog & AlertDialog">
            <Dialog.Root>
              <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
              <Dialog.Popup>
                <Dialog.Title>Publish design system?</Dialog.Title>
                <Dialog.Description>
                  This makes v0.1.0 available to every consumer. You can unpublish later.
                </Dialog.Description>
                <div className="mt-2 flex justify-end gap-2">
                  <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                  <Dialog.Close render={<Button variant="primary">Publish</Button>} />
                </div>
              </Dialog.Popup>
            </Dialog.Root>
            <AlertDialog.Root>
              <AlertDialog.Trigger render={<Button variant="danger">Delete project</Button>} />
              <AlertDialog.Popup>
                <AlertDialog.Title>Delete project?</AlertDialog.Title>
                <AlertDialog.Description>
                  This permanently removes the project and all of its deployments. This cannot be
                  undone.
                </AlertDialog.Description>
                <div className="mt-2 flex justify-end gap-2">
                  <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
                  <AlertDialog.Close render={<Button variant="danger">Delete</Button>} />
                </div>
              </AlertDialog.Popup>
            </AlertDialog.Root>
          </Spec>
          <Spec name="Popover">
            <Popover.Root>
              <Popover.Trigger render={<Button variant="secondary">Shortcuts</Button>} />
              <Popover.Popup>
                <Popover.Title>Keyboard shortcuts</Popover.Title>
                <Popover.Description>
                  Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command menu from anywhere.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Root>
          </Spec>
          <Spec name="Menu">
            <Menu.Root>
              <Menu.Trigger
                render={
                  <Button variant="secondary" iconRight={<ChevronDown />}>
                    Actions
                  </Button>
                }
              />
              <Menu.Popup>
                <Menu.Item>Rename</Menu.Item>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.SubmenuRoot>
                  <Menu.SubmenuTrigger>Move to</Menu.SubmenuTrigger>
                  <Menu.Popup>
                    <Menu.Item>Production</Menu.Item>
                    <Menu.Item>Preview</Menu.Item>
                  </Menu.Popup>
                </Menu.SubmenuRoot>
                <Menu.Separator />
                <Menu.Item>Delete</Menu.Item>
              </Menu.Popup>
            </Menu.Root>
          </Spec>
          <Spec name="PreviewCard" row={false}>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-sm text-mauve-600 dark:text-mauve-400">
                Hover a skill to inspect it.
              </span>
              <HotbarDemo />
            </div>
          </Spec>
        </Group>

        {/* DISCLOSURE */}
        <Group id="disclosure" title="Disclosure">
          <Spec name="Accordion" row={false}>
            <Accordion.Root className="w-full max-w-xl" defaultValue={[0]}>
              <Accordion.Item>
                <Accordion.Trigger>What is Pristine Machine?</Accordion.Trigger>
                <Accordion.Panel>
                  A plum-blossom take on a draughtsman's blueprint, built entirely from Tailwind
                  utilities on top of Base UI primitives.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Trigger>How is theming handled?</Accordion.Trigger>
                <Accordion.Panel>
                  A class-based dark mode toggles the .dark class on the root; every surface carries
                  a paired dark: utility. No CSS variables or design tokens.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Trigger>Can I use it in my project?</Accordion.Trigger>
                <Accordion.Panel>
                  Yes. Install the package, import the preset, and compose the components with your
                  own Tailwind build.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion.Root>
          </Spec>
          <Spec name="Collapsible" row={false}>
            <Collapsible.Root className="w-full max-w-xl">
              <Collapsible.Trigger>Recovery keys</Collapsible.Trigger>
              <Collapsible.Panel>
                <div className="flex flex-col gap-1 font-mono text-sm">
                  <span>alien-bean-pasta</span>
                  <span>wild-irish-burrito</span>
                  <span>horse-battery-staple</span>
                </div>
              </Collapsible.Panel>
            </Collapsible.Root>
          </Spec>
        </Group>
      </div>
    </Section>
  )
}

import { clsx } from 'clsx/lite'
import { GitBranch, Info, RefreshCw, Rocket, Settings, Waypoints } from 'lucide-react'
import { useState } from 'react'

import {
  Badge,
  Button,
  Callout,
  Card,
  CardFooter,
  IconButton,
  Select,
  Switch,
  Tabs,
  Tooltip,
} from '@/components'

const statLabel = 'font-mono text-xs font-medium uppercase tracking-widest text-mauve-400'

interface Deploy {
  status: 'Ready' | 'Failed'
  title: string
  branch: string
  hash: string
  time: string
}

const deploys: Deploy[] = [
  {
    status: 'Ready',
    title: 'tune router latency budget',
    branch: 'main',
    hash: 'a1f9c0e',
    time: '2m ago',
  },
  {
    status: 'Ready',
    title: 'add health-check probe',
    branch: 'main',
    hash: '7b32d11',
    time: '40m ago',
  },
  {
    status: 'Failed',
    title: 'wip: edge cache',
    branch: 'develop',
    hash: 'c44e8a2',
    time: '1h ago',
  },
  { status: 'Ready', title: 'cut v2.4.0', branch: 'release', hash: '0d9af3b', time: '3h ago' },
]

const stats: { value: string; unit?: string; label: string }[] = [
  { value: '4', label: 'Deploys' },
  { value: '3', label: 'Ready' },
  { value: '16', unit: 'ms', label: 'Frame budget' },
  { value: '0', label: 'Dependencies' },
]

export function DeployConsole() {
  const [tab, setTab] = useState('deploys')

  return (
    <Card padded={false} className="max-w-4xl">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-none bg-rose-50 text-rose-600 dark:bg-rose-400/15 dark:text-rose-300">
            <Waypoints className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-serif text-2xl leading-none text-mauve-900 dark:text-mauve-100">
              edge-router
            </p>
            <p className="mt-1 font-mono text-xs text-mauve-500">
              pristine-machine · web application
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="accent">v2.4.0</Badge>
          <Tooltip label="Switch branch">
            <IconButton label="Switch branch" variant="outline" size="sm">
              <GitBranch />
            </IconButton>
          </Tooltip>
          <Tooltip label="Settings">
            <IconButton label="Settings" variant="outline" size="sm">
              <Settings />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="px-1.5">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'deploys', label: 'Deploys' },
            { value: 'ship', label: 'Ship' },
          ]}
        />
      </div>

      {tab === 'deploys' ? (
        <>
          <div className="grid grid-cols-2 divide-x divide-mauve-200 border-b border-mauve-200 bg-mauve-50 sm:grid-cols-4 dark:divide-mauve-700 dark:border-mauve-700 dark:bg-mauve-900">
            {stats.map((stat) => (
              <div key={stat.label} className="px-5 py-5">
                <div className="font-serif text-4xl leading-none text-rose-600 dark:text-rose-300">
                  {stat.value}
                  {stat.unit && <span className="ml-0.5 font-sans text-lg">{stat.unit}</span>}
                </div>
                <div className={clsx('mt-2', statLabel)}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="px-5 py-5">
            <span className={statLabel}>Recent deploys</span>
            <div className="mt-3 divide-y divide-mauve-200 dark:divide-mauve-700">
              {deploys.map((deploy) => (
                <div key={deploy.hash} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex min-w-0 items-center gap-4">
                    <Badge variant={deploy.status === 'Ready' ? 'success' : 'danger'} dot>
                      {deploy.status}
                    </Badge>
                    <div className="min-w-0">
                      <p className="truncate font-sans text-sm font-medium text-mauve-900 dark:text-mauve-100">
                        {deploy.title}
                      </p>
                      <p className="font-mono text-xs text-mauve-500">
                        {deploy.branch} · {deploy.hash} · {deploy.time}
                      </p>
                    </div>
                  </div>
                  <Tooltip label="Redeploy">
                    <IconButton label="Redeploy" variant="ghost" size="sm">
                      <RefreshCw />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5 px-5 py-5">
          <Callout variant="info" title="Promote a build" icon={<Info />}>
            Shipping promotes the latest ready deploy to the selected environment.
          </Callout>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-mauve-900 dark:text-mauve-100">
                Environment
              </span>
              <Select
                defaultValue="production"
                items={[
                  { value: 'production', label: 'Production' },
                  { value: 'staging', label: 'Staging' },
                  { value: 'preview', label: 'Preview' },
                ]}
              />
            </label>
            <div className="flex items-end">
              <Switch label="Auto-promote when checks pass" defaultChecked />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="primary" iconLeft={<Rocket />}>
              Ship release
            </Button>
            <Button variant="ghost">Preview diff</Button>
          </div>
        </div>
      )}

      <CardFooter>
        <p className="font-mono text-xs text-mauve-500">
          Built from Card · Badge · Tabs · IconButton · Tooltip · Select · Switch · Button · Callout
        </p>
      </CardFooter>
    </Card>
  )
}

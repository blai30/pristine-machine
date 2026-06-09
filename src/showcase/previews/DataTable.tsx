import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { useState } from 'react'

import {
  Badge,
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  SegmentedControl,
  Switch,
} from '@/components'

type Member = {
  name: string
  email: string
  role: string
  status: 'Active' | 'Invited'
  initials: string
}

const members: Member[] = [
  {
    name: 'Ada Lovelace',
    email: 'ada@pristine.dev',
    role: 'Owner',
    status: 'Active',
    initials: 'AL',
  },
  {
    name: 'Alan Turing',
    email: 'alan@pristine.dev',
    role: 'Admin',
    status: 'Active',
    initials: 'AT',
  },
  {
    name: 'Grace Hopper',
    email: 'grace@pristine.dev',
    role: 'Member',
    status: 'Invited',
    initials: 'GH',
  },
  {
    name: 'Katherine Johnson',
    email: 'kj@pristine.dev',
    role: 'Member',
    status: 'Active',
    initials: 'KJ',
  },
]

const th = 'px-2 py-3 font-mono text-xs font-medium uppercase tracking-widest text-mauve-400'

export function DataTable() {
  const [filter, setFilter] = useState('all')

  return (
    <Card padded={false}>
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input placeholder="Search members" iconLeft={<Search />} aria-label="Search members" />
        </div>
        <div className="flex items-center gap-3">
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: 'All' },
              { value: 'admins', label: 'Admins' },
            ]}
          />
          <Button iconLeft={<Plus />}>Invite</Button>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-mauve-200 dark:border-mauve-700">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-mauve-200 dark:border-mauve-700">
              <th className="px-5 py-3">
                <Checkbox aria-label="Select all members" />
              </th>
              <th className={th}>Member</th>
              <th className={th}>Role</th>
              <th className={th}>Status</th>
              <th className={th}>Access</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.email}
                className="border-b border-mauve-200 last:border-0 dark:border-mauve-700"
              >
                <td className="px-5 py-3 align-middle">
                  <Checkbox aria-label={`Select ${member.name}`} />
                </td>
                <td className="px-2 py-3 align-middle">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-none bg-mauve-200 font-mono text-xs text-mauve-600 dark:bg-mauve-700 dark:text-mauve-300">
                      {member.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-medium whitespace-nowrap text-mauve-900 dark:text-mauve-100">
                        {member.name}
                      </p>
                      <p className="font-mono text-xs text-mauve-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Badge variant="neutral">{member.role}</Badge>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Badge variant={member.status === 'Active' ? 'success' : 'warning'} dot>
                    {member.status}
                  </Badge>
                </td>
                <td className="px-2 py-3 align-middle">
                  <Switch
                    defaultChecked={member.status === 'Active'}
                    aria-label={`Access for ${member.name}`}
                  />
                </td>
                <td className="px-5 py-3 text-right align-middle">
                  <IconButton label={`Actions for ${member.name}`} variant="ghost" size="sm">
                    <MoreHorizontal />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-mauve-200 px-5 py-3 dark:border-mauve-700">
        <span className="font-mono text-xs text-mauve-500">4 of 4 members</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}

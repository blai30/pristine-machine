import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Tooltip } from './Tooltip'

function Example() {
  // Wrap in a provider with no delay so the tooltip opens immediately on hover.
  return (
    <BaseTooltip.Provider delay={0}>
      <Tooltip label="Copy to clipboard">
        <button>Copy</button>
      </Tooltip>
    </BaseTooltip.Provider>
  )
}

describe('Tooltip', () => {
  it('renders its trigger child', () => {
    const { getByRole } = render(<Example />)
    expect(getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('reveals the label on hover', async () => {
    const user = setupUser()
    const { getByRole, findAllByText } = render(<Example />)
    await user.hover(getByRole('button', { name: 'Copy' }))
    const labels = await findAllByText('Copy to clipboard')
    expect(labels.length).toBeGreaterThan(0)
  })
})

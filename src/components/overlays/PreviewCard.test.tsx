import { describe, expect, it } from 'vitest'

import { render, setupUser } from '@/test/render'

import { PreviewCard } from './PreviewCard'

function Example() {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger href="#">@pristine</PreviewCard.Trigger>
      <PreviewCard.Popup>
        <span>Preview body</span>
      </PreviewCard.Popup>
    </PreviewCard.Root>
  )
}

describe('PreviewCard', () => {
  it('renders the inline trigger', () => {
    const { getByText } = render(<Example />)
    expect(getByText('@pristine')).toBeInTheDocument()
  })

  it('is closed until the trigger is hovered', () => {
    const { queryByText } = render(<Example />)
    expect(queryByText('Preview body')).toBeNull()
  })

  it('reveals the preview on hover', async () => {
    const user = setupUser()
    const { getByText, findByText } = render(<Example />)
    await user.hover(getByText('@pristine'))
    expect(await findByText('Preview body', undefined, { timeout: 2000 })).toBeInTheDocument()
  })
})

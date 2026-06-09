import { describe, expect, it, vi } from 'vitest'

import { render, setupUser } from '@/test/render'

import { Input } from './Input'

describe('Input', () => {
  it('renders a labelled text control', () => {
    const { getByText, getByRole } = render(<Input label="Email" />)
    expect(getByText('Email')).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('marks a required field with an asterisk', () => {
    const { getByText } = render(<Input label="Email" required />)
    expect(getByText('*')).toBeInTheDocument()
  })

  it('shows the hint when there is no error', () => {
    const { getByText } = render(<Input label="Email" hint="We never share it" />)
    expect(getByText('We never share it')).toBeInTheDocument()
  })

  it('shows the error and marks the control invalid', () => {
    const { getByText, getByRole } = render(<Input label="Email" error="Required field" />)
    expect(getByText('Required field')).toBeInTheDocument()
    expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('prefers the error over the hint when both are given', () => {
    const { getByText, queryByText } = render(
      <Input label="Email" hint="Helpful hint" error="Bad value" />
    )
    expect(getByText('Bad value')).toBeInTheDocument()
    expect(queryByText('Helpful hint')).toBeNull()
  })

  it('accepts typed input', async () => {
    const user = setupUser()
    const onChange = vi.fn()
    const { getByRole } = render(<Input label="Email" onChange={onChange} />)
    await user.type(getByRole('textbox'), 'hi')
    expect(onChange).toHaveBeenCalled()
    expect(getByRole('textbox')).toHaveValue('hi')
  })

  it('disables the control when disabled', () => {
    const { getByRole } = render(<Input label="Email" disabled />)
    expect(getByRole('textbox')).toBeDisabled()
  })

  it('applies size classes to the box', () => {
    const { container } = render(<Input label="Email" size="lg" />)
    expect(container.querySelector('.h-11')).toBeInTheDocument()
  })
})

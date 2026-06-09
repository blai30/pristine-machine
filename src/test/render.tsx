import { userEvent } from '@testing-library/user-event'

// Single import surface for tests: everything from RTL plus a configured
// user-event instance.
export * from '@testing-library/react'
export { userEvent }

/** Render a component and return a user-event session bound to it. */
export function setupUser() {
  return userEvent.setup()
}

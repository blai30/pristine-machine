import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { useTheme } from '@/showcase/useTheme'

const originalMatchMedia = window.matchMedia

function mockPrefersDark(prefersDark: boolean) {
  window.matchMedia = ((query: string) =>
    ({
      matches: prefersDark,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList) as typeof window.matchMedia
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  mockPrefersDark(false)
})

afterEach(() => {
  window.matchMedia = originalMatchMedia
})

describe('useTheme', () => {
  it('reads a stored theme from localStorage', () => {
    localStorage.setItem('pm-theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('falls back to the system preference when nothing is stored', () => {
    mockPrefersDark(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('defaults to light when no preference and nothing stored', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggle() flips the theme, updates the html class, and persists it', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')

    act(() => result.current.toggle())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('pm-theme')).toBe('dark')

    act(() => result.current.toggle())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('pm-theme')).toBe('light')
  })
})

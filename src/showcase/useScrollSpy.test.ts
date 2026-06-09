import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useScrollSpy } from '@/showcase/useScrollSpy'

type SpyEntry = {
  target: { id: string }
  isIntersecting: boolean
  boundingClientRect: { top: number }
}

let lastCallback: ((entries: SpyEntry[]) => void) | null = null
const disconnect = vi.fn()

class MockIntersectionObserver {
  constructor(callback: (entries: SpyEntry[]) => void) {
    lastCallback = callback
  }
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = disconnect
  takeRecords = () => []
}

beforeEach(() => {
  lastCallback = null
  disconnect.mockClear()
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  for (const id of ['a', 'b', 'c']) {
    const element = document.createElement('div')
    element.id = id
    document.body.append(element)
  }
})

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

describe('useScrollSpy', () => {
  it('starts on the first id', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b', 'c']))
    expect(result.current).toBe('a')
  })

  it('activates the topmost intersecting element', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b', 'c']))

    act(() => {
      lastCallback?.([
        { target: { id: 'b' }, isIntersecting: true, boundingClientRect: { top: 80 } },
        { target: { id: 'c' }, isIntersecting: true, boundingClientRect: { top: 12 } },
      ])
    })

    expect(result.current).toBe('c')
  })

  it('ignores non-intersecting entries', () => {
    const { result } = renderHook(() => useScrollSpy(['a', 'b', 'c']))

    act(() => {
      lastCallback?.([
        { target: { id: 'b' }, isIntersecting: false, boundingClientRect: { top: 5 } },
      ])
    })

    expect(result.current).toBe('a')
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollSpy(['a', 'b', 'c']))
    unmount()
    expect(disconnect).toHaveBeenCalled()
  })

  it('returns an empty string when given no ids', () => {
    const { result } = renderHook(() => useScrollSpy([]))
    expect(result.current).toBe('')
  })
})

import type { MouseEvent } from 'react'

import { SideNav } from '@/components'
import type { NavSection } from '@/showcase/nav'

type SectionNavProps = {
  sections: NavSection[]
  /** Id of the currently active section or item. */
  activeId?: string
  /** Called with the id after a link is activated. */
  onNavigate?: (id: string) => void
}

/**
 * Showcase consumer of the SideNav primitives: maps a sections array into composed
 * SideNav parts and wires smooth-scroll plus an onNavigate callback. The library ships
 * only the primitives — this composition lives in the consumer.
 */
export function SectionNav({ sections, activeId, onNavigate }: SectionNavProps) {
  function handleClick(id: string) {
    return (event: MouseEvent) => {
      event.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      onNavigate?.(id)
    }
  }

  return (
    <SideNav.Root>
      {sections.map((section) => (
        <SideNav.Group key={section.id}>
          <SideNav.GroupLabel
            number={section.number}
            href={`#${section.id}`}
            active={activeId === section.id}
            onClick={handleClick(section.id)}
          >
            {section.label}
          </SideNav.GroupLabel>
          {section.items && section.items.length > 0 && (
            <SideNav.List>
              {section.items.map((item) => (
                <SideNav.Item key={item.id}>
                  <SideNav.Link
                    href={`#${item.id}`}
                    active={activeId === item.id}
                    onClick={handleClick(item.id)}
                  >
                    {item.label}
                  </SideNav.Link>
                </SideNav.Item>
              ))}
            </SideNav.List>
          )}
        </SideNav.Group>
      ))}
    </SideNav.Root>
  )
}

import { Tooltip } from '@base-ui/react/tooltip'
import { ArrowDown, Menu, Moon, Palette, Sun, X } from 'lucide-react'
import { useState } from 'react'

import heroImage from '@/assets/hero.png'
import {
  Badge,
  BlueprintDivider,
  BlueprintFrame,
  Button,
  Drawer,
  IconButton,
  Navbar,
  SideNav,
  ToastProvider,
  Wordmark,
} from '@/components'
import { eyebrow } from '@/lib/styles'
import { Brand } from '@/showcase/Brand'
import { Colors } from '@/showcase/Colors'
import { Components } from '@/showcase/Components'
import { LivePreview } from '@/showcase/LivePreview'
import { NAV_ITEMS, NAV_SECTIONS, SPY_IDS } from '@/showcase/nav'
import { Scales } from '@/showcase/Scales'
import { Typography } from '@/showcase/Typography'
import { SectionGroup } from '@/showcase/ui'
import { useScrollSpy } from '@/showcase/useScrollSpy'
import { useTheme } from '@/showcase/useTheme'

function ThemeToggle({ theme, toggle }: { theme: 'light' | 'dark'; toggle: () => void }) {
  return (
    <IconButton
      label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      variant="outline"
      onClick={toggle}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  const activeId = useScrollSpy(SPY_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ToastProvider>
      <Tooltip.Provider>
        <BlueprintFrame>
          {/* Desktop: top navbar */}
          <Navbar
            className="max-lg:hidden"
            items={NAV_ITEMS}
            activeId={activeId}
            start={<Wordmark size="sm" />}
            end={
              <>
                <Badge variant="neutral">v0.1.0</Badge>
                <ThemeToggle theme={theme} toggle={toggle} />
              </>
            }
          />

          {/* Mobile: sticky bar + slide-in sidebar drawer */}
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-mauve-300 bg-mauve-100/90 px-6 py-3 backdrop-blur-xl lg:hidden dark:border-mauve-700 dark:bg-mauve-900/90">
            <Wordmark size="sm" />
            <IconButton label="Open menu" variant="outline" onClick={() => setMenuOpen(true)}>
              <Menu />
            </IconButton>
          </header>
          <div className="lg:hidden">
            <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} aria-label="Sections">
              <div className="flex items-center justify-between gap-4">
                <Wordmark size="sm" />
                <IconButton label="Close menu" variant="ghost" onClick={() => setMenuOpen(false)}>
                  <X />
                </IconButton>
              </div>
              <SideNav
                sections={NAV_SECTIONS}
                activeId={activeId}
                onNavigate={() => setMenuOpen(false)}
              />
              <div className="mt-auto flex items-center justify-between border-t border-mauve-200 pt-4 dark:border-mauve-700">
                <Badge variant="neutral">v0.1.0</Badge>
                <ThemeToggle theme={theme} toggle={toggle} />
              </div>
            </Drawer>
          </div>

          <section className="flex flex-col items-start gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className={eyebrow}>Master Design System · v0.1.0</span>
              <h1 className="mt-5 max-w-md font-serif text-7xl leading-18 tracking-tight text-mauve-900 dark:text-mauve-100">
                A living system for{' '}
                <span className="text-rose-700 italic dark:text-rose-300">pristine</span> web
                software.
              </h1>
              <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-mauve-600 dark:text-mauve-400">
                A draughtsman's blueprint redrawn with an editorial serif and a plum-blossom accent.
                Precise without being cold — every token, type ramp, and component on one page,
                fully live. Built entirely from Tailwind utility classes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  iconRight={<ArrowDown />}
                  onClick={() =>
                    document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Browse components
                </Button>
                <Button variant="secondary" iconLeft={<Palette />} onClick={toggle}>
                  Toggle theme
                </Button>
              </div>
            </div>
            <img
              src={heroImage}
              alt=""
              className="hidden w-full max-w-xs shrink-0 lg:block lg:max-w-sm"
            />
          </section>

          <BlueprintDivider ticked />
          <SectionGroup id="foundations" number={1} label="Foundations">
            <Colors />
            <Typography />
            <Scales />
            <Brand />
          </SectionGroup>

          <BlueprintDivider ticked />
          <SectionGroup id="components" number={2} label="Components">
            <Components />
          </SectionGroup>

          <BlueprintDivider ticked />
          <SectionGroup id="live-preview" number={3} label="Live Preview">
            <LivePreview />
          </SectionGroup>

          <BlueprintDivider ticked />
          <footer className="flex flex-col gap-1 px-6 py-12 sm:px-10">
            <span className={eyebrow}>Pristine Machine</span>
            <p className="font-sans text-sm text-mauve-500">
              Master design system · All rights reserved &copy;{' '}
              <a
                href="https://github.com/blai30"
                className="text-rose-700 hover:underline dark:text-rose-300"
              >
                blai30
              </a>
            </p>
          </footer>
        </BlueprintFrame>
      </Tooltip.Provider>
    </ToastProvider>
  )
}

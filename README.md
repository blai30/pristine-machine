# Pristine Machine

A master design system and live showcase — a plum-blossom (梅花) take on a draughtsman's blueprint. Editorial serif display, Geist UI text, JetBrains Mono annotations, squared corners, structural line-work, plum-tinted everything, and first-class light **and** dark modes.

The repository contains two things:

- **The design system** — a catalog of reusable, accessibly-built React components (buttons, forms, navigation, feedback, brand marks) authored entirely with Tailwind utilities and built on top of [Base UI](https://base-ui.com) primitives.
- **The showcase** — a single-page live preview site that documents the foundations (color, typography, scale), demonstrates every component, and assembles them into real interfaces (a deploy console, pricing page, data table, and product page).

> **Looking for the deep reference?** [`docs/design-system.md`](docs/design-system.md) is the comprehensive source of truth — design philosophy, full foundations, the complete component catalog, and the rationale behind every decision. This README stays high level.

## Tech stack

| Layer           | Choice                                                           |
| --------------- | ---------------------------------------------------------------- |
| Build tool      | [Vite](https://vite.dev)                                         |
| Language        | TypeScript · TSX                                                 |
| UI runtime      | React (with the React Compiler)                                  |
| Component base  | [Base UI](https://base-ui.com) — unstyled, accessible primitives |
| Styling         | [Tailwind CSS](https://tailwindcss.com) — utility classes only   |
| Icons           | [lucide-react](https://lucide.dev)                               |
| Lint / format   | oxlint · oxfmt                                                   |
| Package manager | [pnpm](https://pnpm.io)                                          |

Styling is intentionally constrained: components are composed from native Tailwind v4.3 utilities (the `mauve` and `rose` ramps do the heavy lifting) with no custom CSS, no inline styles, and no design tokens beyond three font families.

## Quick start

Requires [pnpm](https://pnpm.io).

```sh
pnpm install # install dependencies
pnpm dev     # start the Vite dev server → http://localhost:5173
```

## Project layout

```
src/
  components/   reusable design-system components, grouped by category
    core/       Button, IconButton, Badge, Card, Kbd, CodeBlock
    forms/      Input, Select, Switch, Checkbox, Radio
    feedback/   Callout, Tooltip
    navigation/ Tabs, SegmentedControl, SideNav, Sidebar, Navbar, Drawer
    brand/      Wordmark, Blueprint frame primitives
  lib/          shared class fragments (focus rings, eyebrow labels)
  showcase/     the live preview site (not part of the component library)
  App.tsx       composes the showcase inside a blueprint frame
```

See [`docs/design-system.md`](docs/design-system.md) for the full design reference.

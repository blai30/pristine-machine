# Pristine Machine — Master Design System

The source-of-truth design system for "Pristine Machine" plus a single-page live showcase. A plum-blossom (梅花) take on a draughtsman's blueprint: editorial serif display, Geist UI text, JetBrains Mono annotations, squared corners, structural line-work, plum-tinted everything, first-class light and dark.

Stack: **Vite 8 · TypeScript 6 · React 19 (React Compiler) · Tailwind CSS v4.3**. Package manager: **pnpm**.

> **Deep reference:** [`docs/design-system.md`](docs/design-system.md) is the comprehensive source of truth — philosophy, full foundations, the complete component catalog, and rationale. Consult it when you need more than the quick rules below. This file is the operational quick-reference; keep the two in sync.

**Single package, dual purpose:** the repo root is the publishable library (`@pristine-machine/ui`) and also hosts the live showcase that consumes it. The library lives in `src/components` + `src/lib` (public barrel `src/index.ts`); the showcase lives in `src/showcase` + `src/App.tsx` and imports the library straight from source via `@/components`. Two Vite configs: `vite.config.ts` builds the showcase site (to `dist-site`), `vite.lib.config.ts` builds the publishable library (to `dist`). See [`README.md`](README.md#using-the-library) for consumer install.

---

## Non-negotiable styling rules

These are the project's reason for existing. They override default habits — follow them exactly.

1. **Tailwind utility classes only.** Never write custom CSS. Never use the inline `style` attribute.
2. **No CSS variables/tokens; keep the two CSS files minimal.** The only hand-written CSS is `preset.css` at the repo root (the three font families -- `--font-sans` Geist, `--font-serif` Instrument Serif, `--font-mono` JetBrains Mono -- plus the `dark` variant; this is the file the published package exports) and `src/index.css` (only `@import 'tailwindcss'` then `@import '../preset.css'`). Never add `@theme` color tokens or any other CSS variables to either (the font-family block in `preset.css` is the only sanctioned `@theme` use). Fonts load from Google Fonts in `index.html`.
3. **No `px` values.** Use Tailwind's predefined scale (`rem`-based).
4. **Arbitrary values (`[...]`) only when truly unavoidable, and never `px`.** The sanctioned ones already in use: the spring easing `ease-[cubic-bezier(0.34,1.56,0.64,1)]`, em-relative icon sizing (`[&_svg]:size-[1.1em]`, `1.15em`, `1.125rem`), tiny press scales (`scale-[0.99]`/`scale-[0.94]`), the `has-[:checked]` / `has-[:focus-visible]` variant selectors, and (disclosure panels only) `transition-[height]` with the Base UI panel-height var shorthands `h-(--collapsible-panel-height)` / `h-(--accordion-panel-height)` -- the only way to animate panel height without custom CSS. Don't add new ones casually.

Before finishing any change: the only CSS touched should be `preset.css` / `src/index.css` (and only their minimal contents above); grep `src/` for `style=` (none) and for `px]` / `[#` (none).

---

## Palette & surfaces (all native Tailwind v4.3 utilities)

Tailwind v4.3 ships a native `mauve` ramp — that's the whole reason this works without theme tokens.

- **Accent:** `rose` (blossom). **Neutrals:** `mauve` (plum-tinted).
- **Semantics:** `emerald` success · `amber` warning · `red` danger · `blue` info / "blueprint".
- **Foreground tones light/dark:** semantics use the `600`/`400` step; their soft fills use `50` / `400-with-/15-alpha`.

**Surface ramp (apply by role; there are no tokens, so use the right shade directly):**

| role                                    | light                               | dark                                |
| --------------------------------------- | ----------------------------------- | ----------------------------------- |
| canvas / `bg`                           | `mauve-100`                         | `mauve-900`                         |
| card / raised                           | `white`                             | `mauve-800`                         |
| fill (surface-2)                        | `mauve-200`                         | `mauve-700`                         |
| **well / over-extend** (recessed inset) | `mauve-50`                          | `mauve-950`                         |
| border / border-strong                  | `mauve-200` / `mauve-300`           | `mauve-700` / `mauve-600`           |
| text / muted / subtle / faint           | `mauve-900` / `600` / `500` / `400` | `mauve-100` / `400` / `500` / `600` |

- **Well / over-extend** (`mauve-50` / `mauve-950`) is the recessed-inset surface — reads as a faint recess on white cards and a deep recess on dark cards. Use it for code blocks, sunken panels, wells.
- **Corners are squared by default** (`rounded-none`), but rounding is _not_ enforced — the full Tailwind `rounded-*` scale stays available.
- **Shadows:** Tailwind geometry, plum-tinted via colored-shadow utilities (`shadow-sm shadow-rose-900/10`, etc.) — never neutral black.
- **Dark mode is class-based** (`.dark` on `<html>`, toggled by `useTheme`). **Every** surface/border/text class needs a `dark:` counterpart.

**Typography roles:** display → `font-serif` (Instrument Serif, large only) · body/UI → `font-sans` (Geist) · code/labels/metadata → `font-mono` (JetBrains Mono). Eyebrow label = `font-mono text-xs font-medium uppercase tracking-widest text-mauve-500` (exported as `eyebrow` from `src/lib/styles.ts`, re-exported by the package barrel `src/index.ts`).

---

## Project layout

```
src/
  components/            reusable design-system components, by category (barrel: index.ts)
    core/                Button, IconButton, Badge, Card(+Header/Footer), Kbd, CodeBlock, Avatar, Separator, ScrollArea
    forms/               Input, Select, Switch, Checkbox + Radio, Slider, NumberField, Form, Fieldset
    feedback/            Callout, Tooltip, Spinner, Toast, Progress, Meter
    navigation/          Tabs, SegmentedControl, SideNav, Sidebar, Navbar, Drawer, Toolbar
    overlays/            Dialog, AlertDialog, Popover, Menu, PreviewCard
    disclosure/          Accordion, Collapsible
    brand/               Wordmark, Blueprint (BlueprintFrame, BlueprintDivider, PlusTick)
  lib/
    styles.ts            shared class fragments: focusRing, eyebrow
  index.ts               public API barrel (published entry point)
  showcase/              the live preview site (NOT part of the component library)
    useTheme.ts, useScrollSpy.ts, nav.ts, ui.tsx (Section/SectionGroup/Spec/Eyebrow)
    Colors / Typography / Scales / Brand / Components / LivePreview / CodeSpecimen
    previews/            DeployConsole, Pricing, DataTable, ProductPage
  App.tsx                composes the showcase inside a BlueprintFrame
preset.css               published Tailwind preset: font families + dark variant (no tokens)
vite.config.ts           showcase site build (→ dist-site)
vite.lib.config.ts       library build (→ dist; vite-plugin-dts, Rollup preserveModules)
```

Use the **`@/` path alias** for all intra-`src` imports (`@/*` → `src/*`, configured in `tsconfig.app.json` paths + both Vite configs' `resolve.alias`); never relative `./`/`../`. Import components from the barrel (`@/components`), not deep paths. Keep files focused - split a section/example into its own file rather than letting one grow large.

---

## Component authoring conventions

- **Class composition:** use `clsx` for conditional/combined classNames (`clsx(base, cond && 'x', className)`). Import from **`clsx/lite`** (string args only — covers everything here); use full `clsx` only if you genuinely need object/array syntax. Don't hand-build classNames with template literals or `+`.
- **Type the props.** Variant/size options as `Record<Variant, string>` class maps.
- **Separate layout from color.** Put structural classes in a `base` string and per-variant colors in the variant map. Never let the _same_ CSS property (e.g. `text-*`, `bg-*`) appear in both base and a variant — Tailwind resolves conflicts by source order, not class order, so duplicates fight.
- **Controlled + uncontrolled.** Stateful nav/form components accept `value`/`defaultValue`/`onChange`.
- **Base UI components: hybrid API.** When wrapping a Base UI primitive, pick by shape. Containers whose content varies (Dialog, Popover, Menu, Accordion, Toolbar) export a **namespace object of pre-styled parts** (`export const Dialog = { Root, Trigger, Popup, ... }`); the `Popup` part bundles the Portal/Backdrop/Positioner so consumers never wire plumbing (see `Drawer`), and `Trigger`/`Close` stay raw Base UI parts (consumers pass `render={<Button />}`). Leaf components with fixed anatomy (Progress, Slider, Avatar, Separator) are **single convenience wrappers** with props. Type a part wrapper as `Omit<Base.Part.Props, 'className' | 'render'> & { className?: string }`.
- **Focus rings:** use the shared `focusRing` fragment.
- **Icons:** `lucide-react`; size relative to text with `[&_svg]:size-[1.1em]`-style classes.
- **Peer/`has` pattern (Switch, Checkbox, Radio):** the visual indicator (thumb / checkmark) must be a **sibling** of the `peer` input, not nested inside the track — `peer-checked:` only reaches siblings. Drive the container's checked/focus state with `has-[:checked]` / `has-[:focus-visible]`.
- **Variant precedence:** Tailwind sorts `hover` _before_ `focus`/`focus-visible`/`focus-within` and before `has-[…]`/`peer-checked`. So a resting `hover:` style (e.g. a border darken) is automatically overridden when the control is focused or checked — layer `hover:` freely without guarding.
- **Interactive form controls** (Input, Select, Switch, Checkbox/Radio) signal affordance with a hover border-darken (`hover:border-mauve-400` / `dark:hover:border-mauve-600`), not `cursor-pointer`.
- **Dynamic classes must be literal.** Tailwind's JIT can't see `bg-mauve-${n}`; use explicit class strings / lookup arrays (see the color ramps in `showcase/Colors.tsx`).
- **CodeBlock:** hand-tokenized highlighting — wrap tokens in `<span className={syntax[kind]}>`. The `syntax` map (exported from `components`) is the single source of truth for token colors; it sits on the well surface. No JS highlighter library (it would inject CSS).
- **Forcing a theme on a subtree:** the `dark` variant is `&:where(.dark, .dark *)` (a descendant selector), so wrapping a subtree in `class="dark"` forces dark locally. The reverse is impossible: an element under `html.dark` can't be forced back to light by any parent class, and there is no `light` variant. To render a permanently-light (or permanently-dark) island, emit only that theme's color utilities with no `dark:` counterpart. `Wordmark`'s `theme="light" | "dark"` prop is the reference example; the Brand section shows both themes at once this way.
- **Blueprint frame:** corner `PlusTick`s use `insetY` so they stay inside the frame vertically (a straddling bottom tick previously extended page height); the shell uses `overflow-x-clip`. The shell paints an "out-of-bounds" diagonal hatch (`repeating-linear-gradient` via `currentColor`, `mauve-300/70` light · `mauve-700/70` dark) that only shows in the gutters; the centered frame carries a solid `bg-mauve-100`/`mauve-900` to mask it behind the content. The hatch lines are **feathered** (a ~1px solid core with ~0.5px soft edges) so thin 45° lines rasterize at a uniform shade instead of the pixel-grid "alternating" beat you get from hard 1px stops.

---

## Showcase conventions

- Single page in `App.tsx`: numbered `SectionGroup`s (`01`/`02`/`03`, ordinal in the accent) + footer, all inside `BlueprintFrame`, separated by ticked `BlueprintDivider`s.
- **Responsive nav:** a sticky `Navbar` (top-level sections — Foundations / Components / Live Preview) on `lg+` (`max-lg:hidden`); below `lg` it swaps to a sticky bar + hamburger that opens a `Drawer` (the reusable off-canvas component) holding the `SideNav`. `Drawer` is `open`/`onClose`-controlled, slides over a dimmed scrim, closes on scrim-click / Escape, and is `inert` when closed.
- `useScrollSpy` tracks the top-level section ids for the navbar active state; `nav.ts` is the shared nav model.
- Live Preview = real interfaces assembled **only** from the primitives (deploy console, pricing, table, product page) — keep new examples built strictly from existing components.
- **Every section uses `<Section>`** (incl. Components and Live Preview), which emphasizes one word of the serif title in italic accent. Pass `emphasis="word"` to choose it (punctuation/case-insensitive match); otherwise a deterministic, seeded pick is used that skips words under 4 letters.
- **Images:** `import img from './assets/x.png'` (Vite resolves it to a URL). Prefer theme-adaptive transparent PNGs so one asset works on both canvases. The hero image is `hidden lg:block`.

---

## Commands & tooling

- `pnpm dev` — Vite dev server (http://localhost:5173).
- `pnpm build` — `tsc -b && vite build` (must pass; this is the type-check gate).
- `pnpm build:lib` builds the publishable library to `dist` (`vite build -c vite.lib.config.ts`). Run before publishing.
- `pnpm lint` — oxlint. `pnpm fmt` — oxfmt.
- oxfmt/oxlint auto-format (single quotes, class/attribute ordering, etc.). Don't fight the formatter; re-read files before editing since it may have reflowed them.
- The showcase `vite.config.ts` must keep the `@tailwindcss/vite` plugin - without it no utilities compile. The library build (`vite.lib.config.ts`) does NOT use it (the consumer's Tailwind compiles the classes); it uses `vite-plugin-dts` + Rollup `preserveModules` so each component emits its own file with literal class strings intact for source-scanning, and ships no React Compiler output.

## Verifying a change

1. `pnpm build` and `pnpm lint` both pass.
2. Visually check with **Playwright (external browser, headless)** in **both light and dark** — toggle via `localStorage 'pm-theme'` + the `.dark` class on `<html>`.
3. Confirm no horizontal overflow (`document.documentElement.scrollWidth - clientWidth === 0`).
4. Re-confirm the styling rules: only `preset.css` / `src/index.css` touched (and only their minimal contents), no inline styles, no `px`/new arbitrary values.
5. Clean up any screenshot artifacts (`pm-*.png`, `.playwright-mcp/`) when done.

## Maintaining this file

Keep this file current. When you learn something durable that isn't captured here — a new convention, a non-obvious gotcha, a decision, a constraint, a reusable component or pattern — **ask the user whether to add it to CLAUDE.md** (don't add silently, and don't record one-off details). Proactively offer to update it after any substantive change or hard-won lesson.

Substantive design-system changes also belong in [`docs/design-system.md`](docs/design-system.md) — the in-depth source of truth. Keep the two in sync: this file for day-to-day rules, the doc for full detail and rationale.

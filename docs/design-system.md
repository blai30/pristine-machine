# Pristine Machine — Design System

The master reference for the Pristine Machine design system: its philosophy, foundations, components, and conventions. This is the source of truth — when you need a deeper understanding than a single component file gives, start here. Keep it current as the system evolves (see [Maintenance](#maintenance)).

---

## Contents

1. [Philosophy](#1-philosophy)
2. [Principles & constraints](#2-principles--constraints)
3. [Technology](#3-technology)
4. [Foundations](#4-foundations)
   - [Color](#41-color) · [Surfaces & elevation](#42-surfaces--elevation) · [Corners](#43-corners) · [Shadows](#44-shadows) · [Typography](#45-typography) · [Spacing & sizing](#46-spacing--sizing) · [Motion](#47-motion) · [Focus & interaction states](#48-focus--interaction-states) · [Dark mode](#49-dark-mode)
5. [Brand](#5-brand)
6. [Components](#6-components)
7. [Composition & code conventions](#7-composition--code-conventions)
8. [The showcase](#8-the-showcase)
9. [Accessibility](#9-accessibility)
10. [Project structure & tooling](#10-project-structure--tooling)
11. [Maintenance](#maintenance)

---

## 1. Philosophy

Pristine Machine is a **plum-blossom (梅花) take on a draughtsman's blueprint**. It pairs the warmth of an editorial serif with the precision of technical line-work:

- **Editorial serif display** (Instrument Serif) for large, expressive headings.
- **Clean grotesque body** (Geist) for UI and long-form text.
- **Monospace annotations** (JetBrains Mono) for labels, metadata, and code — often uppercase with wide tracking, used like a draughtsman's notations.
- **Squared corners** by default and **structural line-work** (rails, dividers, `+` ticks) that frame content like a drawing.
- **Plum-tinted everything** — neutrals carry a faint violet warmth; shadows are plum ink, never neutral black; the accent is a blossom rose.
- **First-class light and dark.** Neither is an afterthought; every surface is designed for both.

The voice is _quietly precise_ — measured and structural without being cold.

---

## 2. Principles & constraints

These constraints are the project's reason for existing. They are absolute.

1. **Tailwind utility classes only.** No custom CSS is ever written. No inline `style` attribute is ever used. Styling lives entirely in class names.
2. **Two minimal CSS files; no variables or tokens.** `preset.css` at the repo root holds only the three font families (`--font-sans` Geist, `--font-serif` Instrument Serif, `--font-mono` JetBrains Mono) and the class-based `dark` variant -- it is the file the published package exports. `src/index.css` holds only `@import 'tailwindcss'` then `@import '../preset.css'`. `preset.css` uses `@theme` solely for the three font families (plus the `dark` variant); no color tokens or any other CSS variables are added to either file. Fonts load from Google Fonts in `index.html`. The system is expressed purely through Tailwind's native scales.
3. **No `px` values.** Everything uses Tailwind's predefined, `rem`-based scale.
4. **Arbitrary values are a last resort.** `[...]` arbitrary values are used only when a thing is genuinely impossible with the standard scale — and never with `px`. The sanctioned set in use:
   - the spring easing `ease-[cubic-bezier(0.34,1.56,0.64,1)]`,
   - em-relative icon sizing (`[&_svg]:size-[1.1em]`, `1.15em`) and the code-block icon `size-[1.125rem]`,
   - tiny press scales (`scale-[0.99]`, `scale-[0.94]`),
   - the `has-[:checked]` / `has-[:focus-visible]` and `[&_svg]` variant selectors,
   - the out-of-bounds hatch `bg-[repeating-linear-gradient(...)]` (expressed in `rem`).

   New arbitrary values should not be added casually.

**Why this works:** the design was deliberately built on Tailwind's native scales — type, spacing, radii, shadows, and (crucially) the `mauve` color ramp added in Tailwind v4.3 — so the entire plum aesthetic is achievable without any theme tokens.

---

## 3. Technology

| Area              | Choice                                      |
| ----------------- | ------------------------------------------- |
| Build             | Vite 8                                      |
| Language          | TypeScript 6                                |
| UI                | React 19 (with the React Compiler)          |
| Styling           | Tailwind CSS v4.3 (via `@tailwindcss/vite`) |
| Icons             | `lucide-react`                              |
| Class composition | `clsx` (imported from `clsx/lite`)          |
| Package manager   | pnpm                                        |
| Lint / format     | oxlint / oxfmt                              |

Intra-`src` imports use the **`@/` path alias** (`@/*` → `src/*`), configured in `tsconfig.app.json` (`paths`) and `vite.config.ts` (`resolve.alias`). Relative `./`/`../` imports are not used.

---

## 4. Foundations

There are no design tokens. Each role maps to a specific Tailwind shade; apply the right shade directly.

### 4.1 Color

**Accent — `rose` (the blossom).** Used sparingly for primary actions, emphasis, active states, and brand moments.

| Role                               | Light                                | Dark                                 |
| ---------------------------------- | ------------------------------------ | ------------------------------------ |
| accent / hover / active            | `rose-500` / `rose-600` / `rose-700` | `rose-400` / `rose-300` / `rose-500` |
| accent-soft / accent-soft-2        | `rose-50` / `rose-100`               | `rose-400/15` / `rose-400/20`        |
| accent-text                        | `rose-700`                           | `rose-300`                           |
| on-accent (text on a solid accent) | `white`                              | `rose-950`                           |

**Neutrals — `mauve` (plum-tinted).** A native Tailwind v4.3 ramp (hue ~322°) that carries a faint violet warmth. Used for every surface, border, and text tone — see [Surfaces](#42-surfaces--elevation).

**Semantics.** Borrowed from Tailwind's spectrums, softened to suit the palette:

| Meaning            | Hue       | Foreground (light / dark)     | Soft fill (light / dark)        |
| ------------------ | --------- | ----------------------------- | ------------------------------- |
| Success            | `emerald` | `emerald-600` / `emerald-400` | `emerald-50` / `emerald-400/15` |
| Warning            | `amber`   | `amber-600` / `amber-400`     | `amber-50` / `amber-400/15`     |
| Danger             | `red`     | `red-600` / `red-400`         | `red-50` / `red-400/15`         |
| Info / "blueprint" | `blue`    | `blue-600` / `blue-400`       | `blue-50` / `blue-400/15`       |

Convention: semantic **foregrounds** use the `600` step in light and `400` in dark; **soft fills** use `50` in light and the `400/15` alpha in dark.

### 4.2 Surfaces & elevation

Apply by role (there are no tokens — use the shade directly):

| Role                                    | Light                               | Dark                                |
| --------------------------------------- | ----------------------------------- | ----------------------------------- |
| **canvas** (page background)            | `mauve-100`                         | `mauve-900`                         |
| **surface / card** (raised)             | `white`                             | `mauve-800`                         |
| **surface-2** (subtle/sunken fill)      | `mauve-200`                         | `mauve-700`                         |
| **well / over-extend** (recessed inset) | `mauve-50`                          | `mauve-950`                         |
| **border / border-strong**              | `mauve-200` / `mauve-300`           | `mauve-700` / `mauve-600`           |
| **text / muted / subtle / faint**       | `mauve-900` / `600` / `500` / `400` | `mauve-100` / `400` / `500` / `600` |

The canvas sits one step in from each theme's extreme (`mauve-100`/`900` rather than `50`/`950`). That deliberately frees the extremes (`mauve-50` light, `mauve-950` dark) for the **well / over-extend** — a recessed-inset surface that reads as a faint recess on white cards and a deep recess on dark cards. Use it for code blocks, sunken panels, stat strips, and other inset wells.

### 4.3 Corners

**Squared by default** — components use `rounded-none`. Rounding is _not_ enforced away, though: the full Tailwind `rounded-*` scale remains available for cases that genuinely want it. The default crispness is central to the drafted aesthetic.

### 4.4 Shadows

Tailwind's shadow geometry (`shadow-xs` … `shadow-2xl`), but **plum-tinted** via colored-shadow utilities (e.g. `shadow-sm shadow-rose-900/10`, `shadow-md shadow-rose-900/15`) — never neutral black. Elevation is soft and warm.

### 4.5 Typography

Three families, three jobs:

| Role                 | Family           | Utility      | Use                                                                            |
| -------------------- | ---------------- | ------------ | ------------------------------------------------------------------------------ |
| Display              | Instrument Serif | `font-serif` | Large headings only — never body. Set with `tracking-tight` and tight leading. |
| Body / UI            | Geist            | `font-sans`  | All UI text and long-form copy.                                                |
| Mono / labels / code | JetBrains Mono   | `font-mono`  | Labels, metadata, code; often uppercase + wide tracking.                       |

- **Type scale & weights:** Tailwind's defaults (`text-xs` … `text-9xl`; `font-light` → `font-bold`).
- **Eyebrow label:** `font-mono text-xs font-medium uppercase tracking-widest text-mauve-500` — exported as `eyebrow` from `@/lib/styles`. The signature small-caps annotation.
- **Emphasized titles (personality):** serif section titles emphasize **one word** in serif-italic accent (`italic text-rose-700 dark:text-rose-300`), e.g. "The pieces, _assembled_". In the showcase this is handled by `Section`'s `emphasis` prop (a deterministic, punctuation-insensitive match; with a stable seeded fallback that skips words under four letters).

### 4.6 Spacing & sizing

Tailwind's 4px-rhythm spacing scale throughout (`p-*`, `gap-*`, etc.) — everything snaps to the grid so layouts read as measured. Control heights are standardized:

| Size         | Height | Class  |
| ------------ | ------ | ------ |
| sm           | 28px   | `h-7`  |
| md (default) | 36px   | `h-9`  |
| lg           | 44px   | `h-11` |

The main content column is `max-w-6xl` (72rem), centered.

### 4.7 Motion

- **Durations:** `duration-150` (fast), `duration-200` (base), `duration-300` (slow).
- **Default easing:** `ease-out`.
- **Spring:** `ease-[cubic-bezier(0.34,1.56,0.64,1)]` — a gentle overshoot used for the signature "settle" on the Switch thumb and the Checkbox/Radio mark.

### 4.8 Focus & interaction states

- **Focus ring:** the shared `focusRing` fragment (`@/lib/styles`) — `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30` (dark `ring-rose-400/25`). A plum-tinted ring, squared like everything else.
- **Hover affordance:** interactive form controls signal interactivity with a one-step **border darken** on hover (`hover:border-mauve-400` / `dark:hover:border-mauve-600`), not a pointer cursor.
- **Variant precedence:** Tailwind sorts `hover` _before_ `focus`/`focus-visible`/`focus-within` and before `has-[…]`/`peer-checked`, so a resting `hover:` style is automatically overridden when a control is focused or checked — hover styles can be layered freely without guarding.

### 4.9 Dark mode

Dark mode is **class-based**: a `.dark` class on `<html>` (the `dark` variant is `&:where(.dark, .dark *)`). **Every** surface, border, and text class must carry a `dark:` counterpart. The theme is toggled by the `useTheme` hook (persisted to `localStorage` under `pm-theme`, defaulting to the OS preference). Dark mode is a deep aubergine — never pure black.

---

## 5. Brand

### 5.1 Wordmark

`Wordmark` renders the lockup "Pristine _Machine_" — serif, with "Machine" in italic rose — over an optional mono subtitle (`Software · Interfaces · Craft`).

- `compact` — drop the subtitle.
- `size` — `'sm'` (`text-2xl`) or `'lg'` (`text-5xl`, default).
- `theme` sets which palette the lockup uses: `'auto'` (default, follows `.dark`), `'light'`, or `'dark'`. The locked variants emit no `dark:` classes, so a `'light'` or `'dark'` wordmark keeps its colors regardless of the ambient theme. Use it on a fixed-color surface (an always-dark footer, a printed-on-paper card) or to show both themes side by side at once. Since `.dark` is a descendant selector, an element under it cannot be forced back to light by a parent class; rendering light-only utilities is how a permanently-light lockup is achieved without a custom `light` variant.

### 5.2 The blueprint frame

The signature page treatment: a centered content column bounded by vertical rails, with `+` ticks at the junctions — structural line-work, like a technical drawing.

- **`BlueprintFrame`** — the shell + centered `max-w-6xl` frame with corner `PlusTick`s. The shell uses `overflow-x-clip`; the frame carries a solid canvas background.
- **`BlueprintDivider`** — a full-bleed horizontal divider; `ticked` drops `+` marks where it meets the rails.
- **`PlusTick`** — a plum `+` junction mark (14px / `size-3.5`, 2px stroke). `corner` places it; `insetY` keeps it inside the frame vertically so the top/bottom ticks never extend page height.
- **Out-of-bounds hatch.** On screens wider than the content column, the gutters fill with a muted diagonal hatch (a `repeating-linear-gradient` drawn via `currentColor`, `mauve-300/70` light / `mauve-700/70` dark), painted on the shell and masked in the center by the frame's solid background. The hatch lines are **feathered** (a ~1px solid core with ~0.5px soft edges) so thin 45° lines render at a uniform shade rather than the pixel-grid "alternating" beat that hard 1px lines produce.

---

## 6. Components

Components live under `src/components/<category>/` and are imported from the barrel (`@/components`). Each types its props; variant/size options are `Record<Variant, string>` class maps with **layout in a `base` string and color in the variant map** (never the same CSS property in both — see [conventions](#7-composition--code-conventions)).

### Core

**Button** — primary action control.

- `variant`: `primary` · `secondary` · `ghost` · `accentSoft` · `danger`
- `size`: `sm` · `md` · `lg`; `block` (full width); `iconLeft` / `iconRight`.
- Squared, `font-medium`, plum focus ring, subtle press (`active:translate-y-px active:scale-[0.99]`), `disabled` dims to 50%. Icons size to text via `[&_svg]:size-[1.1em]`.

**IconButton** — a square, icon-only button.

- `variant`: `ghost` · `solid` · `outline`; `size`: `sm` · `md` · `lg`.
- `label` is **required** (used as `aria-label` and `title`). Sizes are `size-7/9/11`; press `scale-[0.94]`.

**Badge** — compact status/metadata pill (squared).

- `variant`: `neutral` · `accent` · `success` · `warning` · `danger` · `info` · `solid`.
- `dot` adds a leading status dot in the current color. (`square` exists for API parity; corners are squared regardless.) Mono, `text-xs`, `h-6`.

**Card** (+ **CardHeader**, **CardFooter**) — a raised surface.

- `variant`: `default` (subtle shadow) · `flat` (no shadow) · `raised` (more shadow).
- `interactive` adds a hover lift + border highlight; `padded` (default true) wraps children in a padded body — set `padded={false}` to compose `CardHeader` / `CardFooter` directly.

**Kbd** — a keyboard-key glyph (`font-mono`, `border-b-2` for a physical feel).

**CodeBlock** — a recessed code surface on the **well**.

- `lines: ReactNode[]` (one pre-highlighted line each), optional `filename` and `lang` (editor header), with a line-number gutter.
- Highlighting is **hand-tokenized**: wrap tokens in `<span className={syntax[kind]}>`. The exported `syntax` map is the single source of truth for token colors — `plain`, `comment` (italic), `keyword` (rose), `string`, `number`, `func` (blueprint blue), `property`, `punctuation`, each with light/dark variants. No JS highlighter is used (it would inject CSS).

**Avatar** - image with an initials fallback (built on Base UI Avatar).

- `src`, `name` (drives alt text and the derived initials), `size` (`sm`/`md`/`lg`). Squared; falls back to mono initials on a plum fill when the image is absent or fails.

**Separator** - a plain semantic divider (Base UI Separator).

- `orientation` (`horizontal` · `vertical`). Distinct from the decorative `BlueprintDivider`.

**ScrollArea** - a scroll region with plum-tinted overlay scrollbars (Base UI ScrollArea).

- Size the bounding box via `className` (e.g. `h-48 w-full`); the content scrolls within. Scrollbars fade in on hover/scroll.

### Forms

All form controls signal interactivity via a **hover border-darken** (not `cursor-pointer`), and use the shared focus ring.

**Input** — text field with field chrome.

- `label`, `hint`, `error` (replaces hint and turns the control red), `required`, `size` (`sm`/`md`/`lg`), `iconLeft` / `iconRight`. Focus is `focus-within` (ring + accent border). `disabled` via `aria-disabled`.

**Select** - one data-driven select (Base UI Select) with a custom plum chevron.

- `items: {label,value}[]`, `value`/`defaultValue`/`onValueChange`, `placeholder`, `disabled`, `name`. Renders the Base UI custom listbox by default; pass `native` to render a styled native `<select>` instead. The native path is kept on purpose for when the native picker is preferable for accessibility (e.g. mobile pickers, AT familiarity).

**Switch** — a toggle with a spring-sliding thumb.

- `label`, plus standard checkbox attributes (`checked`/`defaultChecked`/`onChange`/`disabled`).
- Track state is driven by `has-[:checked]` / `has-[:focus-visible]`; the thumb is a **sibling** of the `peer` input and slides with the spring easing.

**Checkbox** & **Radio** — custom squared box with a spring-animated mark (a rotated bordered check for Checkbox, a filled square for Radio).

- `label`, plus input attributes. Same peer/`has` pattern as Switch.

**Slider** - a range input with squared thumb(s) (Base UI Slider).

- `value`/`defaultValue`/`onValueChange`, `min`/`max`/`step`, optional `label` + `showValue`. Pass an array value for a multi-thumb range.

**NumberField** - a steppable numeric field (Base UI NumberField).

- `value`/`defaultValue`/`onValueChange`, `min`/`max`/`step`, optional `label`. Minus/plus steppers flank the centered input. (No scrub-area drag.)

### Feedback

**Callout** — a bordered notice with a thick left accent edge (`border-l-4`).

- `variant`: `neutral` · `accent` · `info` · `success` · `warning` · `danger`; optional `title` and `icon` (icon tinted to the variant).

**Tooltip** — a CSS-only hover/focus tooltip.

- `label`, `placement` (`top` · `bottom`). An inverse bubble (dark in light mode, light in dark mode) with an arrow, revealed on `group-hover` / `group-focus-within`.

**Toast** - transient notifications (Base UI Toast). The one imperative API in the catalog.

- Mount `ToastProvider` once near the app root (holds the manager + a top-right, full-width-on-mobile stacked viewport). Fire from anywhere with `useToast().add({ title, description, type })`; `type` (`info` · `success` · `warning` · `danger`) tints the left accent bar. Slides in from the right; auto-dismisses (default 5s).

**Progress** - a determinate/indeterminate task bar (Base UI Progress).

- `value` (`null` -> indeterminate shimmer), `min`/`max`, optional `label` + `showValue`.

**Meter** - a measured-value bar, e.g. disk usage (Base UI Meter).

- `value`, `min`/`max`, optional `label` + `showValue`.

### Navigation

**Tabs** — underline tabs.

- `items: {label,value}[]`, `value`/`defaultValue`/`onChange` (controlled or uncontrolled). Active tab shows an accent underline that animates via `scale-x`.

**SegmentedControl** — a bordered segmented switch.

- `options: {label,value}[]`, `value`/`defaultValue`/`onChange`. Active segment uses `accent-soft`.

**SideNav** — a vertical section navigation.

- `sections: { id, label, number?, items? }[]`, `activeId`, `onNavigate`. Renders numbered top-level groups (ordinal in accent) with nested items; the active item gets accent text and a left accent rail.

**Sidebar** — a sticky, full-height sidebar shell (vertical rail) to compose a brand mark + `SideNav` + footer. `className` controls display/width (e.g. `hidden lg:flex`).

**Navbar** — a sticky top bar.

- `items: {id,label}[]`, `activeId`, `onNavigate`, plus `start` / `end` slots and `sticky` (default true). Inline links with an animated active underline; links wrap rather than scroll.

**Drawer** — an off-canvas overlay drawer.

- `open`, `onClose`, `side` (`left` · `right`), and `children`. Slides a panel in over a dimmed scrim; closes on scrim click or **Escape**; is `inert` when closed (removed from tab order). Compose any content inside (e.g. a `SideNav`). Width/layout overridable via `className`.

**Toolbar** - a roving-focus action bar (Base UI Toolbar). Compound parts.

- `Toolbar.Root` with `Button` (also a toggle via `data-pressed`), `Link`, `Group`, and `Separator`. Arrow keys move focus between controls.

### Overlays

Built on Base UI. These are **compound**: each exports a namespace object whose parts apply the design-system styling, and whose `Popup` part bundles the portal / backdrop / positioner so consumers never wire up plumbing (the same approach `Drawer` uses). `Trigger` / `Close` are raw Base UI parts; pass `render={<Button />}` to style them.

**Dialog** - a centered modal. `Root, Trigger, Popup, Title, Description, Close`. `Popup` bundles portal + backdrop + a padded centered viewport; light-dismisses.

**AlertDialog** - a confirmation modal. Same parts as `Dialog`, but it does **not** light-dismiss, so always include an explicit `Close` (cancel) plus a confirm action. For destructive decisions.

**Popover** - an anchored floating panel. `Root, Trigger, Popup, Title, Description, Close`; `Popup` bundles portal + positioner + arrow and takes `side` / `align` / `sideOffset`.

**Menu** - a dropdown menu. `Root, Trigger, Popup, Item, Separator, Group, GroupLabel, CheckboxItem, RadioGroup, RadioItem, SubmenuRoot, SubmenuTrigger`. `CheckboxItem` / `RadioItem` ship their indicators; `SubmenuTrigger` ships its chevron.

**PreviewCard** - a hover-triggered rich preview (link-card style). `Root, Trigger, Popup`; `Popup` bundles portal + positioner + arrow.

### Disclosure

Compound, built on Base UI. Panel height animates via Base UI's exposed CSS variable.

**Accordion** - stacked expandable sections. `Root, Item, Trigger, Panel` (`Trigger` bundles the header + a rotating chevron). Pass `openMultiple` on `Root` for multiple open panels.

**Collapsible** - a single expandable section. `Root, Trigger, Panel`. The primitive Accordion is built on.

### Brand

**Wordmark**, **BlueprintFrame**, **BlueprintDivider**, **PlusTick** — see [Brand](#5-brand).

---

## 7. Composition & code conventions

- **Class composition:** use `clsx` for conditional/combined class names — `clsx(base, cond && 'x', className)`. Import from **`clsx/lite`** (string arguments only, falsy ignored — covers every case here). Use full `clsx` only if object/array syntax is genuinely needed. Never hand-build class strings with template literals or `+`.
- **Layout vs. color:** put structural/layout classes in a `base` string and per-variant colors in the variant map. The _same_ CSS property must never appear in both `base` and a variant — Tailwind resolves conflicts by stylesheet source order, not class-attribute order, so duplicates fight.
- **Dynamic classes must be literal.** Tailwind's JIT cannot see `bg-mauve-${n}`; use explicit class strings or lookup arrays/maps (see the color ramps in the showcase's `Colors` section).
- **Controlled + uncontrolled.** Stateful nav/form components accept `value`/`defaultValue`/`onChange` (or `open`/`onClose`).
- **Icons.** `lucide-react`, sized relative to text with `[&_svg]:size-[1.1em]`-style classes.
- **Peer / `has` pattern** (Switch, Checkbox, Radio): the visual indicator (thumb / mark) must be a **sibling** of the `peer` input, not nested inside the track — `peer-checked:` only reaches siblings. Drive the container's checked/focus state with `has-[:checked]` / `has-[:focus-visible]`.
- **Imports** use the `@/` alias and come from the component barrel, not deep paths. Keep files focused — split an example/section into its own file rather than letting one grow large.

---

## 8. The showcase

The showcase (`src/App.tsx` + `src/showcase/`) is a single-page live preview of the entire system. It is **not** part of the component library — it documents and exercises it.

- **Structure:** numbered `SectionGroup`s — **01 Foundations**, **02 Components**, **03 Live Preview** — plus a hero and footer, all inside a `BlueprintFrame`, separated by ticked `BlueprintDivider`s.
- **Sections:** every section uses the `Section` component (mono eyebrow + emphasized serif title + subtitle). The emphasized word is chosen via `Section`'s `emphasis` prop.
- **Responsive navigation:** a sticky `Navbar` (top-level sections) on `lg+`; below `lg` it swaps to a sticky bar + hamburger that opens a `Drawer` holding the `SideNav`. `useScrollSpy` tracks the active top-level section; `nav.ts` is the shared nav model.
- **Hero:** a two-column layout (copy + a theme-adaptive transparent illustration that is `hidden lg:block`) with "Browse components" and "Toggle theme" actions.
- **Live Preview:** real interfaces assembled **only** from the primitives — a deploy console, pricing, a data table, and a product page. New examples must be built strictly from existing components, proving the parts compose into product surfaces.

Foundations are documented with live swatch ramps (rose, mauve), the semantic grid, surface tiles (including the well), the type scale, a syntax-highlighted code block, the squared-corner and elevation specimens, and the brand frame/wordmark.

---

## 9. Accessibility

- Color roles are paired light/dark for contrast; semantic foregrounds use the `600`/`400` steps.
- All interactive controls show a visible plum focus ring (`focus-visible`).
- `IconButton` requires a `label` (→ `aria-label` + `title`); `Tooltip` uses `role="tooltip"`; Tabs / SegmentedControl use `aria-selected` / `aria-pressed`; the switch input uses `role="switch"`.
- The `Drawer` closes on Escape and scrim click, and is `inert` while closed (off-screen content is not focusable). The mobile menu trigger is labeled.
- Motion respects the squared, restrained aesthetic; durations are short.

---

## 10. Project structure & tooling

The repo root is the publishable library (`@pristine-machine/ui`) and also hosts the live showcase. Two Vite configs handle the two outputs: `vite.config.ts` builds the showcase site (to `dist-site`); `vite.lib.config.ts` builds the publishable library (to `dist`, using `vite-plugin-dts` and Rollup `preserveModules` so each component emits its own file with literal class strings intact for source-scanning). `preset.css` at the repo root is the published Tailwind preset; consumers import it to get the font families and `dark` variant. `src/index.ts` is the public API barrel.

```
src/
  components/            reusable components, by category (barrel: index.ts)
    core/                Button, IconButton, Badge, Card(+Header/Footer), Kbd, CodeBlock, Avatar, Separator, ScrollArea
    forms/               Input, Select, Switch, Checkbox + Radio, Slider, NumberField
    feedback/            Callout, Tooltip, Spinner, Toast, Progress, Meter
    navigation/          Tabs, SegmentedControl, SideNav, Sidebar, Navbar, Drawer, Toolbar
    overlays/            Dialog, AlertDialog, Popover, Menu, PreviewCard
    disclosure/          Accordion, Collapsible
    brand/               Wordmark, Blueprint (BlueprintFrame, BlueprintDivider, PlusTick)
  lib/
    styles.ts            shared class fragments (focusRing, eyebrow); class composition uses clsx/lite directly, no cn helper
  index.ts               public API barrel (published entry point)
  showcase/              the live preview site (not part of the library)
    useTheme.ts, useScrollSpy.ts, nav.ts, ui.tsx (Section/SectionGroup/Spec/Eyebrow)
    Colors / Typography / Scales / Brand / Components / LivePreview / CodeSpecimen
    previews/            DeployConsole, Pricing, DataTable, ProductPage
  App.tsx                composes the showcase inside a BlueprintFrame
preset.css               published Tailwind preset: font families + dark variant (no tokens)
vite.config.ts           showcase site build (-> dist-site)
vite.lib.config.ts       library build (-> dist)
```

**Commands**

- `pnpm dev` — Vite dev server (http://localhost:5173).
- `pnpm build` — `tsc -b && vite build` (the type-check gate; must pass).
- `pnpm build:lib` builds the publishable library to `dist` (`vite build -c vite.lib.config.ts`). Run before publishing.
- `pnpm lint` — oxlint · `pnpm fmt` — oxfmt (don't fight the formatter; re-read files after it reflows).

**Verifying a change**

1. `pnpm build` and `pnpm lint` pass.
2. Check visually in **both light and dark** (toggle `localStorage 'pm-theme'` + the `.dark` class on `<html>`).
3. Confirm no horizontal overflow (`document.documentElement.scrollWidth - clientWidth === 0`).
4. Re-confirm the constraints: only `preset.css` / `src/index.css` touched (and only their minimal contents), no inline styles, no `px`/new arbitrary values.

---

## Maintenance

This document is a **living source of truth**. Update it whenever the system changes — a new component, a shifted token mapping, a new convention, a corrected detail, or a hard-won lesson. Treat any addition to or change in the system as incomplete until it is reflected here.

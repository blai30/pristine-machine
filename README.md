# Pristine Machine — Master Design System

> The source-of-truth design system for **Pristine Machine**, plus a single-page live showcase that
> documents every token, type ramp, and component on one page — fully interactive, in light and dark.

A plum‑blossom (梅花) take on a draughtsman's blueprint: an editorial serif display, a Geist UI text
face, JetBrains Mono annotations, squared corners by default, structural line‑work, plum‑tinted
everything, and first‑class light **and** dark themes.

This README is the **one‑stop master plan** — the canonical reference for the design language, the
component catalog, the architecture, and the working conventions. It is kept current as the system
evolves. Humans and AI agents should read this first when they need context on the repo.

> **`README.md` vs `CLAUDE.md`:** this file is the _expanded_ reference. [`CLAUDE.md`](./CLAUDE.md) is
> the _condensed_ rulebook auto‑loaded into agent context every session. Keep the two in sync — when a
> durable convention changes, update both.

---

## Table of contents

- [Read this first (non‑negotiable rules)](#read-this-first-non-negotiable-rules)
- [Quick start](#quick-start)
- [Tech stack](#tech-stack)
- [Why it works without theme tokens](#why-it-works-without-theme-tokens)
- [Design language](#design-language)
  - [Palette](#palette)
  - [Surfaces](#surfaces)
  - [Corners & shadows](#corners--shadows)
  - [Typography](#typography)
  - [Motion](#motion)
  - [Dark mode](#dark-mode)
- [Project layout](#project-layout)
- [Component catalog](#component-catalog)
- [The showcase site](#the-showcase-site)
- [Authoring conventions](#authoring-conventions)
- [Adding a new component](#adding-a-new-component)
- [Verifying a change](#verifying-a-change)
- [Maintaining this document](#maintaining-this-document)

---

## Read this first (non‑negotiable rules)

These rules are the project's reason for existing. They override default habits — follow them exactly.

1. **Tailwind utility classes only.** Never write custom CSS. Never use the inline `style` attribute.
2. **Never touch `src/index.css`.** Do not add to `@theme`, do not introduce CSS variables/tokens.
   It declares only the three font families and the `dark` variant (see below). Fonts load from Google
   Fonts in `index.html`.
3. **No `px` values.** Use Tailwind's predefined `rem`‑based scale.
4. **Arbitrary values (`[...]`) only when genuinely unavoidable, and never `px`.** The sanctioned set
   already in use (don't add new ones casually):
   - spring easing `ease-[cubic-bezier(0.34,1.56,0.64,1)]`
   - em‑relative icon sizing `[&_svg]:size-[1.1em]` / `[1.15em]`
   - tiny press scales `active:scale-[0.99]` / `active:scale-[0.94]`
   - the `has-[:checked]` / `has-[:focus-visible]` variant selectors
   - the blueprint "out‑of‑bounds" hatch `bg-[repeating-linear-gradient(...)]` (rem‑based)
5. **Use the `@/` path alias** for all intra‑`src` imports — never relative `./`/`../`.
6. **Compose classes with `clsx`** from `clsx/lite` — never template literals or `+`.

**Self‑audit before finishing any change:** `git diff src/index.css` is empty; no `style=` in `src/`;
no `px]` / `[#` (hex) in `src/`; `pnpm build` and `pnpm lint` both pass.

---

## Quick start

Package manager is **pnpm**.

```bash
pnpm install
pnpm dev          # Vite dev server → http://localhost:5173
pnpm build        # tsc -b && vite build  (the type-check + production gate)
pnpm preview      # preview the production build
pnpm lint         # oxlint
pnpm lint:fix     # oxlint --fix
pnpm fmt          # oxfmt (writes)
pnpm fmt:check    # oxfmt (check only)
```

The dev server and `vite build` both require the `@tailwindcss/vite` plugin in `vite.config.ts` —
without it, no utilities compile.

---

## Tech stack

| Concern           | Choice                                                                           |
| ----------------- | -------------------------------------------------------------------------------- |
| Build / dev       | **Vite 8** (`@vitejs/plugin-react` + Babel React Compiler preset)                |
| Language          | **TypeScript 6** (strict; `moduleResolution: bundler`, `verbatimModuleSyntax`)   |
| UI runtime        | **React 19** with the **React Compiler** enabled                                 |
| Styling           | **Tailwind CSS v4.3** via `@tailwindcss/vite` (utilities only)                   |
| Class composition | **clsx** (imported from `clsx/lite`)                                             |
| Icons             | **lucide-react**                                                                 |
| Lint / format     | **oxlint** / **oxfmt**                                                           |
| Fonts             | Geist · Instrument Serif · JetBrains Mono (Google Fonts, loaded in `index.html`) |

`src/index.css` is intentionally tiny and **must not change**:

```css
@import 'tailwindcss';
@custom-variant dark (&:where(.dark, .dark *));
@theme {
  --font-sans: 'Geist', ...;
  --font-serif: 'Instrument Serif', ...;
  --font-mono: 'JetBrains Mono', ...;
}
```

---

## Why it works without theme tokens

Tailwind **v4.3 ships native `mauve` / `olive` / `mist` / `taupe` palettes**. That is the entire reason
this design system needs no custom theme: the brand neutrals (`mauve`) and the whole surface ramp map
directly onto stock Tailwind utilities. The only thing Tailwind can't supply — the three fonts — is the
sole addition in `@theme`. Everything else (color, spacing, radii, shadows, type scale) is stock
Tailwind v4.3, applied **by role, directly** (there are no semantic CSS tokens, so use the right shade).

---

## Design language

### Palette

- **Accent:** `rose` (the blossom). Used sparingly for emphasis, interaction, and brand moments.
- **Neutrals:** `mauve` (plum‑tinted grays).
- **Semantics:** `emerald` success · `amber` warning · `red` danger · `blue` info / "blueprint".
  Foreground tones use the `600` step (light) / `400` step (dark); soft fills use `50` (light) /
  `400` at `/15` alpha (dark).

### Surfaces

There are no tokens — apply the correct shade per role:

| Role                                    | Light                               | Dark                                |
| --------------------------------------- | ----------------------------------- | ----------------------------------- |
| canvas / `bg`                           | `mauve-100`                         | `mauve-900`                         |
| card / raised                           | `white`                             | `mauve-800`                         |
| fill (surface‑2, sunken)                | `mauve-200`                         | `mauve-700`                         |
| **well / over‑extend** (recessed inset) | `mauve-50`                          | `mauve-950`                         |
| border / border‑strong                  | `mauve-200` / `mauve-300`           | `mauve-700` / `mauve-600`           |
| text / muted / subtle / faint           | `mauve-900` / `600` / `500` / `400` | `mauve-100` / `400` / `500` / `600` |

- **Well / over‑extend** (`mauve-50` / `mauve-950`) is the recessed‑inset surface — a faint recess on
  white cards, a deep recess on dark cards. Use it for code blocks, sunken panels, and wells.
- **accent‑soft** fills: `rose-50` (light) / `rose-400/15` (dark).

### Corners & shadows

- **Squared by default** (`rounded-none`), but rounding is **not** enforced — the full Tailwind
  `rounded-*` scale stays available for when it's wanted.
- **Shadows** keep Tailwind's geometry but are **plum‑tinted** via colored‑shadow utilities
  (e.g. `shadow-sm shadow-rose-900/10`, `shadow-md shadow-rose-900/15`) — never neutral black.

### Typography

| Role                     | Family                          | Usage                                                         |
| ------------------------ | ------------------------------- | ------------------------------------------------------------- |
| Display                  | `font-serif` — Instrument Serif | Large headings only (italic accent on one word; see showcase) |
| Body / UI                | `font-sans` — Geist             | All UI text and long‑form copy                                |
| Code / labels / metadata | `font-mono` — JetBrains Mono    | Code, eyebrow labels, metadata                                |

Sizes/leadings/tracking follow Tailwind's default scales. The **eyebrow** label is a recurring pattern,
exported as `eyebrow` from `@/lib/styles`:

```
font-mono text-xs font-medium uppercase tracking-widest text-mauve-500
```

Control heights: `h-7` (sm) · `h-9` (md) · `h-11` (lg).

### Motion

- Durations use Tailwind's `duration-*`; default easing `ease-out`.
- The signature **spring** (switch thumb, checkbox/radio marks) is the one sanctioned bezier:
  `ease-[cubic-bezier(0.34,1.56,0.64,1)]`.

### Dark mode

Class‑based: `.dark` on `<html>`, toggled by `useTheme` (persisted to `localStorage['pm-theme']`,
initialized from `prefers-color-scheme`). **Every** surface/border/text utility needs a `dark:`
counterpart — there is no automatic theming.

---

## Project layout

```
src/
  components/            reusable design-system components, by category (barrel: index.ts)
    core/                Button · IconButton · Badge · Card (+Header/Footer) · Kbd · CodeBlock
    forms/               Input · Select · Switch · Checkbox + Radio
    feedback/            Callout · Tooltip
    navigation/          Tabs · SegmentedControl · SideNav · Sidebar · Navbar · Drawer
    brand/               Wordmark · Blueprint (BlueprintFrame · BlueprintDivider · PlusTick)
  lib/
    styles.ts            shared class fragments: focusRing, eyebrow
  showcase/              the live preview site (NOT part of the component library)
    useTheme.ts          .dark toggle + localStorage persistence
    useScrollSpy.ts      IntersectionObserver active-section tracking
    nav.ts               shared nav model: NAV_SECTIONS, NAV_ITEMS, SPY_IDS
    ui.tsx               Section · SectionGroup · Spec · Eyebrow (+ emphasized-title logic)
    Colors / Typography / Scales / Brand / Components / LivePreview / CodeSpecimen
    previews/            DeployConsole · Pricing · DataTable · ProductPage
  App.tsx                composes the showcase inside a BlueprintFrame
  index.css              DO NOT EDIT — fonts + dark variant only
  main.tsx               React entry

index.html               loads the three webfonts
vite.config.ts           @tailwindcss/vite plugin + '@' → ./src alias
tsconfig.app.json        paths: '@/*' → ./src/*
```

Import components from the barrel: `import { Button } from '@/components'`. Keep files focused — split a
section/example into its own file rather than letting one grow large.

---

## Component catalog

All components: typed props, squared corners, `dark:` variants, `focusRing` on interactive elements,
and `className` passthrough (merged via `clsx`). Import everything from `@/components`.

### Core

| Component                            | Key props                                                                                                            | Notes                                                                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                             | `variant` `primary\|secondary\|ghost\|accentSoft\|danger` · `size` `sm\|md\|lg` · `block` · `iconLeft` · `iconRight` | Spring‑free press (`active:scale-[0.99]`); icons sized `[&_svg]:size-[1.1em]`.                                                            |
| `IconButton`                         | `variant` `ghost\|solid\|outline` · `size` `sm\|md\|lg` · **`label` (required)**                                     | Square; `label` → `aria-label`/`title`. Child is the icon.                                                                                |
| `Badge`                              | `variant` `neutral\|accent\|success\|warning\|danger\|info\|solid` · `dot` · `square`                                | `dot` shows a status dot; `square` kept for API parity (corners are squared anyway).                                                      |
| `Card` / `CardHeader` / `CardFooter` | `variant` `default\|flat\|raised` · `interactive` · `padded`                                                         | `interactive` lifts + sharpens border on hover. `padded={false}` to compose header/body/footer.                                           |
| `Kbd`                                | —                                                                                                                    | Keycap; 2px bottom border for a physical feel.                                                                                            |
| `CodeBlock` (+ `syntax`)             | `lines: ReactNode[]` · `filename?` · `lang?`                                                                         | Recessed **well** surface, optional editor header, line‑number gutter. Highlight by wrapping tokens in `<span className={syntax[kind]}>`. |

`syntax` (token → class map; `SyntaxKind`): `plain` · `comment` · `keyword` (rose) · `string` ·
`number` · `func` (blueprint blue) · `property` · `punctuation`. It is the single source of truth for
code token colors. No JS highlighter library is used (it would inject CSS) — highlighting is
hand‑tokenized (see `showcase/CodeSpecimen.tsx`).

### Forms

| Component            | Key props                                                                                      | Notes                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `Input`              | `label?` · `hint?` · `error?` · `required?` · `size` `sm\|md\|lg` · `iconLeft?` · `iconRight?` | Focus‑within ring; error state swaps to red; hover darkens border. |
| `Select`             | native `<select>` props                                                                        | Custom CSS chevron; hover darkens border + chevron (via `group`).  |
| `Switch`             | `label?` · native checkbox props (minus `type`)                                                | `has-checked` track + `peer-checked` spring thumb.                 |
| `Checkbox` / `Radio` | `label?` · native input props (minus `type`) (`CheckControlProps`)                             | `has-[:checked]` box + `peer-checked` spring mark.                 |

Interactive form controls signal affordance with a **hover border‑darken** (not `cursor-pointer`).

### Feedback

| Component | Key props                                                                        | Notes                                                          |
| --------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Callout` | `variant` `neutral\|accent\|info\|success\|warning\|danger` · `title?` · `icon?` | Left accent border (`border-l-4`).                             |
| `Tooltip` | `label` · `placement` `top\|bottom`                                              | CSS‑only reveal on hover/focus‑within; inverse bubble + arrow. |

### Navigation

| Component          | Key props                                                                            | Notes                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Tabs`             | `items: TabItem[]` · `value?`/`defaultValue?`/`onChange?`                            | Animated underline indicator. Controlled or uncontrolled.                                                                      |
| `SegmentedControl` | `options: SegmentOption[]` · `value?`/`defaultValue?`/`onChange?`                    | Accent‑soft active segment. Controlled or uncontrolled.                                                                        |
| `SideNav`          | `sections: SideNavSection[]` · `activeId?` · `onNavigate?`                           | Numbered groups (`number?`) + nested `items`; active item = accent text + left accent rail.                                    |
| `Sidebar`          | `className` (control display/width)                                                  | Sticky full‑height rail **shell** — compose brand + `SideNav` + footer inside.                                                 |
| `Navbar`           | `items?: NavbarItem[]` · `activeId?` · `onNavigate?` · `start?` · `end?` · `sticky?` | Horizontal sticky bar with `start`/`end` slots; uppercase links, accent active.                                                |
| `Drawer`           | `open` · `onClose` · `side` `left\|right` · `children`                               | Off‑canvas overlay panel over a dimmed scrim. Closes on scrim‑click / Escape; `inert` when closed. Compose a `SideNav` inside. |

`SideNavSection` = `{ id; label; number?; items?: SideNavItem[] }`; `SideNavItem`/`NavbarItem` =
`{ id; label }`.

### Brand

| Component          | Key props                             | Notes                                                                                                                                                                           |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Wordmark`         | `compact?` · `size` `sm\|lg`          | "Pristine _Machine_" serif lockup (italic rose "Machine") + mono subtitle (hidden when `compact`).                                                                              |
| `BlueprintFrame`   | `children` · `className`              | The signature page shell: centered `max-w-6xl` column with vertical rails + corner `+` ticks, on a solid canvas, with the **out‑of‑bounds diagonal hatch** filling the gutters. |
| `BlueprintDivider` | `ticked?`                             | Full‑bleed `border-t`; `ticked` drops `+` marks where it meets the rails.                                                                                                       |
| `PlusTick`         | `corner` `tl\|tr\|bl\|br` · `insetY?` | The plum `+` junction mark (two crossing bars). `insetY` keeps it inside the frame vertically.                                                                                  |

**Blueprint frame internals worth knowing:**

- Corner `PlusTick`s use `insetY` so the top/bottom ticks never overflow and extend page height; the
  shell uses `overflow-x-clip`.
- The shell paints an **"out‑of‑bounds" diagonal hatch** (`repeating-linear-gradient` via
  `currentColor`, `mauve-300/70` light · `mauve-700/70` dark) that only shows in the gutters on wide
  (`xl`/`2xl`) screens; the centered frame carries a solid `bg-mauve-100`/`mauve-900` to mask it behind
  the content. The hatch lines are **feathered** (≈1px solid core + ≈0.5px soft edges) so thin 45°
  lines rasterize at a uniform shade instead of the pixel‑grid "alternating" beat from hard 1px stops.

---

## The showcase site

`App.tsx` renders the whole system on one page inside a `BlueprintFrame`, with these conventions:

- **Numbered sections.** Three `SectionGroup`s render a numbered eyebrow (ordinal in the accent) —
  `01 Foundations`, `02 Components`, `03 Live Preview` — separated by ticked `BlueprintDivider`s.
- **Emphasized titles.** Every `Section` emphasizes one word of its serif title in italic accent. Pass
  `emphasis="word"` to choose it (punctuation/case‑insensitive match); otherwise a deterministic,
  seeded pick is used that skips words under 4 letters.
- **Responsive nav.** A sticky `Navbar` (top‑level sections) on `lg+` (`max-lg:hidden`); below `lg` it
  swaps to a sticky bar + hamburger that opens a `Drawer` holding the `SideNav`. `useScrollSpy` tracks
  the active top‑level section; `nav.ts` is the shared nav model.
- **Hero.** Two‑column on `lg+` (text + a theme‑adaptive transparent PNG, `hidden lg:block`), with
  "Browse components" (scrolls to `#components`) and "Toggle theme" buttons.
- **Foundations** sections: Colors (rose/mauve ramps, semantics, surfaces, the well), Typography
  (display/body/mono + a `CodeBlock` specimen with a token legend), Corners & Elevation, Brand.
- **Live Preview** = real interfaces assembled **only** from the primitives — a deploy console,
  pricing, a team table, and a product page (`showcase/previews/`). Keep new examples built strictly
  from existing components.

The showcase code under `src/showcase/` is **not** part of the shipped component library — it consumes
it. Images: `import img from '@/assets/x.png'` (Vite resolves it to a URL); prefer theme‑adaptive
transparent PNGs.

---

## Authoring conventions

- **Class composition:** `clsx(base, cond && 'x', className)`, imported from **`clsx/lite`** (string
  args only — covers everything here). Use full `clsx` only if you genuinely need object/array syntax.
  Never hand‑build classNames with template literals or `+`.
- **Type the props;** express variant/size options as `Record<Variant, string>` class maps.
- **Separate layout from color.** Structural classes go in a `base` string, per‑variant colors in the
  variant map. Never let the _same_ CSS property appear in both `base` and a variant — Tailwind resolves
  conflicts by source order, not class‑attribute order, so duplicates fight.
- **Variant precedence (rely on it):** Tailwind sorts `hover` _before_ `focus`/`focus-visible`/
  `focus-within` and before `has-[…]`/`peer-checked`. So a resting `hover:` style is automatically
  overridden when a control is focused or checked — layer `hover:` freely without guarding.
- **Peer/`has` pattern (Switch, Checkbox, Radio):** the visual indicator (thumb/checkmark) must be a
  **sibling** of the `peer` input, not nested in the track — `peer-checked:` only reaches siblings.
  Drive the container's state with `has-[:checked]` / `has-[:focus-visible]`.
- **Dynamic classes must be literal.** Tailwind's JIT can't see `bg-mauve-${n}`; use explicit class
  strings / lookup arrays (see the color ramps in `showcase/Colors.tsx`).
- **Controlled + uncontrolled** for stateful nav/form components (`value`/`defaultValue`/`onChange`).
- **Focus rings:** use the shared `focusRing` fragment. **Icons:** `lucide-react`, sized relative to
  text with `[&_svg]:size-[1.1em]`‑style classes.
- **Don't fight the formatter.** oxfmt/oxlint auto‑format (single quotes, class/attribute ordering);
  re‑read files before editing since they may have been reflowed.

---

## Adding a new component

1. Create `src/components/<category>/<Name>.tsx`. Type the props; `base` string + `Record<Variant,…>`
   maps; `clsx(...)` for the className; `dark:` on every surface/border/text; `focusRing` if interactive.
2. Export it (and its types) from `src/components/index.ts`.
3. Demo it in the showcase `Components` gallery (`src/showcase/Components.tsx`) under the right group,
   showing each variant/size/state.
4. Run the [verification](#verifying-a-change) checklist.
5. If it introduces a durable convention or gotcha, update `CLAUDE.md` (and this README).

---

## Verifying a change

1. `pnpm build` **and** `pnpm lint` both pass.
2. Visually check with **Playwright (external browser, headless)** in **both light and dark** — toggle
   via `localStorage['pm-theme']` + the `.dark` class on `<html>`.
3. Confirm no horizontal overflow: `document.documentElement.scrollWidth - clientWidth === 0`.
4. Re‑confirm the styling rules: `src/index.css` untouched; no inline `style=`; no `px` or new arbitrary
   values beyond the sanctioned set.
5. Clean up any screenshot artifacts (`pm-*.png`, `.playwright-mcp/`) when done.

---

## Maintaining this document

Keep this README and `CLAUDE.md` current as the system evolves — that's their entire purpose. When you
learn something durable that isn't captured here (a new convention, a non‑obvious gotcha, a decision, a
constraint, a reusable component or pattern), **ask whether to record it**, then update both files. Don't
record one‑off details or anything the code already makes obvious. Proactively offer to update after any
substantive change or hard‑won lesson.

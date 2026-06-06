# Pristine Machine — Master Design System

The source-of-truth design system for "Pristine Machine" plus a single-page live showcase. A
plum-blossom (梅花) take on a draughtsman's blueprint: editorial serif display, Geist UI text,
JetBrains Mono annotations, squared corners, structural line-work, plum-tinted everything, first-class
light and dark.

Stack: **Vite 8 · TypeScript 6 · React 19 (React Compiler) · Tailwind CSS v4.3 · Base UI
(`@base-ui/react`)**. Package manager: **pnpm**. The interactive components are headless Base UI
primitives wearing Tailwind classes — behavior/accessibility from Base UI, every pixel from utilities.

---

## Non-negotiable styling rules

These are the project's reason for existing. They override default habits — follow them exactly.

1. **Tailwind utility classes only.** Never write custom CSS. Never use the inline `style` attribute.
2. **Never touch `src/index.css`.** Do not add to `@theme`, do not introduce CSS variables/tokens.
   It declares only three font families (`--font-sans` Geist, `--font-serif` Instrument Serif,
   `--font-mono` JetBrains Mono) and the `dark` variant. Fonts load from Google Fonts in `index.html`.
3. **No `px` values.** Use Tailwind's predefined scale (`rem`-based).
4. **Arbitrary values (`[...]`) only when truly unavoidable, and never `px`.** The sanctioned ones
   already in use: the spring easing `ease-[cubic-bezier(0.34,1.56,0.64,1)]`, em-relative icon sizing
   (`[&_svg]:size-[1.1em]`, `1.15em`, `1.125rem`), tiny press scales (`scale-[0.99]`/`scale-[0.94]`),
   and the `has-[:checked]` / `has-[:focus-visible]` variant selectors. Don't add new ones casually.
   Base UI **state variants** (`data-checked:`, `data-selected:`, `data-pressed:`, `data-highlighted:`,
   `data-popup-open:`, `data-disabled:`, `data-starting-style:`/`data-ending-style:`, `group-data-selected:`)
   are first-class Tailwind v4 variants and are preferred over the old `peer`/`has-` pattern for those
   components. The one sanctioned CSS-var size is the Select popup's `min-w-(--anchor-width)` (matches
   the popup to its trigger). **Base UI's floating parts (Tooltip/Select/Dialog) inject their own inline
   positioning styles at runtime via Floating UI** — that is library-managed and allowed; you still never
   hand-write a `style=` attribute, and `src/index.css` stays untouched.

Before finishing any change: `git diff src/index.css` must be empty; grep `src/` for `style=` (none)
and for `px]` / `[#` (none).

---

## Palette & surfaces (all native Tailwind v4.3 utilities)

Tailwind v4.3 ships a native `mauve` ramp — that's the whole reason this works without theme tokens.

- **Accent:** `rose` (blossom). **Neutrals:** `mauve` (plum-tinted).
- **Semantics:** `emerald` success · `amber` warning · `red` danger · `blue` info / "blueprint".
- **Foreground tones light/dark:** semantics use the `600`/`400` step; their soft fills use `50` /
  `400-with-/15-alpha`.

**Surface ramp (apply by role; there are no tokens, so use the right shade directly):**

| role                                    | light                               | dark                                |
| --------------------------------------- | ----------------------------------- | ----------------------------------- |
| canvas / `bg`                           | `mauve-100`                         | `mauve-900`                         |
| card / raised                           | `white`                             | `mauve-800`                         |
| fill (surface-2)                        | `mauve-200`                         | `mauve-700`                         |
| **well / over-extend** (recessed inset) | `mauve-50`                          | `mauve-950`                         |
| border / border-strong                  | `mauve-200` / `mauve-300`           | `mauve-700` / `mauve-600`           |
| text / muted / subtle / faint           | `mauve-900` / `600` / `500` / `400` | `mauve-100` / `400` / `500` / `600` |

- **Well / over-extend** (`mauve-50` / `mauve-950`) is the recessed-inset surface — reads as a faint
  recess on white cards and a deep recess on dark cards. Use it for code blocks, sunken panels, wells.
- **Corners are squared by default** (`rounded-none`), but rounding is _not_ enforced — the full
  Tailwind `rounded-*` scale stays available.
- **Shadows:** Tailwind geometry, plum-tinted via colored-shadow utilities (`shadow-sm shadow-rose-900/10`,
  etc.) — never neutral black.
- **Dark mode is class-based** (`.dark` on `<html>`, toggled by `useTheme`). **Every** surface/border/
  text class needs a `dark:` counterpart.

**Typography roles:** display → `font-serif` (Instrument Serif, large only) · body/UI → `font-sans`
(Geist) · code/labels/metadata → `font-mono` (JetBrains Mono). Eyebrow label = `font-mono text-xs
font-medium uppercase tracking-widest text-mauve-500` (exported as `eyebrow` in `src/lib/styles.ts`).

---

## Project layout

```
src/
  components/            reusable design-system components, by category (barrel: index.ts)
    core/                Button, IconButton, Badge, Card(+Header/Footer), Kbd, CodeBlock
    forms/               Input, Select (native), SelectMenu (Base UI popup), Switch,
                         Checkbox, Radio + RadioGroup
    feedback/            Callout, Tooltip
    navigation/          Tabs, SegmentedControl, SideNav, Sidebar, Navbar, Drawer
    brand/               Wordmark, Blueprint (BlueprintFrame, BlueprintDivider, PlusTick)
  lib/
    styles.ts            shared class fragments: focusRing, eyebrow
  showcase/              the live preview site (NOT part of the component library)
    useTheme.ts, useScrollSpy.ts, nav.ts, ui.tsx (Section/SectionGroup/Spec/Eyebrow)
    Colors / Typography / Scales / Brand / Components / LivePreview / CodeSpecimen
    previews/            DeployConsole, Pricing, DataTable, ProductPage
  App.tsx                composes the showcase inside a BlueprintFrame
```

Use the **`@/` path alias** for all intra-`src` imports (`@/*` → `src/*`, configured in
`tsconfig.app.json` paths + `vite.config.ts` `resolve.alias`) — never relative `./`/`../`. Import
components from the barrel (`@/components`), not deep paths. Keep files focused — split a
section/example into its own file rather than letting one grow large.

---

## Component authoring conventions

- **Class composition:** use `clsx` for conditional/combined classNames (`clsx(base, cond && 'x', className)`).
  Import from **`clsx/lite`** (string args only — covers everything here); use full `clsx` only if you
  genuinely need object/array syntax. Don't hand-build classNames with template literals or `+`.
- **Type the props.** Variant/size options as `Record<Variant, string>` class maps.
- **Separate layout from color.** Put structural classes in a `base` string and per-variant colors in
  the variant map. Never let the _same_ CSS property (e.g. `text-*`, `bg-*`) appear in both base and a
  variant — Tailwind resolves conflicts by source order, not class order, so duplicates fight.
- **Controlled + uncontrolled.** Stateful nav/form components accept `value`/`defaultValue`/`onChange`.
- **Focus rings:** use the shared `focusRing` fragment.
- **Icons:** `lucide-react`; size relative to text with `[&_svg]:size-[1.1em]`-style classes.
- **State styling = Base UI `data-*` variants** (Switch, Checkbox, Radio, Tabs, SegmentedControl,
  Select popup, etc.): the indicator (thumb / checkmark / underline) is a child of the Base UI part and
  reacts to `data-checked:`/`data-selected:`/`data-pressed:` on itself or its ancestor (`group` +
  `group-data-selected:`). The control's Root **is** the real focusable element, so put `focus-visible:`
  directly on it (no more `has-[:focus-visible]`). The old `peer`/`has-[:checked]` sibling pattern is
  retired for migrated components.
- **Variant precedence:** Tailwind sorts `hover` _before_ `focus`/`focus-visible` and before
  `data-[…]`. So a resting `hover:` style (e.g. a border darken) is automatically overridden when the
  control is focused or in a `data-checked`/`data-selected`/`data-pressed` state — layer `hover:` freely.
- **Interactive form controls** (Input, Select, Switch, Checkbox/Radio) signal affordance with a hover
  border-darken (`hover:border-mauve-400` / `dark:hover:border-mauve-600`), not `cursor-pointer`.
- **Dynamic classes must be literal.** Tailwind's JIT can't see `bg-mauve-${n}`; use explicit class
  strings / lookup arrays (see the color ramps in `showcase/Colors.tsx`).
- **CodeBlock:** hand-tokenized highlighting — wrap tokens in `<span className={syntax[kind]}>`. The
  `syntax` map (exported from `components`) is the single source of truth for token colors; it sits on
  the well surface. No JS highlighter library (it would inject CSS).
- **Blueprint frame:** corner `PlusTick`s use `insetY` so they stay inside the frame vertically (a
  straddling bottom tick previously extended page height); the shell uses `overflow-x-clip`. The shell
  paints an "out-of-bounds" diagonal hatch (`repeating-linear-gradient` via `currentColor`, `mauve-300/70`
  light · `mauve-700/70` dark) that only shows in the gutters; the centered frame carries a solid
  `bg-mauve-100`/`mauve-900` to mask it behind the content. The hatch lines are **feathered** (a ~1px
  solid core with ~0.5px soft edges) so thin 45° lines rasterize at a uniform shade instead of the
  pixel-grid "alternating" beat you get from hard 1px stops.

---

## Built on Base UI

Interactive components are thin Tailwind skins over `@base-ui/react` headless primitives. Behavior,
keyboard nav, focus management, and ARIA come from Base UI; appearance is 100% utilities.

- **Import per-part** from the subpath: `import { Switch } from '@base-ui/react/switch'` (also `/checkbox`,
  `/radio`, `/radio-group`, `/tabs`, `/toggle`, `/toggle-group`, `/dialog`, `/tooltip`, `/field`,
  `/select`). Wrap each in a project component that keeps a small, stable public API and adds the classes.
- **Composition:** style each anatomy part via its `className` (string, or `(state) => string`). Use the
  **`render` prop** (Base UI's `asChild`) to swap the rendered element or mount an existing component as
  a trigger — e.g. `Tooltip.Trigger render={<span … />}`.
- **`Tooltip.Provider` is mounted once** at the top of `App.tsx` (shared open-delay/grouping). Tooltips
  won't share timing without it.
- **Forms use `Field`** (`Field.Root`/`Label`/`Control`/`Description`/`Error`). `Input` wires
  label/hint/error to the control automatically (`aria-describedby`, `aria-invalid`); drive the invalid
  state with `Field.Root invalid={…}` and render `Field.Error match` for a controlled message.
- **Radio requires a group:** `RadioGroup` (holds `name`/`value`/`defaultValue`/`onValueChange`) wrapping
  `Radio value=…`. A bare `<Radio>` outside a group won't track selection.
- **Two Selects, by design:** `Select` stays the native `<select>` wrapper (zero popup, no floating
  layer); `SelectMenu` is the Base UI custom popup (keyboard nav, styled options on the card surface,
  `data-highlighted`/`data-selected` rows). Pick native for simple cases, `SelectMenu` for styled menus.
- **`Drawer` is Base UI `Dialog`** (Backdrop + Popup) presented as an edge panel — it traps focus, locks
  scroll, restores focus on close, and dismisses on scrim-click / Escape. Slide via
  `data-starting-style:`/`data-ending-style:` translate classes. Same `open`/`onClose`/`side` API as before.
- **Wrapper APIs are preserved** so the showcase/`previews/*` keep working: `Tabs`/`SegmentedControl`
  still take `items`/`options` + `value`/`defaultValue`/`onChange`; `Tooltip` still takes
  `label`/`placement`/`children`. Internally these map to Base UI's `onValueChange`/parts.

**State attributes differ per component** — target the right one (a wrong guess silently no-ops, since
Tailwind happily compiles a variant for an attribute that never appears). The ones in use:

| component                       | active/on state   | other states                                                          |
| ------------------------------- | ----------------- | --------------------------------------------------------------------- |
| Switch / Checkbox / Radio       | `data-checked`    | `data-disabled`, `data-unchecked`                                     |
| Tabs (`Tabs.Tab`)               | `data-active`     | `data-disabled`, `data-orientation`                                   |
| SegmentedControl (`Toggle`)     | `data-pressed`    | `data-disabled`                                                       |
| SelectMenu item (`Select.Item`) | `data-selected`   | `data-highlighted` (keyboard/pointer focus row)                       |
| Select/Tooltip/Dialog trigger   | `data-popup-open` | —                                                                     |
| Drawer / Tooltip / Select popup | `data-open`       | `data-closed`, `data-starting-style`/`data-ending-style`, `data-side` |
| Field-wrapped control (`Input`) | `data-invalid`    | `data-valid`, `data-dirty`, `data-touched`, `data-filled`             |

Note especially: **Tabs is `data-active`, not `data-selected`** (`data-selected` is the Select-item
attribute). When unsure, check `node_modules/@base-ui/react/esm/<part>/.../*DataAttributes.d.ts`.

**Future primitives roadmap** (not built yet — add each as its own showcase section, built strictly from
this same data-attr/render pattern): standalone **Dialog**/**AlertDialog**, **Popover**, **Menu** /
**Menubar** / **ContextMenu**, **Accordion**/**Collapsible**, **NumberField**, **Slider**, **Toast**,
**Toolbar**, **Progress**/**Meter**, **ScrollArea**, **Separator**, **Avatar**, **Autocomplete/Combobox**.

---

## Showcase conventions

- Single page in `App.tsx`: numbered `SectionGroup`s (`01`/`02`/`03`, ordinal in the accent) + footer,
  all inside `BlueprintFrame`, separated by ticked `BlueprintDivider`s.
- **Responsive nav:** a sticky `Navbar` (top-level sections — Foundations / Components / Live Preview)
  on `lg+` (`max-lg:hidden`); below `lg` it swaps to a sticky bar + hamburger that opens a `Drawer`
  (the reusable off-canvas component, now a Base UI `Dialog`) holding the `SideNav`. `Drawer` is
  `open`/`onClose`-controlled, slides over a dimmed scrim, traps focus, locks scroll, and closes on
  scrim-click / Escape with focus restored to the trigger.
- `useScrollSpy` tracks the top-level section ids for the navbar active state; `nav.ts` is the shared
  nav model.
- Live Preview = real interfaces assembled **only** from the primitives (deploy console, pricing,
  table, product page) — keep new examples built strictly from existing components.
- **Every section uses `<Section>`** (incl. Components and Live Preview), which emphasizes one word of
  the serif title in italic accent. Pass `emphasis="word"` to choose it (punctuation/case-insensitive
  match); otherwise a deterministic, seeded pick is used that skips words under 4 letters.
- **Images:** `import img from './assets/x.png'` (Vite resolves it to a URL). Prefer theme-adaptive
  transparent PNGs so one asset works on both canvases. The hero image is `hidden lg:block`.

---

## Commands & tooling

- `pnpm dev` — Vite dev server (http://localhost:5173).
- `pnpm build` — `tsc -b && vite build` (must pass; this is the type-check gate).
- `pnpm lint` — oxlint. `pnpm fmt` — oxfmt.
- oxfmt/oxlint auto-format (single quotes, class/attribute ordering, etc.). Don't fight the formatter;
  re-read files before editing since it may have reflowed them.
- `vite.config.ts` must keep the `@tailwindcss/vite` plugin — without it no utilities compile.

## Verifying a change

1. `pnpm build` and `pnpm lint` both pass.
2. Visually check with **Playwright (external browser, headless)** in **both light and dark** — toggle
   via `localStorage 'pm-theme'` + the `.dark` class on `<html>`.
3. Confirm no horizontal overflow (`document.documentElement.scrollWidth - clientWidth === 0`).
4. Re-confirm the styling rules: `src/index.css` untouched, no inline styles, no `px`/new arbitrary values.
5. Clean up any screenshot artifacts (`pm-*.png`, `.playwright-mcp/`) when done.

## Maintaining this file

Keep this file current. When you learn something durable that isn't captured here — a new convention,
a non-obvious gotcha, a decision, a constraint, a reusable component or pattern — **ask the user whether
to add it to CLAUDE.md** (don't add silently, and don't record one-off details). Proactively offer to
update it after any substantive change or hard-won lesson.

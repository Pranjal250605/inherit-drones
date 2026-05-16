# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for "Inherit Co." (commercial drone systems), built as a Vite + React 18 + TypeScript SPA styled with Tailwind. There is no backend, no router, and no tests — the entire app is a vertical scroll of section components animated with GSAP/ScrollTrigger.

## Commands

```bash
npm run dev         # Vite dev server on http://localhost:5173 (host: true)
npm run build       # tsc --noEmit (typecheck) then vite build → ./dist
npm run preview     # Serve the built bundle on port 4173
npm run typecheck   # tsc --noEmit only
```

There is no test runner, linter, or formatter configured. TypeScript is in strict mode with `noUnusedLocals` and `noUnusedParameters` enabled — `npm run build` will fail on either.

## Architecture

### Composition root
`src/main.tsx` wraps `<App />` in `<ThemeProvider><I18nProvider>`. `App.tsx` then renders the section components in fixed order (Header → Hero → TrustStrip → Mission → Solutions → Process → Technology → UseCases → Stats → Testimonial → FAQ → Contact → Footer). Adding a new section means adding a file under `src/components/sections/` and importing it in `App.tsx`.

### Three cross-cutting systems
These are the non-obvious pieces. Everything else in `src/components/sections/` is leaf-level presentational JSX.

**1. Theming (`src/theme/index.tsx` + `src/index.css`).** Three themes: `dark` (default), `light`, `blueprint`. `ThemeProvider` writes `data-theme` to `<html>` and persists to `localStorage` under `inherit.theme`. The CSS in `src/index.css` defines four RGB-triplet vars per theme (`--bg`, `--bg-alt`, `--fg`, `--muted`, `--accent`) which Tailwind exposes as the semantic colors `bg`, `bg-alt`, `fg`, `muted`, `accent` (see `tailwind.config.ts`). **Components must use the semantic tokens** (`bg-bg`, `text-fg`, `text-fg/45`, `border-fg/10`, etc.) so all three themes work. The brand orange is intentionally a literal `orange-500` across all themes — do not theme it. Adding a fourth theme = new CSS block in `index.css` + new entry in the `THEMES` list in `theme/index.tsx`.

**2. i18n (`src/i18n/index.tsx` + `en.json` + `ja.json`).** `useT()` returns `{ lang, setLang, t }` where `t` is a deeply-typed dictionary (the type is inferred from `en.json`, so `en.json` is the source of truth for keys). Initial language is detected from `localStorage` (`inherit.lang`) then `navigator.language` (`ja*` → `ja`, else `en`). **When adding copy: add the English key to `en.json` first, then mirror in `ja.json`** — TypeScript will surface missing branches via the `Dict` type.

**3. GSAP scroll animations (`src/hooks/useGsapAnimations.ts`).** Called once from `App.tsx`. This is the only place GSAP lives. It works by querying data attributes set on JSX elements — **animations are wired by attribute, not by import**. The vocabulary:
- `data-hero="tag|title|rule|paragraph|ctas|ticker|hud-left|hud-right|scroll|video|content"` — Hero entrance timeline + parallax
- `data-anim="sweep|title-up|stagger|spine|wordmark|scroll-progress|img-reveal|node|card-stagger"` — scroll-triggered reveals
- `data-anim-item` — children inside a `data-anim="stagger"` or `card-stagger"` parent
- `data-bar="<percent>"` — animates `width` from 0 to that percent
- `data-count="<number>" data-decimals data-suffix data-thousands` — count-up number with optional formatting
- `data-anim="logo"` — header logo gets a scroll-velocity skew kick

Animations are globally disabled when the user has `prefers-reduced-motion: reduce` (the hook adds `no-anim` to `<body>` and returns early). When building a new section, reach for these attributes before writing any custom motion code.

### Design-system primitives
`src/components/primitives.tsx` holds shared atoms (`Mono`, `JpAnno`, `Dot`, brackets, arrows, etc.) used to give every section the same industrial/instrumentation look. Reuse these instead of restyling inline. `LanguageSwitcher.tsx` and `ThemeSwitcher.tsx` are the user-facing controls for the two providers above.

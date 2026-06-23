# FTC WI.R.E.S. — Claude Code Instructions

## About this project

FTC WI.R.E.S. (Wisconsin Rises to Enable STEM Growth) is a community resource website for FIRST Tech Challenge robotics teams, led by Team 13201 Hazmat. It provides software guides, a curated resource library, sponsorship information, and outreach spotlights for FTC teams, primarily in Wisconsin.

**Read the `ai_context/` folder before making changes.** It contains accurate, up-to-date documentation about the whole application.

---

## Context Files

| File | What it covers |
|---|---|
| `ai_context/linktree.md` | Every page route, all anchor sections, nav structure |
| `ai_context/design-system.md` | CSS variables, Tailwind patterns, components, typography |
| `ai_context/architecture.md` | Tech stack, file structure, routing, data flow |
| `ai_context/content-guide.md` | What the site is for, FTC vocabulary, team context |
| `ai_context/patterns-and-gotchas.md` | Recurring code patterns and things to avoid |
| `ai_context/search.md` | How the search index is generated and maintained |

---

## Stack Summary

- **Next.js 16** App Router — all pages are server components by default
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** — `@import "tailwindcss"` in globals.css
- **No backend** — static content site, forms submit to Google Forms
- **Geist Sans + Geist Mono** fonts

---

## Key Rules

### Colors
Never hardcode hex values. Always use CSS custom properties:
- `var(--background)`, `var(--foreground)`, `var(--muted)`, `var(--subtle)`
- `var(--border)`, `var(--border-strong)`, `var(--hairline)`
- `var(--surface)`, `var(--surface-glass)`
- Use `color-mix(in oklab, var(--foreground) X%, transparent)` for translucent tints

### Dark mode
Dark mode is class-based (`.dark` on `<html>`), **not** `prefers-color-scheme`. The `@custom-variant dark` in globals.css handles this.

### Images
Use plain `<img>` tags with the ESLint disable comment — **not** `next/image`. Videos use `<video>` tags.

### Client components
Only add `"use client"` when the component needs browser APIs (`useState`, `useEffect`, `localStorage`, event handlers). Pages are server components unless they need interactivity.

### Imports
Import shared components from `"../_lib/ui"` (relative path, not absolute). All shared UI lives in `app/_lib/ui.tsx`.

### Scroll anchors
When adding sections with `id` attributes, always include `scroll-mt-32` to account for the fixed navbar.

### Styling text gradients
Use `<span className="block text-fade">` for the fading text effect on headings — the `block` display is required for the gradient to work.

---

## Dev Commands

```bash
npm run dev           # Start dev server
npm run build         # Production build (auto-regenerates search index via prebuild)
npm run lint          # ESLint
npm run build:search  # Regenerate search index from file tree
```

---

## Search Index

The search index is **auto-generated** from the file tree. Never hand-edit `app/_lib/search-index.generated.ts`.

**Source of truth:** the app/ page tree + `app/_lib/search-meta.ts`

**Workflow — whenever you create, rename, or delete a page:**

1. Run `npm run build:search` after any page change.
2. Verify the new/renamed route appears (or is gone) in `search-index.generated.ts`.
3. If the page needs keywords, a group, or nicer section labels, add them to `app/_lib/search-meta.ts` under `ROUTE_META`.

**Trigger phrases:** when the user says any of:
- "update search" / "rebuild the search index" / "Claude update search"

→ Run `npm run build:search`, then report what changed (routes added/removed, entry count).

**How it works:** `scripts/generate-search-index.ts` scans every `app/**/page.tsx`, extracts `title`/`description` from `export const metadata`, detects static `id="..."` anchor sections, merges with `ROUTE_META` overrides (keywords, groups, section labels), and writes to `search-index.generated.ts`. The `prebuild` hook regenerates it on every production build.

**To exclude a route:** add it to `SEARCH_EXCLUDE` in `search-meta.ts`.

**To add entries not tied to a page:** add to `MANUAL_ENTRIES` in `search-meta.ts`.

See `ai_context/search.md` for full details.

---

## Where content lives

All content (links, grant data, team spotlights, nav items) is hardcoded in the page `.tsx` files as TypeScript arrays/objects. There is no CMS or database. To update content, edit the data arrays directly in the relevant page file.

- Nav items: `app/navbar.tsx` → `NAV` array
- Footer links: `app/footer.tsx` → `COLS` array
- Resource links: `app/resources/page.tsx` → `CATEGORIES` array
- Grants: `app/sponsorship/page.tsx` → `GRANTS` array
- Software tools: `app/software-platform/page.tsx` → `AUTO_PATHING_TOOLS` + `GENERAL_TOOLS`
- Outreach spotlights: `app/outreach/page.tsx` → `SPOTLIGHTS` array

# Navbar Declutter + Command Palette — Design Spec
**Date:** 2026-06-22  
**Status:** Approved

---

## Overview

Two coordinated changes to `app/navbar.tsx` and a new search subsystem:

1. **Declutter** — Remove `Home`, `Parts Lending Network`, and `Outreach` from the top navbar. Convert `Software Platform` from a flat link to a dropdown. Result: 4 top-level items (down from 7) with zero disabled/grayed-out links.
2. **Command palette** — A `⌘K`-triggered search modal covering every page and major section anchor. Triggered from a new button in the navbar right cluster.

No other pages or components are modified.

---

## Files Changed

| File | Type | Change |
|---|---|---|
| `app/navbar.tsx` | Edit | New NAV array, accordion mobile, palette trigger + ⌘K listener |
| `app/_lib/ui.tsx` | Edit | Add `SearchIcon` |
| `app/_lib/search-index.ts` | New | Static search data |
| `app/_lib/CommandPalette.tsx` | New | Modal component |

---

## Part 1 — Navbar Declutter

### New NAV array

```ts
const NAV: NavItem[] = [
  {
    label: "Software Platform",
    href: "/software-platform",
    items: [
      { label: "Blocks",           desc: "Visual drag-and-drop programming, no Java required.",          href: "/blocks" },
      { label: "Roadrunner",       desc: "Motion-profiled autonomous paths with velocity control.",       href: "/roadrunner" },
      { label: "Pedro Pathing",    desc: "Bézier curve path following with predictive braking.",          href: "/pedro-pathing" },
      { label: "Android Studio",   desc: "Install the IDE and deploy your first build.",                  href: "/android-studio" },
      { label: "Command-Based",    desc: "Scalable subsystem/command architecture for Java.",             href: "/command-based" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Important Sites",    desc: "Official FTC links, documentation, and season resources.",                href: "/resources#important-sites" },
      { label: "Team Info",          desc: "Wisconsin FTC team directories, contacts, and event information.",        href: "/resources#team-info" },
      { label: "Collaborate",        desc: "Discord servers, shared communities, and team collaboration spaces.",     href: "/resources#collaborate" },
      { label: "General Resources",  desc: "Beginner guides, CAD tools, simulators, and core FTC resources.",        href: "/resources#general" },
      { label: "Hardware",           desc: "FTC hardware suppliers, manufacturing resources, and build tools.",       href: "/resources#hardware" },
      { label: "Software",           desc: "Programming tools, SDK resources, pathing libraries, and setup guides.",  href: "/resources#software" },
      { label: "Game Strategy",      desc: "Scouting tools, match analysis resources, and competitive strategy.",    href: "/resources#game-strategy" },
    ],
  },
  {
    label: "Sponsorship",
    href: "/sponsorship",
    items: [
      { label: "How to get sponsors",  desc: "Practical advice for reaching out to companies and organizations.",  href: "/sponsorship#how-to" },
      { label: "Grants & discounts",   desc: "Wisconsin grants, vendor discounts, and corporate programs.",         href: "/sponsorship#grants" },
      { label: "Sponsorship letter",   desc: "A draft letter you can adapt for your team.",                        href: "/sponsorship#letter" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
```

**Removed:** `Home`, `Parts Lending Network`, `Outreach`. The logo already links to `/`; the other two remain in the footer.  
**Software Platform dropdown:** 5 items → `grid-cols-1` (fewer than the Resources threshold of 4 for wide layout — use single column, same `w-[420px]` panel).

> **Dropdown width logic (existing):** `wide = items.length > 4` → `w-[640px] grid-cols-2`. Software Platform has exactly 5 items, so it will use the wide two-column layout. Resources (7 items) stays wide. Sponsorship (3 items) stays narrow.

### Desktop dropdown

No changes to `DropdownPanel` or `NavItem` type logic. The existing `isMenu` check already handles any item with `items`. Software Platform's header label links to `/software-platform` via the existing `<Link href={item.href}>` + separate chevron button pattern.

### Right cluster order (desktop)

`Search button | Theme toggle | Register button`

The search button is inserted before the existing theme toggle.

---

## Part 2 — Mobile Accordion

### Behavior

- State: `mobileExpanded: string | null` (label string, one section open at a time)
- Tapping a section label toggles `mobileExpanded` (open → close same section, or open → switch)
- Sub-items are visible only when their section is expanded
- Chevron on the right rotates 180° when expanded (reuse `<Chevron>` icon, same `rotate-180` class as desktop)
- Flat items (`Contact`) remain plain `<Link>` rows — no toggle

### Transition

Use `max-h` + `overflow-hidden` transition for smooth expand/collapse:
```tsx
<ul
  className={`overflow-hidden transition-all duration-200 ${
    isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
  }`}
>
```

### Mobile menu structure (new)

```tsx
<ul className="flex flex-col">
  {NAV.map((item) =>
    "items" in item ? (
      <li key={item.label} className="border-b" style={{ borderColor: "var(--hairline)" }}>
        {/* Tappable header row */}
        <button onClick={() => toggleMobileExpanded(item.label)}
          className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-foreground">
          {item.label}
          <Chevron className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        {/* Collapsible sub-items */}
        <ul className={`overflow-hidden transition-all duration-200 ${isExpanded ? "max-h-[500px]" : "max-h-0"}`}>
          {item.items.map((s) => (
            <li key={s.label}>
              <Link href={s.href} className="block rounded-xl px-4 py-2.5 text-sm text-muted hover:text-foreground hover:bg-foreground/5">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ) : (
      <li key={item.label} className="border-b" style={{ borderColor: "var(--hairline)" }}>
        <Link href={item.href} className="block px-3 py-3 text-sm font-medium text-foreground hover:bg-foreground/5">
          {item.label}
        </Link>
      </li>
    )
  )}
</ul>
```

The existing "Join the network" / Register CTA button at the bottom of the mobile panel is kept.

---

## Part 3 — Search Index (`app/_lib/search-index.ts`)

### Type

```ts
export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  keywords?: string[];
  group: string;
};
```

### Coverage (~28 entries)

**Group: Pages**
| title | href | keywords |
|---|---|---|
| Home | / | wires, wisconsin, ftc, hazmat, 13201 |
| Contact | /contact | email, reach, contributors |
| Register | /register | sign up, team number, access, guides |
| Planning | /planning | season, roadmap, communication, sponsorship |
| Parts Lending Network | /parts-lending-network | borrow, lend, hardware, waitlist |
| Outreach | /outreach | events, community, awards, inspire, connect |

**Group: Guides**
| title | href | keywords |
|---|---|---|
| Software Platform | /software-platform | guides, tools, programming |
| Blocks | /blocks | drag-and-drop, visual, scratch, beginner, rev hardware client, no java |
| Roadrunner | /roadrunner | motion planning, trajectory, spline, mecanum, tank drive, feedforward |
| Pedro Pathing | /pedro-pathing | bezier, path following, predictive braking, follower, ivy, nextftc |
| Android Studio | /android-studio | ide, install, gradle, apk, deploy, control hub |
| Command-Based Architecture | /command-based | subsystem, command, scheduler, trigger, nextftc, ivy, solverslib, wpilib |
| Wireless ADB Setup | /android-studio#wireless-adb | adb, wifi, wireless, deploy, platform-tools |

**Group: Resources**
| title | href | keywords |
|---|---|---|
| Important Sites | /resources#important-sites | first, ftc docs, official, game manual |
| Team Info | /resources#team-info | directory, wisconsin, contact |
| Community & Collaboration | /resources#collaborate | discord, reddit, community |
| General Resources | /resources#general | gm0, game manual zero, index47, simulator, onshape, cad, fusion |
| Hardware Resources | /resources#hardware | gobilda, rev, andymark, axon, mcmaster, studica, ferra, cnc |
| Software Resources | /resources#software | github, sdk, roadrunner, pedro, cookbook, learn java |
| Game Strategy | /resources#game-strategy | scouting, ftcscout, ftcstats, match, analytics |

**Group: Sponsorship**
| title | href | keywords |
|---|---|---|
| Sponsorship Overview | /sponsorship | funding, money, sponsors |
| How to Get Sponsors | /sponsorship#how-to | tips, outreach, local business, pitch |
| Grants & Discounts | /sponsorship#grants | grant, dpi, msoe, gobilda, rev, money, wisconsin |
| Sample Sponsorship Letter | /sponsorship#letter | template, email, letter |

---

## Part 4 — Command Palette (`app/_lib/CommandPalette.tsx`)

### Props

```ts
interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}
```

### State

```ts
const [query, setQuery] = useState("");
const [activeIndex, setActiveIndex] = useState(0);
```

Reset `activeIndex` to 0 on every query change.

### Filtering

```ts
function filterEntries(q: string): SearchEntry[] {
  if (!q.trim()) return SEARCH_INDEX; // show all when empty
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  return SEARCH_INDEX.filter((entry) => {
    const haystack = [entry.title, entry.description, ...(entry.keywords ?? [])].join(" ").toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}
```

All tokens must match (AND logic). Case-insensitive. No external library.

Flat filtered array is used for `activeIndex` tracking. Results are then grouped by `entry.group` for display using a `Map` to preserve insertion order.

### Keyboard handling (inside component)

```ts
useEffect(() => {
  if (!open) return;
  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[activeIndex]) { router.push(results[activeIndex].href); onClose(); }
    if (e.key === "Escape") onClose();
  }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [open, activeIndex, results]);
```

### ⌘K global listener (in `navbar.tsx`)

```ts
useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setPaletteOpen((v) => !v);
    }
  }
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}, []);
```

### DOM structure

```
<div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[60]">
  {/* Backdrop */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
  {/* Panel */}
  <div className="relative mx-auto mt-20 w-full max-w-xl px-4 sm:px-0">
    <div
      className="overflow-hidden rounded-3xl border backdrop-blur-xl"
      style={{
        background: "var(--surface-glass)",
        borderColor: "var(--border)",
        boxShadow: "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset, 0 24px 60px -24px rgba(0,0,0,0.5)",
      }}
    >
      {/* Input row */}
      <div className="flex items-center gap-3 border-b px-4 py-3.5" style={{ borderColor: "var(--hairline)" }}>
        <SearchIcon className="h-4 w-4 flex-none text-subtle" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages and guides…"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
        />
        <kbd className="rounded border px-1.5 py-0.5 text-[10px] font-mono text-subtle" style={{ borderColor: "var(--border)" }}>
          ESC
        </kbd>
      </div>
      {/* Results */}
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {/* grouped results or empty state */}
      </div>
    </div>
  </div>
</div>
```

**Result item:**
```tsx
<Link
  href={entry.href}
  onClick={onClose}
  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors ${
    isActive ? "bg-foreground/8 text-foreground" : "text-muted hover:bg-foreground/5 hover:text-foreground"
  }`}
>
  <span className="flex-1 font-medium">{entry.title}</span>
  <span className="text-[12px] text-subtle">{entry.description}</span>
  <ArrowRight className="h-3 w-3 text-subtle flex-none" />
</Link>
```

**Group header:**
```tsx
<div className="px-3 pt-3 pb-1 text-[10px] font-medium uppercase tracking-widest text-subtle">
  {group}
</div>
```

**Empty state:**
```tsx
<div className="py-12 text-center text-sm text-subtle">
  No results for "<span className="text-foreground">{query}</span>"
</div>
```

### Auto-focus

`autoFocus` on the input handles focus on open. When the palette closes, focus returns to the document naturally. No manual `ref.focus()` needed.

### Scroll-lock

When palette is open, add `overflow-hidden` to `document.body` to prevent background scroll:
```ts
useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [open]);
```

---

## Part 5 — Search Trigger Button

Inserted in the right cluster of the navbar, before the theme toggle:

```tsx
{/* Desktop: pill with label + kbd hint */}
<button
  onClick={() => setPaletteOpen(true)}
  aria-label="Search"
  className="hidden items-center gap-2 rounded-full border px-3 py-2 text-[13px] text-muted transition-colors hover:text-foreground sm:inline-flex"
  style={{
    borderColor: "var(--border)",
    background: "color-mix(in oklab, var(--foreground) 3%, transparent)",
  }}
>
  <SearchIcon className="h-3.5 w-3.5" />
  <span>Search</span>
  <kbd className="rounded border px-1 py-0.5 text-[10px] font-mono" style={{ borderColor: "var(--border-strong)" }}>
    ⌘K
  </kbd>
</button>

{/* Mobile: icon only */}
<button
  onClick={() => setPaletteOpen(true)}
  aria-label="Search"
  className="grid h-9 w-9 place-items-center rounded-full border text-muted transition-colors hover:text-foreground sm:hidden"
  style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--foreground) 3%, transparent)" }}
>
  <SearchIcon className="h-4 w-4" />
</button>
```

`z-index` of palette (`z-[60]`) must be above the navbar (`z-50`).

---

## Part 6 — SearchIcon

Added to `app/_lib/ui.tsx`:

```tsx
export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="6.5" cy="6.5" r="4" />
      <path d="M11 11l3 3" />
    </svg>
  );
}
```

---

## Acceptance Criteria

- [ ] Top navbar: logo + 4 items (Software Platform ▾, Resources ▾, Sponsorship ▾, Contact) + right cluster (Search, Theme, Register). Zero disabled links in the bar.
- [ ] Software Platform header still navigates to `/software-platform`; its 5 sub-items work.
- [ ] Mobile: three sections accordion-expand on tap; flat Contact is a direct link; Register CTA at bottom preserved.
- [ ] ⌘K / Ctrl+K opens palette from anywhere on the page; button in navbar also opens it.
- [ ] Typing filters results (AND token logic, case-insensitive); results grouped by category.
- [ ] ↑/↓ moves selection; Enter navigates + closes; Esc closes; clicking backdrop closes.
- [ ] Clicking a result navigates and closes the palette.
- [ ] All colors use CSS var tokens — no hardcoded hex.
- [ ] Dark and light mode both correct.
- [ ] `npm run build` and `npm run lint` pass.
- [ ] Only `app/navbar.tsx`, `app/_lib/ui.tsx`, `app/_lib/search-index.ts`, `app/_lib/CommandPalette.tsx` are modified/created.

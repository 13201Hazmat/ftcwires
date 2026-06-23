# Navbar Declutter + Command Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove clutter from the navbar (7 items → 4, zero disabled links), convert Software Platform to a dropdown, add mobile accordion, and add a ⌘K command-palette search modal.

**Architecture:** Four files total — `ui.tsx` gets a `SearchIcon`, a new `search-index.ts` holds static data, a new `CommandPalette.tsx` owns the modal UI + filtering + keyboard, and `navbar.tsx` is rewritten with the new NAV array, accordion mobile menu, and palette trigger. No backend, no external search library.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS v4, CSS custom property tokens (never hardcode hex).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `app/_lib/ui.tsx` | Edit | Add `SearchIcon` SVG export |
| `app/_lib/search-index.ts` | Create | Static `SearchEntry[]` covering all pages + anchors |
| `app/_lib/CommandPalette.tsx` | Create | Modal UI, filtering, keyboard nav, scroll-lock |
| `app/navbar.tsx` | Rewrite | New NAV array, desktop dropdown, accordion mobile, palette trigger, ⌘K listener |

---

## Task 1: Add SearchIcon to ui.tsx

**Files:**
- Modify: `app/_lib/ui.tsx` (append after `SparkIcon`)

- [ ] **Step 1: Append SearchIcon export to the end of `app/_lib/ui.tsx`**

Open `app/_lib/ui.tsx`. After the closing brace of `SparkIcon`, add:

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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/shivanshupadhyay/coding_/gearheads-software/ftcwires
npx tsc --noEmit
```

Expected: no errors related to `ui.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/_lib/ui.tsx
git commit -m "feat: add SearchIcon to ui.tsx"
```

---

## Task 2: Create the search index

**Files:**
- Create: `app/_lib/search-index.ts`

- [ ] **Step 1: Create `app/_lib/search-index.ts` with the full contents below**

```ts
export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  keywords?: string[];
  group: string;
};

export const SEARCH_INDEX: SearchEntry[] = [
  // ── Pages ──────────────────────────────────────────────────────────
  {
    title: "Home",
    description: "FTC WI.R.E.S. — Wisconsin Rises to Enable STEM Growth.",
    href: "/",
    keywords: ["wires", "wisconsin", "ftc", "hazmat", "13201", "stem"],
    group: "Pages",
  },
  {
    title: "Contact",
    description: "Reach the WI.R.E.S. team by email or GitHub.",
    href: "/contact",
    keywords: ["email", "reach", "contributors", "hazmat"],
    group: "Pages",
  },
  {
    title: "Register",
    description: "Sign up to access the autonomous programming guide drive.",
    href: "/register",
    keywords: ["sign up", "team number", "access", "guides", "auto"],
    group: "Pages",
  },
  {
    title: "Planning",
    description: "Season roadmaps, communication tips, and sponsorship playbooks.",
    href: "/planning",
    keywords: ["season", "roadmap", "communication", "burnout", "cadence"],
    group: "Pages",
  },
  {
    title: "Parts Lending Network",
    description: "Upcoming statewide hardware lending pool for Wisconsin FTC teams.",
    href: "/parts-lending-network",
    keywords: ["borrow", "lend", "hardware", "waitlist", "parts", "motors"],
    group: "Pages",
  },
  {
    title: "Outreach",
    description: "Real outreach events from Wisconsin FTC teams, tagged by judged award.",
    href: "/outreach",
    keywords: ["events", "community", "awards", "inspire", "connect", "reach", "sustain"],
    group: "Pages",
  },

  // ── Guides ─────────────────────────────────────────────────────────
  {
    title: "Software Platform",
    description: "Overview of all FTC software guides and example autos.",
    href: "/software-platform",
    keywords: ["guides", "tools", "programming", "overview"],
    group: "Guides",
  },
  {
    title: "Blocks",
    description: "Visual drag-and-drop programming for FTC, no Java required.",
    href: "/blocks",
    keywords: [
      "drag-and-drop", "visual", "scratch", "beginner",
      "rev hardware client", "no java", "opmode",
    ],
    group: "Guides",
  },
  {
    title: "Roadrunner",
    description: "Motion-profiled autonomous paths with velocity and acceleration control.",
    href: "/roadrunner",
    keywords: [
      "motion planning", "trajectory", "spline", "mecanum",
      "tank drive", "feedforward", "acme",
    ],
    group: "Guides",
  },
  {
    title: "Pedro Pathing",
    description: "Bézier curve path following with predictive braking for FTC.",
    href: "/pedro-pathing",
    keywords: [
      "bezier", "path following", "predictive braking",
      "follower", "ivy", "nextftc", "curves",
    ],
    group: "Guides",
  },
  {
    title: "Android Studio Setup",
    description: "Install the IDE, open FtcRobotController, and deploy to a Control Hub.",
    href: "/android-studio",
    keywords: [
      "ide", "install", "gradle", "apk", "deploy",
      "control hub", "ftcrobotcontroller", "sdk",
    ],
    group: "Guides",
  },
  {
    title: "Command-Based Architecture",
    description: "Organize robot code with subsystems, commands, and a scheduler.",
    href: "/command-based",
    keywords: [
      "subsystem", "command", "scheduler", "trigger",
      "nextftc", "ivy", "solverslib", "wpilib", "frc", "scalable",
    ],
    group: "Guides",
  },
  {
    title: "Wireless ADB Setup",
    description: "Deploy code to your Control Hub over WiFi without a USB cable.",
    href: "/android-studio#wireless-adb",
    keywords: [
      "adb", "wifi", "wireless", "deploy",
      "platform-tools", "usb", "192.168.43.1",
    ],
    group: "Guides",
  },

  // ── Resources ──────────────────────────────────────────────────────
  {
    title: "Important Sites",
    description: "Official FTC links, documentation, and game season resources.",
    href: "/resources#important-sites",
    keywords: ["first", "ftc docs", "official", "game manual", "rules"],
    group: "Resources",
  },
  {
    title: "Team Info",
    description: "Wisconsin FTC team directories, contacts, and event information.",
    href: "/resources#team-info",
    keywords: ["directory", "wisconsin", "contact", "teams", "search"],
    group: "Resources",
  },
  {
    title: "Community & Collaboration",
    description: "Discord servers, Reddit, and team collaboration spaces.",
    href: "/resources#collaborate",
    keywords: ["discord", "reddit", "community", "social", "collaborate"],
    group: "Resources",
  },
  {
    title: "General Resources",
    description: "GM0, simulators, CAD tools, and core FTC learning guides.",
    href: "/resources#general",
    keywords: [
      "gm0", "game manual zero", "index47", "simulator",
      "onshape", "cad", "fusion", "beginner",
    ],
    group: "Resources",
  },
  {
    title: "Hardware Resources",
    description: "FTC hardware suppliers: GoBilda, REV, AndyMark, and more.",
    href: "/resources#hardware",
    keywords: [
      "gobilda", "rev", "andymark", "axon",
      "mcmaster", "studica", "ferra", "cnc", "build", "parts",
    ],
    group: "Resources",
  },
  {
    title: "Software Resources",
    description: "GitHub, SDK docs, Roadrunner, Pedro Pathing, Cookbook, and more.",
    href: "/resources#software",
    keywords: ["github", "sdk", "roadrunner", "pedro", "cookbook", "learn java", "programming"],
    group: "Resources",
  },
  {
    title: "Game Strategy",
    description: "Scouting tools, FTCScout, FTCStats, and match analysis resources.",
    href: "/resources#game-strategy",
    keywords: ["scouting", "ftcscout", "ftcstats", "match", "analytics", "alliance", "strategy"],
    group: "Resources",
  },

  // ── Sponsorship ────────────────────────────────────────────────────
  {
    title: "Sponsorship Overview",
    description: "Grants, discounts, and sponsorship resources for FTC teams.",
    href: "/sponsorship",
    keywords: ["funding", "money", "sponsors", "grants", "support"],
    group: "Sponsorship",
  },
  {
    title: "How to Get Sponsors",
    description: "Tips for reaching local businesses, parents, and companies.",
    href: "/sponsorship#how-to",
    keywords: ["tips", "outreach", "local business", "pitch", "approach"],
    group: "Sponsorship",
  },
  {
    title: "Grants & Discounts",
    description: "Wisconsin and national grants: DPI, MSOE, GoBilda, REV, and more.",
    href: "/sponsorship#grants",
    keywords: [
      "grant", "dpi", "msoe", "gobilda", "rev",
      "money", "wisconsin", "pitsco", "lockheed", "ge",
    ],
    group: "Sponsorship",
  },
  {
    title: "Sample Sponsorship Letter",
    description: "A fill-in-the-blanks email template to pitch potential sponsors.",
    href: "/sponsorship#letter",
    keywords: ["template", "email", "letter", "draft", "pitch"],
    group: "Sponsorship",
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/_lib/search-index.ts
git commit -m "feat: add static search index"
```

---

## Task 3: Create CommandPalette component

**Files:**
- Create: `app/_lib/CommandPalette.tsx`

This component owns: modal overlay, input, grouped results, keyboard navigation (↑↓ Enter Esc), scroll-lock, and filtering. It does NOT own the ⌘K listener — that lives in the navbar so it works site-wide.

- [ ] **Step 1: Create `app/_lib/CommandPalette.tsx` with the full contents below**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchIcon, ArrowRight } from "./ui";
import { SEARCH_INDEX, type SearchEntry } from "./search-index";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

function filterEntries(q: string): SearchEntry[] {
  if (!q.trim()) return SEARCH_INDEX;
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  return SEARCH_INDEX.filter((entry) => {
    const haystack = [
      entry.title,
      entry.description,
      ...(entry.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}

function groupResults(entries: SearchEntry[]): Map<string, SearchEntry[]> {
  const map = new Map<string, SearchEntry[]>();
  for (const entry of entries) {
    if (!map.has(entry.group)) map.set(entry.group, []);
    map.get(entry.group)!.push(entry);
  }
  return map;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = filterEntries(query);
  const grouped = groupResults(results);

  // Reset activeIndex whenever the filtered list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Reset query and selection every time the palette opens
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Prevent background scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard navigation (↑ ↓ Enter Esc)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = results[activeIndex];
        if (target) {
          router.push(target.href);
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeIndex, results, router, onClose]);

  if (!open) return null;

  // flatIndex tracks position across groups so activeIndex highlights the right row
  let flatIndex = 0;

  return (
    <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative mx-auto mt-20 w-full max-w-xl px-4 sm:px-0">
        <div
          className="overflow-hidden rounded-3xl border backdrop-blur-xl"
          style={{
            background: "var(--surface-glass)",
            borderColor: "var(--border)",
            boxShadow:
              "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset, 0 24px 60px -24px rgba(0,0,0,0.5)",
          }}
        >
          {/* Input row */}
          <div
            className="flex items-center gap-3 border-b px-4 py-3.5"
            style={{ borderColor: "var(--hairline)" }}
          >
            <SearchIcon className="h-4 w-4 flex-none text-subtle" />
            <input
              ref={inputRef}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages and guides…"
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
            />
            <kbd
              className="rounded border px-1.5 py-0.5 text-[10px] font-mono text-subtle"
              style={{ borderColor: "var(--border)" }}
            >
              ESC
            </kbd>
          </div>

          {/* Results list */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-sm text-subtle">
                No results for &ldquo;
                <span className="text-foreground">{query}</span>
                &rdquo;
              </div>
            ) : (
              Array.from(grouped.entries()).map(([group, entries]) => (
                <div key={group}>
                  <div className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-widest text-subtle">
                    {group}
                  </div>
                  {entries.map((entry) => {
                    const idx = flatIndex++;
                    const isActive = idx === activeIndex;
                    return (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                        style={
                          isActive
                            ? {
                                background:
                                  "color-mix(in oklab, var(--foreground) 8%, transparent)",
                              }
                            : undefined
                        }
                      >
                        <span className="min-w-0 flex-1 truncate font-medium">
                          {entry.title}
                        </span>
                        <span className="hidden max-w-[200px] truncate text-[12px] text-subtle sm:block">
                          {entry.description}
                        </span>
                        <ArrowRight className="h-3 w-3 flex-none text-subtle" />
                      </Link>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see "Module not found" for `./ui` or `./search-index`, double-check the file is saved to `app/_lib/CommandPalette.tsx` (same directory as `ui.tsx`).

- [ ] **Step 3: Commit**

```bash
git add app/_lib/CommandPalette.tsx
git commit -m "feat: add CommandPalette component"
```

---

## Task 4: Rewrite navbar.tsx

**Files:**
- Modify: `app/navbar.tsx` (full rewrite)

This task replaces the entire file. Changes vs the original:
- `NAV` array: removes `Home`, `Parts Lending Network`, `Outreach`; adds `Software Platform` dropdown; removes `disabled` property from type
- Adds `paletteOpen` and `mobileExpanded` state
- Adds ⌘K/Ctrl+K `keydown` listener
- Rewrites right cluster to add search buttons (desktop pill + mobile icon)
- Rewrites mobile panel with accordion (replaces flat always-visible sub-items)
- Mounts `<CommandPalette>` as a sibling to `<header>` inside a fragment
- Removes the `disabled` item rendering branch (no more grayed-out links)

- [ ] **Step 1: Replace the entire contents of `app/navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WiresLogo, ArrowRight, SearchIcon } from "./_lib/ui";
import CommandPalette from "./_lib/CommandPalette";

type SubItem = { label: string; desc: string; href: string };
type NavItem =
  | { label: string; href: string }
  | { label: string; href: string; items: SubItem[] };

const NAV: NavItem[] = [
  {
    label: "Software Platform",
    href: "/software-platform",
    items: [
      {
        label: "Blocks",
        desc: "Visual drag-and-drop programming, no Java required.",
        href: "/blocks",
      },
      {
        label: "Roadrunner",
        desc: "Motion-profiled autonomous paths with velocity control.",
        href: "/roadrunner",
      },
      {
        label: "Pedro Pathing",
        desc: "Bézier curve path following with predictive braking.",
        href: "/pedro-pathing",
      },
      {
        label: "Android Studio",
        desc: "Install the IDE and deploy your first build.",
        href: "/android-studio",
      },
      {
        label: "Command-Based",
        desc: "Scalable subsystem/command architecture for Java.",
        href: "/command-based",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      {
        label: "Important Sites",
        desc: "Official FTC links, documentation, and season resources.",
        href: "/resources#important-sites",
      },
      {
        label: "Team Info",
        desc: "Wisconsin FTC team directories, contacts, and event information.",
        href: "/resources#team-info",
      },
      {
        label: "Collaborate",
        desc: "Discord servers, shared communities, and team collaboration spaces.",
        href: "/resources#collaborate",
      },
      {
        label: "General Resources",
        desc: "Beginner guides, CAD tools, simulators, and core FTC resources.",
        href: "/resources#general",
      },
      {
        label: "Hardware",
        desc: "FTC hardware suppliers, manufacturing resources, and build tools.",
        href: "/resources#hardware",
      },
      {
        label: "Software",
        desc: "Programming tools, SDK resources, pathing libraries, and setup guides.",
        href: "/resources#software",
      },
      {
        label: "Game Strategy",
        desc: "Scouting tools, match analysis resources, and competitive strategy.",
        href: "/resources#game-strategy",
      },
    ],
  },
  {
    label: "Sponsorship",
    href: "/sponsorship",
    items: [
      {
        label: "How to get sponsors",
        desc: "Practical advice for reaching out to companies and organizations.",
        href: "/sponsorship#how-to",
      },
      {
        label: "Grants & discounts",
        desc: "Wisconsin grants, vendor discounts, and corporate programs.",
        href: "/sponsorship#grants",
      },
      {
        label: "Sponsorship letter",
        desc: "A draft letter you can adapt for your team.",
        href: "/sponsorship#letter",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Hydrate theme from localStorage
  useEffect(() => {
    const t = localStorage.getItem("ftcw-theme");
    setTheme(t === "light" ? "light" : "dark");
  }, []);

  // Close all menus on route change
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // ⌘K / Ctrl+K — global palette toggle
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

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("ftcw-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function toggleMobileSection(label: string) {
    setMobileExpanded((prev) => (prev === label ? null : label));
  }

  return (
    <>
      <header
        ref={rootRef}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className="relative flex w-full max-w-6xl items-center justify-between rounded-full border px-2.5 py-2 backdrop-blur-xl transition-colors"
          style={{
            background: "var(--surface-glass)",
            borderColor: "var(--border)",
            boxShadow:
              "0 1px 0 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset, 0 12px 32px -16px rgba(0,0,0,0.35)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center pl-1 pr-3">
            <WiresLogo size={28} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const isMenu = "items" in item;
              const isOpen = isMenu && open === item.label;
              const active = isActive(item.href);
              return (
                <li key={item.label} className="relative">
                  {isMenu ? (
                    <span className="flex items-center">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 rounded-full py-1.5 pl-3.5 pr-1 text-[13px] transition-colors hover:text-foreground"
                        style={{
                          color: active ? "var(--foreground)" : "var(--muted)",
                        }}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setOpen(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-label={`Open ${item.label} menu`}
                        className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-foreground"
                        style={
                          isOpen
                            ? {
                                background:
                                  "color-mix(in oklab, var(--foreground) 6%, transparent)",
                                color: "var(--foreground)",
                              }
                            : undefined
                        }
                      >
                        <Chevron
                          className={`h-3 w-3 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-block rounded-full px-3.5 py-1.5 text-[13px] transition-colors hover:text-foreground"
                      style={{
                        color: active ? "var(--foreground)" : "var(--muted)",
                      }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {isMenu && (
                    <div
                      className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 transition-all duration-200 ${
                        isOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      }`}
                    >
                      <DropdownPanel items={item.items} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            {/* Search — desktop pill */}
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Search"
              className="hidden items-center gap-2 rounded-full border px-3 py-2 text-[13px] text-muted transition-colors hover:text-foreground sm:inline-flex"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 3%, transparent)",
              }}
            >
              <SearchIcon className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd
                className="rounded border px-1 py-0.5 text-[10px] font-mono"
                style={{ borderColor: "var(--border-strong)" }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Search — mobile icon */}
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Search"
              className="grid h-9 w-9 place-items-center rounded-full border text-muted transition-colors hover:text-foreground sm:hidden"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 3%, transparent)",
              }}
            >
              <SearchIcon className="h-4 w-4" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border text-muted transition-colors hover:text-foreground"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 3%, transparent)",
              }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Register */}
            <Link
              href="/register"
              className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all sm:inline-flex"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              Register
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border text-muted lg:hidden"
              style={{ borderColor: "var(--border)" }}
            >
              {mobileOpen ? (
                <Close className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile panel */}
        <div
          className={`fixed inset-x-4 top-20 z-40 origin-top rounded-3xl border p-4 backdrop-blur-xl transition-all duration-200 lg:hidden ${
            mobileOpen
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
          style={{
            background: "var(--surface-glass)",
            borderColor: "var(--border)",
            boxShadow: "0 20px 50px -20px rgba(0,0,0,0.4)",
          }}
        >
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const isMenu = "items" in item;
              const isExpanded = isMenu && mobileExpanded === item.label;
              return (
                <li
                  key={item.label}
                  style={{ borderBottom: "1px solid var(--hairline)" }}
                >
                  {isMenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileSection(item.label)}
                        className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
                      >
                        {item.label}
                        <Chevron
                          className={`h-3 w-3 text-subtle transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <ul
                        className={`overflow-hidden transition-all duration-200 ${
                          isExpanded
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.items.map((s) => (
                          <li key={s.label}>
                            <Link
                              href={s.href}
                              className="block rounded-xl px-4 py-2.5 text-sm text-muted hover:bg-foreground/5 hover:text-foreground"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 text-sm font-medium text-foreground hover:bg-foreground/5"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            Join the network
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

function DropdownPanel({ items }: { items: SubItem[] }) {
  const wide = items.length > 4;
  return (
    <div
      className={`rounded-3xl border p-2 backdrop-blur-xl ${
        wide ? "w-[640px]" : "w-[420px]"
      }`}
      style={{
        background: "var(--surface-glass)",
        borderColor: "var(--border)",
        boxShadow: "0 24px 60px -24px rgba(0,0,0,0.5)",
      }}
    >
      <ul className={`grid gap-0.5 ${wide ? "grid-cols-2" : "grid-cols-1"}`}>
        {items.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              className="group flex flex-col gap-0.5 rounded-2xl px-3.5 py-3 transition-colors hover:bg-foreground/5"
            >
              <span className="text-[13px] font-medium text-foreground">
                {s.label}
              </span>
              <span className="text-[12px] leading-snug text-muted">
                {s.desc}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Icons (unchanged from original) ---- */

function Chevron({ className = "" }: { className?: string }) {
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
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function Sun({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </svg>
  );
}

function Moon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

function Menu({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M3 5h10M3 11h10" />
    </svg>
  );
}

function Close({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. Common issues:
- "Cannot find module './_lib/CommandPalette'" — check the file is at `app/_lib/CommandPalette.tsx`
- "Property 'items' does not exist" — the `"items" in item` narrowing should resolve this; ensure `NavItem` union type is as written above

- [ ] **Step 3: Run the dev server and manually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Logo links to `/`; bar shows: Software Platform ▾ | Resources ▾ | Sponsorship ▾ | Contact
- [ ] No grayed-out disabled links anywhere in the bar
- [ ] Software Platform dropdown opens on chevron click; all 5 sub-items visible; header link navigates to `/software-platform`
- [ ] Resources and Sponsorship dropdowns still work exactly as before
- [ ] Theme toggle and Register button still work
- [ ] Resize to mobile (`< 1024px`): hamburger appears; search icon (no label) appears; desktop pills hidden
- [ ] Mobile panel opens; tapping "Software Platform" expands its sub-items; tapping again collapses
- [ ] Only one section can be expanded at a time (tapping Resources while Software Platform is open should close Software Platform)
- [ ] ⌘K (Mac) or Ctrl+K (Windows/Linux) opens the search palette
- [ ] Search button (desktop pill) opens the palette
- [ ] Typing in the palette filters results; ↑/↓ moves highlight; Enter navigates; Esc closes
- [ ] Clicking the backdrop closes the palette
- [ ] Background does not scroll while palette is open

- [ ] **Step 4: Commit**

```bash
git add app/navbar.tsx
git commit -m "feat: declutter navbar, add accordion mobile, wire command palette"
```

---

## Task 5: Build + lint verification

**Files:** None changed

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no errors or warnings. The most likely lint issue is the `@next/next/no-img-element` rule — we don't add any new `<img>` tags so this shouldn't appear. If ESLint flags unused variables, check the `NavItem` type and `DropdownPanel` function are still referenced.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected output ends with:
```
✓ Compiled successfully
Route (app) ...
```

All pages should compile. If you see a type error about `CommandPalette` props — verify that `open` and `onClose` prop types match between the component definition and the usage in `navbar.tsx`.

- [ ] **Step 3: Final commit (if any lint fixes were needed)**

If you made any changes to fix lint/build errors:
```bash
git add -p
git commit -m "fix: lint and build errors after navbar refactor"
```

If no changes were needed, skip this step.

---

## Self-Review Checklist

Run through this mentally before marking the plan done:

- [ ] `SearchIcon` is exported from `ui.tsx` and imported in both `CommandPalette.tsx` and `navbar.tsx`
- [ ] `SEARCH_INDEX` and `SearchEntry` are imported in `CommandPalette.tsx` from `./search-index` (relative, same `_lib/` directory)
- [ ] `CommandPalette` is imported in `navbar.tsx` from `./_lib/CommandPalette` (note: navbar is in `app/`, so the path is `./_lib/` not `../_lib/`)
- [ ] `filterEntries` returns `SEARCH_INDEX` (not empty array) when query is blank
- [ ] `flatIndex` is declared with `let` inside the render body (before `Array.from(grouped.entries()).map(...)`) so it resets each render
- [ ] The ⌘K listener is attached to `document` (not `window`) for consistency with the existing click-outside listener
- [ ] `document.body.style.overflow = ""` cleanup runs in both the effect cleanup and whenever `open` becomes false
- [ ] `mobileExpanded` resets to `null` in the `pathname` effect (so accordion is closed when navigating to a new page)
- [ ] No hex colors used anywhere in the new code — all via CSS var tokens or `color-mix(...)` expressions

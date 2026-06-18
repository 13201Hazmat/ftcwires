"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WiresLogo, ArrowRight } from "./_lib/ui";

type SubItem = { label: string; desc: string; href: string };
type NavItem =
  | { label: string; href: string; disabled?: boolean }
  | { label: string; href: string; items: SubItem[]; disabled?: boolean };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Software Platform", href: "/software-platform" },
  { label: "Parts Lending Network", href: "#", disabled: true },
  {
    label: "Resources",
    href: "/resources",
    items: 
    [
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
        desc: "Scouting tools, match analysis resources, and competitive strategy guides.",
        href: "/resources#game-strategy",
      },
    ]
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
  { label: "Outreach", href: "#", disabled: true },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const t = localStorage.getItem("ftcw-theme");
    setTheme(t === "light" ? "light" : "dark");
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

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

  return (
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
        <Link href="/" className="flex items-center pl-1 pr-3">
          <WiresLogo size={28} />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            const isMenu = "items" in item;
            const isOpen = isMenu && open === item.label;
            const active = isActive(item.href);
            return (
              <li key={item.label} className="relative">
                {item.disabled ? (
                  <span
                    className="inline-block rounded-full px-3.5 py-1.5 text-[13px] cursor-not-allowed opacity-35 select-none"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </span>
                ) : isMenu ? (
                  <span className="flex items-center">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 rounded-full py-1.5 pl-3.5 pr-1 text-[13px] transition-colors hover:text-foreground"
                      style={{
                        color: active
                          ? "var(--foreground)"
                          : "var(--muted)",
                      }}
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() =>
                        setOpen(isOpen ? null : item.label)
                      }
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
                      color: active
                        ? "var(--foreground)"
                        : "var(--muted)",
                    }}
                  >
                    {item.label}
                  </Link>
                )}

                {!item.disabled && isMenu && (
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

        <div className="flex items-center gap-1.5">
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
          {NAV.filter((item) => !item.disabled).map((item) =>
            "items" in item ? (
              <li key={item.label} className="py-1">
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-[11px] font-medium uppercase tracking-widest text-subtle"
                >
                  {item.label}
                </Link>
                <ul>
                  {item.items.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="block rounded-xl px-3 py-2 text-sm text-foreground hover:bg-foreground/5"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-foreground/5"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
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

/* ---- local icons ---- */

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

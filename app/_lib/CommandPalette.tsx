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

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  let flatIndex = 0;

  return (
    <div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

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

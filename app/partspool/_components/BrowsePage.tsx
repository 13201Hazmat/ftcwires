"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CATEGORIES, CONDITIONS, LISTING_TYPES, driveImageUrl } from "./constants";
import AccountBadge from "./AccountBadge";
import type { Listing } from "../../_lib/partspool-data";

export default function BrowsePage({ listings }: { listings: Listing[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<"newest" | "az">("newest");

  const filtered = useMemo(() => {
    let result = listings;
    if (activeCategory !== "All") {
      result = result.filter((l) => l.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          l.team_number.includes(q) ||
          l.team_name.toLowerCase().includes(q)
      );
    }
    if (sort === "az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [listings, search, activeCategory, sort]);

  return (
    <div className="min-h-screen px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">PartsPool</h1>
            <p className="mt-1 text-sm text-muted">
              Browse parts shared by FTC teams across Wisconsin
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/partspool/my-listings"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium text-muted transition-colors hover:text-foreground"
              style={{ borderColor: "var(--border)" }}
            >
              My Listings
            </Link>
            <Link
              href="/partspool/requests"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium text-muted transition-colors hover:text-foreground"
              style={{ borderColor: "var(--border)" }}
            >
              Requests
            </Link>
            <Link
              href="/partspool/add"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              <PlusIcon />
              Add Part
            </Link>
            <AccountBadge />
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-6">
          <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search parts, categories, team numbers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-foreground"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--foreground) 3%, transparent)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Category chips + sort */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: activeCategory === cat ? "var(--foreground)" : "var(--border)",
                  background:
                    activeCategory === cat
                      ? "var(--foreground)"
                      : "color-mix(in oklab, var(--foreground) 3%, transparent)",
                  color: activeCategory === cat ? "var(--background)" : "var(--muted)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "az")}
            className="rounded-xl border px-3 py-1.5 text-xs outline-none"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: "var(--foreground)",
            }}
          >
            <option value="newest">Newest</option>
            <option value="az">A–Z</option>
          </select>
        </div>

        {/* Count */}
        <p className="mt-4 text-xs text-subtle">
          {filtered.length} {filtered.length === 1 ? "part" : "parts"} available
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState hasFilters={search !== "" || activeCategory !== "All"} />
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((listing) => (
              <PartCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PartCard({ listing }: { listing: Listing }) {
  const imgUrl = driveImageUrl(listing.photo_url, 600);
  const isDonation = listing.listing_type === "donation";

  return (
    <Link
      href={`/partspool/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Photo */}
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{ background: "color-mix(in oklab, var(--foreground) 5%, transparent)" }}
      >
        {imgUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgUrl}
            alt={listing.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BoxIcon className="h-10 w-10 text-subtle" />
          </div>
        )}
        {/* Category chip */}
        <span
          className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm"
          style={{
            background: "color-mix(in oklab, var(--background) 70%, transparent)",
            color: "var(--foreground)",
          }}
        >
          {listing.category}
        </span>
        {/* Listing type badge */}
        <span
          className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm"
          style={{
            background: isDonation
              ? "color-mix(in oklab, #22c55e 85%, transparent)"
              : "color-mix(in oklab, #3b82f6 85%, transparent)",
            color: "#fff",
          }}
        >
          {LISTING_TYPES[listing.listing_type]}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 text-sm font-medium leading-snug">{listing.title}</p>
        <p className="mt-auto pt-2 text-[11px] text-muted">
          Team {listing.team_number} · {CONDITIONS[listing.condition] ?? listing.condition} · Qty {listing.quantity}
        </p>
      </div>
    </Link>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="mt-16 flex flex-col items-center gap-3 text-center">
      <BoxIcon className="h-12 w-12 text-subtle" />
      <p className="text-base font-medium">No parts found</p>
      <p className="text-sm text-muted">
        {hasFilters ? "Try a different search or category." : "Be the first to list a part!"}
      </p>
      {!hasFilters && (
        <Link
          href="/partspool/add"
          className="mt-2 inline-flex h-9 items-center gap-2 rounded-full px-5 text-sm font-medium"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          Add a Part
        </Link>
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="6.5" cy="6.5" r="4" />
      <path d="M11 11l3 3" />
    </svg>
  );
}

function BoxIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M12 3v18M3 8l9 5 9-5" />
    </svg>
  );
}

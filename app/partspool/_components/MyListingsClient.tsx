"use client";

import { useState } from "react";
import { CONDITIONS, driveImageUrl } from "./constants";
import type { Listing } from "../../_lib/partspool-data";

export default function MyListingsClient({ listings: initial }: { listings: Listing[] }) {
  const [listings, setListings] = useState(initial);

  async function toggleActive(id: string, current: boolean) {
    const res = await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !current }),
    });
    if (res.ok) {
      setListings((prev) => prev.map((l) => (l.id === id ? { ...l, is_active: !current } : l)));
    }
  }

  async function deleteListing(id: string) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    const res = await fetch(`/api/listings/${id}`, { method: "DELETE" });
    if (res.ok) {
      setListings((prev) => prev.filter((l) => l.id !== id));
    }
  }

  if (listings.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-muted">No listings yet.</p>
        <a
          href="/partspool/add"
          className="mt-4 inline-flex h-9 items-center gap-2 rounded-full px-5 text-sm font-medium"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          Add your first part
        </a>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {listings.map((listing) => {
        const thumb = driveImageUrl(listing.photo_url, 200);
        return (
          <div
            key={listing.id}
            className="flex items-center gap-4 rounded-2xl border p-4"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="h-14 w-14 flex-none overflow-hidden rounded-xl" style={{ background: "color-mix(in oklab, var(--foreground) 5%, transparent)" }}>
              {thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumb} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{listing.title}</p>
              <p className="text-xs text-muted">
                {listing.category} · {CONDITIONS[listing.condition] ?? listing.condition} · Qty {listing.quantity}
              </p>
              <span
                className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  background: listing.is_active
                    ? "color-mix(in oklab, #22c55e 15%, transparent)"
                    : "color-mix(in oklab, var(--foreground) 8%, transparent)",
                  color: listing.is_active ? "#22c55e" : "var(--muted)",
                }}
              >
                {listing.is_active ? "Active" : "Paused"}
              </span>
            </div>

            <div className="flex flex-none items-center gap-2">
              <a
                href={`/partspool/${listing.id}`}
                className="rounded-lg border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                View
              </a>
              <button
                onClick={() => toggleActive(listing.id, listing.is_active)}
                className="rounded-lg border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                {listing.is_active ? "Pause" : "Activate"}
              </button>
              <button
                onClick={() => deleteListing(listing.id)}
                className="rounded-lg border px-3 py-1.5 text-xs text-red-500 transition-colors hover:border-red-500"
                style={{ borderColor: "var(--border)" }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

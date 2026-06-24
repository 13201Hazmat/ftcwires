"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CATEGORIES, CONDITIONS, driveImageUrl } from "../_components/constants";

export default function AddListingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("");
  const [listingType, setListingType] = useState<"lend_for_exchange" | "donation">("donation");
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [partLink, setPartLink] = useState("");
  const [notes, setNotes] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preview = driveImageUrl(photoUrl, 600);

  // Not signed in — redirect to login
  if (status === "unauthenticated") {
    return router.push("/partspool/login?next=/partspool/add");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!photoUrl.trim()) { setError("A photo link is required."); return; }
    if (!condition) { setError("Please select a condition."); return; }

    setLoading(true);
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        quantity,
        condition,
        listing_type: listingType,
        photo_url: photoUrl,
        description,
        manufacturer,
        part_number: partNumber,
        part_link: partLink,
        notes,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (res.status === 403) {
        router.push("/partspool/onboarding?next=/partspool/add");
        return;
      }
      setError(data.error ?? "Failed to publish listing.");
      setLoading(false);
      return;
    }

    const { listing } = await res.json();
    router.push(`/partspool/${listing.id}`);
  }

  return (
    <div className="min-h-screen px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-xl">
        <a href="/partspool" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors">
          <ChevronLeft /> Back to PartsPool
        </a>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Add a Part</h1>
        <p className="mt-1.5 text-sm text-muted">
          List a part you&rsquo;re willing to lend or give away to another FTC team.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          {/* Listing type */}
          <div>
            <Label>Listing Type *</Label>
            <div className="grid grid-cols-2 gap-3">
              <TypeOption
                active={listingType === "donation"}
                onClick={() => setListingType("donation")}
                title="Donation"
                desc="They can keep it"
                color="#22c55e"
              />
              <TypeOption
                active={listingType === "lend_for_exchange"}
                onClick={() => setListingType("lend_for_exchange")}
                title="Exchange"
                desc="Want a part back"
                color="#3b82f6"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <Label>Photo Link *</Label>
            <input
              type="url"
              required
              placeholder="Paste a Google Drive share link"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="field"
            />
            <p className="mt-1.5 text-xs text-subtle">
              Upload your photo to Google Drive → Share → set to &ldquo;Anyone with the link&rdquo; → copy &amp; paste here.
            </p>
            {preview && (
              <div className="mt-3 h-40 w-40 overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Preview" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          {/* Part Name */}
          <div>
            <Label>Part Name *</Label>
            <input
              type="text"
              required
              placeholder="e.g. goBILDA 5202 Series Motor"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="field">
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Quantity + Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Quantity *</Label>
              <input type="number" required min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="field" />
            </div>
            <div>
              <Label>Condition *</Label>
              <select required value={condition} onChange={(e) => setCondition(e.target.value)} className="field">
                <option value="">Select…</option>
                {Object.entries(CONDITIONS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <textarea
              rows={3}
              placeholder="Describe the part, its history, or any relevant details…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field resize-none"
            />
          </div>

          {/* Part Link */}
          <div>
            <Label>Part Link</Label>
            <input type="url" placeholder="Link to product page or more info" value={partLink} onChange={(e) => setPartLink(e.target.value)} className="field" />
          </div>

          {/* More details */}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
            {showMore ? "Hide" : "Show"} more details
          </button>

          {showMore && (
            <div className="flex flex-col gap-4">
              <div>
                <Label>Manufacturer</Label>
                <input type="text" placeholder="e.g. goBILDA" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="field" />
              </div>
              <div>
                <Label>Part Number</Label>
                <input type="text" placeholder="e.g. 5202-2402-0019" value={partNumber} onChange={(e) => setPartNumber(e.target.value)} className="field" />
              </div>
              <div>
                <Label>Notes</Label>
                <textarea rows={2} placeholder="Any notes for the requesting team…" value={notes} onChange={(e) => setNotes(e.target.value)} className="field resize-none" />
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || status === "loading"}
            className="flex h-12 w-full items-center justify-center rounded-full text-sm font-medium transition-opacity disabled:opacity-50 hover:opacity-80"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            {loading ? "Publishing…" : "Publish Listing"}
          </button>
        </form>
      </div>

      <style>{`
        .field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: color-mix(in oklab, var(--foreground) 3%, transparent);
          color: var(--foreground);
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
        }
        .field::placeholder { color: var(--subtle); }
        .field:focus { border-color: var(--foreground); }
        select.field {
          appearance: auto;
          background-color: #000;
          color: #fff;
          color-scheme: light;
        }
        select.field option {
          background-color: #000;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

function TypeOption({
  active,
  onClick,
  title,
  desc,
  color,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-0.5 rounded-2xl border p-4 text-left transition-all"
      style={{
        borderColor: active ? color : "var(--border)",
        background: active ? `color-mix(in oklab, ${color} 10%, transparent)` : "var(--surface)",
      }}
    >
      <span className="text-sm font-semibold" style={{ color: active ? color : "var(--foreground)" }}>
        {title}
      </span>
      <span className="text-xs text-muted">{desc}</span>
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">{children}</label>;
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M10 12L6 8l4-4" />
    </svg>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

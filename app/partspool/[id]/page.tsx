import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../../_lib/auth";
import { getListingById } from "../../_lib/partspool-data";
import { CONDITIONS, LISTING_TYPES, driveImageUrl } from "../_components/constants";
import RequestButton from "../_components/RequestButton";

export const dynamic = "force-dynamic";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing || !listing.is_active) notFound();

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.email === listing.user_email;
  const imgUrl = driveImageUrl(listing.photo_url, 1200);
  const isDonation = listing.listing_type === "donation";

  return (
    <div className="min-h-screen px-4 pb-24 pt-28 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <a href="/partspool" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors">
          <ChevronLeft /> Back to PartsPool
        </a>

        <div className="mt-4 grid gap-10 lg:grid-cols-2">
          {/* Photo */}
          <div>
            {imgUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgUrl}
                alt={listing.title}
                referrerPolicy="no-referrer"
                className="aspect-square w-full rounded-3xl object-cover"
                style={{ background: "var(--surface)" }}
              />
            ) : (
              <div
                className="flex aspect-square w-full items-center justify-center rounded-3xl border"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <span className="text-sm text-muted">No photo</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-block rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                  style={{ borderColor: "var(--border)" }}
                >
                  {listing.category}
                </span>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{
                    background: isDonation
                      ? "color-mix(in oklab, #22c55e 18%, transparent)"
                      : "color-mix(in oklab, #3b82f6 18%, transparent)",
                    color: isDonation ? "#22c55e" : "#3b82f6",
                  }}
                >
                  {LISTING_TYPES[listing.listing_type]}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight leading-tight">
                {listing.title}
              </h1>
              <p className="mt-2 text-sm text-muted">
                {isDonation
                  ? "Offered as a donation — no return expected."
                  : "Offered for exchange — the lending team would like a part in return."}
              </p>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              <MetaChip label="Condition" value={CONDITIONS[listing.condition] ?? listing.condition} />
              <MetaChip label="Quantity" value={String(listing.quantity)} />
              <MetaChip label="Team" value={`#${listing.team_number}`} />
              {listing.location && <MetaChip label="Location" value={listing.location} />}
            </div>

            {listing.description && (
              <div>
                <h2 className="text-xs font-medium uppercase tracking-widest text-muted mb-2">Description</h2>
                <p className="text-sm leading-relaxed text-foreground/80">{listing.description}</p>
              </div>
            )}

            {(listing.manufacturer || listing.part_number || listing.part_link || listing.notes) && (
              <div className="rounded-2xl border p-4 flex flex-col gap-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                {listing.manufacturer && <Detail label="Manufacturer" value={listing.manufacturer} />}
                {listing.part_number && <Detail label="Part Number" value={listing.part_number} />}
                {listing.part_link && (
                  <a href={listing.part_link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-500 hover:underline">
                    View Product →
                  </a>
                )}
                {listing.notes && <Detail label="Notes" value={listing.notes} />}
              </div>
            )}

            <RequestButton
              listingId={listing.id}
              isOwner={isOwner}
              isLoggedIn={!!session?.user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border px-3 py-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="text-[10px] uppercase tracking-widest text-subtle">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xs font-medium text-right">{value}</span>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M10 12L6 8l4-4" />
    </svg>
  );
}

"use client";

import { useState } from "react";
import type { RequestRecord } from "../../_lib/partspool-data";

type Tab = "incoming" | "outgoing";

export default function RequestsClient({
  incoming: initialIncoming,
  outgoing,
}: {
  incoming: RequestRecord[];
  outgoing: RequestRecord[];
}) {
  const [tab, setTab] = useState<Tab>("incoming");
  const [incoming, setIncoming] = useState(initialIncoming);

  async function updateStatus(id: string, status: "accepted" | "declined") {
    const res = await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setIncoming((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  }

  const list = tab === "incoming" ? incoming : outgoing;

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-2xl border p-1" style={{ borderColor: "var(--border)", background: "var(--surface)", width: "fit-content" }}>
        {(["incoming", "outgoing"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors"
            style={{
              background: tab === t ? "var(--foreground)" : "transparent",
              color: tab === t ? "var(--background)" : "var(--muted)",
            }}
          >
            {t} ({t === "incoming" ? incoming.length : outgoing.length})
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted">No {tab} requests yet.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {list.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              isIncoming={tab === "incoming"}
              onAccept={() => updateStatus(req.id, "accepted")}
              onDecline={() => updateStatus(req.id, "declined")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RequestCard({
  request,
  isIncoming,
  onAccept,
  onDecline,
}: {
  request: RequestRecord;
  isIncoming: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const statusColor: Record<string, string> = {
    pending: "#f59e0b",
    accepted: "#22c55e",
    declined: "#ef4444",
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a href={`/partspool/${request.listing_id}`} className="text-sm font-medium hover:underline truncate block">
            {request.listing_title || "Listing"}
          </a>
          <p className="mt-0.5 text-xs text-muted">
            {isIncoming
              ? `From Team #${request.requester_team_number}`
              : `Your request`}
          </p>
        </div>
        <span
          className="flex-none rounded-full px-2.5 py-1 text-[10px] font-medium capitalize"
          style={{
            background: `color-mix(in oklab, ${statusColor[request.status] ?? "var(--muted)"} 15%, transparent)`,
            color: statusColor[request.status] ?? "var(--muted)",
          }}
        >
          {request.status}
        </span>
      </div>

      {request.message && (
        <p className="rounded-xl border p-3 text-xs leading-relaxed text-muted" style={{ borderColor: "var(--border)" }}>
          &ldquo;{request.message}&rdquo;
        </p>
      )}

      {/* Contact reveal on accept */}
      {request.status === "accepted" && (
        <div className="rounded-xl border p-3 text-xs" style={{ borderColor: "color-mix(in oklab, #22c55e 30%, transparent)" }}>
          <span className="text-muted">Contact: </span>
          <a
            href={`mailto:${isIncoming ? request.requester_email : request.lender_email}`}
            className="font-medium text-foreground hover:underline"
          >
            {isIncoming ? request.requester_email : request.lender_email}
          </a>
          <p className="mt-1 text-muted">Reach out to coordinate the exchange.</p>
        </div>
      )}

      {isIncoming && request.status === "pending" && (
        <div className="flex gap-2">
          <button
            onClick={onDecline}
            className="flex-1 rounded-full border py-2 text-xs text-muted transition-colors hover:text-foreground"
            style={{ borderColor: "var(--border)" }}
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="flex-1 rounded-full py-2 text-xs font-medium"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Accept
          </button>
        </div>
      )}

      <p className="text-[11px] text-subtle">{new Date(request.created_at).toLocaleDateString()}</p>
    </div>
  );
}

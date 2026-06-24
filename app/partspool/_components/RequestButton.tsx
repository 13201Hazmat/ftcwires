"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RequestButton({
  listingId,
  isOwner,
  isLoggedIn,
}: {
  listingId: string;
  isOwner: boolean;
  isLoggedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isOwner) {
    return (
      <a
        href="/partspool/my-listings"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium text-muted transition-colors hover:text-foreground"
        style={{ borderColor: "var(--border)" }}
      >
        This is your listing — Manage
      </a>
    );
  }

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
        style={{ background: "var(--foreground)", color: "var(--background)" }}
      >
        <GoogleIcon /> Sign in to Request Part
      </button>
    );
  }

  if (sent) {
    return (
      <div
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium"
        style={{ background: "color-mix(in oklab, #22c55e 12%, transparent)", color: "#22c55e" }}
      >
        <CheckIcon /> Request Sent!
      </div>
    );
  }

  async function handleRequest() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing_id: listingId, message }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (res.status === 403) {
        window.location.href = "/partspool/onboarding?next=" + encodeURIComponent(window.location.pathname);
        return;
      }
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    setSent(true);
    setOpen(false);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex h-12 w-full items-center justify-center rounded-full text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          Request Part
        </button>
      ) : (
        <div
          className="flex flex-col gap-3 rounded-2xl border p-4"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <p className="text-sm font-medium">Send a request</p>
          <textarea
            rows={3}
            placeholder="Optional message — what you need it for, what you can offer in return…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border p-3 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--foreground) 3%, transparent)",
              color: "var(--foreground)",
            }}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border py-2.5 text-sm"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              Cancel
            </button>
            <button
              onClick={handleRequest}
              disabled={loading}
              className="flex-1 rounded-full py-2.5 text-sm font-medium disabled:opacity-50"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              {loading ? "Sending…" : "Send Request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0012 1 11 11 0 002.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z" />
    </svg>
  );
}

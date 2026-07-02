"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AccountBadge() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (status === "loading") {
    return (
      <div
        className="h-10 w-10 animate-pulse rounded-full"
        style={{ background: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}
      />
    );
  }

  if (status !== "authenticated") {
    return (
      <Link
        href="/partspool/login"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium text-muted transition-colors hover:text-foreground"
        style={{ borderColor: "var(--border)" }}
      >
        Sign in
      </Link>
    );
  }

  const name = session.user?.name ?? session.user?.email ?? "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border transition-colors hover:border-foreground"
        style={{ borderColor: "var(--border)" }}
      >
        {session.user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt={name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="grid h-full w-full place-items-center text-sm font-medium"
            style={{ background: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}
          >
            {initial}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-2xl border p-1.5 backdrop-blur-xl"
          style={{
            background: "var(--surface-glass)",
            borderColor: "var(--border)",
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.5)",
          }}
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-medium text-foreground">{name}</p>
            {session.user?.teamNumber && (
              <p className="text-xs text-muted">Team {session.user.teamNumber}</p>
            )}
          </div>
          <div style={{ borderTop: "1px solid var(--hairline)" }} className="my-1" />
          <button
            onClick={() => signOut({ callbackUrl: "/partspool" })}
            className="block w-full rounded-xl px-3 py-2 text-left text-sm text-muted hover:bg-foreground/5 hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

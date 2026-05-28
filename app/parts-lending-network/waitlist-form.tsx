"use client";

import { useState } from "react";
import { ArrowRight, CheckIcon } from "../_lib/ui";

export default function WaitlistForm() {
  const [team, setTeam] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // No backend yet — capture intent locally so the UX feels real.
    try {
      const key = "ftcw-waitlist";
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push({ team, email, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {}
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-2xl border px-6 py-8 text-center"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
        }}
      >
        <span
          className="grid h-10 w-10 place-items-center rounded-full"
          style={{
            background:
              "color-mix(in oklab, var(--foreground) 8%, transparent)",
          }}
        >
          <CheckIcon className="h-5 w-5 text-foreground" />
        </span>
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          You&rsquo;re on the list.
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          We&rsquo;ll email <span className="text-foreground">{email}</span>{" "}
          when early access opens.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border p-2 backdrop-blur-sm"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in oklab, var(--foreground) 3%, transparent)",
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          inputMode="numeric"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="Team #"
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle focus:border-foreground/30 sm:w-32"
          style={{ borderColor: "var(--border)" }}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@team.org"
          className="flex-1 rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle focus:border-foreground/30"
          style={{ borderColor: "var(--border)" }}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "var(--foreground)",
            color: "var(--background)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.08) inset, 0 12px 28px -10px rgba(0,0,0,0.5)",
          }}
        >
          Get early access
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="px-2 pb-1 pt-2 text-[11px] text-subtle">
        We&rsquo;ll only email about Parts Lending Network launch updates. No
        spam.
      </p>
    </form>
  );
}

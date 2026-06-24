"use client";

import { useState } from "react";
import { ArrowRight, CheckIcon } from "../_lib/ui";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSdyDzmv6d0eZwyLC0Qg_ix_XZDBTBqdmHrPxi7nkFHH7l6xrA/formResponse";

const ENTRY_TEAM_NUMBER = "entry.617832245";
const ENTRY_TEAM_NAME   = "entry.1890702100";
const ENTRY_LOCATION    = "entry.50776734";
const ENTRY_EMAILS      = "entry.1356349942";

export default function RegisterForm() {
  const [teamNumber, setTeamNumber] = useState("");
  const [teamName,   setTeamName]   = useState("");
  const [location,   setLocation]   = useState("");
  const [emails,     setEmails]     = useState("");
  const [submitted,  setSubmitted]  = useState(false);
  const [loading,    setLoading]    = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!teamNumber || !teamName || !location || !emails) return;
    setLoading(true);

    try {
      await fetch(FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          [ENTRY_TEAM_NUMBER]: teamNumber,
          [ENTRY_TEAM_NAME]:   teamName,
          [ENTRY_LOCATION]:    location,
          [ENTRY_EMAILS]:      emails,
        }).toString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span
          className="grid h-12 w-12 place-items-center rounded-full"
          style={{
            background:
              "color-mix(in oklab, var(--foreground) 8%, transparent)",
          }}
        >
          <CheckIcon className="h-6 w-6 text-foreground" />
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          You&rsquo;re registered.
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          We&rsquo;ll send access info and updates to{" "}
          <span className="text-foreground">{emails}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">

      {/* Team number */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="teamNumber"
          className="text-[12.5px] font-medium uppercase tracking-widest text-muted"
        >
          Team number <span className="text-foreground">*</span>
        </label>
        <input
          id="teamNumber"
          type="text"
          inputMode="numeric"
          required
          value={teamNumber}
          onChange={(e) => setTeamNumber(e.target.value)}
          placeholder="13201"
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle transition-colors focus:border-foreground/40"
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      {/* Team name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="teamName"
          className="text-[12.5px] font-medium uppercase tracking-widest text-muted"
        >
          Team name <span className="text-foreground">*</span>
        </label>
        <input
          id="teamName"
          type="text"
          required
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Hazmat"
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle transition-colors focus:border-foreground/40"
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="location"
          className="text-[12.5px] font-medium uppercase tracking-widest text-muted"
        >
          Location <span className="text-foreground">*</span>
        </label>
        <input
          id="location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Elmbrook , WI, USA"
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle transition-colors focus:border-foreground/40"
          style={{ borderColor: "var(--border)" }}
        />
        <p className="text-[11.5px] text-subtle">City, state, and country</p>
      </div>

      {/* Emails */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="emails"
          className="text-[12.5px] font-medium uppercase tracking-widest text-muted"
        >
          Email(s) <span className="text-foreground">*</span>
        </label>
        <input
          id="emails"
          type="text"
          required
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder="you@team.org, mentor@team.org"
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-subtle transition-colors focus:border-foreground/40"
          style={{ borderColor: "var(--border)" }}
        />
        <p className="text-[11.5px] text-subtle">
          Separate multiple emails with a comma
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: "var(--hairline)" }} />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "var(--foreground)",
          color: "var(--background)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.08) inset, 0 12px 28px -10px rgba(0,0,0,0.5)",
        }}
      >
        {loading ? "Submitting…" : "Register your team"}
        {!loading && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-[11.5px] text-subtle">
        All fields required. Your info is only used to manage access.
      </p>
    </form>
  );
}

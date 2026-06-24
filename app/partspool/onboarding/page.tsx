"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingInner />
    </Suspense>
  );
}

function OnboardingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/partspool";
  const { data: session, status, update } = useSession();

  const [teamNumber, setTeamNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already onboarded, skip
  useEffect(() => {
    if (status === "authenticated" && session.user.teamNumber) {
      router.replace(next);
    }
  }, [status, session, next, router]);

  if (status === "unauthenticated") {
    return (
      <Centered>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in first</h1>
        <button
          onClick={() => signIn("google")}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          Sign in with Google
        </button>
      </Centered>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!teamNumber.trim()) { setError("Team number is required."); return; }
    setLoading(true);
    setError(null);

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_number: teamNumber, team_name: teamName, location }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    const data = await res.json();
    // Refresh the session token with team info
    await update({
      teamNumber: data.team_number,
      teamName: data.team_name,
      location: data.location,
    });
    router.push(next);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-20">
      <div
        className="w-full max-w-md rounded-3xl border p-8"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Set up your team</h1>
        <p className="mt-2 text-sm text-muted">
          Tell us your FTC team number so others know who&rsquo;s sharing parts.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <Field label="Team Number *" placeholder="e.g. 13201" value={teamNumber} onChange={setTeamNumber} required />
          <Field label="Team Name" placeholder="e.g. Hazmat" value={teamName} onChange={setTeamName} />
          <Field label="Location" placeholder="e.g. Elmbrook, WI" value={location} onChange={setLocation} />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-11 items-center justify-center rounded-full text-sm font-medium disabled:opacity-50"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            {loading ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>

      <style>{`
        .ob-field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: color-mix(in oklab, var(--foreground) 3%, transparent);
          color: var(--foreground);
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
        }
        .ob-field::placeholder { color: var(--subtle); }
        .ob-field:focus { border-color: var(--foreground); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </label>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ob-field"
      />
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center pt-20">
      {children}
    </div>
  );
}

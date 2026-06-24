"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/partspool";
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (!session.user.teamNumber) {
        router.replace(`/partspool/onboarding?next=${encodeURIComponent(next)}`);
      } else {
        router.replace(next);
      }
    }
  }, [status, session, next, router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-20">
      <div
        className="w-full max-w-md rounded-3xl border p-8 text-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to PartsPool</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in with your Google account to list parts and send requests.
        </p>
        <button
          onClick={() => signIn("google")}
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          <GoogleIcon /> Continue with Google
        </button>
        <p className="mt-6 text-xs text-subtle">
          You can browse parts without signing in.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 010-4.2V7.06H2.18a11 11 0 000 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0012 1 11 11 0 002.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75z" />
    </svg>
  );
}

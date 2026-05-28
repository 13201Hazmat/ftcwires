/* =====================================================
 * Brand
 *
 * Logo source: /public/wires-logo.svg (placeholder ships out of the box).
 * To use the real W.I.R.E.S. logo:
 *   1. Save your background-removed PNG to /public/wires-logo.png
 *   2. Change the src below from "/wires-logo.svg" to "/wires-logo.png"
 * ===================================================== */
export function WiresLogo({
  size = 28,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className="relative grid place-items-center overflow-hidden rounded-lg"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wires-logo.svg"
          alt="FTC W.I.R.E.S."
          width={size}
          height={size}
          className="h-full w-full object-contain"
        />
      </span>
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight text-foreground">
          FTC W.I.R.E.S.
        </span>
      )}
    </span>
  );
}

/* =====================================================
 * Section primitives
 * ===================================================== */
export function PageHero({
  eyebrow,
  title,
  desc,
  cta,
  showStatus,
  statusLabel,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  cta?: React.ReactNode;
  showStatus?: boolean;
  statusLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-40 sm:pt-48 lg:pb-32 lg:pt-56">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="bg-spotlight absolute inset-0" />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>
      <div className="animate-in mx-auto max-w-4xl text-center">
        {showStatus ? (
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--foreground) 3%, transparent)",
              color: "var(--muted)",
            }}
          >
            <span
              className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#f59e0b" }}
            />
            {statusLabel ?? eyebrow}
          </span>
        ) : (
          <SectionEyebrow center>{eyebrow}</SectionEyebrow>
        )}
        <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {desc}
        </p>
        {cta ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {cta}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      }
    >
      <SectionEyebrow center={isCenter}>{eyebrow}</SectionEyebrow>
      <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h2>
      {desc ? (
        <p
          className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${
            isCenter ? "mx-auto max-w-xl" : ""
          }`}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}

export function SectionEyebrow({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted ${
        center ? "" : ""
      }`}
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="inline-block h-1 w-1 rounded-full"
        style={{ background: "var(--foreground)" }}
      />
      {children}
    </span>
  );
}

/* =====================================================
 * Buttons & cards
 * ===================================================== */
export function PrimaryButton({
  children,
  href,
  className = "",
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${className}`}
      style={{
        background: "var(--foreground)",
        color: "var(--background)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.08) inset, 0 12px 28px -10px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </a>
  );
}

export function GhostButton({
  children,
  href,
  className = "",
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 ${className}`}
      style={{
        borderColor: "var(--border-strong)",
        background: "color-mix(in oklab, var(--foreground) 3%, transparent)",
      }}
    >
      {children}
    </a>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-8 ${className}`}
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow:
          "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset",
      }}
    >
      {children}
    </div>
  );
}

/* =====================================================
 * Icons
 * ===================================================== */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 11l6-6M6 5h5v5" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

export function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5L12 3z" />
    </svg>
  );
}

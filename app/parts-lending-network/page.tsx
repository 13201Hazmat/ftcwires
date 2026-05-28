import {
  SectionHeader,
  SectionEyebrow,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  CheckIcon,
} from "../_lib/ui";
import WaitlistForm from "./waitlist-form";

export const metadata = {
  title: "Parts Lending Network — Coming Soon | FTC Wires",
  description:
    "An upcoming statewide lending pool for FTC hardware. Join the early access list.",
};

export default function PartsLendingPage() {
  return (
    <>
      <Hero />
      <Vision />
      <Roadmap />
      <Principles />
      <FinalCTA />
    </>
  );
}

/* =====================================================
 * Hero — coming soon, waitlist
 * ===================================================== */
function Hero() {
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
          Coming Soon · Early access opening soon
        </span>

        <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
          A lending network
          <span className="block text-fade">for Wisconsin FTC.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Imagine never losing a build night to a backordered motor. The Parts
          Lending Network is an ambitious upcoming initiative — a community-run
          hardware pool that ships between teams, on trust, across the state.
        </p>

        <div className="mx-auto mt-12 max-w-xl text-left">
          <WaitlistForm />
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GhostButton href="/contact">
            Talk to the team
          </GhostButton>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Vision — what this could become
 * ===================================================== */
function Vision() {
  const pillars = [
    {
      tag: "Borrow",
      title: "Request what you need",
      desc: "Browse a live inventory of motors, hubs, sensors, and structural parts donated by teams across the state. Request one in minutes.",
    },
    {
      tag: "Lend",
      title: "List what you can spare",
      desc: "Got a drawer of last-season parts? List them in the catalog. Help a rookie team unblock their build without buying anything new.",
    },
    {
      tag: "Trust",
      title: "Powered by the community",
      desc: "Reputation, light tracking, and inter-team agreements — built on the same trust that already makes Wisconsin FTC work.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="The Vision"
          title={
            <>
              Hardware that flows
              <span className="block text-fade">where it&rsquo;s needed.</span>
            </>
          }
          desc="A statewide circulatory system for FTC parts. Less waste, faster iteration, stronger rookie teams."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.tag}
              className="relative overflow-hidden rounded-3xl border p-8"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                minHeight: 280,
              }}
            >
              <span
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                style={{ borderColor: "var(--border)" }}
              >
                {p.tag}
              </span>
              <h3 className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {p.desc}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Roadmap
 * ===================================================== */
function Roadmap() {
  const phases = [
    {
      label: "Now",
      title: "Concept & community sign-up",
      desc: "Gathering interest, refining the model, listening to what rookie and veteran teams actually need.",
      status: "active",
    },
    {
      label: "Next",
      title: "Pilot with founding teams",
      desc: "A small cohort of Wisconsin teams seeds the catalog. We test logistics, trust workflows, and shipping handoffs.",
      status: "upcoming",
    },
    {
      label: "Later",
      title: "Open the network",
      desc: "Open enrollment for every Wisconsin team. Public inventory, reputation system, and request flow live in the platform.",
      status: "upcoming",
    },
    {
      label: "Vision",
      title: "Beyond Wisconsin",
      desc: "If this works here, we share the playbook with other regions — so every FTC community can run their own lending network.",
      status: "upcoming",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Roadmap"
          title={
            <>
              From concept
              <span className="block text-fade">to circulation.</span>
            </>
          }
          desc="An honest look at where we are and where we're going."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <div
              key={p.label}
              className="relative flex flex-col rounded-3xl border p-7"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                minHeight: 240,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest"
                  style={{
                    borderColor: "var(--border)",
                    color:
                      p.status === "active"
                        ? "#f59e0b"
                        : "var(--muted)",
                  }}
                >
                  {p.label}
                </span>
                {p.status === "active" ? (
                  <span
                    className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#f59e0b" }}
                  />
                ) : null}
              </div>
              <h3 className="mt-8 text-base font-medium tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Principles
 * ===================================================== */
function Principles() {
  const items = [
    "Trust-based — built on the same handshakes that already power FTC",
    "Free for participating Wisconsin teams",
    "Light-weight catalog, no enterprise bloat",
    "Mentor-supervised handoffs at competitions when possible",
    "Open feedback loop — teams shape the platform",
    "Sustainable — return rates and inventory health stay visible",
  ];
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionEyebrow>Principles</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              How we&rsquo;ll
              <span className="block text-fade">build it.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              We&rsquo;d rather ship something honest and small than promise
              something glossy and fragile. These are the principles guiding
              the initial design.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 lg:col-span-7 sm:grid-cols-2">
            {items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-3 rounded-2xl border p-5 text-sm leading-relaxed text-muted"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-foreground" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Final CTA
 * ===================================================== */
function FinalCTA() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          eyebrow="Early access"
          title={
            <>
              Want to help
              <span className="block text-fade">shape what we build?</span>
            </>
          }
          desc="Join the waitlist above or get in touch directly — we'd love to hear what your team would actually use."
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact">
            Reach out to the team
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton href="/">Back to the platform</GhostButton>
        </div>
      </div>
    </section>
  );
}

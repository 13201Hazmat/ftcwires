import Link from "next/link";
import {
  PageHero,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  ArrowUpRight,
  SectionHeader,
} from "./_lib/ui";

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="A Wisconsin FTC community project"
        title={
          <>
           Wisconsin Initiative Rising to Enable STEM
          </>
        }
        desc={
          <>
            FTC W.I.R.E.S. is a community resource hub led by{" "}
            <span className="text-foreground">Team 13201 Hazmat</span>, with
            contributions from teams, mentors, and alumni across Wisconsin.
            We collect and share practical guides, examples, and templates
            for the tools FTC teams actually use — so newer teams learn
            faster and existing teams go further.
          </>
        }
        cta={
          <>
            <PrimaryButton href="/resources" className="w-full sm:w-auto">
              Browse resources
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton
              href="/parts-lending-network"
              className="w-full sm:w-auto"
            >
              See what we&rsquo;re building
            </GhostButton>
          </>
        }
      />

      <Stats />
      <PortalGrid />
      <Mission />
      <HomeCTA />
    </>
  );
}

/* =====================================================
 * Stats — where we are vs where we're going
 * ===================================================== */
function Stats() {
  return (
    <section className="px-6 pb-12 lg:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            number="260+"
            label="FTC teams using FTC Wires resources worldwide today."
            tag="Today"
          />
          <StatCard
            number="100+"
            label="Teams registered for FTC in Wisconsin. Our goal is to reach every one of them."
            tag="Our Goal"
            goal
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
  tag,
  goal = false,
}: {
  number: string;
  label: string;
  tag: string;
  goal?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border p-8 sm:p-10"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow:
          "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest"
          style={{
            borderColor: "var(--border)",
            color: goal ? "#f59e0b" : "var(--muted)",
          }}
        >
          {goal ? (
            <span
              className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#f59e0b" }}
            />
          ) : null}
          {tag}
        </span>
      </div>
      <div className="mt-8 flex items-baseline gap-4">
        <div className="font-mono text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
          {number}
        </div>
      </div>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
        {label}
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40"
        style={{
          background: goal
            ? "radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%)"
            : "radial-gradient(circle, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

/* =====================================================
 * Portal grid — major sections at a glance
 * ===================================================== */
function PortalGrid() {
  const items: {
    href: string;
    title: string;
    desc: string;
    tag: string;
    status?: "soon";
    span?: string;
  }[] = [
    {
      href: "/software-platform",
      title: "Software Examples & Guides",
      desc: "Starter code, walkthroughs, and templates for Roadrunner, Pedro Pathing, Blocks, and the official FTC SDK — curated for teams just getting into programming.",
      tag: "Software",
      span: "lg:col-span-2",
    },
    {
      href: "/parts-lending-network",
      title: "Parts Lending Network",
      desc: "An upcoming community initiative to help teams share hardware across Wisconsin. Coming soon.",
      tag: "Hardware",
      status: "soon",
    },
    {
      href: "/resources",
      title: "Resources",
      desc: "Important sites, team info, hardware, software, and game strategy — a growing library shaped by what Wisconsin teams have learned.",
      tag: "Library",
    },
    {
      href: "/planning",
      title: "Planning",
      desc: "Season roadmaps, communication frameworks, and sponsorship templates shared by teams who&rsquo;ve been through it.",
      tag: "Operations",
    },
    {
      href: "/outreach",
      title: "Outreach",
      desc: "Event ideas, mentorship playbooks, and sponsorship guidance for growing the next generation of FTC teams in Wisconsin.",
      tag: "Community",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Explore"
          title={
            <>
              Resources
              <span className="block text-fade">we have.</span>
            </>
          }
          desc="Each section is a self-contained guide. Pick the one your team needs today."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                it.span ?? ""
              }`}
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                boxShadow:
                  "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset",
                minHeight: 240,
              }}
            >
              <div className="mb-12 flex items-center justify-between">
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                  style={{ borderColor: "var(--border)" }}
                >
                  {it.tag}
                </span>
                {it.status === "soon" ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-amber-400">
                    <span
                      className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "#f59e0b" }}
                    />
                    Coming soon
                  </span>
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                )}
              </div>
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-muted">
                {it.desc}
              </p>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-60"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--border-strong), transparent)",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Supported tools — honesty about what we cover
 * ===================================================== */
function SupportedTools() {
  const tools = [
    {
      name: "Roadrunner",
      blurb:
        "A motion-planning library for FTC — complex paths with precise velocity and acceleration control.",
    },
    {
      name: "Pedro Pathing",
      blurb:
        "Path following with Bézier curves, built for FTC — fast, consistent, and disturbance-tolerant.",
    },
    {
      name: "Blocks",
      blurb:
        "Drag-and-drop programming built into the Driver Station — write your first autonomous with no Java required.",
    },
    {
      name: "FTC SDK",
      blurb: "The official Java SDK — examples and patterns.",
    },
    {
      name: "Android Studio",
      blurb:
        "A step-by-step walkthrough of the official IDE — install, clone the FtcRobotController, and deploy to your Control Hub.",
    },
    {
      name: "Command-Based",
      blurb: "An architecture pattern for scalable codebases.",
    },
  ];
  
}

/* =====================================================
 * Mission — short, accurate
 * ===================================================== */
function Mission() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-[2rem] border p-10 sm:p-16 lg:p-20"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50"
          />
          <div className="relative">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
              style={{ borderColor: "var(--border)" }}
            >
              What we do
            </span>
            <p className="mt-6 text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-fade">FTC Wires is a </span>
              <span className="text-foreground">
                community-driven resource platform
              </span>
              <span className="text-fade">
                {" "}
                focused on helping FTC teams{" "}
              </span>
              <span className="text-foreground">
                learn, build, and grow faster
              </span>
              <span className="text-fade"> together.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Home CTA
 * ===================================================== */
function HomeCTA() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          eyebrow="Get involved"
          title={
            <>
              Made by teams.
              <span className="block text-fade">
                For every team in Wisconsin and the Globe.
              </span>
            </>
          }
          desc="FTC Wires is an open community project led by Team 13201 Hazmat with contributions from teams, mentors, and alumni across the state. Use what&rsquo;s here, share what&rsquo;s worked for your team, or just say hi — every team makes the hub better."
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton href="/resources">Browse resources</GhostButton>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  PageHero,
  PrimaryButton,
  GhostButton,
  SectionHeader,
  SectionEyebrow,
  ArrowRight,
  ArrowUpRight,
} from "../_lib/ui";

export const metadata = {
  title: "Software Examples & Guides — FTC Wires",
  description:
    "Curated examples, walkthroughs, and templates for the software FTC teams already use — Roadrunner, Pedro Pathing, Blocks, the FTC SDK, Android Studio setup, and command-based architecture.",
};

export default function SoftwarePlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Software · Examples & Guides"
        title={
          <>
            Software resources
            <span className="block text-fade">for FTC teams.</span>
          </>
        }
        desc={
          <>
            FTC Wires isn&rsquo;t a FTC Library. We collect and share
            examples, walkthroughs, and starter templates for the tools FTC
            teams already use. Like Roadrunner, Pedro Pathing, Blocks, the
            official FTC SDK, and an Android Studio setup walkthrough.
          </>
        }
      />

      <Disclosure />
      <Tools />
      <SignUp />
      <ContributeCTA />
    </>
  );
}

/* =====================================================
 * Disclosure — clarity about what this is
 * ===================================================== */
function Disclosure() {
  return (
    <section className="px-6 pb-16 lg:pb-24">
      <div className="mx-auto max-w-4xl">
        <div
          className="flex items-start gap-4 rounded-2xl border p-5 sm:p-6"
          style={{
            borderColor: "var(--border)",
            background:
              "color-mix(in oklab, var(--foreground) 2.5%, transparent)",
          }}
        >
          <span
            className="mt-0.5 inline-block h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: "var(--foreground)" }}
          />
          <p className="text-[13.5px] leading-relaxed text-muted">
            <span className="text-foreground">What this is.</span> A community
            knowledge base — not a library, SDK, or pathing framework. Every
            tool below was built by someone else. We point to the official
            docs, share what worked for Wisconsin teams, and add starter
            examples where they help.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Tools — split into Auto Pathing + General Guides
 * ===================================================== */
type Tool = {
  name: string;
  blurb: string;
  href: string;
  status: "available" | "soon";
  upstream?: string;
};

const AUTO_PATHING_TOOLS: Tool[] = [
  {
    name: "Blocks",
    blurb:
      "FTC's drag-and-drop programming interface. We share sample block autonomous routines that rookie teams can adapt for their own bots — no Java required.",
    href: "#tools",
    status: "soon",
    upstream: "Official FTC Blocks",
  },
  {
    name: "Roadrunner",
    blurb:
      "A motion-planning library built for FTC. Enables complex path generation and following with precise control over velocity and acceleration — for more accurate autonomous routines.",
    href: "#tools",
    status: "soon",
    upstream: "acmerobotics/road-runner",
  },
  {
    name: "Pedro Pathing",
    blurb:
      "A custom path-following library for FTC. Uses Bézier curves to keep autos fast and consistent while correcting for external disturbances along the way.",
    href: "#tools",
    status: "soon",
    upstream: "Pedro-Pathing/PedroPathing",
  },
];

const GENERAL_TOOLS: Tool[] = [
  {
    name: "Command-Based Architecture",
    blurb:
      "An organization pattern for scalable FTC codebases — subsystems, commands, and a scheduler.",
    href: "/command-based",
    status: "available",
    upstream: "WPILib · FTCLib · NextFTC",
  },
  {
    name: "FTC SDK",
    blurb:
      "The official Java SDK. Reference samples, common patterns, and links into the canonical docs.",
    href: "#tools",
    status: "soon",
    upstream: "FIRST-Tech-Challenge/FtcRobotController",
  },
  {
    name: "Android Studio",
    blurb:
      "A step-by-step walkthrough of the official IDE for FTC. Install, configure the FtcRobotController project, and deploy your first build to a Control Hub.",
    href: "#tools",
    status: "soon",
    upstream: "Official FTC SDK · Android Studio",
  },
];

function Tools() {
  return (
    <section id="tools" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="By tool"
          title="FTC Guides"
          desc="Each tool below is built and maintained by the wider FTC/FRC community."
        />

        <ToolGroup
          label="Auto Pathing"
          desc="Sample autonomous routines and path-following — from drag-and-drop Blocks to advanced motion planning."
          tools={AUTO_PATHING_TOOLS}
        />

        <ToolGroup
          label="General Guides"
          desc="Programming environments, the official SDK, and code architecture."
          tools={GENERAL_TOOLS}
        />
      </div>
    </section>
  );
}

function ToolGroup({
  label,
  desc,
  tools,
}: {
  label: string;
  desc: string;
  tools: Tool[];
}) {
  return (
    <div className="mt-20 first:mt-16">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-6">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-widest text-subtle">
            {label}
          </span>
          <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted">
            {desc}
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
          {tools.length} {tools.length === 1 ? "tool" : "tools"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <ToolCard key={t.name} tool={t} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow:
          "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset",
        minHeight: 240,
      }}
    >
      <div className="mb-10 flex items-center justify-between">
        <span
          className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
          style={{ borderColor: "var(--border)" }}
        >
          Tool
        </span>
        {tool.status === "soon" ? (
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
        {tool.name}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
        {tool.blurb}
      </p>
      {tool.upstream ? (
        <p className="mt-6 text-[11px] uppercase tracking-widest text-subtle">
          Upstream · {tool.upstream}
        </p>
      ) : null}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-60"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border-strong), transparent)",
        }}
      />
    </Link>
  );
}

/* =====================================================
 * Sign up — register to access materials (gated)
 * ===================================================== */
const SIGNUP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdyDzmv6d0eZwyLC0Qg_ix_XZDBTBqdmHrPxi7nkFHH7l6xrA/viewform";

function SignUp() {
  return (
    <section id="sign-up" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-[2rem] border p-10 sm:p-16 lg:p-20"
          style={{
            borderColor: "var(--border)",
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--foreground) 5%, var(--surface)), var(--surface))",
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.45)",
          }}
        >
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-50"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-56"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 50% 100%, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <SectionEyebrow>Register · Access</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Register your team
              <span className="block text-fade">to access the examples.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Drop your team number and contact info to get our sample
              autonomous routines (Blocks and Java), starter code,
              instructions, and direct support throughout the season. We
              answer questions and update materials all year.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <PrimaryButton
                href={SIGNUP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register your team
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <span className="text-[12.5px] text-subtle">
                ~30 seconds · opens a Google Form in a new tab
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Contribute CTA
 * ===================================================== */
function ContributeCTA() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          eyebrow="Contribute"
          title={
            <>
              Wrote something that helped your team?
              <span className="block text-fade">Send it our way.</span>
            </>
          }
          desc="The library only stays useful if teams keep adding to it. Examples, walkthroughs, tuning notes — anything that saved your team time is worth sharing."
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact">
            Share what worked
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton href="/command-based">
            Read the architecture guide
          </GhostButton>
        </div>
      </div>
    </section>
  );
}

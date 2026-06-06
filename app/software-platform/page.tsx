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
        title={
          <>
            Software resources
            <span className="block text-fade">for FTC teams.</span>
          </>
        }
        desc={
          <>
            FTC Wires isn&rsquo;t a FTC Library. We have created and share
            examples and guides for common FTC tools.
          </>
        }
      />

      <Tools />
      <SignUp />
      <ContributeCTA />
    </>
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
type Guides = {
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
    href: "/blocks",
    status: "available",
    upstream: "Official FTC Blocks",
  },
  {
    name: "Roadrunner",
    blurb:
      "A motion-planning library built for FTC. Enables complex path generation and following with precise control over velocity and acceleration — for more accurate autonomous routines.",
    href: "/roadrunner",
    status: "available",
    upstream: "acmerobotics/road-runner",
  },
  {
    name: "Pedro Pathing",
    blurb:
      "A custom path-following library for FTC. Uses Bézier curves to keep autos fast and consistent while correcting for external disturbances along the way.",
    href: "/pedro-pathing",
    status: "available",
    upstream: "Pedro-Pathing/PedroPathing",
  },
];

const GENERAL_TOOLS: Guides[] = [
  {
    name: "Android Studio",
    blurb:
      "A step-by-step walkthrough of the official IDE for FTC. Install, configure the FtcRobotController project, and deploy your first build to a Control Hub.",
    href: "/android-studio",
    status: "available",
    upstream: "Official FTC SDK · Android Studio",
  },
  {
    name: "Command-Based Architecture",
    blurb:
      "An organization pattern for FTC we will talk about subsystems, commands, and a scheduler.",
    href: "/command-based",
    status: "available",
    upstream: "WPILib · NextFTC · Ivy",
  },
  
];

function Tools() {
  return (
    <section id="tools" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="FTC Guides"
          desc="Each tool below is built and maintained by the wider FTC/FRC community."
        />

        <ToolGroup
          label="Auto Pathing"
          desc=""
          tools={AUTO_PATHING_TOOLS}
        />

        <ToolGroup
          label="General Guides"
          desc=" "
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
          {tool.upstream}
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
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Fill this form 
              <span className="block text-fade">to access our auto guides.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              We ask for a team number and contact information to help us track usage, 
              and other types to data. These guides have an instruction guide
              for setting up autos, with Blocks and Java (Pedro Pathing and Roadrunner). 
              We also provide a sample basic auto for your team to adapt to your robot.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/register">
                Register your team
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <span className="text-[12.5px] text-subtle">
                ~30 seconds
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
          title={
            <>
              Know about something that helped you?
              <span className="block text-fade">Write a guide about it!</span>
            </>
          }
          desc="The library only stays useful if teams keep adding to it. Examples, walkthroughs, tuning notes etc.."
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

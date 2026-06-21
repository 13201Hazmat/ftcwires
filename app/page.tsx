import Link from "next/link";
import {
  PrimaryButton,
  GhostButton,
  ArrowRight,
  ArrowUpRight,
  SectionHeader,
} from "./_lib/ui";

export default function Home() {
  return (
    <>
      <Hero />

      <Stats />
      <Mission />
    </>
  );
}

/* =====================================================
 * Hero — logo-first layout
 * ===================================================== */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-24 sm:pt-28 lg:pb-32 lg:pt-32">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="bg-spotlight absolute inset-0" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        />
      </div>

      <div className="animate-in mx-auto max-w-4xl text-center">
        {/* Logo */}
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/WIRESbg.png"
            alt="FTC WI.R.E.S."
            className="h-64 w-64 sm:h-80 sm:w-80 lg:h-[28rem] lg:w-[28rem] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]"
          />
        </div>

        {/* Title */}
        <h1 className="mt-4 tracking-tight">
          <span className="block text-5xl font-semibold sm:text-6xl lg:text-7xl">FTC WI.R.E.S.</span>
          <span className="block mt-2 text-xl font-medium text-fade sm:text-2xl">Wisconsin Rises to Enable STEM Growth.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          This is a community resource page led by{" "}
          <span className="text-foreground">Team 13201 Hazmat</span>, with
          contributions from teams, mentors, and alumni across Wisconsin.
          Guides, examples, and templates for common FTC things so every team
          can learn.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/resources" className="w-full sm:w-auto">
            Browse resources
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Stats — editorial typography, no card grid
 * ===================================================== */
function Stats() {
  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Achievement — the bigger, primary line */}
        <p className="text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          <span className="text-foreground">260+ teams</span>
          <span className="text-fade">
            {" "}
            are using FTC Wires resources.
          </span>
        </p>

        {/* Hand-drawn divider — short rule, not a chip */}
        <div className="mt-10 flex items-center gap-3 sm:mt-14">
          <span
            className="h-px w-10 flex-none"
            style={{ background: "var(--border-strong)" }}
          />
          <span className="text-[11px] uppercase tracking-widest text-subtle">
            Our Target
          </span>
        </div>

        {/* Aspiration — smaller, secondary line */}
        <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          <span className="text-fade">120 te</span>
          <span className="text-fade">ams registered for FTC in Wisconsin.</span>
        </p>
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

            {}
            <p className="mt-6 text-3xl font-medium leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-fade">Why we created WIRES</span>{" "}
            </p>

            {}
            <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                  At our first World Championship, we were partnered with a team from Nigeria that didn’t have an autonomous program. Because they had no idea where to start and how to program one.             </p>
              <p>
                During our downtime, we helped them build one, not just to improve their performance, but to help our entire alliance compete at a higher level.

                When we came home, we realized they probably weren’t the only team facing that problem.
                 Many teams hit the same wall without having someone there to guide them through it.{" "} We contiue to help team
                 across our competions by helping load WIRES whenever possible!
              </p>
            </div>

            {/* Attribution — small, hand-signed feel */}
            <p
              className="mt-8 text-[12.5px] uppercase tracking-widest text-subtle"
            >
              — Team 13201 Hazmat
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

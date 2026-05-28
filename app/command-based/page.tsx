import {
  PageHero,
  SectionHeader,
  SectionEyebrow,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  ArrowUpRight,
  CheckIcon,
} from "../_lib/ui";

export const metadata = {
  title: "Command-Based Architecture — FTC Wires",
  description:
    "Educational guidance and architectural recommendations for organizing FTC robot code with the command-based pattern.",
};

export default function CommandBasedPage() {
  return (
    <>
      <PageHero
        eyebrow="Architecture · Guidance"
        title={
          <>
            Command-based architecture
            <span className="block text-fade">for FTC teams.</span>
          </>
        }
        desc={
          <>
            An educational deep-dive on a programming pattern popularized in
            FRC and widely adapted across FTC. This isn&rsquo;t a framework
            we built — it&rsquo;s a curated set of examples, recommendations,
            and references for teams that want a cleaner, more scalable
            codebase.
          </>
        }
        cta={
          <>
            <PrimaryButton href="#concepts" className="w-full sm:w-auto">
              Start with the concepts
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="#references" className="w-full sm:w-auto">
              Community libraries &amp; references
            </GhostButton>
          </>
        }
      />

      <Disclosure />
      <WhatItIs />
      <WhyTeams />
      <Concepts />
      <Layout />
      <Skeletons />
      <Scaling />
      <References />
      <ContributeCTA />
    </>
  );
}

/* =====================================================
 * Transparent disclosure
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
            <span className="text-foreground">Important framing.</span>{" "}
            Command-based programming was popularized by{" "}
            <span className="text-foreground">WPILib</span> in FRC and has
            been adapted to FTC by community libraries like{" "}
            <span className="text-foreground">FTCLib</span> and{" "}
            <span className="text-foreground">NextFTC</span>. FTC Wires
            doesn&rsquo;t own this pattern — we collect, explain, and curate
            it so your team can adopt it confidently.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * What is command-based?
 * ===================================================== */
function WhatItIs() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionEyebrow>What it is</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A way to organize
              <span className="block text-fade">behavior on a robot.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              At its core, command-based is a design pattern. You model your
              robot as a small set of{" "}
              <span className="text-foreground">subsystems</span> (drivetrain,
              intake, arm) and you express behavior as{" "}
              <span className="text-foreground">commands</span> that ask
              subsystems to do something for a finite period of time. A
              scheduler runs the commands and resolves conflicts when two
              commands want the same subsystem.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The result: hardware lives in one place, behavior lives in
              another, and your autonomous and teleop end up reading like
              prose instead of nested {`if`}-statements.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl border font-mono text-[12.5px] leading-relaxed"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 4%, var(--background))",
                boxShadow: "0 20px 50px -20px rgba(0,0,0,0.45)",
              }}
            >
              <div
                className="flex items-center gap-1.5 border-b px-4 py-3"
                style={{ borderColor: "var(--hairline)" }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
                <span className="ml-3 text-[11px] text-subtle">
                  AutoScorePreload.java — illustrative
                </span>
              </div>
              <pre className="overflow-x-auto px-5 py-5 text-foreground">
                <code>
                  <span className="text-subtle">// behavior reads like prose</span>
                  {"\n"}
                  schedule(
                  {"\n"}
                  {"  "}new SequentialCommandGroup(
                  {"\n"}
                  {"    "}drive.followPath(Paths.<span className="text-fade">SPIKE</span>),
                  {"\n"}
                  {"    "}arm.moveTo(ArmPose.<span className="text-fade">HIGH</span>),
                  {"\n"}
                  {"    "}claw.release(),
                  {"\n"}
                  {"    "}drive.alignTo(AprilTag.<span className="text-fade">RED_2</span>),
                  {"\n"}
                  {"    "}drive.park(ParkZone.<span className="text-fade">CORNER</span>)
                  {"\n"}
                  {"  "})
                  {"\n"}
                  );
                </code>
              </pre>
            </div>
            <p className="mt-4 text-[12.5px] text-subtle">
              Illustrative pseudo-code. Actual syntax depends on the
              community library you choose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Why teams may want it
 * ===================================================== */
function WhyTeams() {
  const items = [
    {
      title: "Scales with your codebase",
      desc: "New mechanisms slot in as new subsystems and commands. No giant teleop loop to refactor every time.",
    },
    {
      title: "Cleaner autonomous routines",
      desc: "Sequential, parallel, and conditional command groups replace tangled state machines.",
    },
    {
      title: "Reusable building blocks",
      desc: "A command written for teleop bindings can be reused inside auto routines and vice versa.",
    },
    {
      title: "Easier debugging",
      desc: "Failures localize to a single command or subsystem instead of an entire opmode.",
    },
    {
      title: "Better collaboration",
      desc: "Two programmers can work on two subsystems without colliding in the same file.",
    },
    {
      title: "Separates hardware from behavior",
      desc: "Subsystems own the motors and sensors. Commands describe intent. The two layers evolve independently.",
    },
  ];
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why teams adopt it"
          title={
            <>
              Six reasons it&rsquo;s worth
              <span className="block text-fade">the upfront investment.</span>
            </>
          }
          desc="Command-based has a learning curve. Teams that climb it usually don't go back."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="relative overflow-hidden rounded-3xl border p-7"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                minHeight: 200,
              }}
            >
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {it.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                {it.desc}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-30"
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
 * Core concepts
 * ===================================================== */
function Concepts() {
  const items = [
    {
      n: "01",
      title: "Subsystems",
      desc: "A class that owns a piece of hardware — the drivetrain, an arm, an intake. Exposes a small public API (e.g. setPower, openClaw). Nothing else in your code touches the motors directly.",
    },
    {
      n: "02",
      title: "Commands",
      desc: "A short-lived object that asks subsystems to do something. Has an init, an execute, an isFinished, and an end. Commands declare which subsystems they require.",
    },
    {
      n: "03",
      title: "Command groups",
      desc: "Sequential and parallel composites that let you build long autonomous routines out of small, testable pieces.",
    },
    {
      n: "04",
      title: "Triggers & bindings",
      desc: "Gamepad buttons or sensor conditions that schedule commands. Most teleop input handling becomes one-line bindings.",
    },
    {
      n: "05",
      title: "Scheduler",
      desc: "The runtime that ticks active commands every loop, enforces subsystem ownership, and resolves conflicts when two commands want the same hardware.",
    },
  ];
  return (
    <section id="concepts" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Core concepts"
          title={
            <>
              Five primitives.
              <span className="block text-fade">Everything composes from these.</span>
            </>
          }
        />
        <div
          className="mt-16 overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.n}
              className="flex flex-col items-start gap-6 px-8 py-10 sm:flex-row sm:items-start sm:gap-12 sm:px-12"
              style={
                i !== 0
                  ? { borderTop: "1px solid var(--hairline)" }
                  : undefined
              }
            >
              <span className="font-mono text-sm text-subtle">{it.n}</span>
              <div className="flex-1">
                <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                  {it.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * File layout recommendation
 * ===================================================== */
function Layout() {
  const tree = `TeamCode/src/main/java/org/firstinspires/ftc/teamcode/
├── subsystems/
│   ├── DriveSubsystem.java
│   ├── IntakeSubsystem.java
│   ├── ArmSubsystem.java
│   └── VisionSubsystem.java
├── commands/
│   ├── drive/
│   │   ├── DriveByTime.java
│   │   ├── FollowPath.java
│   │   └── AlignToTag.java
│   ├── arm/
│   │   └── MoveArmTo.java
│   └── auto/
│       └── ScorePreload.java
├── opmodes/
│   ├── autonomous/
│   │   ├── RedNearAuto.java
│   │   └── BlueFarAuto.java
│   └── teleop/
│       └── MainTeleOp.java
├── util/
│   ├── Constants.java
│   └── ControllerMap.java
└── Robot.java`;

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionEyebrow>Recommended layout</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A folder structure
              <span className="block text-fade">that grows with you.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              There is no &ldquo;correct&rdquo; layout — only one that helps
              your team find code quickly six months in. Here&rsquo;s a
              starting point most command-based FTC codebases converge on,
              with room to adapt as your robot grows.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Subsystems own all hardware references — nothing else.",
                "Commands describe intent and live next to similar commands.",
                "Opmodes are thin entry points that compose commands.",
                "Constants live in one place so tuning doesn't sprawl.",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-foreground" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl border font-mono text-[12.5px] leading-relaxed"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 4%, var(--background))",
                boxShadow: "0 20px 50px -20px rgba(0,0,0,0.45)",
              }}
            >
              <div
                className="flex items-center gap-1.5 border-b px-4 py-3"
                style={{ borderColor: "var(--hairline)" }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--border-strong)" }}
                />
                <span className="ml-3 text-[11px] text-subtle">
                  Project structure
                </span>
              </div>
              <pre className="overflow-x-auto px-5 py-5 text-muted">
                <code>{tree}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Code skeletons (illustrative, library-agnostic)
 * ===================================================== */
function Skeletons() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Illustrative skeletons"
          title={
            <>
              What a subsystem
              <span className="block text-fade">and a command look like.</span>
            </>
          }
          desc="Pseudo-code in the spirit of FTC command-based libraries. Real syntax depends on whether you use FTCLib, NextFTC, or a homegrown implementation."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CodeBlock
            file="IntakeSubsystem.java"
            label="Subsystem"
            code={`public class IntakeSubsystem extends Subsystem {
  private final DcMotor motor;

  public IntakeSubsystem(HardwareMap hw) {
    this.motor = hw.get(DcMotor.class, "intake");
  }

  public void run(double power) {
    motor.setPower(power);
  }

  public void stop() {
    motor.setPower(0);
  }
}`}
          />
          <CodeBlock
            file="RunIntakeFor.java"
            label="Command"
            code={`public class RunIntakeFor extends Command {
  private final IntakeSubsystem intake;
  private final double power, seconds;
  private double startTime;

  public RunIntakeFor(IntakeSubsystem intake,
                       double power, double seconds) {
    this.intake = intake;
    this.power = power;
    this.seconds = seconds;
    addRequirements(intake);
  }

  @Override
  public void initialize() {
    startTime = time();
    intake.run(power);
  }

  @Override
  public boolean isFinished() {
    return time() - startTime >= seconds;
  }

  @Override
  public void end(boolean interrupted) {
    intake.stop();
  }
}`}
          />
        </div>

        <p className="mt-6 text-[12.5px] text-subtle">
          Examples are for shape, not for copy-paste. Full working examples
          and a starter template are{" "}
          <span className="text-foreground">on the roadmap</span> — see the
          contribute section below if you want to help write them.
        </p>
      </div>
    </section>
  );
}

function CodeBlock({
  file,
  label,
  code,
}: {
  file: string;
  label: string;
  code: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border font-mono text-[12.5px] leading-relaxed"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in oklab, var(--foreground) 4%, var(--background))",
        boxShadow: "0 20px 50px -20px rgba(0,0,0,0.45)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: "var(--hairline)" }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--border-strong)" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--border-strong)" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--border-strong)" }}
          />
          <span className="ml-3 text-[11px] text-subtle">{file}</span>
        </div>
        <span
          className="rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-muted"
          style={{ borderColor: "var(--border)" }}
        >
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* =====================================================
 * Scaling — collaboration & debugging
 * ===================================================== */
function Scaling() {
  const items = [
    {
      tag: "Collaboration",
      title: "Two programmers, two subsystems, zero merge conflicts.",
      desc: "Because each subsystem and command lives in its own file, the days of three students editing the same opmode at 11pm before competition are gone.",
    },
    {
      tag: "Debugging",
      title: "Localized failure surface.",
      desc: "When an autonomous fails, you know which command was running. Add telemetry to one command instead of digging through a 600-line opmode.",
    },
    {
      tag: "Iteration",
      title: "Rewrite behavior without touching hardware.",
      desc: "Swap a path, retune a movement, or chain commands differently — the subsystem layer doesn't move. The robot keeps working between iterations.",
    },
    {
      tag: "Onboarding",
      title: "A new programmer can ship a real feature in week one.",
      desc: "Writing a single command against an existing subsystem is a perfect starter task. They learn the codebase without the cost of touching everything.",
    },
  ];
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why it scales"
          title={
            <>
              For larger teams and
              <span className="block text-fade">larger autonomous systems.</span>
            </>
          }
          desc="The pattern pays off most when your team and your codebase get bigger."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.tag}
              className="rounded-3xl border p-8"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <span
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                style={{ borderColor: "var(--border)" }}
              >
                {it.tag}
              </span>
              <h3 className="mt-6 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {it.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * References — community libraries & docs
 * ===================================================== */
function References() {
  const items = [
    {
      tag: "Library",
      title: "FTCLib",
      desc: "A community library that brings WPILib-style command-based to FTC. The most common starting point.",
      href: "https://docs.ftclib.org/ftclib/",
    },
    {
      tag: "Library",
      title: "NextFTC",
      desc: "A modern command-based framework for FTC with an opinionated, batteries-included API.",
      href: "https://nextftc.dev",
    },
    {
      tag: "Reference",
      title: "WPILib Command-Based docs",
      desc: "The canonical conceptual reference. FTC adaptations map cleanly to these ideas.",
      href: "https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html",
    },
    {
      tag: "Docs",
      title: "ftc-docs",
      desc: "Official FTC software documentation — useful baseline before adopting any library.",
      href: "https://ftc-docs.firstinspires.org",
    },
  ];
  return (
    <section id="references" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Community libraries & references"
          title={
            <>
              We didn&rsquo;t build any of these.
              <span className="block text-fade">Use them. Credit them.</span>
            </>
          }
          desc="Command-based exists because of FRC, WPILib, and FTC community library authors. Start here."
        />
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-start gap-6 overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="flex-1">
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                  style={{ borderColor: "var(--border)" }}
                >
                  {it.tag}
                </span>
                <div className="mt-5 text-xl font-medium tracking-tight text-foreground">
                  {it.title}
                </div>
                <div className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {it.desc}
                </div>
              </div>
              <ArrowUpRight className="mt-2 h-5 w-5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Contribute CTA — roadmap for examples
 * ===================================================== */
function ContributeCTA() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-[2rem] border p-10 sm:p-16"
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
          <div className="relative">
            <SectionEyebrow>Coming next</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Worked examples,
              <span className="block text-fade">contributed by teams.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted sm:text-base">
              Planned additions to this page: a full reference subsystem set,
              a starter command library, an end-to-end autonomous routine
              walkthrough, and a teleop binding pattern guide. If your team
              has written something worth sharing, send it in.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Reference Drivetrain subsystem",
                "Reusable AlignToTag command",
                "Sequential auto walkthrough",
                "Teleop binding pattern",
              ].map((it) => (
                <div
                  key={it}
                  className="flex items-center gap-3 rounded-2xl border p-4 text-sm text-muted"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in oklab, var(--foreground) 2%, transparent)",
                  }}
                >
                  <span
                    className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#f59e0b" }}
                  />
                  <span>{it}</span>
                  <span className="ml-auto text-[11px] uppercase tracking-widest text-subtle">
                    Planned
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start justify-start gap-3 sm:flex-row">
              <PrimaryButton href="/contact">
                Contribute an example
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton href="/resources#software">
                Back to Software resources
              </GhostButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

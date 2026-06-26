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

      <WhatItIs />
      <WhyTeams />
      <Concepts />
      <Skeletons />
      <References />
      <ContributeCTA />
      <BackLink />
    </>
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
              The result: cleaner code, reusable actions, and auto
               routines that are easier to build, test, and improve.
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
                  AutoScorePreload.java
                </span>
              </div>
              <pre className="overflow-x-auto px-5 py-5" style={{ color: "#E6EDF3" }}>
                <code>
                  <span style={{ color: "#8B949E" }}>// commands read almost like english</span>
                  {"\n"}
                  <span style={{ color: "#D2A8FF" }}>schedule</span>
                  <span style={{ color: "#E6EDF3" }}>(</span>
                  {"\n"}
                  {"  "}<span style={{ color: "#FF7B72" }}>new </span>
                  <span style={{ color: "#E6EDF3" }}>SequentialCommandGroup</span>
                  <span style={{ color: "#E6EDF3" }}>(</span>
                  {"\n"}
                  {"    "}drive.<span style={{ color: "#D2A8FF" }}>followPath</span><span style={{ color: "#E6EDF3" }}>(</span>Paths.<span style={{ color: "#E6EDF3" }}>INTAKE</span><span style={{ color: "#E6EDF3" }}>),</span>
                  {"\n"}
                  {"    "}intake.<span style={{ color: "#D2A8FF" }}>start</span><span style={{ color: "#E6EDF3" }}>(),</span>
                  {"\n"}
                  {"    "}drive.<span style={{ color: "#D2A8FF" }}>followPath</span><span style={{ color: "#E6EDF3" }}>(</span>Paths.<span style={{ color: "#E6EDF3" }}>LAUNCH</span><span style={{ color: "#E6EDF3" }}>),</span>
                  {"\n"}
                  {"    "}launcher.<span style={{ color: "#D2A8FF" }}>launch</span><span style={{ color: "#E6EDF3" }}>(),</span>
                  {"\n"}
                  {"    "}drive.<span style={{ color: "#D2A8FF" }}>park</span><span style={{ color: "#E6EDF3" }}>(</span>Paths.<span style={{ color: "#E6EDF3" }}>PARK</span><span style={{ color: "#E6EDF3" }}>)</span>
                  {"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>)</span>
                  {"\n"}
                  <span style={{ color: "#E6EDF3" }}>);</span>
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
      title: "Easier to expand",
      desc: "New mechanisms and features can be added without constantly rewriting the entire robot structure.",
    },
    {
      title: "Reusable commands",
      desc: "Commands written for teleop can often be reused in autonomous routines and other opmodes.",
    },
    {
      title: "Cleaner autonomous code",
      desc: "Autos become easier to organize using reusable commands instead of large state machines or a giant opmode.",
    },
    {
      title: "Simpler debugging",
      desc: "Problems are easier to isolate when logic is separated into smaller subsystems and commands.",
    },
    {
      title: "Better team collaboration",
      desc: "Multiple programmers can work on different robot systems without constantly editing the same files. This and good git management practices help a lot.",
    },
    {
      title: "Organized robot structure",
      desc: "Subsystems manage hardware while commands control behavior, keeping code easier to understand over time. Very modular and understandable.",
    },
  ];
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Why teams use
              <span className="block text-fade">command based programming.</span>
            </>
          }
          desc="Command-based programming has a learning curve. Though once you get through it, you usually wont go back."
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
      desc: "Subsystems organize hardware into reusable components. Instead of accessing motors and servos throughout your code, hardware is managed in one place.",
    },
    {
      n: "02",
      title: "Commands",
      desc: "Commands describe actions your robot can perform, such as intaking, following a path, or scoring a game piece.",
    },
    {
      n: "03",
      title: "Command Groups",
      desc: "Multiple commands can be combined into larger routines, allowing complex autonomous sequences to be built from simple actions. Like parallel or sequential command groups.",
    },
    {
      n: "04",
      title: "Triggers",
      desc: "Triggers connect buttons, sensors, or robot states to commands, making teleop controls easier to organize and maintain.",
    },
    {
      n: "05",
      title: "Scheduler",
      desc: "The scheduler automatically manages active commands and ensures they run in the correct order without conflicting with each other.",
    },
  ];
  return (
    <section id="concepts" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              The building blocks 
              <span className="block text-fade">of command-based programming.</span>
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
├── autos/
│   └── paths/
│   │    └── PathsAndPoses.java
│   └── runnables/
│       ├── NearAuto.java
│       └── FarAuto.java
├── pedroPathing/
├── subsystems/
│   ├── IntakeRoller.java
│   ├── IntakeSpindexerGroup.java
│   ├── Launcher.java
│   ├── LauncherGroup.java
│   ├── LauncherHood.java
│   ├── Limelight.java
│   ├── Spindexer.java
│   └── Turret.java
├── teleop/
│   ├── CompTeleOp.java
│   ├── RedTeleOp.java
│   └── BlueTeleOp.java
├── testOpModes/
├── util/
└── README.md`;

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A repo structure
              <span className="block text-fade">that you decide.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              There is no &ldquo;correct&rdquo; layout — only one that helps
              your team develop and optimize your code. Here&rsquo;s a
              starting point most command-based FTC codebases start on.
              This is an example from Team 13201 Hazmats DECODE codebase.
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
          title={
            <>
              What a subsystem
              <span className="block text-fade">and a command look like.</span>
            </>
          }
          desc="Some example code made from the DECODE season though each library has it's own structure."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          <CodeBlock
            file="Intake.java"
            label="Subsystem"
            code={<>
              <span style={{ color: "#FF7B72" }}>public class </span><span style={{ color: "#E6EDF3" }}>Intake </span><span style={{ color: "#E6EDF3" }}>{"{"}</span>{"\n\n"}
              {"    "}<span style={{ color: "#8B949E" }}>// This is an example using Ivy made by Pedro Pathing</span>{"\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>private final </span><span style={{ color: "#E6EDF3" }}>DcMotorEx </span>{"intakeMotor"}<span style={{ color: "#E6EDF3" }}>;</span>{"\n\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Intake</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#E6EDF3" }}>HardwareMap </span>{"hardwareMap"}<span style={{ color: "#E6EDF3" }}>) {"{"}</span>{"\n"}
              {"        "}{"intakeMotor"}<span style={{ color: "#E6EDF3" }}> = </span>{"hardwareMap"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>get</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#E6EDF3" }}>DcMotorEx</span><span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#FF7B72" }}>class</span><span style={{ color: "#E6EDF3" }}>, </span><span style={{ color: "#FFA657" }}>"intakeMotor"</span><span style={{ color: "#E6EDF3" }}>);</span>{"\n"}
              {"    "}<span style={{ color: "#E6EDF3" }}>{"}"}</span>{"\n\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Command </span><span style={{ color: "#D2A8FF" }}>intakeForward</span><span style={{ color: "#E6EDF3" }}>() {"{"}</span>{"\n"}
              {"        "}<span style={{ color: "#FF7B72" }}>return new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span><span style={{ color: "#E6EDF3" }}>(</span>{"() ->"}{"\n"}
              {"                "}{"intakeMotor"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>setPower</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#79C0FF" }}>1.0</span><span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
              {"        "}<span style={{ color: "#E6EDF3" }}>);</span>{"\n"}
              {"    "}<span style={{ color: "#E6EDF3" }}>{"}"}</span>{"\n\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Command </span><span style={{ color: "#D2A8FF" }}>intakeReverse</span><span style={{ color: "#E6EDF3" }}>() {"{"}</span>{"\n"}
              {"        "}<span style={{ color: "#FF7B72" }}>return new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span><span style={{ color: "#E6EDF3" }}>(</span>{"() ->"}{"\n"}
              {"                "}{"intakeMotor"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>setPower</span><span style={{ color: "#E6EDF3" }}>(-</span><span style={{ color: "#79C0FF" }}>1.0</span><span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
              {"        "}<span style={{ color: "#E6EDF3" }}>);</span>{"\n"}
              {"    "}<span style={{ color: "#E6EDF3" }}>{"}"}</span>{"\n\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Command </span><span style={{ color: "#D2A8FF" }}>intakeOff</span><span style={{ color: "#E6EDF3" }}>() {"{"}</span>{"\n"}
              {"        "}<span style={{ color: "#FF7B72" }}>return new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span><span style={{ color: "#E6EDF3" }}>(</span>{"() ->"}{"\n"}
              {"                "}{"intakeMotor"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>setPower</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#79C0FF" }}>0.0</span><span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
              {"        "}<span style={{ color: "#E6EDF3" }}>);</span>{"\n"}
              {"    "}<span style={{ color: "#E6EDF3" }}>{"}"}</span>{"\n"}
              <span style={{ color: "#E6EDF3" }}>{"}"}</span>
            </>}
          />
          <CodeBlock
            file="AutoCommands.java"
            label="Command"
            code={<>
              <span style={{ color: "#FF7B72" }}>public class </span><span style={{ color: "#E6EDF3" }}>AutoCommands </span>{"{"}{"\n\n"}
              {"    "}<span style={{ color: "#8B949E" }}>{"/// This is an example made with NextFTC 1.0"}</span>{"\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Command </span><span style={{ color: "#D2A8FF" }}>intake</span>{"("}<span style={{ color: "#E6EDF3" }}>PathChain </span>{"path) {"}{"\n"}
              {"        "}<span style={{ color: "#FF7B72" }}>return new </span><span style={{ color: "#E6EDF3" }}>ParallelDeadlineGroup</span>{"("}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>FollowPath</span>{"(path, "}<span style={{ color: "#FF7B72" }}>true</span>{"),"}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span>{"("}<span style={{ color: "#E6EDF3" }}>IntakeRoller</span>{"::"}<span style={{ color: "#D2A8FF" }}>setFor</span>{"),"}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>WaitUntil</span>{"(() ->"}{"\n"}
              {"                        "}<span style={{ color: "#E6EDF3" }}>PedroComponent</span>{"."}<span style={{ color: "#D2A8FF" }}>follower</span>{"()."}<span style={{ color: "#D2A8FF" }}>getCurrentTValue</span>{"() >= "}<span style={{ color: "#79C0FF" }}>0.30</span>{"\n"}
              {"                )."}<span style={{ color: "#D2A8FF" }}>then</span>{"("}{"\n"}
              {"                        "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span>{"("}{"\n"}
              {"                                "}<span style={{ color: "#E6EDF3" }}>Launcher</span>{"."}<span style={{ color: "#E6EDF3" }}>INSTANCE</span>{"::"}<span style={{ color: "#D2A8FF" }}>setLauncherStateIdle</span>{"\n"}
              {"                        )"}{"\n"}
              {"                )"}{"\n"}
              {"        "}{")"}<span style={{ color: "#E6EDF3" }}>{";"}</span>{"\n"}
              {"    }"}{"\n\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Command </span><span style={{ color: "#D2A8FF" }}>launch</span>{"("}<span style={{ color: "#E6EDF3" }}>PathChain </span>{"path, "}<span style={{ color: "#FF7B72" }}>double </span>{"triggerPoint) {"}{"\n"}
              {"        "}<span style={{ color: "#FF7B72" }}>return new </span><span style={{ color: "#E6EDF3" }}>ParallelDeadlineGroup</span>{"("}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>FollowPath</span>{"(path, "}<span style={{ color: "#FF7B72" }}>true</span>{"),"}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span>{"(() ->"}{"\n"}
              {"                        "}<span style={{ color: "#E6EDF3" }}>Turret</span>{"."}<span style={{ color: "#E6EDF3" }}>INSTANCE</span>{"."}<span style={{ color: "#D2A8FF" }}>turretAuto</span>{"(path."}<span style={{ color: "#D2A8FF" }}>endPose</span>{"())"}{"\n"}
              {"                ),"}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>WaitUntil</span>{"(() ->"}{"\n"}
              {"                        "}<span style={{ color: "#E6EDF3" }}>PedroComponent</span>{"."}<span style={{ color: "#D2A8FF" }}>follower</span>{"()."}<span style={{ color: "#D2A8FF" }}>getCurrentTValue</span>{"() >= triggerPoint"}{"\n"}
              {"                )."}<span style={{ color: "#D2A8FF" }}>then</span>{"("}{"\n"}
              {"                        "}<span style={{ color: "#E6EDF3" }}>LauncherGroup</span>{"."}<span style={{ color: "#E6EDF3" }}>INSTANCE</span>{".closeLaunchForAuto"}{"\n"}
              {"                )"}{"\n"}
              {"        "}{")"}<span style={{ color: "#E6EDF3" }}>{";"}</span>{"\n"}
              {"    }"}{"\n\n"}
              {"    "}<span style={{ color: "#FF7B72" }}>public </span><span style={{ color: "#E6EDF3" }}>Command </span><span style={{ color: "#D2A8FF" }}>intakeUntilFull</span>{"("}<span style={{ color: "#FF7B72" }}>double </span>{"timeout) {"}{"\n"}
              {"        "}<span style={{ color: "#FF7B72" }}>return new </span><span style={{ color: "#E6EDF3" }}>ParallelRaceGroup</span>{"("}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>Delay</span>{"(timeout),"}{"\n"}
              {"                "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>SequentialGroup</span>{"("}{"\n"}
              {"                        "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span>{"("}<span style={{ color: "#E6EDF3" }}>IntakeRoller</span>{"::"}<span style={{ color: "#D2A8FF" }}>setFor</span>{"),"}{"\n"}
              {"                        "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>WaitUntil</span>{"("}{"\n"}
              {"                                "}<span style={{ color: "#E6EDF3" }}>SpindexerSensors</span>{"."}<span style={{ color: "#E6EDF3" }}>INSTANCE</span>{"::"}<span style={{ color: "#D2A8FF" }}>isSpindexerFull</span>{"\n"}
              {"                        ),"}{"\n"}
              {"                        "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>InstantCommand</span>{"("}<span style={{ color: "#E6EDF3" }}>IntakeRoller</span>{"::"}<span style={{ color: "#D2A8FF" }}>setOff</span>{")"}{"\n"}
              {"                )"}{"\n"}
              {"        "}{")"}<span style={{ color: "#E6EDF3" }}>{";"}</span>{"\n"}
              {"    }"}{"\n"}
              {"}"}
            </>}
          />
        </div>

        <p className="mt-6 text-[12.5px] text-subtle">
          Examples are for shape, not for copy-paste. Full working examples
          may be released in the future — see the
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
  code: React.ReactNode;
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
      <pre className="overflow-x-auto px-5 py-5" style={{ color: "#E6EDF3" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}



/* =====================================================
 * References — community libraries & docs
 * ===================================================== */
function References() {
  const items = [
    
    {
      tag: "Library",
      title: "NextFTC",
      desc: "A framework with simplified hardware setup, controls, and easy to use commands.",
      href: "https://nextftc.dev",
    },
    {
      tag: "Library",
      title: "Ivy",
      desc: "A simple, easy to use, and powerful command-based control flow library for FTC (No hardware abstraction, just commands)",
      href: "https://pedropathing.com/docs/ivy",
    },
    {
      tag: "Library",
      title: "SolversLib",
      desc: "A maintained FTCLib fork that provides command-based architecture and programming tools for FTC teams.",
      href: "http://docs.seattlesolvers.com/",
    },
    {
      tag: "Reference",
      title: "WPILib Commands",
      desc: "This is the library that familiarized commands in FRC and many FTC libraries use similair concepts. Definely a good read when learning about commands.",
      href: "https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html",
    },
  ];
  return (
    <section id="references" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              <span className="block text-fade">Check out some of the common libraries</span>
            </>
          }
          desc="I reccomend researching every library and seeing which one actually works best for you and what you want."
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
                <div className="text-xl font-medium tracking-tight text-foreground">
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
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              What Ivy and Command Based programming looks like  
              <span className="block text-fade">- a Pedro Pathing video by Davis Luxenburg.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted sm:text-base">
              This is a 30-minute walkthrough of the Ivy library and the basics of
              commands. Though it is heavily focused on Ivy most stuff he talks about can transfer to other librariers.
            </p>

            <div
              className="mt-10 overflow-hidden rounded-2xl border"
              style={{
                borderColor: "var(--border)",
                boxShadow:
                  "0 20px 50px -20px rgba(0,0,0,0.45)",
              }}
            >
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/vTk3mzjlf2k"
                  title="How Ivy works "
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackLink() {
  return (
    <div className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <a href="/software-platform" className="text-sm text-muted transition-colors hover:text-foreground">
          ← Back to Software Platform
        </a>
      </div>
    </div>
  );
}

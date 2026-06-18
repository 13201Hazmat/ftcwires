import {
  PageHero,
  SectionHeader,
  SectionEyebrow,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  ArrowUpRight,
} from "../_lib/ui";

export const metadata = {
  title: "Roadrunner — FTC Wires",
  description:
    "A quick overview of Roadrunner, a motion planning library used by FTC teams for accurate and smooth autonomous navigation.",
};

export default function RoadrunnerPage() {
  return (
    <>
      <PageHero
        title={
          <>
            <span className="block text-fade">Roadrunner</span>
          </>
        }
        desc={
          <>
            Roadrunner is a motion planning library for FTC. It generates
            motion profiles that control velocity and acceleration so your
            robot follows trajectories smoothly and consistently in autonomous.
          </>
        }
        cta={
          <>
            <PrimaryButton
              href="https://learnroadrunner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              learnroadrunner.com
              <ArrowUpRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="#what-it-is" className="w-full sm:w-auto">
              What is Roadrunner?
            </GhostButton>
          </>
        }
      />

      <WhatItIs />
      <WhyTeams />
      <VideoSection />
      <SignUp />
      <OfficialResources />
    </>
  );
}

/* =====================================================
 * What is Roadrunner?
 * ===================================================== */
function WhatItIs() {
  return (
    <section id="what-it-is" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 text-base leading-relaxed text-muted">
            <p>
              Roadrunner is a{" "}
              <span className="text-foreground">motion planning library</span>{" "}
              for FTC. It generates motion-profiled trajectories using
              feedforward and feedback control, so your robot follows paths
              smoothly and consistently. With the addtion of using splines
               allow a path to change heading contiously.
            </p>
            <p>
              You define a trajectory using a builder and Roadrunner handles
              the math. It has a built-in actions system, it also works with libraries
              like NextFTC, and supports{" "}
              <span className="text-foreground">mecanum and tank drivetrains</span>.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl border font-mono text-[12.5px] leading-relaxed"
              style={{
                borderColor: "#1a1a1a",
                background: "#000000",
                boxShadow: "0 20px 50px -20px rgba(0,0,0,0.8)",
              }}
            >
              <div
                className="flex items-center gap-1.5 border-b px-4 py-3"
                style={{ borderColor: "#1a1a1a" }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#333" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#333" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#333" }} />
                <span className="ml-3 text-[11px]" style={{ color: "#444" }}>CycleAuto.java</span>
              </div>
              <pre className="overflow-x-auto px-5 py-5 text-[12.5px] leading-7" style={{ color: "#E6EDF3" }}>
                <code>
                  <span style={{ color: "#E6EDF3" }}>Trajectory myTrajectory </span><span style={{ color: "#E6EDF3" }}>=</span>{" drive."}<span style={{ color: "#D2A8FF" }}>trajectoryBuilder</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>Pose2d())</span>{"\n"}
                  {"    "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>strafeRight</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#79C0FF" }}>10</span><span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"    "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>forward</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#79C0FF" }}>5</span><span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"    "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>build</span><span style={{ color: "#E6EDF3" }}>();</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Why teams use it
 * ===================================================== */
function WhyTeams() {
  const items = [
    {
      title: "Motion-profiled trajectories",
      desc: "Generates and follows trajectories using a feedforward and feedback control. Includes a code-based path visualizer to preview paths before running them.",
    },
    {
      title: "Tuning is mostly automatic ",
      desc: "Four of the tuning steps are automatic with two manual ones.",
    },
    {
      title: "Built-in tools",
      desc: "Automatically implements bulk reading, logs values to telemetry and a file every OpMode run which can be run by AdvantageScope. RR also uses the FIRST coordinate system.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Why Roadrunner
              <span className="block text-fade">is useful in FTC.</span>
            </>
          }
          desc="Roadrunner has a learning curve especially moving from blocks, but once you're familiar with it, it allows for highly consitent autos."
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
 * Video
 * ===================================================== */
function VideoSection() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          title={
            <>
              Roadrunner
              <span className="block text-fade">example auto.</span>
            </>
          }
          desc="A video of what our example auto does."
        />

        <div
          className="mt-12 overflow-hidden rounded-2xl border"
          style={{
            borderColor: "var(--border)",
            boxShadow: "0 20px 50px -20px rgba(0,0,0,0.45)",
          }}
        >
          <div className="relative aspect-video w-full">
            <video
              src="/roadrunner.mov"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Sign up — Google Form CTA
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
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
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
              <span className="block text-fade">to access the auto guides</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              We ask for your team number and contact info so we can see which
              teams are using these resources and send updates if something
              changes. The guides include help for setting up autonomous code
              including Roadrunner and Pedro Pathing examples. We also provide
              a basic sample auto that teams can adapt to their own robot.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/register">
                Register your team
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <span className="text-[12.5px] text-subtle">Only takes about 30 seconds.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Official resources
 * ===================================================== */
function OfficialResources() {
  const items = [
    {
      tag: "Guide",
      title: "Learn Roadrunner",
      desc: "The go-to community guide for Roadrunner. Covers installation, tuning every parameter, and building trajectories from scratch.",
      href: "https://learnroadrunner.com/introduction.html",
    },
    {
      tag: "GitHub",
      title: "GitHub repository",
      desc: "The source code  and the quickstart for Roadrunner.",
      href: "https://github.com/acmerobotics/road-runner-quickstart",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Check out
              <span className="block text-fade">the official docs.</span>
            </>
          }
          desc="FTC W.I.R.E.S. has created easy guides and example block autos. Though if you want to learn more, check out the official docs."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-start gap-6 overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
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

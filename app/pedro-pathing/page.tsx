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
  title: "Pedro Pathing — FTC Wires",
  description:
    "A quick overview of Pedro Pathing, an FTC pathing library used for building autonomous routines.",
};

export default function PedroPathingPage() {
  return (
    <>
      <PageHero
        title={
          <>
            <span className="block text-fade">Pedro Pathing</span>
          </>
        }
        desc={
          <>
            Pedro Pathing helps FTC teams build smoother autos
            without relying only on timed based movements like other pathers such as Roadrunner. Many teams use Pedro for
            pathing and on the spot paths in auto and tele op.
          </>
        }
        cta={
          <>
            <PrimaryButton
              href="https://pedropathing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              Official docs
              <ArrowUpRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="#what-it-is" className="w-full sm:w-auto">
              What is Pedro Pathing?
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
 * Video
 * ===================================================== */
function VideoSection() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          title={
            <>
              Pedro Pathing
              <span className="block text-fade">example auto</span>
            </>
          }
          desc="A video of what our example auto does"
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
              src="/java.mov"
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
 * What is Pedro Pathing?
 * ===================================================== */
function WhatItIs() {
  return (
    <section id="what-it-is" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 text-base leading-relaxed text-muted">
            <p>
              Pedro Pathing is a{" "}
              <span className="text-foreground">path following library</span>{" "}
              for FTC. Instead of only using time-based or simple drive commands,
              you give the robot a point-to-point line or curve to follow across
              the field.
            </p>
            <p>
              You define where the robot starts, where it should go, and how it
              should move between points. Pedro handles the pathing side so your
              robot can follow that route more consistently.
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
                  {"path "}<span style={{ color: "#E6EDF3" }}>=</span>{" follower."}<span style={{ color: "#D2A8FF" }}>pathBuilder</span><span style={{ color: "#E6EDF3" }}>()</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>addPath</span><span style={{ color: "#E6EDF3" }}>(</span>{"\n"}
                  {"    "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>BezierLine</span><span style={{ color: "#E6EDF3" }}>(</span>{"scorePose"}<span style={{ color: "#E6EDF3" }}>, </span>{"pickupPose"}<span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>setLinearHeadingInterpolation</span><span style={{ color: "#E6EDF3" }}>(</span>{"\n"}
                  {"    "}{"scorePose"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>getHeading</span><span style={{ color: "#E6EDF3" }}>(),</span>{"\n"}
                  {"    "}{"pickupPose"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>getHeading</span><span style={{ color: "#E6EDF3" }}>()</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>addPath</span><span style={{ color: "#E6EDF3" }}>(</span>{"\n"}
                  {"    "}<span style={{ color: "#FF7B72" }}>new </span><span style={{ color: "#E6EDF3" }}>BezierLine</span><span style={{ color: "#E6EDF3" }}>(</span>{"pickupPose"}<span style={{ color: "#E6EDF3" }}>, </span>{"scorePose"}<span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>setLinearHeadingInterpolation</span><span style={{ color: "#E6EDF3" }}>(</span>{"\n"}
                  {"    "}{"pickupPose"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>getHeading</span><span style={{ color: "#E6EDF3" }}>(),</span>{"\n"}
                  {"    "}{"scorePose"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>getHeading</span><span style={{ color: "#E6EDF3" }}>()</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>)</span>{"\n"}
                  {"  "}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>build</span><span style={{ color: "#E6EDF3" }}>();</span>{"\n\n"}
                  {"follower"}<span style={{ color: "#E6EDF3" }}>.</span><span style={{ color: "#D2A8FF" }}>followPath</span><span style={{ color: "#E6EDF3" }}>(</span>{"path"}<span style={{ color: "#E6EDF3" }}>);</span>
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
      title: "Build paths faster",
      desc: "Create simple lines or bezier curves, and easily adjust if you need to change something.",
    },
    {
      title: "Works well with command-based",
      desc: "Paths can be combined with commands, which makes autos easier to organize with a sequential command group. Using libraries like Ivy or NextFTC.",
    },
    {
      title: "Predictive Braking",
      desc: "A control method that learns how your robot slows down, then uses that to stop more accurately. This also helps reduce the amount of tuning needed for your robot ",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Why Pedro Pathing
              <span className="block text-fade">is useful in FTC.</span>
            </>
          }
          desc="It will not automatically give you the best auto in the world, but it will make pathing and auto a lot easier for you."
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
 * Official resources
 * ===================================================== */
function OfficialResources() {
  const items = [
  
    {
      tag: "Setup",
      title: "Installation guide",
      desc: "The official guide for Pedro.",
      href: "https://pedropathing.com/docs/pathing/installation",
    },
    {
      tag: "Github",
      title: "GitHub repository",
      desc: "The GitHub  for Pedro Pathing.",
      href: "https://github.com/Pedro-Pathing",
    },
    {
      tag: "Tutorials",
      title: "Tutorials",
      desc: "Walkthrough videos for tuning PIDF and also some good videos to watch about software in general.",
      href: "https://www.youtube.com/@PedroPathing/videos",
    },
    {
      tag: "Community",
      title: "Community links",
      desc: "Find the Discord, GitHub, and other resources linked from the Pedro Pathing site.",
      href: "https://pedropathing.com/",
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
              <span className="block text-fade">to access the auto guides</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              We ask for your team number and contact info so we can see which
              teams are using these resources and send updates if something
              changes. The guides include help for setting up autonomous code in
              Blocks and Java, including Pedro Pathing and Road Runner examples.
              We also provide a basic sample auto that teams can adapt to their
              own robot. The guide drive will be there at the end of the form.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/register">
                Register your team
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <span className="text-[12.5px] text-subtle">
                Only takes about 30 seconds.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
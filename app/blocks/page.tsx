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
  title: "Blocks — FTC Wires",
  description:
    "A quick overview of FTC Blocks, the drag-and-drop programming tool it's pretty much like Scratch if you ever have used it. It's built into the Rev Hardware Client for teams getting started without Java and new to programming.",
};

export default function BlocksPage() {
  return (
    <>
      <PageHero
        title={
          <>
            <span className="block text-fade">Blocks</span>
          </>
        }
        desc={
          <>
              A quick overview of FTC Blocks, the drag-and-drop programming tool it's pretty much like Scratch if you ever have used it. It's built into the Rev Hardware Client for teams getting started without Java and new to programming.,
          </>
        }
        cta={
          <>
            <PrimaryButton
              href="https://ftc-docs.firstinspires.org/en/latest/programming_resources/blocks/Blocks-Tutorial.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              Official docs
              <ArrowUpRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="#what-it-is" className="w-full sm:w-auto">
              What is Blocks?
            </GhostButton>
          </>
        }
      />

      <WhatItIs />
      <WhyTeams />
      <VideoSection />
      <SignUp />
      <OfficialResources />
      <BackLink />
    </>
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
              Blocks
              <span className="block text-fade">example auto.</span>
            </>
          }
          desc="A short walkthrough to help you get started."
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
              src="/block.mp4"
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
 * What is Blocks?
 * ===================================================== */
function WhatItIs() {
  return (
    <section id="what-it-is" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 text-base leading-relaxed text-muted">
            <p>
              Blocks are a{" "}
              <span className="text-foreground">visual programming tool</span>{" "}
              for FTC. Instead of writing Java, you snap together colored blocks
              that represent actions, loops, and logic to build an OpMode.
            </p>
            <p>
              It runs through the Rev Hardware Client, 
              so you should only have to instally the app.
              It is a fast way to get a robot moving and to
              learn how logic are structured before moving to Java.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blocks-example.png"
              alt="FTC Blocks example OpMode"
              className="w-full rounded-2xl"
            />
            <p className="mt-4 text-[12.5px] text-subtle">
              A sample OpMode in the FTC Blocks editor. You build programs by
              snapping these blocks together.
            </p>
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
      title: "No Java required",
      desc: "New programmers can build working OpModes without learning much syntax. Great for rookie teams and first-time programmers. The logic you learn in Blocks mostly carries over directly. Many teams start in Blocks and move to OnBot Java or Android Studio later",
    },
    {
      title: "One thing to install",
      desc: "Blocks are avaible through the Rev Hardware Client and you can easily download and use it.",
    },
    {
      title: "Easy to follow logic",
      desc: "Loops, conditions, and motor commands are all visual, which makes it easier to see how a logic works. Great for learning how code logic works.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Why Blocks
              <span className="block text-fade">is a good place to start.</span>
            </>
          }
          desc="Blocks will not allow you to write the most complex programs, but it is a really good way to learn how code works."
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

/* =====================================================
 * Official resources
 * ===================================================== */
function OfficialResources() {
  const items = [
    {
      tag: "Tutorial",
      title: "Blocks Programming Tutorial",
      desc: "The official FTC block docs.",
      href: "https://ftc-docs.firstinspires.org/en/latest/programming_resources/blocks/Blocks-Tutorial.html",
    },
    {
      tag: "Rev",
      title: "Rev Hardware Client",
      desc: "Software designed to manage REV devices and code and run Blocks",
      href: "https://docs.revrobotics.com/rev-hardware-client",
    },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Check out
              <span className="block text-fade">some resources.</span>
            </>
          }
          desc="FTC WI.R.E.S. has created easy guides and example block autos. Though if you want to learn more, check out the official docs."
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

import {
  PageHero,
  SectionHeader,
  SectionEyebrow,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  CheckIcon,
} from "../_lib/ui";

export const metadata = {
  title: "Git Setup for FTC — FTC Wires",
  description:
    "A step-by-step guide to setting up Git and GitHub for FTC teams — create an account, install Git, fork the FtcRobotController, and clone it straight into Android Studio without ever touching the command line.",
};

export default function GitPage() {
  return (
    <>
      <PageHero
        eyebrow="Guide · Git Setup"
        title={
          <>
            Set up Git
            <span className="block text-fade">for your FTC team.</span>
          </>
        }
        desc={
          <>
            A short detour from the Android Studio guide. You&rsquo;ll create
            a GitHub account, install git, fork the official{" "}
            <span className="text-foreground">FtcRobotController</span> repo,
            and clone it straight into Android Studio &mdash; no terminal
            required. When you&rsquo;re done, you head straight back to Step 4
            of the Android Studio walkthrough.
          </>
        }
      />

      <Overview />
      <WhyGit />
      <Steps />
      <Troubleshooting />
      <NextSteps />
    </>
  );
}

/* =====================================================
 * Overview
 * ===================================================== */
function Overview() {
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
            <span className="text-foreground">Where this fits.</span> This
            guide is the &ldquo;Recommended&rdquo; path from{" "}
            <InlineLink href="/android-studio#step-02">
              Step 2 of the Android Studio Setup
            </InlineLink>
            . Finish it and your FtcRobotController project will be cloned and
            open in Android Studio &mdash; pick up at Step 4.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatChip label="Total time" value="~20–30 min" />
          <StatChip label="Skill level" value="Beginner" />
          <StatChip label="Cost" value="Free" />
        </div>
      </div>
    </section>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl border px-4 py-3"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="text-[10px] uppercase tracking-widest text-subtle">
        {label}
      </div>
      <div className="mt-1 text-[14px] font-medium tracking-tight text-foreground">
        {value}
      </div>
    </div>
  );
}

/* =====================================================
 * Why Git
 * ===================================================== */
function WhyGit() {
  const items: { title: string; desc: string }[] = [
    {
      title: "Multiple programmers can work on the same codebase",
      desc: "Two students can work on two subsystems without copying files over each other or being limited by one computer can do the work.",
    },
    {
      title: "Every change is recoverable",
      desc: "If you messed up your autonomous the night before a competition? Roll back one commit and you're fixed. Without git, you'd be rewriting it. (Not very fun)",
    },
    {
      title: "Easy to share with mentors and other teams",
      desc: "Push your code to GitHub. Anyone with the URL can see, review, or borrow it. Makes it a lot easier to get help and learn from others.",
    },
   
  ];
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Why bother"
          title={
            <>
              Why Git? 
            </>
          }
          desc="The best FTC team use version control. Here's why."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-3xl border p-7"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
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
 * Steps — the walkthrough
 * ===================================================== */
type StepData = {
  n: string;
  title: string;
  time: string;
  intro: string;
  bullets?: React.ReactNode[];
  imageDesc: string;
  note?: string;
};

const STEPS: StepData[] = [
  {
    n: "01",
    title: "Create a GitHub account",
    time: "~5 min",
    intro:
      "GitHub is where your code lives online. It hosts your team's project, lets multiple students collaborate, and is the standard the entire FTC community uses.",
    bullets: [
      <>
        Open{" "}
        <InlineLink href="https://github.com/signup">
          github.com/signup
        </InlineLink>{" "}
        and click <strong className="text-foreground">Sign up</strong>.
      </>,
      "Enter an email, personal email for each person and most likely one team email.",
      "Follow directions for setting up your account."
    ],
    imageDesc:
      "GitHub sign-up page with username, email, and password fields visible.",
    note:
      "If this account is for the team (not just you) and create an organization for the team. That way, all students can be added as members and have access to the code.",
  },
  {
    n: "02",
    title: "Install Git and point Android Studio at it",
    time: "~5–10 min",
    intro:
      "Android Studio talks to GitHub through Git, so Git has to be on your computer. You won't type any commands — once it's installed, Android Studio finds it for you.",
    bullets: [
      <>
        <strong className="text-foreground">Windows:</strong> Download from{" "}
        <InlineLink href="https://git-scm.com/download/win">
          git-scm.com/download/win
        </InlineLink>{" "}
        and run the installer. Accept the defaults — they&rsquo;re fine for
        FTC.
      </>,
      <>
        <strong className="text-foreground">macOS:</strong> Git usually comes
        with the Xcode Command Line Tools. If Android Studio can&rsquo;t find
        Git later, it pops up a button to install it — just click that.
      </>,
      <>
        <strong className="text-foreground">Linux (Debian/Ubuntu):</strong>{" "}
        Install the <CodeInline>git</CodeInline> package from your distro&rsquo;s
        software center — it may already be present.
      </>,
      <>
        In Android Studio, open{" "}
        <strong className="text-foreground">
          Settings → Version Control → Git
        </strong>
        . Android Studio auto-detects the Git executable — click{" "}
        <strong className="text-foreground">Test</strong> and you should see
        the detected version number.
      </>,
    ],
    imageDesc:
      "Android Studio Settings open to Version Control → Git, showing the detected Git path and a green success message after clicking Test.",
  },
  {
    n: "03",
    title: "Sign in to GitHub from inside Android Studio",
    time: "~2 min",
    intro:
      "Connecting your GitHub account inside Android Studio lets it clone, push, and pul",
    bullets: [
      <>
        Open{" "}
        <strong className="text-foreground">
          Settings (Bottom Left)→ Version Control → GitHub
        </strong>
        .
      </>,
      <>
        Click the <strong className="text-foreground">+</strong> (Add account)
        and choose{" "}
        <strong className="text-foreground">Log In with GitHub…</strong> Your
        browser shoudl open and asks you to authorize Android Studio.
      </>,
    ],
    imageDesc:
      "Android Studio Settings on the Version Control → GitHub panel, with a connected GitHub account listed and the 'Log In with GitHub' option visible.",
    },
  {
    n: "04",
    title: "Fork the FtcRobotController on GitHub",
    time: "~2 min",
    intro:
      "Forking makes your own copy of the official FtcRobotController repo on GitHub. You'll do all your team's code in your fork",
    bullets: [
      <>
        Open{" "}
        <InlineLink href="https://github.com/FIRST-Tech-Challenge/FtcRobotController">
          github.com/FIRST-Tech-Challenge/FtcRobotController
        </InlineLink>
        .
      </>,
      <>
        In the top-right, click <strong className="text-foreground">Fork</strong>.
      </>,
      "Choose your account (or your team's account) as the owner.",
      "Choose the best repo name for what you think e.g. '26-27 BioBuzz TeamName'",
      <>
        Click <strong className="text-foreground">Create fork</strong>. GitHub
        copies the repo to your account.
      </>,
    ],
    imageDesc:
      "FtcRobotController GitHub page with the Fork button highlighted in the top-right corner.",
    note:
      "You can only have one fork of a given repo per account. If your team already forked it (e.g. a previous season's lead), use the existing fork — don't try to create a second one.",
  },
  {
    n: "05",
    title: "Clone your fork in Android Studio",
    time: "~3–5 min",
    intro:
      "To be able to edit your code, you'll need to clone your fork locally.",
    bullets: [
      "On YOUR fork's page (not the official one), click the green Code button and copy the HTTPS URL.",
      <>
        On the Android Studio Welcome screen, click{" "}
        <strong className="text-foreground">Clone Repository</strong>. (If a
        project is already open, use{" "}
        <strong className="text-foreground">
          File → New → Project from Version Control
        </strong>{" "}
        instead.)
      </>,
      "Paste your fork's URL into the URL field.",
      "Pick a folder for the project in the Directory field (e.g. your Documents folder, I like to keep a seperate folder for Robotics projects).",
      <>
        Click <strong className="text-foreground">Clone</strong>. Android
        Studio downloads the project and opens it — the repo is now in your Android Studio!
      </>,
    ],
    imageDesc:
      "Android Studio's 'Clone Repository' dialog with the fork's HTTPS URL pasted into the URL field, a target directory chosen, and the Clone button highlighted.",
    },
];

function Steps() {
  return (
    <section id="steps" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="The walkthrough"
          title={
            <>
              Five steps,
              <span className="block text-fade">to help clone your repo.</span>
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
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ step, isFirst }: { step: StepData; isFirst: boolean }) {
  return (
    <article
      id={`step-${step.n}`}
      className="scroll-mt-32 px-6 py-12 sm:px-10 sm:py-16 lg:px-14"
      style={!isFirst ? { borderTop: "1px solid var(--hairline)" } : undefined}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="font-mono text-3xl font-semibold text-subtle">
            {step.n}
          </div>
          <span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-muted"
            style={{ borderColor: "var(--border)" }}
          >
            {step.time}
          </span>
        </div>
        <div className="lg:col-span-9">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {step.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {step.intro}
          </p>

          {step.bullets ? (
            <ol
              className="mt-6 overflow-hidden rounded-2xl border"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 2%, transparent)",
              }}
            >
              {step.bullets.map((b, bi) => (
                <li
                  key={bi}
                  className="flex items-start gap-3 px-5 py-4 text-[14px] leading-relaxed text-foreground"
                  style={
                    bi !== 0
                      ? { borderTop: "1px solid var(--hairline)" }
                      : undefined
                  }
                >
                  <span className="mt-0.5 font-mono text-[11px] text-subtle">
                    {String(bi + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>
          ) : null}

          <ImagePlaceholder description={step.imageDesc} />

          {step.note ? <NoteBox>{step.note}</NoteBox> : null}
        </div>
      </div>
    </article>
  );
}

/* =====================================================
 * Troubleshooting
 * ===================================================== */
function Troubleshooting() {
  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "Someone else on my team made a change. How do I get it?",
      a: (
        <>
          Click{" "}
          <strong className="text-foreground">Git → Update Project</strong>{" "}
          (the blue down-arrow in the toolbar, or{" "}
          <CodeInline>Ctrl+T</CodeInline> /{" "}
          <CodeInline>&#8984;T</CodeInline>). Android Studio fetches and merges
          any new commits from your fork on GitHub.
        </>
      ),
    },
    {
      q: "I made a change. How do I send it to GitHub?",
      a: (
        <>
          Two steps, both from the menu: open the Commit panel (the green
          check, or <CodeInline>Ctrl+K</CodeInline> /{" "}
          <CodeInline>&#8984;K</CodeInline>), write a short message, and click{" "}
          <strong className="text-foreground">Commit</strong>. Then push with{" "}
          <strong className="text-foreground">Git → Push</strong> (
          <CodeInline>Ctrl+Shift+K</CodeInline> /{" "}
          <CodeInline>&#8984;&#8679;K</CodeInline>). Your teammates pick it up
          with <strong className="text-foreground">Update Project</strong>.
        </>
      ),
    },
    {
      q: "How do I create an optimal Git Branching strategy for my team?",
      a: (
        <>
          A branching strategy is a set of rules for how your team uses branches in Git.
           A simple strategy is to have a main branch for stable code, and feature branches for new work. 
           Merge feature branches into main when they're ready. 
           For more complex strategies, consider looking up "Git Flow" or "GitHub Flow" for guidance.
           Here is an example of a branching strategy used by  
           <InlineLink href="https://drive.google.com/file/d/1LQcf7mohxpwZ86rShiGeOLJ0EEIijYts/view?usp=sharing">
           Team Hazmat.
          </InlineLink>
        </>
      ),
    },
  ];

  return (
    <section id="troubleshooting" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Troubleshooting"
          title={
            <>
              Questions?
            </>
          }
        />

        <ul
          className="mt-16 overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          {items.map((it, i) => (
            <li
              key={it.q}
              className="px-6 py-7 sm:px-8"
              style={
                i !== 0
                  ? { borderTop: "1px solid var(--hairline)" }
                  : undefined
              }
            >
              <div className="text-[15px] font-medium text-foreground">
                {it.q}
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {it.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =====================================================
 * Next Steps — back to Android Studio
 * ===================================================== */
function NextSteps() {
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
            <SectionEyebrow>You&rsquo;re done</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Project cloned.
              <span className="block text-fade">
                Back to Android Studio.
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-muted sm:text-base">
              Your FtcRobotController project is already open in Android
              Studio. Continue from Step 4 of the setup walkthrough.
            </p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <PrimaryButton href="/android-studio#step-04">
                Continue at Step 4
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton href="/software-platform">
                Browse software guides
              </GhostButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Shared step helpers (mirror /android-studio so the
 * two guides feel like one continuous experience)
 * ===================================================== */
function ImagePlaceholder({ description }: { description: string }) {
  return (
    <div
      className="relative mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center"
      style={{
        borderColor: "var(--border-strong)",
        background: "color-mix(in oklab, var(--foreground) 2%, transparent)",
      }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-xl"
        style={{
          background:
            "color-mix(in oklab, var(--foreground) 6%, transparent)",
        }}
      >
        <PictureIcon className="h-5 w-5 text-subtle" />
      </span>
      <p className="max-w-md text-[13px] leading-relaxed text-muted">
        <span className="text-foreground">Screenshot:</span> {description}
      </p>
      <span className="text-[10px] font-medium uppercase tracking-widest text-subtle">
        Placeholder · to be added
      </span>
    </div>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 flex items-start gap-3 rounded-2xl border px-5 py-4"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in oklab, var(--foreground) 3%, transparent)",
      }}
    >
      <span
        className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full"
        style={{ background: "#f59e0b" }}
      />
      <p className="text-[13px] leading-relaxed text-muted">
        <span className="text-foreground">Heads up.</span> {children}
      </p>
    </div>
  );
}

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

function CodeInline({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded-md border px-1.5 py-0.5 font-mono text-[12.5px]"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in oklab, var(--foreground) 4%, transparent)",
        color: "var(--foreground)",
      }}
    >
      {children}
    </code>
  );
}

function PictureIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="1.75" />
      <path d="M3 17l5-5 4 4 3-3 6 6" />
    </svg>
  );
}

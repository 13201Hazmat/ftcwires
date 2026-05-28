import {
  PageHero,
  SectionHeader,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  ArrowUpRight,
} from "../_lib/ui";

export const metadata = {
  title: "Resources — FTC Wires",
  description:
    "Hardware, software, game strategy, important sites, team info, and collaborative documents for Wisconsin FTC teams.",
};

type ResourceCategory = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  links: { label: string; href: string; desc: string }[];
};

const CATEGORIES: ResourceCategory[] = [
  {
    id: "important-sites",
    tag: "Links",
    title: "Important Sites",
    blurb:
      "The handful of tabs every FTC team keeps open during build season.",
    links: [
      {
        label: "FIRST Tech Challenge",
        desc: "Game manuals, official rules, event registration.",
        href: "https://www.firstinspires.org/robotics/ftc",
      },
      {
        label: "ftc-docs",
        desc: "Canonical software and control system documentation.",
        href: "https://ftc-docs.firstinspires.org",
      },
      {
        label: "GoBilda",
        desc: "Drivetrains, structure, and the build standard most teams use.",
        href: "https://www.gobilda.com",
      },
      {
        label: "REV Robotics",
        desc: "Control hubs, motors, and the electronics platform.",
        href: "https://www.revrobotics.com",
      },
    ],
  },
  {
    id: "team-info",
    tag: "Directory",
    title: "Team Info",
    blurb:
      "The Wisconsin team information sheet — meet, message, and mentor across teams.",
    links: [
      {
        label: "WI Team Information Sheet",
        desc: "Add your team to the statewide directory.",
        href: "#",
      },
      {
        label: "Mentor & alumni list",
        desc: "Veteran mentors open to questions from new teams.",
        href: "#",
      },
    ],
  },
  {
    id: "collaborate",
    tag: "Shared",
    title: "Collaborate",
    blurb:
      "Open documents, scouting boards, and channels for live inter-team coordination.",
    links: [
      {
        label: "Shared scouting workbook",
        desc: "A template every team can fork before competition.",
        href: "#",
      },
      {
        label: "Inter-team channel",
        desc: "Where Wisconsin teams ask questions and share fixes.",
        href: "#",
      },
    ],
  },
  {
    id: "general",
    tag: "Start here",
    title: "General Resources",
    blurb:
      "Rookie onboarding, safety basics, season structure, and parent-friendly guides.",
    links: [
      {
        label: "First-season guide for rookies",
        desc: "What a typical season actually looks like, week by week.",
        href: "#",
      },
      {
        label: "Safety & PPE checklist",
        desc: "Set up a safe shop on a school or community budget.",
        href: "#",
      },
    ],
  },
  {
    id: "hardware",
    tag: "Build",
    title: "Hardware",
    blurb:
      "Proven drivetrains, intakes, lifts, and BOMs — copy a known-good design.",
    links: [
      {
        label: "Mecanum drivetrain BOM",
        desc: "A documented, build-tested baseline drivetrain.",
        href: "#",
      },
      {
        label: "Slide mechanisms 101",
        desc: "Cascade, continuous, and tube — when to use which.",
        href: "#",
      },
      {
        label: "Intake design patterns",
        desc: "Recurring intake archetypes and when they win.",
        href: "#",
      },
    ],
  },
  {
    id: "software",
    tag: "Code",
    title: "Software",
    blurb:
      "Java templates, Android Studio setup, tuning guides, and reusable subsystems.",
    links: [
      {
        label: "Autonomous template",
        desc: "Drop-in starter from the FTC Wires software platform.",
        href: "/software-platform",
      },
      {
        label: "Command-Based Architecture",
        desc: "Educational guidance and references for scalable FTC codebases.",
        href: "/command-based",
      },
      {
        label: "Subsystem patterns",
        desc: "How to structure code so it survives rebuilds.",
        href: "#",
      },
      {
        label: "Roadrunner tuning notes",
        desc: "Tuning checklist that gets you to repeatable autos.",
        href: "#",
      },
    ],
  },
  {
    id: "game-strategy",
    tag: "Game",
    title: "Game Strategy",
    blurb: "Scoring math, scouting templates, and alliance selection frameworks.",
    links: [
      {
        label: "Scoring math worksheet",
        desc: "Translate the game manual into a per-second EV model.",
        href: "#",
      },
      {
        label: "Alliance selection playbook",
        desc: "How veteran teams pick (and get picked) on selection day.",
        href: "#",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Everything teams ask for,
            <span className="block text-fade">in one library.</span>
          </>
        }
        desc="A curated, community-maintained library. Submit what helped your team, borrow what helps you ship."
        cta={
          <>
            <PrimaryButton href="/contact" className="w-full sm:w-auto">
              Contribute a resource
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="#hardware" className="w-full sm:w-auto">
              Jump to Hardware
            </GhostButton>
          </>
        }
      />

      <Categories />
    </>
  );
}

function Categories() {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl space-y-4">
        {CATEGORIES.map((c) => (
          <article
            key={c.id}
            id={c.id}
            className="scroll-mt-32 overflow-hidden rounded-3xl border"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <div className="grid grid-cols-1 gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                  style={{ borderColor: "var(--border)" }}
                >
                  {c.tag}
                </span>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {c.blurb}
                </p>
              </div>
              <ul className="lg:col-span-8">
                {c.links.map((l, i) => (
                  <li
                    key={l.label}
                    style={
                      i !== 0
                        ? { borderTop: "1px solid var(--hairline)" }
                        : undefined
                    }
                  >
                    <a
                      href={l.href}
                      className="group flex items-start gap-4 py-5 transition-colors hover:bg-foreground/[0.02]"
                    >
                      <div className="flex-1">
                        <div className="text-[15px] font-medium text-foreground">
                          {l.label}
                        </div>
                        <div className="mt-1 text-[13px] leading-relaxed text-muted">
                          {l.desc}
                        </div>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

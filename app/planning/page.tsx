import {
  PageHero,
  PrimaryButton,
  GhostButton,
  SectionEyebrow,
  ArrowRight,
  CheckIcon,
} from "../_lib/ui";

export const metadata = {
  title: "Planning — FTC Wires",
  description:
    "Season roadmaps, communication frameworks, and sponsorship playbooks for FTC teams.",
};

type Section = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  blurb: string;
  bullets: string[];
};

const SECTIONS: Section[] = [
  {
    id: "season",
    number: "01",
    eyebrow: "Roadmap",
    title: "What to do throughout the season",
    blurb:
      "A week-by-week roadmap from kickoff through state championship — when to prototype, when to freeze, when to iterate.",
    bullets: [
      "Pre-season: build the team, the shop, and the calendar",
      "Kickoff to week 4: prototype broadly, decide late",
      "Mid-season: design freeze, drive practice, scouting build-out",
      "Post-qualifier: triage, iterate, rest before championship",
    ],
  },
  {
    id: "communication",
    number: "02",
    eyebrow: "Operations",
    title: "Tips for Communication & Success",
    blurb:
      "How to run a standup, when to call a design review, and the meeting cadence that keeps a 15-student team aligned.",
    bullets: [
      "A 10-minute standup template that actually works",
      "Design reviews: how to give feedback that doesn't sting",
      "Captains' weekly sync — agenda and outcomes",
      "Async updates so parents and mentors stay in the loop",
    ],
  },
  {
    id: "sponsorship",
    number: "03",
    eyebrow: "Sustainability",
    title: "Sponsorship",
    blurb:
      "Outreach templates, sponsorship tiers, and stewardship cadences that turn a one-time check into a multi-year partnership.",
    bullets: [
      "First-email template that gets replies",
      "Tier structure: small, recurring, founding",
      "Mid-season update letter (the one most teams skip)",
      "End-of-season thank-you that earns next year",
    ],
  },
];

export default function PlanningPage() {
  return (
    <>
      <PageHero
        eyebrow="Planning"
        title={
          <>
            Run a season
            <span className="block text-fade">that doesn&rsquo;t burn out.</span>
          </>
        }
        desc="The operational layer that separates teams that ship from teams that scramble."
        cta={
          <>
            <PrimaryButton href="#season" className="w-full sm:w-auto">
              Start with the roadmap
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="/contact" className="w-full sm:w-auto">
              Talk to a mentor
            </GhostButton>
          </>
        }
      />

      <div className="px-6 pb-32">
        <div className="mx-auto max-w-6xl space-y-6">
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-32 overflow-hidden rounded-3xl border"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-subtle">
                      {s.number}
                    </span>
                    <SectionEyebrow>{s.eyebrow}</SectionEyebrow>
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                    {s.blurb}
                  </p>
                </div>
                <ul className="space-y-3 lg:col-span-7">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-2xl border p-5 text-sm leading-relaxed text-muted"
                      style={{
                        borderColor: "var(--border)",
                        background:
                          "color-mix(in oklab, var(--foreground) 2%, transparent)",
                      }}
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-foreground" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

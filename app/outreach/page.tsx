import {
  PageHero,
  PrimaryButton,
  GhostButton,
  SectionHeader,
  ArrowRight,
} from "../_lib/ui";

export const metadata = {
  title: "Outreach — FTC Wires",
  description:
    "Outreach ideas, where to start, and sponsorship playbooks for growing your local FTC community.",
};

type Section = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  bullets: { label: string; desc: string }[];
};

const SECTIONS: Section[] = [
  {
    id: "ideas",
    tag: "Inspiration",
    title: "Ideas",
    blurb:
      "Proven event formats — library demos, summer camps, elementary-school workshops — with ready-to-run agendas.",
    bullets: [
      {
        label: "Library robot demo",
        desc: "A 60-minute community demo that fits in any branch library.",
      },
      {
        label: "Elementary classroom visit",
        desc: "30-minute lesson plan and parts kit for K–5 classrooms.",
      },
      {
        label: "Summer FTC camp",
        desc: "5-day camp curriculum that hands rookies a working bot.",
      },
      {
        label: "Mentor-a-rookie program",
        desc: "Pair veteran students with new teams during build season.",
      },
    ],
  },
  {
    id: "where-to-start",
    tag: "Playbook",
    title: "Where to Start",
    blurb:
      "A first-month plan for new outreach leads: who to email, what to say, and how to measure impact for awards.",
    bullets: [
      {
        label: "Week 1: list your audience",
        desc: "Schools, libraries, community orgs within 30 minutes of your shop.",
      },
      {
        label: "Week 2: pitch one event",
        desc: "Use the template, schedule one demo, learn from the response.",
      },
      {
        label: "Week 3: deliver and document",
        desc: "Run it, capture photos, gather a quote — these become award fuel.",
      },
      {
        label: "Week 4: thank, follow up, repeat",
        desc: "Most outreach value comes from the second visit, not the first.",
      },
    ],
  },
  {
    id: "sponsorships",
    tag: "Partnerships",
    title: "Sponsorships",
    blurb:
      "Local businesses to approach, pitch decks that convert, and steward-the-relationship templates for next season.",
    bullets: [
      {
        label: "Who to approach first",
        desc: "Local manufacturers, engineering shops, and family businesses.",
      },
      {
        label: "The pitch packet",
        desc: "One-page leave-behind, deck, and budget sheet that get to yes.",
      },
      {
        label: "Stewardship cadence",
        desc: "Touchpoint schedule that turns a one-time check into a multi-year partner.",
      },
    ],
  },
];

export default function OutreachPage() {
  return (
    <>
      <PageHero
        eyebrow="Outreach"
        title={
          <>
            Grow the community
            <span className="block text-fade">that grows you.</span>
          </>
        }
        desc="Outreach isn't extra-curricular — it's how the next rookie team in your district gets started."
        cta={
          <>
            <PrimaryButton href="#ideas" className="w-full sm:w-auto">
              See the ideas
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="/contact" className="w-full sm:w-auto">
              Share your event
            </GhostButton>
          </>
        }
      />

      <div className="px-6 pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                minHeight: 240,
              }}
            >
              <span
                className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                style={{ borderColor: "var(--border)" }}
              >
                {s.tag}
              </span>
              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                {s.blurb}
              </p>
              <span className="mt-auto pt-6 text-[13px] font-medium text-foreground">
                Read &rarr;
              </span>
            </a>
          ))}
        </div>
      </div>

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
                <div className="lg:col-span-4">
                  <span
                    className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {s.tag}
                  </span>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                    {s.blurb}
                  </p>
                </div>
                <ul className="lg:col-span-8">
                  {s.bullets.map((b, i) => (
                    <li
                      key={b.label}
                      className="py-5"
                      style={
                        i !== 0
                          ? { borderTop: "1px solid var(--hairline)" }
                          : undefined
                      }
                    >
                      <div className="text-[15px] font-medium text-foreground">
                        {b.label}
                      </div>
                      <div className="mt-1 text-[13px] leading-relaxed text-muted">
                        {b.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>

      <SectionCTA />
    </>
  );
}

function SectionCTA() {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          eyebrow="Share back"
          title={
            <>
              Run a great event?
              <span className="block text-fade">Send us the playbook.</span>
            </>
          }
          desc="The best outreach resources are the ones that worked for someone else first."
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact">
            Share your outreach
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton href="/resources">Browse resources</GhostButton>
        </div>
      </div>
    </section>
  );
}

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
    "Per-event team spotlights from Wisconsin FTC. Each event is tagged with the FTC judged awards it helps your team build a case for.",
};

/* =====================================================
 * Types
 * ===================================================== */
type AwardName =
  | "Inspire"
  | "Connect"
  | "Reach"
  | "Sustain"
  | "Leadership";

type SpotlightLink = {
  label: string;
  href: string;
  external?: boolean;
};

type Spotlight = {
  teamNumber: string;
  teamName: string;
  title: string;
  desc: string;
  imageDesc: string;
  awards?: AwardName[];
  links?: SpotlightLink[];
  placeholder?: boolean;
  former?: boolean;
  statewide?: boolean;
};

/* =====================================================
 * Award reference — only TA (judged) awards relevant to outreach
 * ===================================================== */
const AWARD_INFO: Record<AwardName, string> = {
  Inspire:
    "Overall team excellence — robot, outreach, gracious professionalism. The headline judged award.",
  Connect:
    "Engaging the engineering community and connecting with mentors, sponsors, and other teams.",
  Reach:
    "Broad community reach — how widely your team's engineering and FIRST message lands.",
  Sustain:
    "Long-term team sustainability — pipeline, fundraising, mentorship across years.",
  Leadership:
    "FIRST Leadership Award — leading in the wider FIRST community, not just on your own team.",
};

/* =====================================================
 * Spotlights — per event, grouped by team
 * ===================================================== */
const SPOTLIGHTS: Spotlight[] = [
  /* ----- Statewide initiative ----- */
  {
    teamNumber: "Statewide",
    teamName: "FIRST Wisconsin",
    title: "State Advocacy Day at the Capitol",
    desc: "Every February, FIRST teams from across Wisconsin gather at the State Capitol in Madison to advocate for STEM funding. Organized by the FIRST Wisconsin State Advocacy Committee with Senior Mentor Emma Schuff — open to any Wisconsin team that wants to participate.",
    imageDesc:
      "Wisconsin FTC teams gathered at the State Capitol on Advocacy Day.",
    awards: ["Inspire", "Connect", "Reach", "Leadership"],
    links: [
      {
        label: "Email Emma Schuff",
        href: "mailto:eschuff@firstinspires.org",
        external: true,
      },
    ],
    statewide: true,
  },

  /* ----- Team 13201 Hazmat ----- */
  {
    teamNumber: "13201",
    teamName: "Hazmat",
    title: "Project WISER",
    desc: "Women Inspired in STEM, Engaged by Robotics. Hazmat's flagship gender-equity initiative — a multi-year program connecting girls in the area to robotics through workshops, mentorship, and direct pathways into FTC and the launch of Superstellar (an all-girls team).",
    imageDesc:
      "Project WISER event — students working on a robotics project together.",
    awards: ["Inspire", "Connect", "Reach", "Leadership"],
  },
  {
    teamNumber: "13201",
    teamName: "Hazmat",
    title: "MakerFaire Milwaukee booth",
    desc: "A weekend booth at MakerFaire Milwaukee — robot demonstrations, hands-on activities, and one-on-one conversations with families curious about getting their kid into FIRST.",
    imageDesc:
      "Team 13201 Hazmat at the MakerFaire Milwaukee booth with the competition robot.",
    awards: ["Connect", "Reach"],
  },
  {
    teamNumber: "13201",
    teamName: "Hazmat",
    title: "BEAST STEM Camp partnership",
    desc: "An ongoing partnership with the BEAST STEM Camp — team members run robotics sessions, mentor campers, and feed interest in FIRST into local school programs.",
    imageDesc:
      "Hazmat team members leading a robotics session at BEAST STEM Camp.",
    awards: ["Connect", "Reach", "Sustain"],
  },
  {
    teamNumber: "13201",
    teamName: "Hazmat",
    title: "Community center demos — Children's Hospital & Maruf Center",
    desc: "Robot demonstrations at the Children's Hospital and the Maruf Center, designed to reach kids who might never otherwise see a competition robot up close.",
    imageDesc:
      "Team 13201 Hazmat running a robot demo at a community center.",
    awards: ["Connect", "Reach"],
  },

  /* ----- Team 19367 Alien ----- */
  {
    teamNumber: "19367",
    teamName: "Alien",
    title: "STEM Sisters online networking",
    desc: "An online networking program connecting girls nationally with university students and STEM professionals. Built as a structured mentorship pipeline rather than a one-off event.",
    imageDesc:
      "Screenshot or photo of a STEM Sisters online networking session.",
    awards: ["Connect", "Reach", "Leadership"],
    former: true,
  },
  {
    teamNumber: "19367",
    teamName: "Alien",
    title: "Greendale 4th of July robot float",
    desc: "A custom-built robot-themed float in the Greendale 4th of July Parade. Annual community visibility that converts curious bystanders into FIRST families.",
    imageDesc:
      "Team 19367 Alien's robot float in the Greendale 4th of July Parade.",
    awards: ["Connect", "Reach"],
    former: true,
  },
  {
    teamNumber: "19367",
    teamName: "Alien",
    title: "STEM Park & Rec afterschool classes",
    desc: "Recurring afterschool classes for elementary students through the local Park & Rec — a low-cost on-ramp that doubles as the team's biggest source of mentees.",
    imageDesc:
      "Park & Rec afterschool STEM class led by Team 19367 Alien members.",
    awards: ["Connect", "Reach", "Sustain"],
    former: true,
  },

  /* ----- Team 8680 Kraken Pinion ----- */
  {
    teamNumber: "8680",
    teamName: "Kraken Pinion",
    title: "Robot in 30 Hours competition",
    desc: "An annual competition Kraken Pinion runs for the community — teams build a working robot from scratch in 30 hours. Acts as both an outreach event and a recruitment funnel.",
    imageDesc:
      "Robot in 30 Hours competition floor, teams mid-build.",
    awards: ["Connect", "Reach", "Leadership"],
  },
  {
    teamNumber: "8680",
    teamName: "Kraken Pinion",
    title: "Girls Who Code partnership",
    desc: "A structured partnership with a local Girls Who Code chapter — joint sessions, shared mentors, and a clear path for GWC students into the team.",
    imageDesc:
      "Joint session with Team 8680 Kraken Pinion and Girls Who Code members.",
    awards: ["Connect", "Reach", "Sustain"],
  },
  {
    teamNumber: "8680",
    teamName: "Kraken Pinion",
    title: "KPOpinions review video series",
    desc: "A team-produced YouTube series reviewing FTC parts, mechanisms, and seasons. Public-facing content that builds the team's voice in the community.",
    imageDesc:
      "Thumbnail or production setup from the KPOpinions video series.",
    awards: ["Connect", "Reach"],
  },

  /* ----- Team 16460 GEarheads ----- */
  {
    teamNumber: "16460",
    teamName: "GEarheads",
    title: "Computer refurbishment program",
    desc: "Refurbishing donated computers and redistributing them to FTC teams that can't afford their own programming hardware. A direct lever on the cost barrier to FIRST participation.",
    imageDesc:
      "Team 16460 GEarheads' refurbishment workshop — students at workstations with donated machines.",
    awards: ["Sustain", "Connect", "Leadership"],
  },
  {
    teamNumber: "16460",
    teamName: "GEarheads",
    title: "Mechanical skills YouTube tutorials",
    desc: "Tutorial videos on Agile Sprints, metal fabrication, and mechanical skills — built specifically for FTC teams that don't have shop access or experienced mentors.",
    imageDesc:
      "Screenshot from a GEarheads YouTube mechanical skills tutorial.",
    awards: ["Connect", "Reach"],
  },

  /* ----- Team 9956 The Knack ----- */
  {
    teamNumber: "9956",
    teamName: "The Knack",
    title: "Hosted an FTC qualifier tournament",
    desc: "Hosted a full FTC qualifier tournament — logistics, judging coordination, field setup, the whole event. The kind of contribution that the local FIRST ecosystem depends on.",
    imageDesc:
      "FTC qualifier tournament hosted by Team 9956 The Knack — competition floor and audience.",
    awards: ["Inspire", "Connect", "Leadership"],
    former: true,
  },
  {
    teamNumber: "9956",
    teamName: "The Knack",
    title: "Milwaukee Wave Game kickoff demonstration",
    desc: "A live robot demonstration at the Milwaukee Wave indoor soccer game's pre-game kickoff. Reached an audience of thousands who'd otherwise never see an FTC robot.",
    imageDesc:
      "Team 9956 The Knack demonstrating the robot at the Milwaukee Wave Game kickoff.",
    awards: ["Connect", "Reach"],
    former: true,
  },

  /* ----- Team 19417 Superstellar ----- */
  {
    teamNumber: "19417",
    teamName: "Superstellar",
    title: "Women Leaders in STEM interview series",
    desc: "A YouTube interview series profiling women leaders in STEM. Public, evergreen content that broadens what the next generation of girls thinks an engineer looks like.",
    imageDesc:
      "Thumbnail or behind-the-scenes from a Women Leaders in STEM interview.",
    awards: ["Connect", "Reach"],
  },

  /* ----- Placeholder ----- */
  {
    teamNumber: "—",
    teamName: "Your team",
    title: "Your spotlight goes here",
    desc: "Ran a great outreach event last season? Submit it as a spotlight. We'll feature your team's story so other Wisconsin teams can borrow what worked.",
    imageDesc:
      "Photo from your team's outreach event — students, robot, audience.",
    links: [{ label: "Submit your spotlight", href: "/contact" }],
    placeholder: true,
  },
];

/* =====================================================
 * Page
 * ===================================================== */
export default function OutreachPage() {
  return (
    <>
      <PageHero
        eyebrow="Outreach · Team Spotlights"
        title={
          <>
            Outreach by
            <span className="block text-fade">Wisconsin FTC teams.</span>
          </>
        }
        desc="Real events, run by real teams. Each spotlight is tagged with the FTC judged awards it helps your team build a case for — browse for inspiration, borrow what works, add your story."
        cta={
          <>
            <PrimaryButton href="#spotlights" className="w-full sm:w-auto">
              See the spotlights
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="#award-legend" className="w-full sm:w-auto">
              What the award tags mean
            </GhostButton>
          </>
        }
      />

      <AwardLegend />
      <Spotlights />
      <Tips />
      <SubmitCTA />
    </>
  );
}

/* =====================================================
 * Award legend — quick reference for what each tag means
 * ===================================================== */
function AwardLegend() {
  return (
    <section id="award-legend" className="px-6 pb-16 lg:pb-24 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Award legend"
          title={
            <>
              FTC judged awards
              <span className="block text-fade">an outreach event can support.</span>
            </>
          }
          desc="The Team Attribute awards most directly affected by outreach. Each spotlight below carries the tags of the awards that event helps build a case for."
        />

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(AWARD_INFO) as [AwardName, string][]).map(
            ([name, desc]) => (
              <div
                key={name}
                className="flex flex-col gap-2 rounded-2xl border p-5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <AwardTag name={name} large />
                <p className="text-[13px] leading-relaxed text-muted">
                  {desc}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Spotlights — horizontal team cards
 * ===================================================== */
function Spotlights() {
  return (
    <section id="spotlights" className="px-6 pb-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl space-y-6">
        {SPOTLIGHTS.map((s, i) => (
          <SpotlightCard key={`${s.teamNumber}-${i}`} spotlight={s} />
        ))}
      </div>
    </section>
  );
}

function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  return (
    <article
      className="group relative overflow-hidden rounded-[2rem] border transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow:
          "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset, 0 12px 32px -20px rgba(0,0,0,0.45)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT — image */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/3] w-full lg:h-full lg:aspect-auto lg:min-h-[340px]">
            <SpotlightImage
              description={spotlight.imageDesc}
              isPlaceholder={spotlight.placeholder}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-6 right-0 hidden w-px lg:block"
              style={{ background: "var(--hairline)" }}
            />
          </div>
        </div>

        {/* RIGHT — content */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-14">
          <TeamChip spotlight={spotlight} />

          <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {spotlight.title}
          </h3>

          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted sm:text-base">
            {spotlight.desc}
          </p>

          {spotlight.awards && spotlight.awards.length > 0 ? (
            <div className="mt-6">
              <div className="text-[11px] font-medium uppercase tracking-widest text-subtle">
                Contributes to
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {spotlight.awards.map((a) => (
                  <AwardTag key={a} name={a} />
                ))}
              </div>
            </div>
          ) : null}

          {spotlight.links && spotlight.links.length > 0 ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {spotlight.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group/link inline-flex items-center gap-1.5 text-[13.5px] font-medium text-foreground transition-transform hover:translate-x-0.5"
                >
                  {l.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function TeamChip({ spotlight }: { spotlight: Spotlight }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-widest text-subtle">
      <span
        className="rounded-full border px-2.5 py-1"
        style={{
          borderColor: spotlight.statewide
            ? "color-mix(in oklab, #f59e0b 50%, var(--border))"
            : "var(--border)",
          color: spotlight.statewide ? "#f59e0b" : "var(--foreground)",
        }}
      >
        {spotlight.statewide
          ? "Statewide Initiative"
          : `Team ${spotlight.teamNumber}`}
      </span>
      <span>·</span>
      <span>{spotlight.teamName}</span>
      {spotlight.former ? (
        <>
          <span>·</span>
          <span className="text-[10px] italic normal-case tracking-normal text-subtle">
            former team
          </span>
        </>
      ) : null}
    </div>
  );
}

function AwardTag({
  name,
  large = false,
}: {
  name: AwardName;
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium text-foreground ${
        large
          ? "px-3 py-1.5 text-[12px]"
          : "px-2.5 py-1 text-[11px]"
      }`}
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--foreground) 4%, transparent)",
      }}
    >
      <StarIcon className={large ? "h-3.5 w-3.5" : "h-3 w-3"} />
      {name}
    </span>
  );
}

function SpotlightImage({
  description,
  isPlaceholder,
}: {
  description: string;
  isPlaceholder?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed p-8 text-center"
      style={{
        borderColor: "var(--border-strong)",
        background: isPlaceholder
          ? "color-mix(in oklab, var(--foreground) 1.5%, transparent)"
          : "color-mix(in oklab, var(--foreground) 3%, transparent)",
      }}
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-xl"
        style={{
          background:
            "color-mix(in oklab, var(--foreground) 6%, transparent)",
        }}
      >
        <PictureIcon className="h-6 w-6 text-subtle" />
      </span>
      <p className="max-w-xs text-[13px] leading-relaxed text-muted">
        <span className="text-foreground">Team photo:</span> {description}
      </p>
      <span className="text-[10px] font-medium uppercase tracking-widest text-subtle">
        Placeholder · to be added
      </span>
    </div>
  );
}

/* =====================================================
 * Tips — general outreach guidance
 * ===================================================== */
function Tips() {
  const tips: string[] = [
    "Start the season with a brainstorm — pull every team member into the room.",
    "Leverage existing connections — mentors, alumni, fellow teams, families.",
    "Schedule outreach year-round, but front-load spring and summer before build season.",
    "Combine fundraising with community impact — festivals and fairs do both.",
    "Mentor an FLL team — it's the most reliable pipeline for the next FTC rookie.",
    "Organize a community service drive — it's outreach your team can feel too.",
  ];
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="General tips"
          title={
            <>
              What works across
              <span className="block text-fade">every team we&rsquo;ve talked to.</span>
            </>
          }
          desc="A short list of practices that show up in almost every successful Wisconsin outreach program."
        />
        <ul className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-2">
          {tips.map((t, i) => (
            <li
              key={t}
              className="flex items-start gap-4 rounded-2xl border p-5"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <span className="font-mono text-[11px] text-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[14px] leading-relaxed text-foreground">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* =====================================================
 * Submit CTA
 * ===================================================== */
function SubmitCTA() {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader
          eyebrow="Share back"
          title={
            <>
              Run a great event?
              <span className="block text-fade">Send us the spotlight.</span>
            </>
          }
          desc="The best outreach examples are the ones that worked for someone else first. Send your event, a photo, the awards it supports, and a sentence on what made it work — we&rsquo;ll feature it."
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact">
            Submit your spotlight
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <GhostButton href="/resources">Browse resources</GhostButton>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Icons
 * ===================================================== */
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

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2.5l2.92 6.06 6.58.78-4.86 4.52 1.31 6.54L12 17.27 6.05 20.4l1.31-6.54L2.5 9.34l6.58-.78L12 2.5z" />
    </svg>
  );
}

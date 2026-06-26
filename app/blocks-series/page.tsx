import Link from "next/link";
import { PageHero, SectionHeader, ArrowUpRight } from "../_lib/ui";

export const metadata = {
  title: "Blocks for FTC — Video Series — FTC Wires",
  description:
    "A video series teaching FTC Blocks programming.",
};

type Episode = {
  number: number;
  title: string;
  desc: string;
  href?: string; // YouTube link when published
};

const EPISODES: Episode[] = [
  { number: 1, title: "Welcome to FTC and Blocks", desc: "" },
  { number: 2, title: "OpMode Basics", desc: "" },
  { number: 3, title: "Motors and Servos", desc: "" },
  { number: 4, title: "Drivetrain and Gamepad", desc: "" },
  { number: 5, title: "Conditionals and Smarter Controls", desc: "" },
  { number: 6, title: "Sensors", desc: "" },
  { number: 7, title: "Autonomous and Functions", desc: "" },
  { number: 8, title: "Loops and Variables", desc: "" },
  { number: 9, title: "Putting It All Together", desc: "" },
];

export default function BlocksSeriesPage() {
  const published = EPISODES.filter((e) => e.href);
  const upcoming = EPISODES.filter((e) => !e.href);

  return (
    <>
      <PageHero
        title={
          <>
            Blocks for FTC
            <span className="block text-fade">video series.</span>
          </>
        }
        desc="A beginner series teaching Block programming for FTC. We are still working on videos so not all of them are out yet."
      />

      <section className="px-6 pb-32 pt-8">
        <div className="mx-auto max-w-4xl">

          {/* Published */}
          {published.length > 0 && (
            <>
              <SectionHeader title="Available now" desc="" />
              <div className="mt-8 flex flex-col gap-4">
                {published.map((ep) => (
                  <EpisodeCard key={ep.number} ep={ep} />
                ))}
              </div>
            </>
          )}

          {/* Upcoming */}
          <SectionHeader
            title={published.length > 0 ? "Coming up" : "Episode lineup"}
          />
          <div className="mt-8 flex flex-col gap-3">
            {upcoming.map((ep) => (
              <UpcomingCard key={ep.number} ep={ep} />
            ))}
          </div>

          {/* Back */}
          <div className="mt-16">
            <Link
              href="/software-platform"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              ← Back to Software Platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function EpisodeCard({ ep }: { ep: Episode }) {
  return (
    <a
      href={ep.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-6 rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <span
        className="mt-0.5 shrink-0 font-mono text-xs text-subtle"
        style={{ minWidth: "2rem" }}
      >
        {String(ep.number).padStart(2, "0")}
      </span>
      <div className="flex-1">
        <p className="font-medium text-foreground">{ep.title}</p>
        <p className="mt-1 text-[13px] text-muted">{ep.desc}</p>
      </div>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

function UpcomingCard({ ep }: { ep: Episode }) {
  return (
    <div
      className="flex items-start gap-6 rounded-2xl border p-6 opacity-50"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <span
        className="mt-0.5 shrink-0 font-mono text-xs text-subtle"
        style={{ minWidth: "2rem" }}
      >
        {String(ep.number).padStart(2, "0")}
      </span>
      <div className="flex-1">
        <p className="font-medium text-foreground">{ep.title}</p>
        <p className="mt-1 text-[13px] text-muted">{ep.desc}</p>
      </div>
    </div>
  );
}

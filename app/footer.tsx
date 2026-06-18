import Link from "next/link";
import { WiresLogo } from "./_lib/ui";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Platform",
    links: [
      ["Software Platform", "/software-platform"],
      ["Parts Lending Network", "/parts-lending-network"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Important Sites", "/resources#important-sites"],
      ["Team Info", "/resources#team-info"],
      ["Collaborate", "/resources#collaborate"],
      ["Hardware", "/resources#hardware"],
      ["Software", "/resources#software"],
      ["Game Strategy", "/resources#game-strategy"],
      ["Command-Based", "/command-based"],
    ],
  },
  {
    title: "Planning",
    links: [
      ["Season Roadmap", "/planning#season"],
      ["Communication", "/planning#communication"],
      ["Sponsorship", "/planning#sponsorship"],
    ],
  },
  {
    title: "Outreach",
    links: [
      ["Ideas", "/outreach#ideas"],
      ["Where to Start", "/outreach#where-to-start"],
      ["Sponsorships", "/outreach#sponsorships"],
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-20"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="inline-flex">
              <WiresLogo size={28} />
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">
              Wisconsin Rises to Enable STEM Growth. An open community
              project led by Team 13201 Hazmat, with contributions from
              teams, mentors, and alumni across Wisconsin FTC.
            </p>
            <a
              href="mailto:ftcwires@gmail.com"
              className="mt-5 inline-block text-[13px] text-foreground"
            >
              ftcwires@gmail.com
            </a>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[11px] font-medium uppercase tracking-widest text-subtle">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13.5px] text-muted transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
}

import {
  PageHero,
  PrimaryButton,
  GhostButton,
  SectionHeader,
  ArrowRight,
  ArrowUpRight,
} from "../_lib/ui";

export const metadata = {
  title: "Contact — FTC Wires",
  description: "Get in touch with FTC Wires — ftcwires@gmail.com",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Contact us
          </>
        }
        desc="Request the software platform, ask questions, or just say hi. We try to answer everything."
        cta={
          <>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ftcwires@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90 sm:w-auto"
          >
            Email ftcwires@gmail.com
            <ArrowRight className="h-4 w-4" />
          </a>
          </>
        }
      />

      <Channels />
      <Contributors />
    </>
  );
}

function Channels() {
  const items = [
    {
      tag: "Email",
      label: "ftcwires@gmail.com",
      desc: "For questions about FTC W.I.R.E.S. and its resources.",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=ftcwires@gmail.com"
    },
    {
      tag: "Lead Team Email",
      label: "teamhazmat13201@gmail.com",
      desc: "Reach Team Hazmat directly.", 
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=teamhazmat13201@gmail.com",
    },
    {
      tag: "Team Hazmat Instagram",
      label: "Follow us for updates",
      desc: "Stay in the loop with the latest news and announcements.",
      href: "https://www.instagram.com/team13201hazmat/",
    },
    {
      tag: "GitHub",
      label: "Github Repo",
      desc: "Our github repo for WIRES, if you do want to contribute please fork and submit a PR!",
      href: "https://github.com/13201Hazmat/ftcwires",
    }
  ];

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Different ways
              <span className="block text-fade">to reach.</span>
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="group relative flex items-start gap-6 overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="flex-1">
                <div className="text-xl font-medium tracking-tight text-foreground">
                  {it.label}
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

function Contributors() {
  const people = [
    { username: "28shettr",       name: "Rohit Shetty",    role: "Team 13201 Hazmat" },
    { username: "amjadj",         name: "Amjad Jabbar",    role: "Hazmat Coach" },
    { username: "Aaditya-Tiwari", name: "Aaditya Tiwari",  role: "Hazmat Alumni" },
    { username: "28thakus",       name: "Shaurya Thakur",  role: "Team 13201 Hazmat" },
    { username: "FrontEndLol",    name: "Manyeh Luthra",   role: "Team 13201 Hazmat" },
  ];

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Contributors
              <span className="block text-fade">who helped create WIRES</span>
            </>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {people.map((p) => (
            <a
              key={p.username}
              href={`https://github.com/${p.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 overflow-hidden rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github.com/${p.username}.png`}
                alt={p.name}
                className="h-10 w-10 flex-none rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-medium text-foreground">
                  {p.name}
                </p>
                <p className="truncate text-[11.5px] text-muted">
                  {p.role}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


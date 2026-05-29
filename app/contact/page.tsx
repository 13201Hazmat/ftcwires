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
        eyebrow=""
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
      <FAQ />
    </>
  );
}

function Channels() {
  const items = [
    {
      tag: "Email",
      label: "ftcwires@gmail.com",
      desc: "The fastest way to reach us.",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=ftcwires@gmail.com"
    },
    {
      tag: "Lead Team Email",
      label: "teamhazmat13201@gmail.com",
      desc: "The fastest way to reach the core team.",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=teamhazmat13201@gmail.com",
    },
    {
      tag: "Team Hazmat Instagram",
      label: "Follow us for updates",
      desc: "Stay in the loop with the latest news and announcements.",
      href: "https://www.instagram.com/team13201hazmat/",
    }
  ];

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Get in touch"
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
                <span
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
                  style={{ borderColor: "var(--border)" }}
                >
                  {it.tag}
                </span>
                <div className="mt-6 text-xl font-medium tracking-tight text-foreground">
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

function FAQ() {
  const items = [
    {
      q: "Do we have to be a Wisconsin team to use FTC Wires?",
      a: "Most of our resources and the Parts Lending Network start with Wisconsin teams, but our software and written playbooks are useful for any FTC team. Get in touch and we'll point you to the right pieces.",
    },
    {
      q: "Is everything free?",
      a: "Yes. FTC Wires is a community initiative built by 13201 Team Hamzat + Wisconsin alumni and mentors. The software platform, resources, and the upcoming Parts Lending Network are free for participating teams.",
    },
    {
      q: "How can our team contribute?",
      a: "Submit a guide, list hardware for the lending poolor share an outreach playbook. Email us, everything is helpful!",
    },
  ];
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Common questions.</>}
        />
        <ul
          className="mt-12 overflow-hidden rounded-3xl border"
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

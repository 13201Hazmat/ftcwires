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
        eyebrow="Contact"
        title={
          <>
            Bring your team
            <span className="block text-fade">into the network.</span>
          </>
        }
        desc="Register your team, request the software platform, join the Parts Lending waitlist, or just say hi. We answer every email — usually the same day."
        cta={
          <>
            <PrimaryButton
              href="mailto:ftcwires@gmail.com"
              className="w-full sm:w-auto"
            >
              Email ftcwires@gmail.com
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton
              href="/parts-lending-network"
              className="w-full sm:w-auto"
            >
              Join the waitlist
            </GhostButton>
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
      desc: "The fastest way to reach the core team.",
      href: "mailto:ftcwires@gmail.com",
    },
    {
      tag: "Software",
      label: "Request the autonomous platform",
      desc: "Tell us your team number and we'll get you set up.",
      href: "/software-platform",
    },
    {
      tag: "Hardware",
      label: "Join the Parts Lending waitlist",
      desc: "Early access opens to founding teams first.",
      href: "/parts-lending-network",
    },
    {
      tag: "Contribute",
      label: "Submit a resource",
      desc: "Share a guide, BOM, or template that helped your team.",
      href: "mailto:ftcwires@gmail.com?subject=Resource%20submission",
    },
  ];

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Get in touch"
          title={
            <>
              Pick the door
              <span className="block text-fade">that fits.</span>
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

import { SectionHeader, PrimaryButton, GhostButton, ArrowUpRight, ArrowRight } from "../_lib/ui";

export const metadata = {
  title: "Sponsorship — FTC Wires",
  description:
    "Grants, discounts, and sponsorship resources for Wisconsin FTC teams, plus a sample sponsorship letter.",
};

export default function SponsorshipPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-24 pt-40 sm:pt-48 lg:pb-32 lg:pt-56">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="bg-spotlight absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(to top, var(--background), transparent)" }} />
        </div>
        <div className="animate-in mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Funding
            <span className="block text-fade">Resources</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A collection of grants, vendor discounts, and corporate programs available to FTC teams;
            some are Wisconsin only though most apply everywhere.
          </p>
        </div>
      </section>

      <HowTo />
      <Grants />
      <Letter />
    </>
  );
}

/* =====================================================
 * How to get sponsors
 * ===================================================== */
function HowTo() {
  const tips = [
    {
      n: "01",
      title: "Start with Family, Friends, and Local Businesses",
      desc: "Local businesses are more likely to say yes than large corporations. Places like hardware stores, restraunts etc. One big thing Hazmat does is check with their parents about if their company sponsors programs like FTC, as that is one of the best ways to obtain one.",
    },
    {
      n: "02",
      title: "Don't just pitch your robot",
      desc: "The robot is a big part of it, but a sponsor wants to know how their support is helping the communtiy, not your drivetrain rpm",
    },
    {
      n: "03",
      title: "Apply for every grant you can",
      desc: "Most of the grants below take under an hour to apply for. The FIRST Wisconsin grants, WI DPI matching funds, MSOE, and vendor sponsorships are all worth submitting. Do this as early as possible.",
    },
    {
      n: "05",
      title: "Follow up and say thank you",
      desc: "Send a thank you note after every donation. Update sponsors mid-season and at the end of the year with results. Sponsors who know their support is appreciated and being done for good will likely return as a sponsor in the following years.",
    },
  ];

  return (
    <section id="how-to" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="left"
          title={
            <>
              How to get
              <span className="block text-fade">sponsors.</span>
            </>
          }
        />
        <div
          className="mt-16 overflow-hidden rounded-3xl border"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {tips.map((tip, i) => (
            <div
              key={tip.n}
              className="flex flex-col gap-4 px-8 py-8 sm:flex-row sm:gap-12 sm:px-12"
              style={i !== 0 ? { borderTop: "1px solid var(--hairline)" } : undefined}
            >
              <span className="font-mono text-sm text-subtle flex-none">{tip.n}</span>
              <div>
                <h3 className="text-lg font-medium tracking-tight text-foreground">{tip.title}</h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Grants & discounts
 * ===================================================== */
type Grant = {
  name: string;
  tag: string;
  amount?: string;
  desc: string;
  links: { label: string; href: string }[];
};

const GRANTS: Grant[] = [
  {
    name: "FIRST Wisconsin Team Grants",
    tag: "Wisconsin",
    desc: "Multiple grant opportunities for Wisconsin teams. Check the link regularly — deadlines vary.",
    links: [{ label: "firstinspireswi.org", href: "https://www.firstinspireswi.org/post/first-team-grants" }],
  },
  {
    name: "Wisconsin DPI Robotics League Grant",
    tag: "Wisconsin",
    amount: "Up to $5,000",
    desc: "Matching funds as reimbursement for balance expenses. Submit before Nov 1. Paid at end of season.",
    links: [{ label: "dpi.wi.gov", href: "https://dpi.wi.gov/stem/grants/robotic-league" }],
  },
  {
    name: "MSOE Sponsorship",
    tag: "Wisconsin",
    amount: "Up to $500",
    desc: "For FRC and high-school FTC teams. Submission windows: Sep, Oct, Jan.",
    links: [{ label: "msoe.edu", href: "https://www.msoe.edu/about-msoe/k-12-stem-at-msoe/first-frc-ftc-amp-fll-team-sponsorship/" }],
  },
  {
    name: "FIRST Team Grants",
    tag: "National",
    desc: "Grants from various institutions. Filter by program and location on the FIRST site.",
    links: [{ label: "firstinspires.org/team-grants", href: "https://www.firstinspires.org/robotics/team-grants" }],
  },
  {
    name: "Gene Haas Foundation",
    tag: "National",
    desc: "Supports FIRST teams through the SAE/GHF competition grant program. Apply through the web portal.",
    links: [{ label: "Apply", href: "https://webportalapp.com/sp/login/ghf_first_sae_competitions" }],
  },
  {
    name: "Full grant spreadsheet graciously made by #25679",
    tag: "National",
    desc: "A community spreadsheet covering a large number of grants, discounts, and sponsorship opportunities for FTC teams.",
    links: [{ label: "View spreadsheet", href: "https://docs.google.com/spreadsheets/d/1r3xjIrP7uX1hlVNqKqBSDIXmQeQRP2pLLYg5KN7jqs4/edit?gid=0#gid=0" }],
  },
  {
    name: "PITSCO Rookie Grant",
    tag: "Vendor",
    amount: "$500",
    desc: "For new teams on registration. Goes toward electronics and field elements. Dashboard → Team Options → Order products.",
    links: [{ label: "my.firstinspires.org", href: "https://my.firstinspires.org/Dashboard" }],
  },
  {
    name: "REV Robotics",
    tag: "Vendor",
    desc: "15% discount voucher on dashboard. Also offers team sponsorship submissions in Sep–Oct.",
    links: [
      { label: "Discounts", href: "https://www.revrobotics.com/competition/ftc/discounts/" },
      { label: "Team Sponsorship", href: "https://www.revrobotics.com/team-sponsorship/" },
    ],
  },
  {
    name: "goBILDA",
    tag: "Vendor",
    desc: "25% discount for FTC teams. Tax exemption for nonprofits and public schools. Strafer Kit worth $500 for $150 (Sep–Oct). Also offers event donation requests and STEM scholarships for high school seniors.",
    links: [
      { label: "Team discount", href: "https://www.gobilda.com/ftc/" },
      { label: "Team sponsorship", href: "https://www.gobilda.com/ftc-team-sponsorships/" },
      { label: "Event donation", href: "https://www.gobilda.com/event-donation-requests/" },
      { label: "Scholarships", href: "https://www.gobilda.com/gobilda-first-robotics-scholarship/" },
    ],
  },
  {
    name: "ServoCity",
    tag: "Vendor",
    desc: "25% discount for FTC teams. Tax exemption for nonprofits and public schools. Team sponsorship and event donation requests available Sep–Oct.",
    links: [
      { label: "Team discount", href: "https://www.servocity.com/first_team_discounts/" },
      { label: "Team sponsorship", href: "https://www.servocity.com/ftc-team-sponsorships/" },
      { label: "Event donation", href: "https://www.servocity.com/ftc-event-sponsorships/" },
    ],
  },
  {
    name: "Studica Robotics",
    tag: "Vendor",
    desc: "Grant and team discounts available for FTC teams.",
    links: [
      { label: "Grant", href: "https://www.studica.com/studica-robotics-grant-application" },
      { label: "Team discount", href: "https://www.studica.com/studica-robotics-team-discount" },
    ],
  },
  {
    name: "GE Healthcare",
    tag: "Corporate",
    amount: "Up to $1,000",
    desc: "Employee must be a team mentor and contact Chuck Bartelsen at GE. Announced Sep–Nov. Paid through FIRST Funds & Grants.",
    links: [],
  },
  {
    name: "Lockheed Martin",
    tag: "Corporate",
    amount: "Up to $750",
    desc: "Employee must be a team mentor and initiate the request. Paid through FIRST Funds & Grants.",
    links: [{ label: "lockheedmartin.com", href: "https://www.lockheedmartin.com/en-us/who-we-are/communities/applying-for-contributions.html" }],
  },
  {
    name: "Johnson Controls",
    tag: "Corporate",
    amount: "Up to $750",
    desc: "Employee must be a team mentor and initiate the request. Paid through FIRST Funds & Grants.",
    links: [{ label: "johnsoncontrols.com", href: "https://www.johnsoncontrols.com/corporate-sustainability/community/philanthropy/funding-guidelines" }],
  },
  {
    name: "Rockwell Automation",
    tag: "Corporate",
    amount: "Up to $500",
    desc: "Employee must be a team mentor and initiate the request. Paid through FIRST Funds & Grants.",
    links: [],
  },
  {
    name: "ABB",
    tag: "Corporate",
    amount: "Up to $250",
    desc: "Employee must be a team mentor and initiate the request. Paid through FIRST Funds & Grants.",
    links: [],
  },
  {
    name: "John Deere",
    tag: "Corporate",
    desc: "Apply through FIRST team grants. Sponsors teams within 40 miles of a John Deere office, and teams with employee mentors.",
    links: [{ label: "firstinspires.org/team-grants", href: "https://www.firstinspires.org/robotics/team-grants" }],
  },
  {
    name: "Komatsu",
    tag: "Corporate",
    desc: "Employee must be a team mentor and initiate a request to the Manager of Social Responsibility in their organization.",
    links: [],
  },
  {
    name: "Amazon Smile / Tax Exemption",
    tag: "Other",
    desc: "Amazon donates 0.5% of purchases on smile.amazon.com to a designated nonprofit. Amazon also offers a tax-exempt program for eligible nonprofits.",
    links: [
      { label: "AmazonSmile", href: "https://smile.amazon.com/" },
      { label: "Tax exemption", href: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G2UQTUL5CHRCA7BL" },
    ],
  },
  {
    name: "Corporate Matching Gifts",
    tag: "Other",
    desc: "Most Wisconsin corporations offer matching gift programs for employee donations to nonprofits or public schools. If your org is a nonprofit, check whether parents' employers match — it can double a donation for free.",
    links: [{ label: "Example list (Elmbrook)", href: "https://www.elmbrookschools.org/elmbrook-education-foundation/about-us/gift-matching" }],
  },
  {
    name: "GEarheads Computer Project",
    tag: "Wisconsin",
    desc: "If your Wisconsin FTC or FLL team doesn't have the resources for laptops or computers, contact the GEarhead team.",
    links: [{ label: "ftcgearheads@gmail.com", href: "mailto:ftcgearheads@gmail.com" }],
  },
];

const TAG_ORDER = ["Wisconsin", "National", "Vendor", "Corporate", "Other"];

function Grants() {
  const grouped = TAG_ORDER.map((tag) => ({
    tag,
    items: GRANTS.filter((g) => g.tag === tag),
  }));

  return (
    <section id="grants" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          align="left"
          title={
            <>
              Grants &amp; discounts
              <span className="block text-fade">by category.</span>
            </>
          }
          desc="A sorted list of diffrent grant available you should start applying as soon as possible."
        />

        <div className="mt-16 flex flex-col gap-16">
          {grouped.map(({ tag, items }) => (
            <div key={tag}>
              <span className="text-[11px] font-medium uppercase tracking-widest text-subtle">{tag}</span>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((g) => (
                  <div
                    key={g.name}
                    className="flex flex-col gap-3 rounded-3xl border p-7"
                    style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  >
                    <div>
                      <h3 className="text-base font-medium tracking-tight text-foreground leading-snug">{g.name}</h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-muted">{g.desc}</p>
                    {g.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {g.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-foreground transition-colors"
                          >
                            {l.label}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
 * Sponsorship letter
 * ===================================================== */
function Letter() {
  return (
    <section id="letter" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-[2rem] border p-10 sm:p-16"
          style={{
            borderColor: "var(--border)",
            background: "linear-gradient(180deg, color-mix(in oklab, var(--foreground) 5%, var(--surface)), var(--surface))",
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.45)",
          }}
        >
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Sample sponsorship email
              <span className="block text-fade">updated it for your needs.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-muted">
              Replace the bracketed words with your team's information.
            </p>

            <div
              className="mt-10 rounded-2xl border p-8 font-mono text-[13px] leading-7 text-muted"
              style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--foreground) 2%, var(--background))" }}
            >
              <p className="text-foreground font-semibold">Subject: Sponsorship Opportunity with FTC Team [TEAM NUMBER] &ndash; [TEAM NAME]</p>

              <p className="mt-6">Hello [SPONSOR NAME],</p>

              <p className="mt-4">
                My name is [YOUR NAME], and I am a member of FTC Team [TEAM NUMBER], [TEAM NAME], based in
                [CITY/SCHOOL/ORGANIZATION]. We are a FIRST Tech Challenge robotics team made up of students who
                design, build, program, and compete with robots while learning engineering, teamwork, leadership,
                and business skills.
              </p>

              <p className="mt-4">
                This season, our team is working toward [GOAL: attending competitions, improving robot design,
                outreach, qualifying for state/regional championship, etc.]. To make this possible, we are seeking
                support from local businesses and community members.
              </p>

              <p className="mt-4">Your sponsorship would help us cover important team expenses such as:</p>
              <ul className="mt-2 ml-4 space-y-1 list-none">
                <li>— Robot parts and electronics</li>
                <li>— Competition registration fees</li>
                <li>— Tools and manufacturing supplies</li>
                <li>— Team shirts and outreach materials</li>
                <li>— Travel costs for events</li>
              </ul>

              <p className="mt-4">
                We would be grateful for any level of support, whether that is a financial donation, materials,
                tools, mentorship, or other resources. In return, we can recognize your business by placing your
                logo on our team shirt, robot, pit display, website, social media, or outreach materials.
              </p>

              <p className="mt-4">
                We would be happy to discuss a sponsorship option that works best for your business and answer
                any questions you may have.
              </p>

              <p className="mt-4">
                FTC has given our team the opportunity to explore STEM in a hands-on way, and support from
                sponsors like you allows students to keep learning, building, and representing our community.
              </p>

              <p className="mt-4">
                Thank you for considering supporting FTC Team [TEAM NUMBER], [TEAM NAME]. You can contact us
                at [EMAIL] or [PHONE NUMBER].
              </p>

              <p className="mt-6">Sincerely,</p>
              <p className="mt-1 text-foreground">
                [YOUR NAME]<br />
                [ROLE ON TEAM]<br />
                FTC Team [TEAM NUMBER] &ndash; [TEAM NAME]<br />
                [SCHOOL/ORGANIZATION]<br />
                [EMAIL]<br />
                [PHONE NUMBER]<br />
                [WEBSITE/SOCIAL MEDIA, IF ANY]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

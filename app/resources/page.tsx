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
      "Some important websites for FTC teams.",
    links: [
      {
        label: "FIRST Tech Challenge",
        desc: "Game manuals, official rules, event registration.",
        href: "https://www.firstinspires.org/robotics/ftc",
      },
      {
        label: "FTC Docs",
        desc: "Official FTC software and control system resources",
        href: "https://ftc-docs.firstinspires.org",
      },
      {
        label: "Resource Page for the Current Season",
        desc: "All rules and game information for the current season.",
        href: "https://www.firstinspires.org/resource-library/ftc/game-and-season-info",
      },
      
    ],
  },
  {
    id: "team-info",
    tag: "Directory",
    title: "Team Info",
    blurb:
      "Team contact info, wisconsin statewide directories, and the official FTC team search.",
    links: [
      {
        label: "WI Team Information Sheet",
        desc: "Add your team to the statewide directory.",
        href: "https://docs.google.com/spreadsheets/d/1LoPDYOcQMRxzrSfYHr_Tl5c3CwQim_ljFFa0kbwS0bo/edit?usp=sharing",
      },
      {
        label: "FTC Team Search",
        desc: "Search for teams all across the worlds.",
        href: "https://www.firstinspires.org/team-event-search",
      },
    ],
  },
  {
    id: "collaborate",
    tag: "Shared",
    title: "FTC Community",
    blurb:
      "Social places, to get help, help others, and socialize.",
    links: [
     
      {
        label: "FTC Discord",
        desc: "Connect with FTC teams, ask questions, share ideas, and get help.",
        href: "https://discord.gg/fbPt4rj2S",
      },
      {
        label: "FTC Reddit",
        desc: "Connect with FTC teams, ask questions, share ideas, and get help.",
        href: "https://www.reddit.com/r/FTC/",
      },
      {
        label: "FIRST Instagram",
        desc: "Follow FIRST on Instagram for updates, highlights, and community stories.",
        href: "https://www.instagram.com/first_official_/?hl=en",
      },
      
    ],
  },
  {
    id: "general",
    tag: "Start here",
    title: "General Resources",
    blurb:
      "Good general resources for FTC teams.",
    links: [
      {
        label: "Official FIRST Resources",
        desc: "Official season information, rules, updates, and FTC documentation from FIRST.",
        href: "https://www.firstinspires.org/resource-library/ftc/game-and-season-info",
      },
      {
        label: "Game Manual 0 (GM0)",
        desc: "One of the best community-made guides for learning FTC hardware, software, and strategy.",
        href: "https://gm0.org/en/latest/",
      },
      {
        label: "Index 47",
        desc: "A community-built FTC reference hub for acronyms, libraries, tools, and resources.",
        href: "https://index47.org/",
      },
      {
        label: "FTC SIM",
        desc: "A browser-based FTC simulator for practicing programming and robot control concepts.",
        href: "http://ftcsim.org/",
      },
      {
        label: "OnShape",
        desc: "Cloud-based CAD software widely used by FTC teams for robot design and collaboration.",
        href: "https://www.onshape.com",
      },
      {
        label: "Fusion Education Licesnse",
        desc: "Fusion 360 is Autodesk software for CAD, with free licenses for students.",
        href: "https://www.autodesk.com/education/edu-software/fusion",
      },
    ],
  },
{
  id: "hardware",
  tag: "Build",
  title: "Hardware",
  blurb:
    "Some Common Hardware Suppliers and Resources for FTC teams.",
  links: [
    {
      label: "GoBilda",
      desc: "A common FTC hardware supplier for drivetrains, motors, structure, motion components, and kits.",
      href: "https://www.gobilda.com",
    },
    {
      label: "REV Robotics",
      desc: "Control hubs, motors, electronics, sensors, and official FTC control system hardware.",
      href: "https://www.revrobotics.com",
    },
    {
      label: "Axon Robotics",
      desc: "High performance servos and motion components designed for FTC.",
      href: "https://axon-robotics.com/",
    },
    {
      label: "AndyMark",
      desc: "FTC and FRC robotics parts including drivetrains, wheels, electronics, and field components.",
      href: "https://www.andymark.com/",
    },
    {
      label: "Studica Robotics",
      desc: "Robotics hardware, educational tools, sensors, and engineering resources for STEM teams.",
      href: "https://www.studica.com/",
    },
    {
      label: "Ferra Components",
      desc: "An electrical specfici store that sells many custom components, mostly electrical",
      href: "https://www.ferracomponents.com/",
    },
    {
      label: "McMaster-Carr",
      desc: "Industrial hardware supplier commonly used by FTC teams for fasteners, materials, bearings, and mechanical components.",
      href: "https://www.mcmaster.com/",
    },
    {
      label: "CNC Madness",
      desc: "Custom FTC machining.",
      href: "https://cncmadness.com/",
    },
    {
      label: "Fabworks",
      desc: "Custom FTC machining.",
      href: "https://www.fabworks.com/",
    },
    {
      label: "FIRST Wisconsin Production Hub",
      desc: "Manufacturing and production resources available through the Wisconsin FIRST community.",
      href: "https://www.firstinspireswi.org/about-3",
    },
    {
      label: "Gearheads How To",
      desc: "FTC-focused tutorials, build walkthroughs, and robotics educational videos.",
      href: "https://www.youtube.com/channel/UCvdPn8BdIWaWhwaCBCWzmZw",
    },
  ],
},
  {
  id: "software",
  tag: "Code",
  title: "Software",
  blurb:
    "Programming tools, setup guides, SDK resources, and software references commonly used by FTC teams.",
  links: [
    {
      label: "GitHub",
      desc: "Version control and code hosting used by most FTC teams.",
      href: "https://github.com/",
    },
    {
      label: "Android Studio",
      desc: "The primary IDE used for FTC robot programming.",
      href: "https://developer.android.com/studio",
    },
    {
      label: "REV Hardware Client",
      desc: "Firmware updates, device management, and configuration tools for REV hardware.",
      href: "https://docs.revrobotics.com/rev-hardware-client",
    },
    {
      label: "Learn Java for FTC",
      desc: "A book written for rookies to learn how to use java and for FTC in specific.",
      href: "https://github.com/alan412/LearnJavaForFTC/blob/master/LearnJavaForFTC.pdf",
    },
    {
      label: "Cookbook",
      desc: "Community-maintained FTC troubleshooting guides, tips, and programming solutions.",
      href: "https://cookbook.dairy.foundation/",
    },
    {
      label: "Roadrunner",
      desc: "Motion planning and autonomous pathing library widely used in FTC.",
      href: "https://acmerobotics.github.io/road-runner/",
    },
    {
      label: "Pedro Pathing",
      desc: "Community FTC pathing framework focused on flexible autonomous movement.",
      href: "https://pedropathing.com/",
    },
    {
      label: "FTC SDK Documentation",
      desc: "Official SDK documentation, setup guides, and FTC programming resources.",
      href: "https://ftc-docs.firstinspires.org/",
    },
  ],
},
  {
  id: "game-strategy",
  tag: "Game",
  title: "Game Strategy",
  blurb:
    "Scouting tools, match analysis resources, alliance strategy, and competitive planning guides for FTC teams.",
  links: [
    {
      label: "FTCScout",
      desc: "Match analytics, team statistics, scouting insights, and performance breakdowns for FTC competitions.",
      href: "https://ftcscout.org/",
    },
    {
      label: "FTCStats",
      desc: "Historical FTC event statistics, rankings, match data, and team performance tracking.",
      href: "https://www.ftcstats.org/",
    },
    {
      label: "Scouting Guide",
      desc: "Practical FTC scouting strategies and analysis guidance.",
      href: "https://docs.google.com/document/d/1lVtBp20XT_ZGtRpURoLbqTFpbBjoPcP--gMr0LWLjcY/edit?usp=sharing",
    },
    {
      label: "Scouting Template",
      desc: "Spreadsheet template for collecting, organizing, and analyzing FTC scouting data.",
      href: "https://docs.google.com/spreadsheets/d/1IDxuZjm0IEe5axS9IOsYvBfZytGsnf2uzbL7xbU2SkA/edit?gid=0#gid=0",
    },
  ],
},
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Resources for FTC teams,
            <span className="block text-fade">in one place.</span>
          </>
        }
        desc="This is a community resource library. Let us know what helped you."
        cta={
          <>
            <PrimaryButton href="/contact" className="w-full sm:w-auto">
              Contribute a resource
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
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
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
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

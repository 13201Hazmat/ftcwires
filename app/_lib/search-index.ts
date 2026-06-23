export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  keywords?: string[];
  group: string;
};

export const SEARCH_INDEX: SearchEntry[] = [
  // ── Pages ──────────────────────────────────────────────────────────
  {
    title: "Home",
    description: "FTC WI.R.E.S. — Wisconsin Rises to Enable STEM Growth.",
    href: "/",
    keywords: ["wires", "wisconsin", "ftc", "hazmat", "13201", "stem"],
    group: "Pages",
  },
  {
    title: "Contact",
    description: "Reach the WI.R.E.S. team by email or GitHub.",
    href: "/contact",
    keywords: ["email", "reach", "contributors", "hazmat"],
    group: "Pages",
  },
  {
    title: "Register",
    description: "Sign up to access the autonomous programming guide drive.",
    href: "/register",
    keywords: ["sign up", "team number", "access", "guides", "auto"],
    group: "Pages",
  },
  {
    title: "Planning",
    description: "Season roadmaps, communication tips, and sponsorship playbooks.",
    href: "/planning",
    keywords: ["season", "roadmap", "communication", "burnout", "cadence"],
    group: "Pages",
  },
  {
    title: "Parts Lending Network",
    description: "Upcoming statewide hardware lending pool for Wisconsin FTC teams.",
    href: "/parts-lending-network",
    keywords: ["borrow", "lend", "hardware", "waitlist", "parts", "motors"],
    group: "Pages",
  },
  {
    title: "Outreach",
    description: "Real outreach events from Wisconsin FTC teams, tagged by judged award.",
    href: "/outreach",
    keywords: ["events", "community", "awards", "inspire", "connect", "reach", "sustain"],
    group: "Pages",
  },

  // ── Guides ─────────────────────────────────────────────────────────
  {
    title: "Software Platform",
    description: "Overview of all FTC software guides and example autos.",
    href: "/software-platform",
    keywords: ["guides", "tools", "programming", "overview"],
    group: "Guides",
  },
  {
    title: "Blocks",
    description: "Visual drag-and-drop programming for FTC, no Java required.",
    href: "/blocks",
    keywords: [
      "drag-and-drop", "visual", "scratch", "beginner",
      "rev hardware client", "no java", "opmode",
    ],
    group: "Guides",
  },
  {
    title: "Roadrunner",
    description: "Motion-profiled autonomous paths with velocity and acceleration control.",
    href: "/roadrunner",
    keywords: [
      "motion planning", "trajectory", "spline", "mecanum",
      "tank drive", "feedforward", "acme",
    ],
    group: "Guides",
  },
  {
    title: "Pedro Pathing",
    description: "Bézier curve path following with predictive braking for FTC.",
    href: "/pedro-pathing",
    keywords: [
      "bezier", "path following", "predictive braking",
      "follower", "ivy", "nextftc", "curves",
    ],
    group: "Guides",
  },
  {
    title: "Android Studio Setup",
    description: "Install the IDE, open FtcRobotController, and deploy to a Control Hub.",
    href: "/android-studio",
    keywords: [
      "ide", "install", "gradle", "apk", "deploy",
      "control hub", "ftcrobotcontroller", "sdk",
    ],
    group: "Guides",
  },
  {
    title: "Command-Based Architecture",
    description: "Organize robot code with subsystems, commands, and a scheduler.",
    href: "/command-based",
    keywords: [
      "subsystem", "command", "scheduler", "trigger",
      "nextftc", "ivy", "solverslib", "wpilib", "frc", "scalable",
    ],
    group: "Guides",
  },
  {
    title: "Wireless ADB Setup",
    description: "Deploy code to your Control Hub over WiFi without a USB cable.",
    href: "/android-studio#wireless-adb",
    keywords: [
      "adb", "wifi", "wireless", "deploy",
      "platform-tools", "usb", "192.168.43.1",
    ],
    group: "Guides",
  },

  // ── Resources ──────────────────────────────────────────────────────
  {
    title: "Important Sites",
    description: "Official FTC links, documentation, and game season resources.",
    href: "/resources#important-sites",
    keywords: ["first", "ftc docs", "official", "game manual", "rules"],
    group: "Resources",
  },
  {
    title: "Team Info",
    description: "Wisconsin FTC team directories, contacts, and event information.",
    href: "/resources#team-info",
    keywords: ["directory", "wisconsin", "contact", "teams", "search"],
    group: "Resources",
  },
  {
    title: "Community & Collaboration",
    description: "Discord servers, Reddit, and team collaboration spaces.",
    href: "/resources#collaborate",
    keywords: ["discord", "reddit", "community", "social", "collaborate"],
    group: "Resources",
  },
  {
    title: "General Resources",
    description: "GM0, simulators, CAD tools, and core FTC learning guides.",
    href: "/resources#general",
    keywords: [
      "gm0", "game manual zero", "index47", "simulator",
      "onshape", "cad", "fusion", "beginner",
    ],
    group: "Resources",
  },
  {
    title: "Hardware Resources",
    description: "FTC hardware suppliers: GoBilda, REV, AndyMark, and more.",
    href: "/resources#hardware",
    keywords: [
      "gobilda", "rev", "andymark", "axon",
      "mcmaster", "studica", "ferra", "cnc", "build", "parts",
    ],
    group: "Resources",
  },
  {
    title: "Software Resources",
    description: "GitHub, SDK docs, Roadrunner, Pedro Pathing, Cookbook, and more.",
    href: "/resources#software",
    keywords: ["github", "sdk", "roadrunner", "pedro", "cookbook", "learn java", "programming"],
    group: "Resources",
  },
  {
    title: "Game Strategy",
    description: "Scouting tools, FTCScout, FTCStats, and match analysis resources.",
    href: "/resources#game-strategy",
    keywords: ["scouting", "ftcscout", "ftcstats", "match", "analytics", "alliance", "strategy"],
    group: "Resources",
  },

  // ── Sponsorship ────────────────────────────────────────────────────
  {
    title: "Sponsorship Overview",
    description: "Grants, discounts, and sponsorship resources for FTC teams.",
    href: "/sponsorship",
    keywords: ["funding", "money", "sponsors", "grants", "support"],
    group: "Sponsorship",
  },
  {
    title: "How to Get Sponsors",
    description: "Tips for reaching local businesses, parents, and companies.",
    href: "/sponsorship#how-to",
    keywords: ["tips", "outreach", "local business", "pitch", "approach"],
    group: "Sponsorship",
  },
  {
    title: "Grants & Discounts",
    description: "Wisconsin and national grants: DPI, MSOE, GoBilda, REV, and more.",
    href: "/sponsorship#grants",
    keywords: [
      "grant", "dpi", "msoe", "gobilda", "rev",
      "money", "wisconsin", "pitsco", "lockheed", "ge",
    ],
    group: "Sponsorship",
  },
  {
    title: "Sample Sponsorship Letter",
    description: "A fill-in-the-blanks email template to pitch potential sponsors.",
    href: "/sponsorship#letter",
    keywords: ["template", "email", "letter", "draft", "pitch"],
    group: "Sponsorship",
  },
];

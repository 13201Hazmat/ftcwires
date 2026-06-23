export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  keywords?: string[];
  group: string;
};

export type RouteMeta = {
  keywords?: string[];
  group?: string;
  description?: string;
  sectionLabels?: Record<string, string>;
};

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    group: "Pages",
    description: "FTC WI.R.E.S. — Wisconsin Rises to Enable STEM Growth. Software guides, resources, and outreach spotlights for FTC teams.",
    keywords: ["home", "wires", "wisconsin", "ftc", "hazmat", "13201", "stem"],
  },
  "/software-platform": {
    group: "Guides",
    keywords: ["guides", "tools", "programming", "overview", "auto", "autonomous"],
    sectionLabels: {
      tools: "Software Tools",
    },
  },
  "/blocks": {
    group: "Guides",
    keywords: ["drag-and-drop", "visual", "scratch", "beginner", "rev hardware client", "no java", "opmode"],
    sectionLabels: {
      "what-it-is": "What is Blocks",
    },
  },
  "/roadrunner": {
    group: "Guides",
    keywords: ["motion planning", "trajectory", "spline", "mecanum", "tank drive", "feedforward", "acme"],
    sectionLabels: {
      "what-it-is": "What is Roadrunner",
    },
  },
  "/pedro-pathing": {
    group: "Guides",
    keywords: ["bezier", "path following", "predictive braking", "follower", "ivy", "nextftc", "curves", "mecanum"],
    sectionLabels: {
      "what-it-is": "What is Pedro Pathing",
    },
  },
  "/android-studio": {
    group: "Guides",
    keywords: ["ide", "install", "gradle", "apk", "deploy", "control hub", "ftcrobotcontroller", "sdk"],
    sectionLabels: {
      steps: "Installation Steps",
      "wireless-adb": "Wireless ADB Setup",
    },
  },
  "/command-based": {
    group: "Guides",
    keywords: ["subsystem", "command", "scheduler", "trigger", "nextftc", "ivy", "solverslib", "wpilib", "frc", "scalable"],
    sectionLabels: {
      concepts: "Core Concepts",
      references: "Library References",
    },
  },
  "/git": {
    group: "Guides",
    keywords: ["git", "github", "version control", "fork", "clone", "android studio", "ftcrobotcontroller"],
    sectionLabels: {
      steps: "Setup Steps",
      troubleshooting: "Troubleshooting",
    },
  },
  "/resources": {
    group: "Resources",
    keywords: ["links", "tools", "hardware", "software", "community", "strategy"],
    sectionLabels: {
      "important-sites": "Important Sites",
      "team-info": "Team Info",
      collaborate: "Community & Collaboration",
      general: "General Resources",
      hardware: "Hardware Resources",
      software: "Software Resources",
      "game-strategy": "Game Strategy",
    },
  },
  "/sponsorship": {
    group: "Sponsorship",
    keywords: ["funding", "money", "sponsors", "grants", "support"],
    sectionLabels: {
      "how-to": "How to Get Sponsors",
      grants: "Grants & Discounts",
      letter: "Sample Sponsorship Letter",
    },
  },
  "/outreach": {
    group: "Pages",
    keywords: ["events", "community", "awards", "inspire", "connect", "spotlights"],
    sectionLabels: {
      "award-legend": "Award Legend",
      spotlights: "Team Spotlights",
    },
  },
  "/contact": {
    group: "Pages",
    keywords: ["email", "reach", "contributors", "hazmat"],
  },
  "/register": {
    group: "Pages",
    keywords: ["sign up", "team number", "access", "guides", "auto", "autonomous"],
  },
  "/parts-lending-network": {
    group: "Pages",
    keywords: ["borrow", "lend", "hardware", "waitlist", "parts", "motors"],
  },
  "/planning": {
    group: "Pages",
    keywords: ["season", "roadmap", "communication", "burnout", "cadence"],
  },
};

export const SEARCH_EXCLUDE: string[] = [];

export const MANUAL_ENTRIES: SearchEntry[] = [];

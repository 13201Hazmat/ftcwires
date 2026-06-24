import {
  PageHero,
  SectionHeader,
  SectionEyebrow,
  PrimaryButton,
  GhostButton,
  ArrowRight,
  ArrowUpRight,
  CheckIcon,
} from "../_lib/ui";

export const metadata = {
  title: "Android Studio Setup — FTC Wires",
  description:
    "A step-by-step walkthrough of installing Android Studio, opening the FtcRobotController project, and deploying your first build to a Control Hub.",
};

export default function AndroidStudioPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Set up Android Studio
            <span className="block text-fade">for FTC.</span>
          </>
        }
        desc={
          <>
            A step-by-step walkthrough for installing Android Studio, opening
            the official <span className="text-foreground">FtcRobotController</span>{" "}
            project, and deploying your first build to a Control Hub.
            Aimed at rookie programmers with no prior Android Studio
            experience.
          </>
        }
      />

      <Steps />
      <WirelessADB />
      <NextSteps />
    </>
  );
}



/* =====================================================
 * Steps — the walkthrough
 * ===================================================== */
type StepData = {
  n: string;
  title: string;
  intro: string;
  /** Bullets accept JSX so steps can embed links. */
  bullets?: React.ReactNode[];
  /** If present, replaces the bullets list (use for non-list step content). */
  content?: React.ReactNode;
  /** If present, renders the real image instead of the placeholder. */
  image?: string;
  imageDesc: string;
  note?: string;
};

const STEPS: StepData[] = [
  {
    n: "01",
    title: "Install Android Studio",
    intro:
      "Android Studio is Google's official IDE for Android development. It's the most common way to develop and download code for FTC.",
    bullets: [
      <>
        Go to{" "}
        <InlineLink href="https://developer.android.com/studio">
          developer.android.com/studio
        </InlineLink>{" "}
        and click <strong className="text-foreground">Download Android Studio</strong>.
      </>,
      "Run the installer with the default Standard install type, for FTC you shouldn't need to customize anything.",
      "On first launch, Android Studio downloads the Android SDK components. This takes about 10–20 minutes wait for it to finish.",
    ],
    image: "/step1.png",
    imageDesc:
      "Android Studio download page (developer.android.com/studio) with the Download button highlighted.",
    },
  {
    n: "02",
    title: "Get the FtcRobotController project",
    intro:
      "The FtcRobotController is the official FTC project, it contains the SDK, sample OpModes, and a TeamCode module where your team's code lives. There are two ways to get it. Pick the one that fits your team.",
    content: (
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <PathOption
          tag="Quick"
          title="Download the project as a ZIP"
          desc="No git knowledge needed. Good if you just want to start writing code today. Not recommended for long term use."
          bullets={[
            <>
              Open the{" "}
              <InlineLink href="https://github.com/FIRST-Tech-Challenge/FtcRobotController">
                FtcRobotController Github repo
              </InlineLink>
              .
            </>,
            "Under Code, download the ZIP file.",
            "Extract the ZIP to a location you can find later.",
          ]}
          cta={{
            label: "Open GitHub Releases",
            href: "https://github.com/FIRST-Tech-Challenge/FtcRobotController",
            external: true,
          }}
        />
        <PathOption
          tag="Recommended"
          title="Set up Git first"
          desc="A short extra step to install git, fork the repo, and clone it. Very helpful for any team that wants version control, branches, or to collaborate. This is highly recommended."
          bullets={[
            "Create a GitHub account.",
            "Install git on your computer.",
            "Fork and clone the FtcRobotController.",
            "Come back here at Step 4 — your project will already be downloaded.",
          ]}
          cta={{
            label: "Open the Git Setup guide",
            href: "/git",
            external: false,
          }}
        />
      </div>
    ),
    image: "/step2.png",
    imageDesc:
      "The GitHub Repo page with zip highlighted and the GitHub Fork button highlighted on the FtcRobotController repo.",
    note:
      "Whichever path you take, don't put the project inside OneDrive, iCloud Drive, Dropbox, or Google Drive folders. Cloud sync interferes with Gradle's file watching and can corrupt the build cache.",
  },
  {
    n: "03",
    title: "Open the project in Android Studio",
    intro:
      "First time you open a project, Android Studio scans the files and prepares the build system.",
    bullets: [
      "Launch Android Studio.",
      "On the welcome screen click Open",
      "Navigate to your extracted FtcRobotController folder.",
      "Select the folder",
      "You can also click Trust Project.",
    ],
    image: "/step3.png",
    imageDesc:
      "Android Studio welcome screen with Open highlighted.",
    note:
      "Make sure you select the root FtcRobotController folder — not a subfolder like TeamCode or FtcRobotController/FtcRobotController.",
  },
  {
    n: "04",
    title: "Open the Project, and let Gradle sync finish",
    intro:
      "Gradle is the build system. The first time you open the project, it downloads every dependency the FTC SDK needs. Only takes long the first time.",
    bullets: [
      "A progres bar will start at the bottom.",
      "When the bar says Gradle sync finished, you're ready.",
      "Finally after it is done syncing hit the hammer to build the project (Not downloading yet)",
    ],
    imageDesc:
      "Bottom-of-IDE status bar showing Gradle sync progress, then the Gradle sync finished message.",
    note:
      "First sync can look like its stuck but it's not. Let it run for at least 20 minutes before thinking something's wrong.",
  },
  {
    n: "05",
    title: "Connect your Control Hub via USB",
    intro:
      "You deploy code by plugging your Control Hub directly into your computer with a USB-C cable or wireless adb connection.",
    bullets: [
      "Make sure the Control Hub is powered on with a charged battery.",
      "Connect a data-capable USB-C cable from your computer to the Control Hub (NOT A CHARGING ONLY CABLE).",
      "On Windows, wait for the Device installed successfully notification.",
      "In Android Studio's top toolbar, the device dropdown should now show your Control Hub. If not just click on it and select the Control Hub from the list.",
    ],
    imageDesc:
      "Android Studio top toolbar with the device dropdown open, showing the connected Control Hub selected.",
    note:
      "If the Control Hub doesn't appear: try a different USB cable (charging-only cables can be a problem), make sure the Hub is actually powered on, and check Device Manager (Windows) for an unrecognized device.",
  },
  {
    n: "06",
    title: "Build and deploy your first APK",
    intro:
      "When you press Run, Android Studio compiles the project into an APK and pushes it to the connected Control Hub.",
    bullets: [
      "In the run-configuration dropdown next to the Run button, make sure TeamCode is selected.",
      "Click the green Run button (or press Shift + F10 on Windows / Ctrl + R on Mac).",
      "When it finishes you'll see BUILD SUCCESSFUL, this means your code is on the robot ",
    ],
    imageDesc:
      "Run button location in the top toolbar, plus the Build panel at the bottom showing BUILD SUCCESSFUL.",
    note:
      "If the build fails, scroll up in the Build panel and look for the first red line. That's the actual cause.",
  },
  {
    n: "07",
    title: "Verify your OpMode on the Driver Station And Everythign is Downloaded!",
    intro:
      "Last step — open the Driver Station and confirm your code actually runs on the Hub.",
    
    imageDesc:
      "FTC Driver Station app with the OpMode dropdown expanded, showing a sample OpMode selected.",
    note:
      "If your own custom OpMode doesn't appear: double-check it has the @TeleOp or @Autonomous annotation and is in the org.firstinspires.ftc.teamcode package.",
  },
];

function Steps() {
  return (
    <section id="steps" className="px-6 py-24 lg:py-32 scroll-mt-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Set Up
              <span className="block text-fade">Android Studio.</span>
            </>
          }
          desc="Follow these steps in order to setup Android Studio."
        />

        <div
          className="mt-16 overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ step, isFirst }: { step: StepData; isFirst: boolean }) {
  return (
    <article
      id={`step-${step.n}`}
      className="scroll-mt-32 px-6 py-12 sm:px-10 sm:py-16 lg:px-14"
      style={!isFirst ? { borderTop: "1px solid var(--hairline)" } : undefined}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="font-mono text-3xl font-semibold text-subtle">
            {step.n}
          </div>
          <span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-muted"
            style={{ borderColor: "var(--border)" }}
          >
          </span>
        </div>
        <div className="lg:col-span-9">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {step.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {step.intro}
          </p>

          {step.content ? step.content : null}

          {step.bullets && !step.content ? (
            <ol
              className="mt-6 overflow-hidden rounded-2xl border"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--foreground) 2%, transparent)",
              }}
            >
              {step.bullets.map((b, bi) => (
                <li
                  key={bi}
                  className="flex items-start gap-3 px-5 py-4 text-[14px] leading-relaxed text-foreground"
                  style={
                    bi !== 0
                      ? { borderTop: "1px solid var(--hairline)" }
                      : undefined
                  }
                >
                  <span className="mt-0.5 font-mono text-[11px] text-subtle">
                    {String(bi + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">{b}</div>
                </li>
              ))}
            </ol>
          ) : null}

          {step.image ? (
            <StepImage src={step.image} caption={step.imageDesc} />
          ) : (
            <ImagePlaceholder description={step.imageDesc} />
          )}

        </div>
      </div>
    </article>
  );
}

function StepImage({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="mt-6">
      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          background:
            "color-mix(in oklab, var(--foreground) 2%, transparent)",
          boxShadow:
            "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset, 0 12px 28px -16px rgba(0,0,0,0.45)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption ?? ""}
          className="block h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-[11px] leading-relaxed text-subtle">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ImagePlaceholder({ description }: { description: string }) {
  return (
    <div
      className="relative mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center"
      style={{
        borderColor: "var(--border-strong)",
        background: "color-mix(in oklab, var(--foreground) 2%, transparent)",
      }}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-xl"
        style={{
          background:
            "color-mix(in oklab, var(--foreground) 6%, transparent)",
        }}
      >
        <PictureIcon className="h-5 w-5 text-subtle" />
      </span>
      <p className="max-w-md text-[13px] leading-relaxed text-muted">
        <span className="text-foreground">Screenshot:</span> {description}
      </p>
      <span className="text-[10px] font-medium uppercase tracking-widest text-subtle">
        Placeholder · to be added
      </span>
    </div>
  );
}

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

function CodeInline({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="rounded-md border px-1.5 py-0.5 font-mono text-[12.5px]"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in oklab, var(--foreground) 4%, transparent)",
        color: "var(--foreground)",
      }}
    >
      {children}
    </code>
  );
}

function FieldList({
  fields,
}: {
  fields: { label: string; value: string }[];
}) {
  return (
    <div className="mt-3 space-y-2">
      {fields.map((f) => (
        <div
          key={f.label}
          className="flex flex-wrap items-baseline gap-x-2 gap-y-1"
        >
          <span className="text-[12.5px] font-medium text-foreground">
            {f.label}:
          </span>
          <CodeInline>{f.value}</CodeInline>
        </div>
      ))}
    </div>
  );
}

function PathOption({
  tag,
  title,
  desc,
  bullets,
  cta,
}: {
  tag: string;
  title: string;
  desc: string;
  bullets: React.ReactNode[];
  cta: { label: string; href: string; external?: boolean };
}) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-3xl border p-7"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow:
          "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className="rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-muted"
          style={{ borderColor: "var(--border)" }}
        >
          {tag}
        </span>
      </div>
      <h4 className="text-lg font-medium tracking-tight text-foreground">
        {title}
      </h4>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{desc}</p>
      <ul className="mt-5 space-y-2.5">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted"
          >
            <span
              className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full"
              style={{ background: "var(--foreground)" }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href={cta.href}
          {...(cta.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground transition-transform hover:translate-x-0.5"
        >
          {cta.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 flex items-start gap-3 rounded-2xl border px-5 py-4"
      style={{
        borderColor: "var(--border)",
        background:
          "color-mix(in oklab, var(--foreground) 3%, transparent)",
      }}
    >
      <span
        className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full"
        style={{ background: "#f59e0b" }}
      />
      <p className="text-[13px] leading-relaxed text-muted">
        <span className="text-foreground">Heads up.</span> {children}
      </p>
    </div>
  );
}

/* =====================================================
 * Wireless ADB — optional, mostly placeholder for now
 * ===================================================== */
const WIRELESS_STEPS: StepData[] = [
  {
    n: "01",
    title: "Download Android Platform-Tools",
    intro:
      "ADB (Android Debug Bridge) ships inside Android SDK Platform-Tools. If you finished the main walkthrough above, you already have it — it was installed with Android Studio. If not, you can grab a standalone copy.",
    bullets: [
      <>
        Open{" "}
        <InlineLink href="https://developer.android.com/tools/releases/platform-tools">
          developer.android.com/tools/releases/platform-tools
        </InlineLink>
        .
      </>,
      "Download the package for your operating system.",
      "Extract it to a folder you'll remember (e.g. Documents/platform-tools).",
    ],
    image: "/adbStep1.png",
    imageDesc:
      "Android Platform-Tools download page with the OS-specific download links highlighted.",
  },
  {
    n: "02",
    title: "Open External Tools in Android Studio settings",
    intro:
      "Android Studio's External Tools let you run ADB commands from a menu instead of typing them in a terminal. You'll add two: one to connect to the Control Hub over WiFi, one to disconnect cleanly afterwards.",
    bullets: [
      <>
        <strong className="text-foreground">Windows:</strong> File → Settings.
      </>,
      <>
        <strong className="text-foreground">Mac:</strong> Android Studio →
        Preferences (⌘,).
      </>,
      <>
        Expand <strong className="text-foreground">Tools</strong> in the left
        sidebar and click{" "}
        <strong className="text-foreground">External Tools</strong> — the
        list is empty by default.
      </>,
    ],
    image: "/adbStep2.png",
    imageDesc:
      "Android Studio Settings panel with Tools → External Tools selected (empty list).",
  },
  {
    n: "03",
    title: 'Add the "Connect to ADB over WiFi" tool',
    intro:
      "This tool tells ADB to connect to your Control Hub over the hub's own WiFi network — no USB cable needed once it's running.",
    bullets: [
      <>
        Click the <CodeInline>[+]</CodeInline> button to add a new external
        tool.
      </>,
      <>
        Fill in these fields (leave everything else as the default):
        <FieldList
          fields={[
            { label: "Name", value: "Connect to ADB over WiFi" },
            {
              label: "Program",
              value: "$ModuleSdkPath$\\platform-tools\\adb.exe",
            },
            { label: "Arguments", value: "connect 192.168.43.1:5555" },
            { label: "Working directory", value: "$ProjectFileDir$" },
          ]}
        />
      </>,
      <>
        Click <strong className="text-foreground">OK</strong> to save the
        tool.
      </>,
    ],
    image: "/adbStep3.png",
    imageDesc:
      'Edit Tool dialog for "Connect to ADB over WiFi" with Name, Program, Arguments, and Working directory filled in.',
    note:
      "The Working directory ($ProjectFileDir$) is what Android Studio fills in by default — leave it as-is. The IP 192.168.43.1 is the standard address the Control Hub uses on its own WiFi network.",
  },
  {
    n: "04",
    title: 'Add the "Disconnect ADB" tool',
    intro:
      "Add a second tool so you can cleanly disconnect ADB before switching networks. Skipping this leads to the Hub showing as [OFFLINE] later — sometimes needing a hub power-cycle to recover.",
    bullets: [
      <>
        Back in the External Tools list, click{" "}
        <CodeInline>[+]</CodeInline> again to add another tool.
      </>,
      <>
        Fill in:
        <FieldList
          fields={[
            { label: "Name", value: "Disconnect ADB" },
            {
              label: "Program",
              value: "$ModuleSdkPath$\\platform-tools\\adb.exe",
            },
            { label: "Arguments", value: "disconnect" },
            { label: "Working directory", value: "$ProjectFileDir$" },
          ]}
        />
      </>,
      <>
        Click <strong className="text-foreground">OK</strong> on the tool
        dialog, then <strong className="text-foreground">OK</strong> on the
        main Settings panel to save everything.
      </>,
    ],
    image: "/adbStep4.png",
    imageDesc:
      'Edit Tool dialog for "Disconnect ADB" with all fields filled in.',
  },
  {
    n: "05",
    title: "Connect to the Control Hub's WiFi and run the tool",
    intro:
      "One-time setup is done. From here on, the daily workflow is the same every session.",
    bullets: [
      "Power on the Control Hub.",
      "On your PC's WiFi settings, connect to the Control Hub's network. The name and password are shown on the Driver Station.",
      <>
        Open any{" "}
        <strong className="text-foreground">Java source file</strong> in your
        project and click into the editor so the cursor is in the file —
        External Tools won&rsquo;t run without an active source file.
      </>,
      <>
        From the menu bar: Tools → External Tools →{" "}
        <strong className="text-foreground">
          Connect to ADB over WiFi
        </strong>
        .
      </>,
      <>
        Wait for the console at the bottom to print{" "}
        <CodeInline>connected to 192.168.43.1:5555</CodeInline>.
      </>,
      "The Control Hub now appears in the device dropdown at the top of Android Studio. Deploy with Run as you would over USB.",
    ],
    imageDesc:
      'Android Studio Tools menu with External Tools → "Connect to ADB over WiFi" selected, plus the console output confirming the connection.',
    note:
      "While connected to the Control Hub's WiFi, your PC has no internet. If you need to push to GitHub or download something, follow Step 06 for how to switch networks cleanly.",
  },
  {
    n: "06",
    title: "Switching networks — Disconnect ADB first",
    intro:
      "Always run Disconnect ADB before leaving the Hub's WiFi. Skip this and Android Studio will show the Hub as [OFFLINE] when you reconnect — often requiring a hub power-cycle to recover.",
    bullets: [
      <>
        Tools → External Tools →{" "}
        <strong className="text-foreground">Disconnect ADB</strong>.
      </>,
      "Now safely switch your PC's WiFi to your normal network.",
      <>
        When you come back to the Control Hub&rsquo;s network, run{" "}
        <strong className="text-foreground">
          Connect to ADB over WiFi
        </strong>{" "}
        again to re-establish the link.
      </>,
    ],
    image: "/adbStep6.png",
    imageDesc:
      'Android Studio Tools menu with "Disconnect ADB" selected from External Tools.',
    note:
      "If the Hub still shows [OFFLINE] after reconnecting, power-cycle the Hub and run Connect to ADB over WiFi again. You can also pin both tools to the toolbar (right-click the toolbar above the editor) so they're one click instead of three.",
  },
];

function WirelessADB() {
  return (
    <section
      id="wireless-adb"
      className="px-6 py-24 lg:py-32 scroll-mt-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title={
            <>
              Connect over Wi-Fi
              <span className="block text-fade">with ADB.</span>
            </>
          }
          desc="Once you've downloaded a first build over USB, you can stop using the cable for everthing. ADB lets your computer talk to the Control Hub over the same network its much easier to download then wired."
        />

        <div
          className="mt-16 overflow-hidden rounded-3xl border"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          {WIRELESS_STEPS.map((s, i) => (
            <Step key={s.n} step={s} isFirst={i === 0} />
          ))}
        </div>

        <SlothRecommend />
      </div>
    </section>
  );
}

function SlothRecommend() {
  return (
    <a
      href="https://github.com/dairy-foundation/sloth?tab=readme-ov-file#gradle-tasks"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mt-6 flex flex-col items-start gap-5 overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow:
          "0 1px 0 color-mix(in oklab, var(--foreground) 4%, transparent) inset",
      }}
    >
<div className="flex-1">
        <p className="text-[11px] font-medium uppercase tracking-widest text-subtle">
          Optional · by dairy-foundation
        </p>
        <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground sm:text-xl">
          Sloth — sub-second deploys
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
          A Gradle plugin that pushes only changed TeamCode classes instead of reinstalling the full APK. Works over USB and wireless ADB.
        </p>
      </div>
      <ArrowUpRight className="h-4 w-4 flex-none text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function SectionPlaceholderRow({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div
      className="scroll-mt-32 px-6 py-12 sm:px-10 sm:py-16 lg:px-14"
      style={{ borderTop: "1px solid var(--hairline)" }}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <div className="font-mono text-3xl font-semibold text-subtle">
            02+
          </div>
          <span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-amber-400"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "#f59e0b" }}
            />
            Coming soon
          </span>
        </div>
        <div className="lg:col-span-9">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {label}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {description}
          </p>

          <div
            className="relative mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center"
            style={{
              borderColor: "var(--border-strong)",
              background:
                "color-mix(in oklab, var(--foreground) 2%, transparent)",
            }}
          >
            <span
              className="grid h-10 w-10 place-items-center rounded-xl"
              style={{
                background:
                  "color-mix(in oklab, var(--foreground) 6%, transparent)",
              }}
            >
              <DocIcon className="h-5 w-5 text-subtle" />
            </span>
            <p className="max-w-md text-[13px] leading-relaxed text-muted">
              <span className="text-foreground">Steps placeholder.</span>{" "}
              Drop the remaining wireless ADB instructions here.
            </p>
            <span className="text-[10px] font-medium uppercase tracking-widest text-subtle">
              Placeholder · to be added
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocIcon({ className = "" }: { className?: string }) {
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
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}

/* =====================================================
 * Next Steps
 * ===================================================== */
function NextSteps() {
  return (
    <section className="px-6 pb-24 lg:pb-32">
      <div className="mx-auto max-w-5xl flex flex-col items-start gap-3 sm:flex-row">
        <PrimaryButton href="/command-based">
          Learn command-based architecture
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        <GhostButton href="/software-platform">
          Browse software guides
        </GhostButton>
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

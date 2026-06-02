import RegisterForm from "./register-form";
import { SectionEyebrow } from "../_lib/ui";

export const metadata = {
  title: "Register — FTC Wires",
  description:
    "Register your team to access FTC Wires software platform instructions and software platform resources.",
};

export default function RegisterPage() {
  return (
    <div className="relative isolate min-h-screen px-6 pb-32 pt-40 sm:pt-52">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="bg-spotlight absolute inset-0" />
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>

      <div className="animate-in mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <SectionEyebrow center>Register</SectionEyebrow>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Get access to
            <span className="block text-fade">the software platform instructions.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted">
            Takes about 30 seconds. We use your team number and email to track
            usage and send you updates when new instructions are released.
          </p>
        </div>

        {/* Form card */}
        <div
          className="overflow-hidden rounded-3xl border p-8 sm:p-10"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.45)",
          }}
        >
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

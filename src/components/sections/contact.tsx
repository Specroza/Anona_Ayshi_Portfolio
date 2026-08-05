import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Download, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { resumeUrl } from "@/lib/assets";
import { Reveal } from "@/components/motion-primitives";
import { MagneticButton } from "@/components/magnetic-button";
import { Section } from "@/components/section";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx_AEffwzHQWxuViCltVj4FVA1swdZxkcCJpUfKTtYbiKaUzvi0kcXodxR59A9dOmETVQ/exec";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setStatus({ state: "sending" });

  try {
  await emailjs.send(
    "service_j43ro1u",
    "template_y1i0ia5",
    {
      name: form.name,
      email: form.email,
      message: form.message,
    },
    "hSCjAtCGlkGPDb9uN"
  );

  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  });

  setForm({
    name: "",
    email: "",
    message: "",
  });

  setStatus({
    state: "sent",
    message: "Message sent successfully!",
  });

} catch (error) {
  console.error(error);

  setStatus({
    state: "error",
    message:
      error instanceof Error
        ? error.message
        : "Unable to send message.",
  });
}


  return (
    <Section id="contact">
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 [background:var(--gradient-hero)]"
          aria-hidden="true"
        />
        <div
          className="grid-backdrop pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-3xl leading-tight font-bold sm:text-4xl">
                Let's Build Better <span className="text-gradient">Software Together</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Open to Software QA Engineer, QA Analyst and Test Automation roles. The fastest way to reach me is email.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3">
                <ContactRow icon={Mail} label={profile.email} href={`mailto:${profile.email}`} />
                <ContactRow icon={Linkedin} label="linkedin.com/in/ayshirozario" href={profile.linkedin} external />
                <ContactRow icon={Github} label="github.com/Specroza" href={profile.github} external />
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface/60">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  {profile.location}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8">
                <MagneticButton href={resumeUrl} download variant="outline" ariaLabel="Download resume as PDF">
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <form className="glass-card p-6 sm:p-7" onSubmit={handleSubmit}>

              <div className="space-y-4">
                <Field
                  id="contact-name"
                  label="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  id="contact-email"
                  label="Your email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
  id="contact-message"
  required
  rows={5}
  maxLength={500}
  value={form.message}
  onChange={(e) =>
    setForm({ ...form, message: e.target.value })
  }
  placeholder="Tell me about the role or the team."
  className="mt-2 max-h-56 min-h-[7.5rem] w-full resize-y overflow-y-auto rounded-2xl border border-input bg-surface/60 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
/>

<p className="mt-1 text-right text-xs text-muted-foreground">
  {form.message.length}/500
</p>

                </div>
              </div>
              <MagneticButton type="submit" className="mt-6 w-full">
                {status.state === "sending" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {status.state === "sending" ? "Sending…" : "Send Message"}
              </MagneticButton>
              <p
                role="status"
                aria-live="polite"
                className={`mt-3 text-center text-xs ${
                  status.state === "error" ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {status.message ??
  "Fill out the form and I'll get back to you as soon as possible."}
              </p>

            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: typeof Mail;
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface/60 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 truncate">{label}</span>
      </a>
    </li>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full border border-input bg-surface/60 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
      />
    </div>
  );
}
}
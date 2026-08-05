import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border pb-24">
      <div className="section-shell grid gap-4 py-10 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold">
            Designed & built by {profile.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} · {profile.title} · {profile.location}
          </p>
        </div>
        <ul className="flex items-center gap-2">
          {[
            { icon: Mail, href: `mailto:${profile.email}`, label: "Email Anona Ayshi Rozario" },
            { icon: Linkedin, href: profile.linkedin, label: "LinkedIn profile" },
            { icon: Github, href: profile.github, label: "GitHub profile" },
          ].map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="grid size-11 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

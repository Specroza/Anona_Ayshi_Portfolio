import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { Reveal } from "@/components/motion-primitives";
import { Section, SectionHeading } from "@/components/section";

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications & recognition"
        title="Trained, certified and awarded"
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const isAward = cert.note.startsWith("Award");
          const Icon = isAward ? Award : BadgeCheck;
          return (
            <Reveal key={cert.name} delay={0.05 * i} as="li">
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer noopener"
                className="glass-card group flex h-full flex-col p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`grid size-11 place-items-center rounded-xl ${
                      isAward ? "bg-accent/14 text-accent" : "bg-primary/12 text-primary"
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <ExternalLink
                    className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-base leading-snug font-semibold">{cert.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="mt-4 font-mono text-xs text-muted-foreground">{cert.note}</p>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

import { Github, Terminal } from "lucide-react";
import { automation } from "@/data/portfolio";
import { Reveal } from "@/components/motion-primitives";
import { MagneticButton } from "@/components/magnetic-button";
import { Section, SectionHeading } from "@/components/section";

export function Automation() {
  return (
    <Section id="automation">
      <SectionHeading
        eyebrow="Automation"
        title="Playwright end-to-end suite"
        description="Page-object structured specs covering login, cart and checkout across three browser engines."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="glass-card h-full overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <Terminal className="size-4 text-primary" aria-hidden="true" />
              <span className="font-mono text-xs text-muted-foreground">folder structure</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
              {automation.tree.join("\n")}
            </pre>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass-card flex h-full flex-col p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Meta label="Runner" items={[automation.runner]} />
              <Meta label="Browsers" items={automation.browsers} />
              <Meta label="Covered flows" items={automation.coverage} />
            </div>
            <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-6">
              <MagneticButton
                href={automation.repo}
                external
                className="px-5 py-2.5"
                ariaLabel="Open the Playwright automation GitHub repository"
              >
                <Github className="size-4" aria-hidden="true" />
                GitHub Repository
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Meta({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{label}</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { aboutStats, aboutStory, education } from "@/data/portfolio";
import { CountUp, Reveal } from "@/components/motion-primitives";
import { Section, SectionHeading } from "@/components/section";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="About" title="Who I am" />

          <div className="mt-8 space-y-5">
            {aboutStory.map((paragraph, i) => (
              <Reveal key={paragraph} delay={0.06 * i}>
                <p className="text-base leading-relaxed text-muted-foreground">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="glass-card mt-10 flex items-start gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <motion.p
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="inline-block cursor-default rounded-full border border-border bg-surface/70 px-3.5 py-1.5 font-display text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {education.degree}
                </motion.p>
                <p className="mt-1 text-sm text-muted-foreground">{education.school}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{education.duration}</p>
              </div>

            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] [background:var(--gradient-accent)] opacity-15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
            {aboutStats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.07 * i}>
                <div className="glass-card flex h-full min-h-40 flex-col justify-between p-6">
                  <span
                    className="size-2 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-4xl font-bold text-primary">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

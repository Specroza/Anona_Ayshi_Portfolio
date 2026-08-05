import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import { Reveal } from "@/components/motion-primitives";
import { Section, SectionHeading } from "@/components/section";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="The toolkit behind the test cycles"
        description="Grouped by how I actually use them day to day — no vanity percentages."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.group} delay={0.05 * gi}>
            <div className="glass-card h-full p-6">
              <h3 className="font-display text-sm font-semibold tracking-widest text-primary uppercase">
                {group.group}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ y: -3, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="cursor-default rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

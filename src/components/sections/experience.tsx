import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { Reveal } from "@/components/motion-primitives";
import { Section, SectionHeading } from "@/components/section";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthName(month: number) {
  return MONTHS[month - 1] ?? "";
}

/** Turns "05/2025 – Present" into "May 2025 – Present". */
function formatDuration(duration: string) {
  return duration
    .split("–")
    .map((part) => {
      const t = part.trim();
      const parsed = parseMonthYear(t);
      if (!parsed || Number.isNaN(parsed.month) || Number.isNaN(parsed.year)) return t;
      return `${monthName(parsed.month)} ${parsed.year}`;
    })
    .join(" – ");
}

function parseMonthYear(value: string) {
  const [month, year] = value.trim().split("/");
  if (!year) return null;
  return { month: parseInt(month, 10), year: parseInt(year, 10) };
}


function compareMonthYear(
  a: { month: number; year: number } | null,
  b: { month: number; year: number } | null,
  direction: "earliest" | "latest"
) {
  if (!a) return b;
  if (!b) return a;
  if (a.year !== b.year) {
    return direction === "earliest" ? (a.year < b.year ? a : b) : a.year > b.year ? a : b;
  }
  return direction === "earliest"
    ? a.month < b.month
      ? a
      : b
    : a.month > b.month
      ? a
      : b;
}

function formatCompanyRange(positions: { duration: string }[]) {
  if (positions.length === 0) return "";
  if (positions.length === 1) return formatDuration(positions[0].duration);

  let earliestStart: { month: number; year: number } | null = null;
  let latestEnd: { month: number; year: number } | null = null;
  let hasPresent = false;

  for (const pos of positions) {
    const [startRaw, endRaw] = pos.duration.split("–").map((s) => s.trim());
    const start = parseMonthYear(startRaw);
    earliestStart = compareMonthYear(earliestStart, start, "earliest");

    if (endRaw && endRaw.toLowerCase() === "present") {
      hasPresent = true;
    } else {
      const end = parseMonthYear(endRaw);
      latestEnd = compareMonthYear(latestEnd, end, "latest");
    }
  }

  const startStr = earliestStart ? `${monthName(earliestStart.month)} ${earliestStart.year}` : "";
  const endStr = hasPresent
    ? "Present"
    : latestEnd
      ? `${monthName(latestEnd.month)} ${latestEnd.year}`
      : "";


  return `${startStr} – ${endStr}`;
}

function isPresent(duration: string) {
  return duration.toLowerCase().includes("present");
}

export function Experience() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built quality"
        description="QA testing paired with four years of risk, verification and process-quality work."
      />

      <div className="relative mt-14 space-y-8 sm:space-y-10">
        {/* Animated vertical timeline line */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-4 bottom-4 left-5 w-px origin-top bg-gradient-to-b from-primary via-border to-transparent sm:left-7"
        />

        {experiences.map((exp, i) => {
          const isOpen = open === exp.company;
          const panelId = `exp-panel-${i}`;
          const companyRange = formatCompanyRange(exp.positions);
          const hasPresent = exp.positions.some((p) => isPresent(p.duration));

          return (
            <Reveal key={exp.company} delay={0.08 * i} as="article" className="relative pl-14 sm:pl-20">
              {/* Timeline node */}
              <div className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full border border-border bg-background transition-colors duration-500 group-hover:border-primary/50 sm:size-14">
                <span
                  className={`size-2 rounded-full transition-all duration-500 sm:size-2.5 ${
                    hasPresent ? "bg-primary shadow-[0_0_15px_rgba(0,229,168,0.55)]" : "bg-muted-foreground/50"
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className="glass-card overflow-hidden rounded-3xl p-0 transition-all duration-300 hover:bg-surface/70">
                {/* Header — always visible, clickable */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : exp.company)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-white/[0.02] sm:p-8"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="block font-mono text-xs font-medium uppercase tracking-wider text-primary">
                      {companyRange}
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {exp.company}
                    </h3>
                    <p className="truncate font-mono text-xs text-muted-foreground sm:text-sm">
                      {exp.positions.map((p) => p.role).join(" · ")}
                    </p>
                  </div>
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-border bg-background/60">
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Expandable roles */}
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-8 px-5 pb-7 sm:px-8 sm:pb-9">
                        {exp.positions.map((pos, pi) => (
                          <div
                            key={pos.role}
                            className={`relative pl-6 ${pi > 0 ? "border-t border-border pt-8" : ""}`}
                          >
                            <span
                              className="absolute top-2.5 left-0 size-1.5 rounded-full bg-muted-foreground/50"
                              aria-hidden="true"
                            />
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <h4 className="text-lg font-semibold text-foreground">{pos.role}</h4>
                              <span className="font-mono text-xs text-muted-foreground">{formatDuration(pos.duration)}</span>
                            </div>

                            <ul className="mt-4 space-y-3">
                              {pos.achievements.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                                >
                                  <span
                                    className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/80"
                                    aria-hidden="true"
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>

                            <ul className="mt-5 flex flex-wrap gap-2">
                              {pos.tools.map((tool) => (
                                <li
                                  key={tool}
                                  className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                                >
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

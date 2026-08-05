import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ListChecks,
  X,
} from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal } from "@/components/motion-primitives";
import { MagneticButton } from "@/components/magnetic-button";
import { Section, SectionHeading } from "@/components/section";

const PER_PAGE = 3;

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const pageCount = Math.ceil(projects.length / PER_PAGE);
  const goTo = (next: number) => {
    if (next === page || next < 0 || next >= pageCount) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };
  const pageProjects = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured projects"
        title="Test cycles, start to finish"
        description="Each project below shows the scope I owned, what went wrong, and what the cycle produced."
      />

      <div className="relative mt-14 overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {pageProjects.map((project, i) => (

          <Reveal key={project.name} delay={0.07 * i}>
            <article className="glass-card group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-muted/40">
                <img
                  src={project.image}
                  alt={`${project.name} project preview`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex flex-col justify-end gap-2 p-5">
                  <span className="w-fit rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-primary backdrop-blur-md">
                    {project.kind}
                  </span>
                  <p className="font-display text-xl font-bold">{project.name}</p>
                </div>
              </div>


              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <ul className="mt-5 space-y-2">
                  {project.results.slice(0, 2).map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-nowrap items-center gap-2 pt-2">
                  <MagneticButton onClick={() => setActive(project)} className="px-3.5 py-2 text-xs">
                    Case Study
                  </MagneticButton>
                  {project.github ? (
                    <MagneticButton
                      href={project.github}
                      external
                      variant="outline"
                      className="px-3.5 py-2 text-xs"
                      ariaLabel={`Open the GitHub repository for ${project.name}`}
                    >
                      <Github className="size-4" aria-hidden="true" />
                      GitHub
                    </MagneticButton>
                  ) : null}
                  {project.demo ? (
                    <MagneticButton
                      href={project.demo}
                      external
                      variant="outline"
                      className="px-3.5 py-2 text-xs"
                      ariaLabel={`Open the live demo for ${project.name}`}
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      Live Demo
                    </MagneticButton>
                  ) : null}

                </div>
              </div>
            </article>
          </Reveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          aria-label="Previous projects"
          className="grid size-11 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>

        <ul className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to project page ${i + 1}`}
                aria-current={i === page}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "w-7 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                }`}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page >= pageCount - 1}
          aria-label="Next projects"
          className="grid size-11 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>


      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 grid place-items-center bg-background/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} case study`}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-[var(--shadow-elegant)] sm:p-8"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-primary">{active.kind}</p>
                  <h3 className="mt-1 text-2xl font-bold">{active.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close case study"
                  className="grid size-11 place-items-center rounded-full border border-border bg-surface/60"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <Block icon={ListChecks} title="Responsibilities" items={active.responsibilities} />
              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-display text-sm font-semibold tracking-widest text-primary uppercase">
                  <AlertTriangle className="size-4" aria-hidden="true" />
                  Challenges
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.challenges}</p>
              </div>
              <Block icon={CheckCircle2} title="Results" items={active.results} />

              <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {active.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}

function Block({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof ListChecks;
  title: string;
  items: string[];
}) {
  return (
    <div className="mt-6">
      <h4 className="flex items-center gap-2 font-display text-sm font-semibold tracking-widest text-primary uppercase">
        <Icon className="size-4" aria-hidden="true" />
        {title}
      </h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

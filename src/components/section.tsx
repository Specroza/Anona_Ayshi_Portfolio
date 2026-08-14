import { Reveal } from "@/components/motion-primitives";
import { ScrambleText } from "@/components/scramble-text";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          <ScrambleText text={eyebrow} />
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.14}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section-shell scroll-mt-2 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

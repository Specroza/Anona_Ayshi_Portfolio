import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { portraitUrl, resumeUrl } from "@/lib/assets";
import { MagneticButton } from "@/components/magnetic-button";
import { ScrambleText } from "@/components/scramble-text";


export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 [background:var(--gradient-hero)]"
        aria-hidden="true"
      />
      <div
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-80 animate-float-slow rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -right-20 size-96 animate-float-slower rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />



      <div className="section-shell relative grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.35em] text-primary uppercase"
          >
            <ScrambleText text="Ayshi— Portfolio" className="inline-block" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">Software Quality</span>
            <br />
            <span className="inline-block">Assurance Engineer</span>
          </motion.h1>



          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects">
              Selected Work
              <ArrowRight className="size-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton
 href={resumeUrl}
  external
  variant="outline"
  ariaLabel="Open resume in Google Drive"
>
  <Download className="size-4" aria-hidden="true" />
  Resume PDF
</MagneticButton>
          </motion.div>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
}

const socials = [
  { icon: Github, href: profile.github, label: "GitHub profile" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn profile" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email Anona Ayshi Rozario" },
];

function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const x = useSpring(rawX, { stiffness: 140, damping: 24, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 140, damping: 24, mass: 0.4 });
  const spotlight = useMotionTemplate`radial-gradient(120px circle at ${x}% ${y}%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 72%)`;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    rawX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    rawY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[17rem] lg:justify-self-end"
    >
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2rem] [background:var(--gradient-accent)] opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-[18px] border border-border/60 bg-surface/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ y: hovered ? -4 : [0, -12, 0] }}
        transition={
          hovered
            ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
        className={`glass group relative overflow-hidden rounded-[18px] border transition-[border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hovered
            ? "border-primary/45 shadow-[0_36px_90px_-24px_rgba(0,0,0,0.7),0_0_36px_-6px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
            : "border-border/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
        }`}
      >
        <motion.div
          aria-hidden="true"
          style={{ backgroundImage: spotlight }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-10 blur-xl"
        />

        <div className="flex items-center gap-1.5 border-b border-border/70 bg-surface/50 px-3 py-2">
          <span className="size-2 rounded-full bg-destructive/70" aria-hidden="true" />
          <span className="size-2 rounded-full bg-accent/70" aria-hidden="true" />
          <span className="size-2 rounded-full bg-primary/70" aria-hidden="true" />
        </div>

        <div className="overflow-hidden border-b border-border/70 bg-surface/40">
          <img
            src={portraitUrl}
            alt={`Portrait of ${profile.name}, Software Quality Assurance Engineer`}
            width={600}
            height={600}
            loading="eager"
            decoding="async"
            className="aspect-square w-full object-cover grayscale-[0.75] transition-[filter,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
          />

        </div>

        <div className="px-3 pt-3 pb-2 text-center">
          <p className="font-display text-base leading-tight font-semibold">{profile.name}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-0.5 block truncate text-xs text-primary hover:underline"
          >
            {profile.email}
          </a>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            Dhaka — online
          </p>
        </div>

        <ul className="flex items-center justify-center gap-2 border-t border-border/70 px-3 py-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

      </motion.div>
    </motion.div>
  );
}

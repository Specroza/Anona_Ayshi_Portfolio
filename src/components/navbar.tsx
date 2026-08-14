import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Award, Briefcase, Code2, Home, Layers, Mail, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { navLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  "#home": Home,
  "#about": User,
  "#experience": Briefcase,
  "#projects": Code2,
  "#skills": Layers,
  "#certifications": Award,
  "#contact": Mail,
};

const BASE_SIZE = 44;
const MAX_SIZE = 70;
const INFLUENCE = 130;

export function Navbar() {
  const [active, setActive] = useState<string>(navLinks[0]?.href ?? "#home");
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const next = `#${visible.target.id}`;
          setActive(next);
          if (next === "#home" || next === "#contact") {
            window.history.replaceState(null, "", next);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6"
    >
      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="glass flex max-w-full items-end gap-1 rounded-full p-2 shadow-[var(--shadow-elegant)] sm:gap-2 sm:p-2.5"
      >
        {navLinks.map((link) => (
          <DockItem
            key={link.href}
            href={link.href}
            label={link.label}
            Icon={iconMap[link.href] ?? Home}
            isActive={active === link.href}
            mouseX={mouseX}
          />
        ))}
      </motion.ul>
    </nav>
  );
}

function DockItem({
  href,
  label,
  Icon,
  isActive,
  mouseX,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Number.POSITIVE_INFINITY;
    return x - (bounds.left + bounds.width / 2);
  });

  const targetSize = useTransform(distance, [-INFLUENCE, 0, INFLUENCE], [BASE_SIZE, MAX_SIZE, BASE_SIZE], {
    clamp: true,
  });
  const size = useSpring(targetSize, { stiffness: 320, damping: 26, mass: 0.35 });
  const iconSize = useTransform(size, (s) => s * 0.42);

  return (
    <li className="shrink-0">
      <motion.a
        ref={ref}
        href={href}
        aria-label={label}
        aria-current={isActive ? "true" : undefined}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={cn(
          "relative grid origin-bottom place-items-center rounded-full border transition-colors duration-300",
          isActive
            ? "border-primary/40 text-primary-foreground"
            : "border-border bg-surface/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
        )}
      >
        {isActive ? (
          <motion.span
            layoutId="dock-active"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute inset-0 rounded-full [background:var(--gradient-primary)]"
            aria-hidden="true"
          />
        ) : null}

        <motion.span
          className="relative grid place-items-center"
          style={{ width: iconSize, height: iconSize }}
        >
          <Icon className="size-full" aria-hidden="true" />
        </motion.span>

        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="glass pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-border/70 px-2.5 py-1 text-[11px] whitespace-nowrap text-foreground"
          aria-hidden="true"
        >
          {label}
        </motion.span>
      </motion.a>
    </li>
  );
}

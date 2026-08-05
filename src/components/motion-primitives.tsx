import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
};

const motionCache = new Map<ElementType, ElementType>();
function getMotionTag(as: ElementType): ElementType {
  let cached = motionCache.get(as);
  if (!cached) {
    cached = motion(as as never) as ElementType;
    motionCache.set(as, cached);
  }
  return cached;
}

/** Fade + rise once the element scrolls into view. */
export function Reveal({ children, delay = 0, y = 18, className, as }: RevealProps) {
  const MotionTag = getMotionTag(as ?? "div");
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from 0 to `value` the first time it becomes visible. */
export function CountUp({ value, suffix = "", duration = 1300, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

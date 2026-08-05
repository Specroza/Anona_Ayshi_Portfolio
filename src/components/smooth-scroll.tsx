import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered inertial smooth scrolling.
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash || hash === "#") return;
      const target = document.querySelector(hash) as HTMLElement | null;
      if (!target) return;
      event.preventDefault();
      const top = window.scrollY + target.getBoundingClientRect().top - 8;
      lenis.scrollTo(Math.max(0, top), { duration: 1.3 });
      window.history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

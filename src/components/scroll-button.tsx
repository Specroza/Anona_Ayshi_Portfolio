import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

/**
 * Smart floating scroll button: scrolls to the next section while near the top,
 * flips to "back to top" once the user has scrolled down.
 */
export function ScrollButton() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.6);
      setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#home");
      return;
    }
    const contact = document.querySelector<HTMLElement>("#contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#contact");
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };


  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label={scrolled ? "Scroll back to top" : "Scroll to next section"}
          className="glass fixed right-4 bottom-24 z-50 grid size-11 place-items-center rounded-full border border-primary/30 text-primary shadow-[var(--shadow-elegant)] transition-colors duration-300 hover:border-primary/60 hover:text-foreground sm:right-6 sm:bottom-28"
        >
          <motion.span
            key={scrolled ? "up" : "down"}
            initial={{ opacity: 0, y: scrolled ? 6 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid place-items-center"
          >
            {scrolled ? (
              <ArrowUp className="size-4" aria-hidden="true" />
            ) : (
              <ArrowDown className="size-4" aria-hidden="true" />
            )}
          </motion.span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

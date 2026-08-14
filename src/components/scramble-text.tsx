import { useEffect, useRef, useState} from "react";

const CHARS = "0123456789#$%&*<>/{}[]";

type Props = {
  text: string;
  className?: string;
  /** Total duration of the scramble in ms. */
  duration?: number;
};

/**
 * Hover-only text scramble. Characters are swapped for glyphs of the same
 * count so layout never shifts, then resolve back left-to-right.
 */
export function ScrambleText({ text, className, duration = 420 }: Props) {
  const [display, setDisplay] = useState(text);
  const [active, setActive] = useState(false);
  const frame = useRef<number | null>(null);
  const running = useRef(false);

  useEffect(() => setDisplay(text), [text]);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    []
  );
 const startRef = useRef<() => void>(() => {});
   useEffect(() => {
    const id = setInterval(() => startRef.current(), 3000);
    return () => clearInterval(id);
  }, []);
  const start = () => {
    if (running.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    running.current = true;
    setActive(true);

    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const revealed = progress * text.length;

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "\n") return char;
            if (i < revealed) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        setActive(false);
        running.current = false;
      }
    };

    frame.current = requestAnimationFrame(tick);
  };
startRef.current = start;
  return (
    <span
      onMouseEnter={start}
      className={className}
      style={{
        transition: "text-shadow 300ms ease, color 300ms ease",
        textShadow: active ? "0 0 18px color-mix(in oklab, var(--primary) 55%, transparent)" : "none",
      }}
    >
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

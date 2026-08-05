import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "text-primary-foreground shadow-[var(--shadow-glow)] [background:var(--gradient-primary)] hover:brightness-110",
  outline:
    "border border-border bg-surface/50 text-foreground backdrop-blur-md hover:border-primary/50 hover:bg-surface",
  ghost: "text-muted-foreground hover:text-foreground",
};

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
};

/** Button with a subtle magnetic pull toward the cursor. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  download,
  external,
  ariaLabel,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.16;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0)";
  };

  const shared = {
    className: cn(base, variants[variant], className),
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        whileTap={{ scale: 0.97 }}
        style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      style={{ transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
      {...shared}
    >
      {children}
    </motion.button>
  );
}

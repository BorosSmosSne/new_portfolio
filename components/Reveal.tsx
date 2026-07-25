"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered animation wrapper.
 *
 * Wrap anything in <Reveal> and it fades in and slides up the first time it
 * scrolls into view (Framer Motion's `whileInView` with `once: true`).
 *
 * Props:
 *   delay     — stagger children by passing an increasing delay (e.g. index * 0.08)
 *   direction — where the element travels in from; "none" fades only
 *   as        — render as a different element ("div" by default)
 *
 * Users with "reduce motion" enabled get the content immediately, no animation.
 */
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

const offsets = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? offsets.none : offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // once: true  -> animate the first time only, never re-run on scroll back
      // margin      -> start slightly before the element hits the viewport edge
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

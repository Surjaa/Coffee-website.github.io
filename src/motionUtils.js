import { tokens as t } from "./tokens.js";

export const ease = t.ease;

// Entrance: copy and card groups rise 12px and fade in, once, at 15% visibility.
export const rise = (reduce, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease, delay },
});

export const stagger = (step = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
});

export const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

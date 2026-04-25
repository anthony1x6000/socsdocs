import type { MotionProps } from "framer-motion";

// --- GLOBAL ANIMATIONS ---
export const ANIM_NONE: MotionProps = {};
export const ANIM_FLOAT: MotionProps = {
  animate: { y: [-2, 2, -2] },
  transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
};
export const ANIM_PULSE: MotionProps = {
  animate: { opacity: [0.8, 1, 0.8] },
  transition: { repeat: Infinity, duration: 2 },
};
export const ANIM_SCALE_PULSE: MotionProps = {
  animate: { scale: [1, 1.02, 1] },
  transition: { repeat: Infinity, duration: 3 },
};
export const ANIM_JITTER_MILD: MotionProps = {
  animate: { x: [-1, 1, -1], y: [-1, 1, -1] },
  transition: { repeat: Infinity, duration: 0.2, ease: "linear" },
};
export const ANIM_JITTER_INTENSE: MotionProps = {
  animate: { x: [-2, 2, -3, 3, -2, 2], y: [-2, 2, -3, 3, -2, 2] },
  transition: { repeat: Infinity, duration: 0.1, ease: "linear" },
};
export const ANIM_SHAKE: MotionProps = {
  animate: { x: [-4, 4, -6, 6, -4, 4], y: [-4, 4, -6, 6, -4, 4] },
  transition: { repeat: Infinity, duration: 0.05, ease: "linear" },
};
export const ANIM_BOUNCE_MILD: MotionProps = {
  animate: { y: [0, -2, 0] },
  transition: { repeat: Infinity, duration: 2 },
};
export const ANIM_BOUNCE_INTENSE: MotionProps = {
  animate: { y: [0, -4, 0], opacity: [0.9, 1, 0.9] },
  transition: { repeat: Infinity, duration: 1 },
};
export const ANIM_SKEW: MotionProps = {
  animate: { y: [0, -6, 0], skewX: [-3, 3, -3], skewY: [-1, 1, -1] },
  transition: { repeat: Infinity, duration: 0.1 },
};
export const ANIM_BG_SHIFT: MotionProps = {
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
  transition: { repeat: Infinity, duration: 5 }
};

export const hoverScale = (scale: number) => ({ whileHover: { scale }, whileTap: { scale: 1 - (scale - 1) } });

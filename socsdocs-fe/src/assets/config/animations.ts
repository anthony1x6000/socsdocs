import type { MotionProps } from "framer-motion";

/**
 * Creates a jitter animation with configurable intensity and duration.
 * @param intensity - Pixel offset for jittering.
 * @param duration - Cycle duration in seconds.
 */
export const createJitter = (intensity: number = 1, duration: number = 0.2): MotionProps => ({
  animate: { 
    x: [-intensity, intensity, -intensity], 
    y: [-intensity, intensity, -intensity] 
  },
  transition: { repeat: Infinity, duration, ease: "linear" },
});

/**
 * Creates a shake animation (more chaotic jitter) with configurable intensity.
 * @param intensity - Maximum pixel offset.
 * @param duration - Cycle duration in seconds.
 */
export const createShake = (intensity: number = 4, duration: number = 0.05): MotionProps => ({
  animate: { 
    x: [-intensity, intensity, -(intensity * 1.5), (intensity * 1.5), -intensity, intensity], 
    y: [-intensity, intensity, -(intensity * 1.5), (intensity * 1.5), -intensity, intensity] 
  },
  transition: { repeat: Infinity, duration, ease: "linear" },
});

/**
 * Creates a bounce animation with configurable height.
 * @param height - Maximum pixel height of the bounce.
 * @param duration - Cycle duration in seconds.
 */
export const createBounce = (height: number = 2, duration: number = 2): MotionProps => ({
  animate: { y: [0, -height, 0] },
  transition: { repeat: Infinity, duration },
});

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

export const ANIM_JITTER_MILD = createJitter(1, 0.2);
export const ANIM_JITTER_INTENSE = createJitter(2, 0.1);

export const ANIM_SHAKE = createShake(4, 0.05);

export const ANIM_BOUNCE_MILD = createBounce(2, 2);
export const ANIM_BOUNCE_INTENSE = createBounce(4, 2);

export const ANIM_SKEW: MotionProps = {
  animate: { y: [0, -6, 0], skewX: [-3, 3, -3], skewY: [-1, 1, -1] },
  transition: { repeat: Infinity, duration: 0.1 },
};

export const ANIM_BG_SHIFT: MotionProps = {
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
  transition: { repeat: Infinity, duration: 5 }
};

export const hoverScale = (scale: number) => ({ whileHover: { scale }, whileTap: { scale: 1 - (scale - 1) } });

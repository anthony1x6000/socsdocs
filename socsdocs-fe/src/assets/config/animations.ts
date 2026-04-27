import type { MotionProps } from "framer-motion";

/**
 * Creates a jitter animation configuration for framer-motion.
 * This effect uses micro offsets and extreme speed to simulate a vibrating or shaking (jitter) effect.
 *
 * @param intensity - The maximum pixel offset for the jitter in both x and y directions. Defaults to 1.
 * @param duration - The duration of one complete jitter cycle in seconds. Defaults to 0.2.
 * @returns The framer-motion properties to apply the jitter animation.
 *
 * @example
 * const intenseJitter = createJitter(2, 0.05);
 * // Usage: <motion.div {...intenseJitter}>Jittering Element</motion.div>
 */
export const createJitter = (intensity: number = 1, duration: number = 0.2): MotionProps => ({
  animate: { 
    x: [0, `${intensity * 0.05}vw`, `${-intensity * 0.05}vw`, 0], 
    y: [0, `${-intensity * 0.05}vw`, `${intensity * 0.05}vw`, 0] 
  },
  transition: { 
    repeat: Infinity, 
    duration, 
    ease: "linear",
    times: [0, 0.25, 0.75, 1] 
  },
});

/**
 * Creates a sway animation.
 */
export const createSway = (intensity: number = 4, duration: number = 0.05): MotionProps => ({
  animate: { 
    x: [0, `${-intensity * 0.1}vw`, `${intensity * 0.1}vw`, `${-intensity * 0.15}vw`, `${intensity * 0.15}vw`, `${-intensity * 0.1}vw`, `${intensity * 0.1}vw`, 0], 
    y: [0, `${-intensity * 0.1}vw`, `${intensity * 0.1}vw`, `${-intensity * 0.15}vw`, `${intensity * 0.15}vw`, `${-intensity * 0.1}vw`, `${intensity * 0.1}vw`, 0] 
  },
  transition: { repeat: Infinity, duration, ease: "linear" },
});

/**
 * Creates a bounce animation.
 */
export const createBounce = (height: number = 2, duration: number = 2): MotionProps => ({
  animate: { y: [0, `${-height * 0.5}vh`, 0] },
  transition: { repeat: Infinity, duration },
});

/**
 * Creates a skew animation.
 */
export const createSkew = (intensity: number = 3, duration: number = 0.1): MotionProps => ({
  animate: { 
    y: [0, -(intensity * 2), 0], 
    skewX: [0, -intensity, 0, intensity, 0], 
    skewY: [0, -(intensity / 3), 0, intensity / 3, 0] 
  },
  transition: { repeat: Infinity, duration },
});

// --- CONSTANTS ---
export const ANIM_NONE: MotionProps = {};

// Micro offsets (0.2 - 1px), extreme speed
export const ANIM_JITTER_1 = ANIM_NONE;
export const ANIM_JITTER_2 = createJitter(0.8, 0.08);
export const ANIM_JITTER_3 = createJitter(0.2, 0.1);
export const ANIM_JITTER_4 = createJitter(2, 0.03);
export const ANIM_JITTER_5 = createJitter(1.5, 0.1); 

export const ANIM_SWAY_1 = ANIM_NONE;
export const ANIM_SWAY_2 = ANIM_NONE; // createSway(0.3, 0.2);
export const ANIM_SWAY_3 = ANIM_NONE; // createSway(0.6, 0.15);
export const ANIM_SWAY_4 = ANIM_NONE; // createSway(1, 0.1); 
export const ANIM_SWAY_5 = ANIM_NONE; // createSway(4, 0.02); 

export const ANIM_SKEW_1 = ANIM_NONE;
export const ANIM_SKEW_2 = ANIM_NONE; // createSkew(0.5, 0.4);
export const ANIM_SKEW_3 = ANIM_NONE; // createSkew(1, 0.3);
export const ANIM_SKEW_4 = ANIM_NONE; // createSkew(1.5, 0.2);
export const ANIM_SKEW_5 = ANIM_NONE; // createSkew(3, 0.05);

export const ANIM_BOUNCE_1 = ANIM_NONE;
export const ANIM_BOUNCE_2 = ANIM_NONE;
export const ANIM_BOUNCE_3 = ANIM_NONE;
export const ANIM_BOUNCE_4 = ANIM_NONE;
export const ANIM_BOUNCE_5 = ANIM_NONE;

// --- MAPS ---

export const elementAnimationMap: Record<number, MotionProps[]> = {
  1: [ANIM_NONE],
  2: [ANIM_JITTER_1, ANIM_SWAY_2],
  3: [ANIM_JITTER_2, ANIM_SWAY_3, ANIM_SKEW_2],
  4: [ANIM_JITTER_3, ANIM_SWAY_4, ANIM_SKEW_4, ANIM_BOUNCE_2],
  5: [ANIM_JITTER_5, ANIM_SWAY_5, ANIM_SKEW_5, ANIM_BOUNCE_5],
};

export const textAnimationMap: Record<number, MotionProps[]> = {
  1: [ANIM_NONE],
  2: [ANIM_JITTER_1],
  3: [ANIM_JITTER_3, ANIM_SWAY_2],
  4: [ANIM_JITTER_3, ANIM_SWAY_4, ANIM_SKEW_2],
  5: [ANIM_JITTER_5],
};

export const RESET_TRANSFORM = {
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  skewX: 0,
  skewY: 0,
  opacity: 1
};

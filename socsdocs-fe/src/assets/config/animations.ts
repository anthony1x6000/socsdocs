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

/**
 * Creates a skew animation with configurable intensity and duration.
 * @param intensity - Base multiplier for skew and translation.
 * @param duration - Cycle duration in seconds.
 */
export const createSkew = (intensity: number = 3, duration: number = 0.1): MotionProps => ({
  animate: { 
    y: [0, -(intensity * 2), 0], 
    skewX: [-intensity, intensity, -intensity], 
    skewY: [-(intensity / 3), intensity / 3, -(intensity / 3)] 
  },
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

export const ANIM_SHAKE_1 = ANIM_NONE;
export const ANIM_SHAKE_2 = createJitter(0.5, 0.2);
export const ANIM_SHAKE_3 = createJitter(1, 0.15);
export const ANIM_SHAKE_4 = createShake(2, 0.1);
export const ANIM_SHAKE_5 = createShake(4, 0.05);

export const ANIM_BOUNCE_MILD = createBounce(2, 2);
export const ANIM_BOUNCE_INTENSE = createBounce(4, 2);

export const ANIM_SKEW_1 = createSkew(0.5, 0.5);
export const ANIM_SKEW_2 = createSkew(1, 0.4);
export const ANIM_SKEW_3 = createSkew(1.5, 0.3);
export const ANIM_SKEW_4 = createSkew(2, 0.2);
export const ANIM_SKEW_5 = createSkew(3, 0.1);

export const ANIM_SKEW = ANIM_SKEW_5; // Alias for backward compatibility

export const ANIM_BG_SHIFT: MotionProps = {
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
  transition: { repeat: Infinity, duration: 5 }
};

export const hoverScale = (scale: number) => ({ whileHover: { scale }, whileTap: { scale: 1 - (scale - 1) } });

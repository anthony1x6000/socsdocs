import type { MotionProps } from "framer-motion";

export type DopamineLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Configuration for the background elements.
 */
export interface BackgroundConfig {
  /** Path to the GLSL fragment shader file in public directory */
  fragmentShader: string;
  /** URL for the overlay background image */
  overlayUrl: string;
  /** CSS mix-blend-mode for the overlay */
  mixBlendMode: React.CSSProperties['mixBlendMode'];
}

export interface DopamineConfig {
  songs: string[];
  backgroundAnimation: MotionProps;
  isInverted: boolean;
  /** Background-specific configurations */
  background: BackgroundConfig;
}

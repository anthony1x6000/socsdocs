import type React from "react";
import type { MotionProps } from "framer-motion";

export interface LevelColors {
  text: string;
  primary: string;
  secondary: string;
  accent: string;
}

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

  extraStyle?: string;
}

export interface DopamineConfig {
  songs: string[];
  backgroundAnimation: MotionProps;
  isInverted: boolean;
  /** Background-specific configurations */
  background: BackgroundConfig;
}

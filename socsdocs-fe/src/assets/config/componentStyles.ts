import type { MotionProps } from "framer-motion";
import type { DopamineLevel } from "./types";
import { 
  ANIM_SHAKE_1, ANIM_SHAKE_2, ANIM_SHAKE_3, ANIM_SHAKE_4, ANIM_SHAKE_5,
  ANIM_NONE, ANIM_FLOAT, ANIM_JITTER_MILD, ANIM_JITTER_INTENSE, ANIM_SHAKE,
  ANIM_BOUNCE_MILD, ANIM_BOUNCE_INTENSE, ANIM_SKEW_1, ANIM_BG_SHIFT, ANIM_SCALE_PULSE
} from "./animations";
import { 
  LEVEL_1_COLORS, LEVEL_2_COLORS, LEVEL_3_COLORS, LEVEL_4_COLORS, LEVEL_5_COLORS 
} from "./colors";

export const backgroundAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_SHAKE_1,
  2: ANIM_SHAKE_2,
  3: ANIM_SHAKE_3,
  4: ANIM_SHAKE_4,
  5: ANIM_SHAKE_5,
};

export const textAnimations: Record<number, any> = {
  1: ANIM_NONE,
  2: ANIM_FLOAT,
  3: ANIM_JITTER_MILD,
  4: ANIM_JITTER_INTENSE,
  5: ANIM_SHAKE,
};

export const textColors: Record<number, string> = {
  1: LEVEL_1_COLORS.text,
  2: LEVEL_2_COLORS.text,
  3: LEVEL_3_COLORS.text,
  4: LEVEL_4_COLORS.text,
  5: LEVEL_5_COLORS.text,
};

export const fontWeights: Record<number, string> = {
  1: "font-normal",
  2: "font-medium",
  3: "font-medium",
  4: "font-semibold",
  5: "font-bold",
};

export const elementAnimations: Record<number, any> = {
  1: ANIM_NONE,
  2: ANIM_NONE,
  3: ANIM_BOUNCE_MILD,
  4: ANIM_BOUNCE_INTENSE,
  5: ANIM_SKEW_1,
};

export const primaryColors: Record<number, string> = {
  1: LEVEL_1_COLORS.primary,
  2: LEVEL_2_COLORS.primary,
  3: LEVEL_3_COLORS.primary,
  4: LEVEL_4_COLORS.primary,
  5: LEVEL_5_COLORS.primary,
};

export const accentColors: Record<number, string> = {
  1: LEVEL_1_COLORS.accent,
  2: LEVEL_2_COLORS.accent,
  3: LEVEL_3_COLORS.accent,
  4: LEVEL_4_COLORS.accent,
  5: LEVEL_5_COLORS.accent,
};


import type { MotionProps } from "framer-motion";
import type { DopamineLevel } from "./types";
import { LEVEL_1_COLORS, LEVEL_2_COLORS, LEVEL_3_COLORS, LEVEL_4_COLORS, LEVEL_5_COLORS } from "./colors";
import { 
  ANIM_NONE, ANIM_FLOAT, ANIM_JITTER_MILD, ANIM_JITTER_INTENSE, ANIM_SHAKE, 
  ANIM_PULSE, hoverScale, ANIM_BOUNCE_MILD, ANIM_BOUNCE_INTENSE, ANIM_SKEW,
  ANIM_BG_SHIFT, ANIM_SCALE_PULSE
} from "./animations";

const titleSize = "text-5xl";
export const titleStyles: Record<DopamineLevel, string> = {
  1: `${titleSize} font-medium ${LEVEL_1_COLORS.text}`,
  2: `${titleSize} font-medium ${LEVEL_2_COLORS.text}`,
  3: `${titleSize} font-medium ${LEVEL_3_COLORS.text}`,
  4: `${titleSize} font-semibold ${LEVEL_4_COLORS.text}`,
  5: `${titleSize} font-bold ${LEVEL_5_COLORS.text}`,
};

const headerSize = "text-3xl";
export const headerStyles: Record<DopamineLevel, string> = {
  1: `${headerSize} font-normal ${LEVEL_1_COLORS.text}`,
  2: `${headerSize} font-medium ${LEVEL_2_COLORS.text}`,
  3: `${headerSize} font-medium ${LEVEL_3_COLORS.text}`,
  4: `${headerSize} font-semibold ${LEVEL_4_COLORS.text}`,
  5: `${headerSize} font-bold ${LEVEL_5_COLORS.text}`,
};

export const titleAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_FLOAT,
  3: ANIM_JITTER_MILD,
  4: ANIM_JITTER_INTENSE,
  5: ANIM_SHAKE,
};

export const textAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_FLOAT,
  3: ANIM_JITTER_MILD,
  4: ANIM_JITTER_INTENSE,
  5: ANIM_SHAKE,
};

export const buttonStyles: Record<DopamineLevel, string> = {
  1: LEVEL_1_COLORS.primary,
  2: LEVEL_2_COLORS.primary,
  3: LEVEL_3_COLORS.primary,
  4: LEVEL_4_COLORS.primary,
  5: LEVEL_5_COLORS.primary,
};

export const buttonAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: hoverScale(1.05),
  3: { ...hoverScale(1.1), ...ANIM_BOUNCE_MILD },
  4: { ...hoverScale(1.15), ...ANIM_BOUNCE_INTENSE },
  5: { ...hoverScale(1.2), ...ANIM_SKEW },
};

export const sliderStyles: Record<DopamineLevel, string> = {
  1: LEVEL_1_COLORS.accent,
  2: LEVEL_2_COLORS.accent,
  3: LEVEL_3_COLORS.accent,
  4: LEVEL_4_COLORS.accent,
  5: LEVEL_5_COLORS.accent,
};

export const sliderAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_PULSE,
  3: ANIM_JITTER_MILD,
  4: ANIM_JITTER_INTENSE,
  5: ANIM_SHAKE,
};

export const bodyFrameStyles: Record<DopamineLevel, string> = {
  1: `p-4 ${LEVEL_1_COLORS.secondary}`,
  2: `p-6 ${LEVEL_2_COLORS.secondary}`,
  3: `p-8 ${LEVEL_3_COLORS.secondary}`,
  4: `p-10 ${LEVEL_4_COLORS.secondary}`,
  5: `p-12 ${LEVEL_5_COLORS.secondary}`,
};

export const bodyFrameAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_NONE,
  3: ANIM_BG_SHIFT,
  4: ANIM_SCALE_PULSE,
  5: ANIM_SHAKE,
};

export const settingsBarStyles: Record<DopamineLevel, string> = {
  1: LEVEL_1_COLORS.primary,
  2: LEVEL_2_COLORS.primary,
  3: LEVEL_3_COLORS.primary,
  4: LEVEL_4_COLORS.primary,
  5: LEVEL_5_COLORS.primary,
};

export const settingsBarAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_NONE,
  2: ANIM_NONE,
  3: ANIM_BOUNCE_MILD,
  4: ANIM_BOUNCE_INTENSE,
  5: ANIM_SKEW,
};

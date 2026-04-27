import { 
  LEVEL_1_COLORS, LEVEL_2_COLORS, LEVEL_3_COLORS, LEVEL_4_COLORS, LEVEL_5_COLORS 
} from "./colors";

export const backgroundAnimations: Record<number, any> = {
  1: {},
  2: { animate: { x: [0, -1, 1, 0] }, transition: { repeat: Infinity, duration: 0.2 } },
  3: { animate: { x: [0, -2, 2, 0] }, transition: { repeat: Infinity, duration: 0.15 } },
  4: { animate: { x: [0, -3, 3, 0] }, transition: { repeat: Infinity, duration: 0.1 } },
  5: { animate: { x: [0, -5, 5, 0] }, transition: { repeat: Infinity, duration: 0.05 } },
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
  2: "font-normal",
  3: "font-normal",
  4: "font-normal",
  5: "font-normal",
};

export const headerWeights: Record<number, string> = {
  1: "font-semibold",
  2: "font-semibold",
  3: "font-semibold",
  4: "font-bold",
  5: "font-black",
};

export const titleWeights: Record<number, string> = {
  1: "font-bold",
  2: "font-bold",
  3: "font-bold",
  4: "font-bold",
  5: "font-black",
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

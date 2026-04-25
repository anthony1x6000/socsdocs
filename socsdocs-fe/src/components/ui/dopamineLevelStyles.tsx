import type { MotionProps } from "framer-motion";
import stylesData from "../../assets/dopamineStyles.json";

export type DopamineLevel = 1 | 2 | 3 | 4 | 5;

const fixAnimation = (animation: any): MotionProps => {
  const fixed = { ...animation };
  if (fixed.transition?.repeat === "Infinity") {
    fixed.transition.repeat = Infinity;
  }
  return fixed;
};

export const titleLevelStyle = stylesData.titleLevelStyle as Record<string | number, string>;
export const buttonStyle = stylesData.buttonStyle as Record<string | number, string>;
export const sliderStyle = stylesData.sliderStyle as Record<string | number, string>;
export const bodyFrameStyle = stylesData.bodyFrameStyle as Record<string | number, string>;
export const levelSongs = stylesData.levelSongs as Record<string | number, string[]>;

export const titleLevelAnimation: Record<string | number, MotionProps> = {
  1: fixAnimation(stylesData.titleLevelAnimation["1"]),
  2: fixAnimation(stylesData.titleLevelAnimation["2"]),
  3: fixAnimation(stylesData.titleLevelAnimation["3"]),
  4: fixAnimation(stylesData.titleLevelAnimation["4"]),
  5: fixAnimation(stylesData.titleLevelAnimation["5"]),
};

/**
 * Helper function to get all styles and configurations for a specific dopamine level.
 */
export const getDopamineConfig = (level: DopamineLevel | number) => {
    return {
        titleStyle: titleLevelStyle[level],
        titleAnimation: titleLevelAnimation[level],
        buttonStyle: buttonStyle[level],
        sliderStyle: sliderStyle[level],
        bodyFrameStyle: bodyFrameStyle[level],
        songs: levelSongs[level] || levelSongs[1],
    };
};

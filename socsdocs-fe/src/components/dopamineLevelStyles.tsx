import type { MotionProps } from "framer-motion";
import stylesData from "../../public/dopamineStyles.json";

export type HeadingLevel = number;

// 1. Create an empty box to hold our styles
export const titleLevelStyle: Record<HeadingLevel, string> = {};

// 2. Go through the JSON data, changing the text keys into numbers, and save them in the box
for (const [key, value] of Object.entries(stylesData.titleLevelStyle)) {
  const levelNumber = Number(key);
  titleLevelStyle[levelNumber] = value;
}

// 3. Create an empty box to hold our animations
export const titleLevelAnimation: Record<HeadingLevel, MotionProps> = {};

// 4. Go through the JSON data for animations
for (const [key, value] of Object.entries(stylesData.titleLevelAnimation)) {
  const levelNumber = Number(key);
  const animation = { ...value } as any; // Make a copy so we can safely edit it

  // JSON only supports the text word "Infinity", but Framer Motion needs the math concept of Infinity.
  if (animation.transition && animation.transition.repeat === "Infinity") {
    animation.transition.repeat = Infinity; // Swap the word out for the math concept!
  }

  // Save the fixed animation into our box
  titleLevelAnimation[levelNumber] = animation;
}

import type { DopamineLevel, DopamineConfig } from "./types";
import { songs } from "./songs";
import { 
  titleStyles, headerStyles, titleAnimations, textAnimations,
  buttonStyles, buttonAnimations, sliderStyles, sliderAnimations,
  bodyFrameStyles, bodyFrameAnimations, settingsBarStyles, settingsBarAnimations
} from "./componentStyles";

export * from "./types";
export * from "./colors";
export * from "./animations";
export * from "./baseStyles";
export { songs as levelSongs };

export const getDopamineConfig = (level: number): DopamineConfig => {
  const specifiedLevel = Math.min(Math.max(Math.floor(level), 1), 5) as DopamineLevel;
  return {
    titleStyle: titleStyles[specifiedLevel],
    headerStyle: headerStyles[specifiedLevel],
    titleAnimation: titleAnimations[specifiedLevel],
    buttonStyle: buttonStyles[specifiedLevel],
    buttonAnimation: buttonAnimations[specifiedLevel],
    sliderStyle: sliderStyles[specifiedLevel],
    sliderAnimation: sliderAnimations[specifiedLevel],
    bodyFrameStyle: bodyFrameStyles[specifiedLevel],
    bodyFrameAnimation: bodyFrameAnimations[specifiedLevel],
    settingsBarStyle: settingsBarStyles[specifiedLevel],
    settingsBarAnimation: settingsBarAnimations[specifiedLevel],
    songs: songs[specifiedLevel],
    textAnimation: textAnimations[specifiedLevel],
  };
};

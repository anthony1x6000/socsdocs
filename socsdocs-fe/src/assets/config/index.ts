import type { DopamineLevel, DopamineConfig } from "./types";
import { songs } from "./songs";
import { backgroundAnimations } from "./componentStyles";
import { backgroundConfigs } from "./background/backgrounds";

export * from "./interface";
export * from "./types";
export * from "./colors";
export * from "./animations";
export * from "./baseStyles";
export * from "./componentStyles";
export { songs as levelSongs };

export const getDopamineConfig = (level: number): DopamineConfig => {
  const specifiedLevel = Math.min(Math.max(Math.floor(level), 1), 5) as DopamineLevel;
  return {
    songs: songs[specifiedLevel],
    backgroundAnimation: backgroundAnimations[specifiedLevel],
    isInverted: specifiedLevel >= 5,
    background: backgroundConfigs[specifiedLevel],
  };
};

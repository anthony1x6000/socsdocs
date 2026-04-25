import type { MotionProps } from "framer-motion";

export type DopamineLevel = 1 | 2 | 3 | 4 | 5;

export interface DopamineConfig {
  titleStyle: string;
  headerStyle: string;
  titleAnimation: MotionProps;
  buttonStyle: string;
  buttonAnimation: MotionProps;
  sliderStyle: string;
  sliderAnimation: MotionProps;
  bodyFrameStyle: string;
  bodyFrameAnimation: MotionProps;
  settingsBarStyle: string;
  settingsBarAnimation: MotionProps;
  songs: string[];
  textAnimation: MotionProps;
  backgroundAnimation: MotionProps;
  isInverted: boolean;
}

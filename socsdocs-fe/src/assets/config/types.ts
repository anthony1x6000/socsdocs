import type { MotionProps } from "framer-motion";

export type DopamineLevel = 1 | 2 | 3 | 4 | 5;

export interface DopamineConfig {
  songs: string[];
  backgroundAnimation: MotionProps;
  isInverted: boolean;
}

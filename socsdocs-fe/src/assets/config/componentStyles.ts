import type { MotionProps } from "framer-motion";
import type { DopamineLevel } from "./types";
import { 
  ANIM_SHAKE_1, ANIM_SHAKE_2, ANIM_SHAKE_3, ANIM_SHAKE_4, ANIM_SHAKE_5
} from "./animations";

export const backgroundAnimations: Record<DopamineLevel, MotionProps> = {
  1: ANIM_SHAKE_1,
  2: ANIM_SHAKE_2,
  3: ANIM_SHAKE_3,
  4: ANIM_SHAKE_4,
  5: ANIM_SHAKE_5,
};

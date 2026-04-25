import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { DopamineLevel } from '../../assets/config/types';
import { 
  LEVEL_1_COLORS, LEVEL_2_COLORS, LEVEL_3_COLORS, LEVEL_4_COLORS, LEVEL_5_COLORS 
} from '../../assets/config/colors';
import { 
  ANIM_NONE, ANIM_FLOAT, ANIM_JITTER_MILD, ANIM_JITTER_INTENSE, ANIM_SHAKE,
  ANIM_BOUNCE_MILD, ANIM_BOUNCE_INTENSE, ANIM_SKEW_1,
  ANIM_BG_SHIFT, ANIM_SCALE_PULSE
} from '../../assets/config/animations';
import { useResetMotion } from '../../utils/useResetMotion';

interface MoveableProps {
  children: React.ReactNode;
  intensity: number;
  className?: string;
}

/**
 * Wrapper for text elements that applies float, jitter, and shake based on intensity.
 */
export const TextMoveable: React.FC<MoveableProps> = ({ children, intensity, className }) => {
  const level = Math.min(Math.max(Math.floor(intensity), 1), 5) as DopamineLevel;
  
  const animations: Record<number, any> = {
    1: ANIM_NONE,
    2: ANIM_FLOAT,
    3: ANIM_JITTER_MILD,
    4: ANIM_JITTER_INTENSE,
    5: ANIM_SHAKE,
  };

  const textColors = {
    1: LEVEL_1_COLORS.text,
    2: LEVEL_2_COLORS.text,
    3: LEVEL_3_COLORS.text,
    4: LEVEL_4_COLORS.text,
    5: LEVEL_5_COLORS.text,
  };

  const fontWeights = {
    1: "font-normal",
    2: "font-medium",
    3: "font-medium",
    4: "font-semibold",
    5: "font-bold",
  };

  const motionProps = useResetMotion("text", intensity, animations[level]);

  return (
    <motion.span 
      className={twMerge("inline-block", textColors[level], fontWeights[level], className)} 
      {...motionProps}
    >
      {children}
    </motion.span>
  );
};

interface ElementMoveableProps extends MoveableProps {
  type?: 'button' | 'slider' | 'bodyFrame' | 'settingsBar';
}

/**
 * Wrapper for block-level elements that applies skew and bounce based on intensity.
 */
export const ElementMoveable: React.FC<ElementMoveableProps> = ({ 
  children, intensity, className, type 
}) => {
  const level = Math.min(Math.max(Math.floor(intensity), 1), 5) as DopamineLevel;

  const animations: Record<number, any> = {
    1: ANIM_NONE,
    2: ANIM_NONE,
    3: ANIM_BOUNCE_MILD,
    4: ANIM_BOUNCE_INTENSE,
    5: ANIM_SKEW_1,
  };

  let typeStyle = "";
  let typeAnim: any = {};

  if (type === 'button' || type === 'settingsBar') {
    const primaryColors = {
      1: LEVEL_1_COLORS.primary,
      2: LEVEL_2_COLORS.primary,
      3: LEVEL_3_COLORS.primary,
      4: LEVEL_4_COLORS.primary,
      5: LEVEL_5_COLORS.primary,
    };
    typeStyle = primaryColors[level];
  } else if (type === 'slider') {
    const accentColors = {
      1: LEVEL_1_COLORS.accent,
      2: LEVEL_2_COLORS.accent,
      3: LEVEL_3_COLORS.accent,
      4: LEVEL_4_COLORS.accent,
      5: LEVEL_5_COLORS.accent,
    };
    typeStyle = accentColors[level];
  } else if (type === 'bodyFrame') {
    const secondaryColors = {
      1: `p-4 ${LEVEL_1_COLORS.secondary}`,
      2: `p-6 ${LEVEL_2_COLORS.secondary}`,
      3: `p-8 ${LEVEL_3_COLORS.secondary}`,
      4: `p-10 ${LEVEL_4_COLORS.secondary}`,
      5: `p-12 ${LEVEL_5_COLORS.secondary}`,
    };
    typeStyle = secondaryColors[level];
    
    const bodyAnims: Record<number, any> = {
      1: ANIM_NONE,
      2: ANIM_NONE,
      3: ANIM_BG_SHIFT,
      4: ANIM_SCALE_PULSE,
      5: ANIM_SHAKE,
    };
    typeAnim = bodyAnims[level];
  }

  const baseAnim = animations[level];
  const combinedAnim = {
    ...baseAnim,
    animate: {
      ...(baseAnim.animate || {}),
      ...(typeAnim.animate || {})
    },
    transition: typeAnim.transition || baseAnim.transition
  };

  const motionProps = useResetMotion(type || "element", intensity, combinedAnim);

  return (
    <motion.div 
      className={twMerge(typeStyle, className)} 
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

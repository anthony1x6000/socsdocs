import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { DopamineLevel } from '../../assets/config/types';
import { useResetMotion } from '../../utils/useResetMotion';
import { 
  textAnimations, 
  elementAnimations, 
  bodyAnims 
} from '../../assets/config';

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
  
  const motionProps = useResetMotion("text", intensity, textAnimations[level]);

  return (
    <motion.span 
      className={twMerge("inline-block", className)} 
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

  let typeAnim: any = {};

  if (type === 'bodyFrame') {
    typeAnim = bodyAnims[level];
  }

  const baseAnim = elementAnimations[level];
  const combinedAnim = {
    ...baseAnim,
    animate: {
      ...(baseAnim?.animate || {}),
      ...(typeAnim?.animate || {})
    },
    transition: typeAnim?.transition || baseAnim?.transition
  };

  const motionProps = useResetMotion(type || "element", intensity, combinedAnim);

  return (
    <motion.div 
      className={className} 
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

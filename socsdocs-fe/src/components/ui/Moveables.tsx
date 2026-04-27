import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useResetMotion } from '../../utils/useResetMotion';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';
import { elementAnimationMap } from '../../assets/config/animations';

/**
 * Deep merges multiple Framer Motion configuration objects.
 * Combines 'animate' and 'transition' properties.
 */
const mergeAnimations = (animations: MotionProps[]): MotionProps => {
  return animations.reduce((acc, curr) => {
    const animate = {
      ...(acc.animate as object || {}),
      ...(curr.animate as object || {}),
    };
    
    const transition = {
      ...(acc.transition as object || {}),
      ...(curr.transition as object || {}),
    };

    return {
      ...acc,
      ...curr,
      animate,
      transition,
    };
  }, {} as MotionProps);
};

interface MoveableProps {
  /** The HTML element to render as. Defaults to 'div'. */
  as?: 'div' | 'span';
  /** Mapping of dopamine levels to animation arrays. Defaults to elementAnimationMap. */
  animationMap?: Record<number, MotionProps[]>;
  /** Optional dictionary for colors mapped to levels 1-5. */
  colorDict?: Record<number, string>;
  /** Optional dictionary for font weights/styles mapped to levels 1-5. */
  weightDict?: Record<number, string>;
  /** Base dopamine intensity multiplier. */
  intensityMod?: number;
  /** Intensity multiplier on hover. */
  intensityModHover?: number;
  /** Children to wrap. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
}

/**
 * Universal wrapper that applies dopamine-driven animations and styles.
 * 
 * @example
 * <Moveable 
 *   as="span" 
 *   animationMap={textAnimationMap} 
 *   intensityMod={1.5}
 * >
 *   <Text>Dopamine Text</Text>
 * </Moveable>
 */
export const Moveable = ({
  as = 'div',
  animationMap = elementAnimationMap,
  colorDict,
  weightDict,
  intensityMod = 1,
  intensityModHover,
  children,
  className,
}: MoveableProps) => {
  const { 
    intensity: currentIntensity, 
    handleMouseEnter, 
    handleMouseLeave 
  } = useDopamineIntensity(intensityMod, intensityModHover);

  const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);
  
  const animations = animationMap[level] || [{}];
  const mergedAnimation = mergeAnimations(animations);
  
  const motionProps = useResetMotion("element", currentIntensity, mergedAnimation);

  const MotionComponent = as === 'span' ? motion.span : motion.div;

  return (
    <MotionComponent
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={twMerge(
        as === 'span' && "inline-block",
        colorDict?.[level],
        weightDict?.[level],
        className
      )}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
};

export default Moveable;

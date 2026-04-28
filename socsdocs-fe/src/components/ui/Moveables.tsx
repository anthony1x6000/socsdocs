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

/**
 * Props for the Moveable component.
 */
interface MoveableProps {
  /** The HTML element to render the container as. Defaults to 'div'. */
  as?: 'div' | 'span';
  /** 
   * A map of dopamine levels to animation configurations. 
   * Each level can trigger multiple animations. Defaults to global elementAnimationMap.
   */
  animationMap?: Record<number, MotionProps[]>;
  /** 
   * Dictionary mapping levels 1-5 to CSS color classes. 
   * Colors transition as dopamine intensity shifts.
   */
  colorDict?: Record<number, string>;
  /** 
   * Dictionary mapping levels 1-5 to font weight/style classes.
   */
  weightDict?: Record<number, string>;
  /** 
   * Base dopamine intensity offset for this specific element. 
   * Higher values increase jitter/motion. Level \pm Modifier = Effective.
   */
  intensityMod?: number;
  /** 
   * Additional intensity offset applied only when the element is hovered.
   * Useful for interactive feedback. Defaults to 0.
   */
  intensityModHover?: number;
  /** The elements to be wrapped and animated. */
  children?: React.ReactNode;
  /** Additional CSS classes for the motion container. */
  className?: string;
}

/**
 * Universal wrapper that applies Framer Motion animations and dynamic styles.
 * It tracks dopamine intensity (global + local modifiers) to determine animation speed,
 * color, and font weight.
 * 
 * @example
 * // Basic Jittering Text
 * <Moveable as="span" intensityMod={1}>
 *   <Typography>Jittery Title</Typography>
 * </Moveable>
 * 
 * @example
 * // Interactive Component with Hover Feedback
 * <Moveable intensityModHover={2} className="card-wrapper">
 *   <Card>Hover me for more intensity!</Card>
 * </Moveable>
 */
export const Moveable = React.memo(({
  as = 'div',
  animationMap = elementAnimationMap,
  colorDict,
  weightDict,
  intensityMod = 0,
  intensityModHover = 0,
  children,
  className,
}: MoveableProps) => {
  const ref = React.useRef<HTMLElement>(null);
  const { 
    intensity: currentIntensity, 
    handleMouseEnter, 
    handleMouseLeave 
  } = useDopamineIntensity(intensityMod, intensityModHover, ref);

  const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);
  
  const mergedAnimation = React.useMemo(() => {
    const animations = animationMap[level] || [{}];
    return mergeAnimations(animations);
  }, [animationMap, level]);
  
  const motionProps = useResetMotion("element", currentIntensity, mergedAnimation);

  const MotionComponent = as === 'span' ? motion.span : motion.div;

  return (
    <MotionComponent
      ref={ref as any}
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
});

export default Moveable;

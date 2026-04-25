import { useMemo } from 'react';
import type { MotionProps } from 'framer-motion';
import { RESET_TRANSFORM } from '../assets/config/animations';

/**
 * Hook to generate motion props that ensure an element resets to its axis 
 * when the intensity level changes.
 * 
 * @param keyPrefix - Unique prefix for the motion key.
 * @param intensity - Current dopamine intensity level.
 * @param animation - Framer Motion props for the current level.
 * @returns Props to spread onto a motion element.
 */
export function useResetMotion(
  keyPrefix: string, 
  intensity: number, 
  animation: MotionProps = {}
): MotionProps & { key: string } {
  const level = Math.min(Math.max(Math.floor(intensity), 1), 5);

  return useMemo(() => {
    const animObj = (animation.animate as any) || {};
    
    return {
      key: `${keyPrefix}-${level}`,
      initial: RESET_TRANSFORM,
      animate: {
        ...RESET_TRANSFORM,
        ...animObj
      },
      transition: animation.transition
    };
  }, [keyPrefix, level, animation]);
}

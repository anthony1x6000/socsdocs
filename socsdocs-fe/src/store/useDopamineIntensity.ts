import { useState, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import useDopamineStore from './useDopamineStore';
import { getDopamineConfig } from '../assets/config';

/**
 * Hook to manage dopamine intensity for a component.
 * 
 * Both intensityMod and intensityModHover act as additive offsets for the global dopamine level.
 * 
 * @param {number} [intensityMod=0] - Offset for the global level.
 * @param {number} [intensityModHover] - Offset for the global level when hovered.
 * @param {RefObject<HTMLElement | null>} [ref] - Optional ref to the element for hover polling.
 */
export function useDopamineIntensity(
  intensityMod: number = 0, 
  intensityModHover?: number,
  ref?: RefObject<HTMLElement | null>
) {
  const globalLevel = useDopamineStore((state) => state.level);
  const [isHovered, setIsHovered] = useState(false);

  // Polling fallback: Sometimes MouseLeave events are missed when moving quickly between elements.
  // We poll while isHovered is true to ensure it resets if the mouse is no longer over the element.
  useEffect(() => {
    if (!isHovered || !ref?.current) return;

    const interval = setInterval(() => {
      if (ref.current && !ref.current.matches(':hover')) {
        setIsHovered(false);
      }
    }, 100); // 100ms poll is frequent enough for UX but light on CPU

    return () => clearInterval(interval);
  }, [isHovered, ref]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const activeMod = (isHovered && intensityModHover !== undefined) 
    ? intensityModHover 
    : intensityMod;

  const currentIntensity = globalLevel + activeMod;
  const config = getDopamineConfig(currentIntensity);

  return {
    intensity: currentIntensity,
    config,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export default useDopamineIntensity;

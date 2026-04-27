import { useState } from 'react';
import useDopamineStore from './useDopamineStore';
import { getDopamineConfig } from '../assets/config';

/**
 * Hook to manage dopamine intensity for a component.
 * 
 * Both intensityMod and intensityModHover act as additive offsets for the global dopamine level.
 * 
 * @param {number} [intensityMod=0] - Offset for the global level.
 * @param {number} [intensityModHover] - Offset for the global level when hovered.
 */
export function useDopamineIntensity(intensityMod: number = 0, intensityModHover?: number) {
  const globalLevel = useDopamineStore((state) => state.level);
  const [isHovered, setIsHovered] = useState(false);

  const activeMod = (isHovered && intensityModHover !== undefined) 
    ? intensityModHover 
    : intensityMod;

  const currentIntensity = globalLevel + activeMod;
  const config = getDopamineConfig(currentIntensity);

  return {
    intensity: currentIntensity,
    config,
    isHovered,
    handleMouseEnter: () => setIsHovered(true),
    handleMouseLeave: () => setIsHovered(false),
  };
}

export default useDopamineIntensity;

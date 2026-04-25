import { useState } from 'react';
import useDopamineStore from './useDopamineStore';
import { getDopamineConfig } from '../assets/dopamineStyles';

/**
 * Hook to manage dopamine intensity for a component.
 * 
 * It uses the global dopamine level from the store and applies an optional intensity multiplier.
 * If intensityOnHover is provided, it acts as an absolute override when the component is hovered.
 * 
 * @param {number} [intensity=1] - Multiplier for the global dopamine level.
 * @param {number} [intensityOnHover] - Absolute override for the dopamine level (1-5) when hovered.
 * @returns {Object} An object containing the current intensity, derived config, and event handlers.
 * 
 * @example
 * // If global level is 3, current intensity becomes 6
 * const { config } = useDopamineIntensity(2); 
 */
export function useDopamineIntensity(intensity: number = 1, intensityOnHover?: number) {
  const globalLevel = useDopamineStore((state) => state.level);
  const [isHovered, setIsHovered] = useState(false);

  // intensityOnHover is an absolute override (1-5)
  // intensity is a multiplier (e.g., globalLevel 5 * intensity 2 = 10)
  const currentIntensity = isHovered && intensityOnHover !== undefined 
    ? intensityOnHover 
    : globalLevel * intensity;

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

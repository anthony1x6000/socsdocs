import React from 'react';
import { TextMoveable } from './Moveables';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';
import { textColors, fontWeights } from '../../assets/config';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the Text component.
 */
interface TextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Text component that handles dopamine-driven animations and styles via TextMoveable.
 */
export function Text({ 
  children, 
  className, 
  intensity = 1,
  intensityOnHover
}: TextProps) {
  const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
  const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);

  return (
    <span 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <TextMoveable 
        intensity={currentIntensity}
        className={twMerge(textColors[level], fontWeights[level], className)}
      >
        {children}
      </TextMoveable>
    </span>
  );
}

export default Text;

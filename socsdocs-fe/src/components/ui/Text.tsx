import React from 'react';
import { TextMoveable } from './Moveables';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

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

  return (
    <span 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <TextMoveable 
        intensity={currentIntensity}
        className={className}
      >
        {children}
      </TextMoveable>
    </span>
  );
}

export default Text;

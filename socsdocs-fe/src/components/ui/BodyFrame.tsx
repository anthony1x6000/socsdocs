import React from 'react';
import { BASE_BODY_FRAME_STYLE } from '../../assets/config/baseStyles';
import { secondaryColors } from '../../assets/config';
import { twMerge } from 'tailwind-merge';
import { ElementMoveable } from './Moveables';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

/**
 * Props for the BodyFrame component.
 */
interface BodyFrameProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Main content frame wrapped in ElementMoveable.
 */
export function BodyFrame({ 
  children, 
  className,
  intensity = 1,
  intensityOnHover
}: BodyFrameProps) {
  const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
  const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ElementMoveable 
        intensity={currentIntensity}
        type="bodyFrame"
        className={twMerge(
          BASE_BODY_FRAME_STYLE,
          secondaryColors[level],
          className
        )}
      >
        {children}
      </ElementMoveable>
    </div>
  );
}

export default BodyFrame;

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ElementMoveable } from './Moveables';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Animated Card component wrapped in ElementMoveable.
 * Used for containers like login forms.
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  intensity = 1, 
  intensityOnHover 
}) => {
  const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);

  return (
    <ElementMoveable
      intensity={currentIntensity}
      className={twMerge(
        "bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6",
        className
      )}
    >
      <div 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        className="w-full h-full"
      >
        {children}
      </div>
    </ElementMoveable>
  );
};

export default Card;

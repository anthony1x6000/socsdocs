import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ElementMoveable } from './Moveables';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Animated Input component wrapped in ElementMoveable.
 */
export const Input: React.FC<InputProps> = ({ 
  className, 
  intensity = 1, 
  intensityOnHover,
  ...props 
}) => {
  const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);

  return (
    <ElementMoveable
      intensity={currentIntensity}
      className={twMerge("w-full", className)}
    >
      <input
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={twMerge(
          "w-full p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm transition-all",
          className
        )}
      />
    </ElementMoveable>
  );
};

export default Input;

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A container card component. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export const Card = ({ 
  children, 
  className, 
}: CardProps) => {
  return (
    <div
      className={twMerge(
        "bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6",
        className
      )}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Card;

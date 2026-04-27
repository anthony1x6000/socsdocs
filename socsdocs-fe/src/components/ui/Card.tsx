import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the Card component.
 */
interface CardProps {
  /** The content to be rendered inside the card. */
  children: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * A container card component with a glassmorphism effect (blur and semi-transparent background).
 * Designed to hold UI elements in a consistent, elevated container.
 * 
 * @example
 * <Card className="p-4">
 *   <Typography variant="header">Card Title</Typography>
 *   <Typography variant="text">Card content goes here.</Typography>
 * </Card>
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

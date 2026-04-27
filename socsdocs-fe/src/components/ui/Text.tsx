import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the Text component.
 */
interface TextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A simple text component. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export function Text({ 
  children, 
  className, 
}: TextProps) {
  return (
    <span className={twMerge("inline-block", className)}>
      {children}
    </span>
  );
}

export default Text;

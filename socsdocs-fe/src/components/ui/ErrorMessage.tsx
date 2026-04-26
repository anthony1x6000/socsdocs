import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Animated error message component.
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, className }) => {
  if (!children) return null;
  
  return (
    <div className={twMerge("text-red-500 text-sm text-center w-full bg-red-100/10 p-2 rounded mb-4", className)}>
      <Text intensity={1.5} intensityOnHover={3}>
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessage;

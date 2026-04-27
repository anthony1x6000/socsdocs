import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Static error message component.
 */
export const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  if (!children) return null;
  
  return (
    <div className={twMerge("text-red-500 text-sm text-center w-full bg-red-100/10 p-2 rounded mb-4", className)}>
      {children}
    </div>
  );
};

export default ErrorMessage;

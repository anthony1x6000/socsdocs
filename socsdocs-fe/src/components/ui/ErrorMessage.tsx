import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the ErrorMessage component.
 */
interface ErrorMessageProps {
  /** The error message content to display. */
  children: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * A simple error display component with red background and centered text.
 * It will not render anything if the children prop is empty or null.
 * 
 * @example
 * <ErrorMessage>Invalid credentials provided.</ErrorMessage>
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

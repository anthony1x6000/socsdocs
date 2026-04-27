import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/**
 * Standard Input component. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export const Input = ({ 
  className, 
  ...props 
}: InputProps) => {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-sm transition-all",
        className
      )}
    />
  );
};

export default Input;

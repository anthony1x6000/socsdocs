import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the Input component.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Additional CSS classes for the input element. */
  className?: string;
}

/**
 * A standard text input component with a glassmorphic style and focused state highlights.
 * Accepts all standard HTML input attributes.
 * 
 * @example
 * <Input 
 *   type="email" 
 *   placeholder="Enter your email" 
 *   onChange={(e) => console.log(e.target.value)} 
 * />
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

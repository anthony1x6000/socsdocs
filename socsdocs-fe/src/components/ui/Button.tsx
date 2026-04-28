import React from 'react';
import { Link } from '@tanstack/react-router';
import { twMerge } from 'tailwind-merge';
import { BASE_BUTTON_STYLE } from '../../assets/config/baseStyles';

type ButtonVariant = 'primary' | 'link';

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** The visual style of the button. */
  variant?: ButtonVariant;
  /** The content to be rendered inside the button. */
  children: React.ReactNode;
  /** Optional URL for navigation. If provided, the button renders as a Link. */
  to?: string;
  /** Optional click handler. */
  onClick?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** The HTML button type. */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button is disabled. */
  disabled?: boolean;
}

/**
 * A versatile button component that supports primary actions and link-style buttons.
 * It automatically handles routing via '@tanstack/react-router' if the 'to' prop is provided.
 * 
 * @example
 * // Primary Button
 * <Button onClick={() => console.log('clicked')}>Click Me</Button>
 * 
 * @example
 * // Link Button
 * <Button variant="link" to="/login">Login</Button>
 * 
 * @example
 * // Disabled State
 * <Button disabled>Unavailable</Button>
 */
export const Button = ({
  variant = 'primary',
  children,
  to,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  if (variant === 'link') {
    const content = (
      <span className={twMerge("cursor-pointer hover:underline", className)}>
        {children}
      </span>
    );

    if (to) {
      return (
        <Link to={to as any} className="no-underline">
          {content}
        </Link>
      );
    }

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          "bg-transparent border-none p-0 m-0 cursor-pointer no-underline",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        BASE_BUTTON_STYLE,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

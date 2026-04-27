import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { BASE_BUTTON_STYLE } from '../../assets/config/baseStyles';

type ButtonVariant = 'primary' | 'link';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

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
        <Link to={to} className="no-underline">
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

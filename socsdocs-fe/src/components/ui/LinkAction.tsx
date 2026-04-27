import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface LinkActionProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * A link or button that looks like a link. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export const LinkAction = ({
  children,
  to,
  onClick,
  className,
}: LinkActionProps) => {
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
      onClick={onClick} 
      className="bg-transparent border-none p-0 m-0 cursor-pointer no-underline"
    >
      {content}
    </button>
  );
};

export default LinkAction;

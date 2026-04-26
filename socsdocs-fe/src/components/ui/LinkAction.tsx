import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

interface LinkActionProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * A link or button that looks like a link, wrapped in Text (which has TextMoveable).
 */
export const LinkAction: React.FC<LinkActionProps> = ({
  children,
  to,
  onClick,
  className,
  intensity = 1,
  intensityOnHover = 1.5,
}) => {
  const content = (
    <Text 
      intensity={intensity} 
      intensityOnHover={intensityOnHover}
      className={twMerge("cursor-pointer hover:underline", className)}
    >
      {children}
    </Text>
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

import React from 'react';
import useDopamineStore from '../store/useDopamineStore';
import { bodyFrameStyle } from './dopamineLevelStyles';
import { twMerge } from 'tailwind-merge';

interface BodyFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function BodyFrame({ children, className }: BodyFrameProps) {
  const level = useDopamineStore((state) => state.level);

  return (
    <div className={twMerge(
      "transition-all duration-300",
      bodyFrameStyle[level],
      className
    )}>
      {children}
    </div>
  );
}

export default BodyFrame;

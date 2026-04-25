import React from 'react';
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from './dopamineLevelStyles';
import { twMerge } from 'tailwind-merge';

interface BodyFrameProps {
  children: React.ReactNode;
  className?: string;
}

const baseStyle = "transition-all duration-300";

export function BodyFrame({ children, className }: BodyFrameProps) {
  const level = useDopamineStore((state) => state.level);
  const { bodyFrameStyle } = getDopamineConfig(level);

  return (
    <div className={twMerge(
      baseStyle,
      bodyFrameStyle,
      className
    )}>
      {children}
    </div>
  );
}

export default BodyFrame;

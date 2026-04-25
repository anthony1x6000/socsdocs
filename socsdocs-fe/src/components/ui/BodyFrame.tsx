import React from 'react';
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface BodyFrameProps {
  children: React.ReactNode;
  className?: string;
}

const baseStyle = "transition-all duration-300";

export function BodyFrame({ children, className }: BodyFrameProps) {
  const level = useDopamineStore((state) => state.level);
  const { bodyFrameStyle, bodyFrameAnimation } = getDopamineConfig(level);

  return (
    <motion.div 
      key={level}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
      className={twMerge(
        baseStyle,
        bodyFrameStyle,
        className
      )}
      {...bodyFrameAnimation}
    >
      {children}
    </motion.div>
  );
}

export default BodyFrame;

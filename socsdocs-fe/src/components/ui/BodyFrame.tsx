import React from 'react';
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_BODY_FRAME_STYLE } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface BodyFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function BodyFrame({ children, className }: BodyFrameProps) {
  const level = useDopamineStore((state) => state.level);
  const { bodyFrameStyle, bodyFrameAnimation } = getDopamineConfig(level);

  return (
    <motion.div 
      key={level}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
      className={twMerge(
        BASE_BODY_FRAME_STYLE,
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

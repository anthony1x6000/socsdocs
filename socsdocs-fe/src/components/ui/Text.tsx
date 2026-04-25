import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from '../../assets/dopamineStyles';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'title' | 'button';
}

/**
 * Text component that handles dopamine-driven animations for text elements.
 * It uses the current dopamine level from the store to apply appropriate animations.
 * 
 * @param {TextProps} props - Component props.
 * @returns {JSX.Element} A motion.span with dopamine animations.
 */
export function Text({ children, className, animationType = 'title' }: TextProps) {
  const level = useDopamineStore((state) => state.level);
  const { titleAnimation, buttonAnimation } = getDopamineConfig(level);
  const animation = animationType === 'button' ? buttonAnimation : titleAnimation;

  return (
    <motion.span 
      key={level}
      className={twMerge("inline-block", className)}
      {...animation}
    >
      {children}
    </motion.span>
  );
}

export default Text;

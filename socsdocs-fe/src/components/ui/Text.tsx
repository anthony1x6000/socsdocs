import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

/**
 * Props for the Text component.
 * @interface TextProps
 * @property {React.ReactNode} children - The content to be rendered and animated.
 * @property {string} [className] - Optional additional CSS classes for styling.
 * @property {'title' | 'button'} [animationType='title'] - The preset animation style to apply.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface TextProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'title' | 'button';
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Text component that handles dopamine-driven animations for text elements.
 * It uses the current dopamine level (global level * intensity modifier) to apply appropriate animations.
 * 
 * @param {TextProps} props - Component props.
 * @returns {JSX.Element} A motion.span with dopamine animations.
 * 
 * @example
 * // If global level is 2, text will behave like level 4
 * <Text intensity={2}>Enhanced Text</Text>
 */
export function Text({ 
  children, 
  className, 
  animationType = 'title',
  intensity = 1,
  intensityOnHover
}: TextProps) {
  const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
  const { titleAnimation, buttonAnimation } = config;
  const animation = animationType === 'button' ? buttonAnimation : titleAnimation;

  return (
    <motion.span 
      key={currentIntensity}
      className={twMerge("inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...animation}
    >
      {children}
    </motion.span>
  );
}

export default Text;

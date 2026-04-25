import React from 'react';
import { BASE_BODY_FRAME_STYLE } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

/**
 * Props for the BodyFrame component.
 * @interface BodyFrameProps
 * @property {React.ReactNode} children - The content to be wrapped by the frame.
 * @property {string} [className] - Optional additional CSS classes.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface BodyFrameProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Main content frame with dopamine-driven reactive styles and animations.
 * Provides a dynamic container that responds to the global or local intensity level.
 * The intensity prop acts as a multiplier for the global level.
 * 
 * @param {BodyFrameProps} props - Component props.
 * @returns {JSX.Element} A motion.div container.
 * 
 * @example
 * <BodyFrame intensity={1.2}>
 *   <p>Slightly boosted intensity content</p>
 * </BodyFrame>
 */
export function BodyFrame({ 
  children, 
  className,
  intensity = 1,
  intensityOnHover
}: BodyFrameProps) {
  const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
  const { bodyFrameStyle, bodyFrameAnimation } = config;

  return (
    <motion.div 
      key={currentIntensity}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
      className={twMerge(
        BASE_BODY_FRAME_STYLE,
        bodyFrameStyle,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...bodyFrameAnimation}
    >
      {children}
    </motion.div>
  );
}

export default BodyFrame;

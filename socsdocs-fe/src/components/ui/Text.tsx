import React from 'react';
import { TextMoveable } from './Moveables';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';
import { textColors, fontWeights } from '../../assets/config';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the Text component.
 */
interface TextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * A text component that applies dopamine-driven animations and dynamic styling via TextMoveable.
 * The intensity of the animations and styles can be controlled statically or respond to hover events.
 *
 * @param props - The properties for the Text component.
 * @param props.children - The content to be rendered inside the text component.
 * @param props.className - Additional Tailwind or CSS classes to apply.
 * @param props.intensity - The base intensity level (1 to 5) for the text animation and styling. Defaults to 1.
 * @param props.intensityOnHover - The target intensity level when the component is hovered.
 *
 * @example
 * <Text intensity={2} intensityOnHover={5} className="text-xl">
 *   Hover me and I'll shake more, im nervous actually.....
 * </Text>
 */
export function Text({ 
  children, 
  className, 
  intensity = 1,
  intensityOnHover
}: TextProps) {
  const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
  const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);

  return (
    <span 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <TextMoveable 
        intensity={currentIntensity}
        className={twMerge(textColors[level], fontWeights[level], className)}
      >
        {children}
      </TextMoveable>
    </span>
  );
}

export default Text;

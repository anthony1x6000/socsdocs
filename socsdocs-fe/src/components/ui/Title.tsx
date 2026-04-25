import { BASE_TITLE_STYLE } from '../../assets/config/baseStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

import { titleWeights } from '../../assets/config';

/**
 * Props for the PageTitle component.
 */
interface PageTitleProps {
  text?: string;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Main title component.
 * Delegating color, animation, and weight to Text component.
 */
export function PageTitle({ 
  text = "SOCSDOCS", 
  className,
  intensity = 1,
  intensityOnHover
}: PageTitleProps) {
  const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);

  return (
    <h1 
      className={twMerge(BASE_TITLE_STYLE, "text-5xl", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text className={titleWeights[currentIntensity]}
        intensity={currentIntensity}
      >
        {text}
      </Text>
    </h1>
  );
}

export default PageTitle;

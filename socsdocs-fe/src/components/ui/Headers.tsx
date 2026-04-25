import { BASE_HEADER_STYLE } from '../../assets/config/baseStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  text: string;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Secondary header component.
 * Delegating color, animation, and weight to Text component (TextMoveable).
 */
export function Header({ 
  text, 
  className,
  intensity = 1,
  intensityOnHover
}: HeaderProps) {
    const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);

    return (
        <h1 
          className={twMerge(BASE_HEADER_STYLE, "text-3xl", className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
            <Text 
              intensity={currentIntensity}
            >
              {text}
            </Text>
        </h1>
    );
}

export default Header;

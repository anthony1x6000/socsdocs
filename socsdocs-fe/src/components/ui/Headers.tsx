import { BASE_HEADER_STYLE } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

/**
 * Props for the Header component.
 * @interface HeaderProps
 * @property {string} text - The text content of the header.
 * @property {string} [className] - Optional additional CSS classes.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface HeaderProps {
  text: string;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Secondary header component.
 * Uses dopamine-driven styles and animations for a consistent look.
 * The intensity prop acts as a multiplier for the global dopamine level.
 * 
 * @param {HeaderProps} props - Component props.
 * @returns {JSX.Element} A h1 element containing animated Text.
 * 
 * @example
 * <Header text="Section Title" intensity={1.5} />
 */
export function Header({ 
  text, 
  className,
  intensity = 1,
  intensityOnHover
}: HeaderProps) {
    const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const { headerStyle } = config;

    return (
        <h1 
          className={twMerge(BASE_HEADER_STYLE, headerStyle, className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
            <Text 
              animationType="title" 
              intensity={currentIntensity}
            >
              {text}
            </Text>
        </h1>
    );
}

export default Header;

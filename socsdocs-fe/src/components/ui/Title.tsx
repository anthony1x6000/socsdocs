import { BASE_TITLE_STYLE } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';
import { useDopamineIntensity } from '../../store/useDopamineIntensity';

/**
 * Props for the PageTitle component.
 * @interface PageTitleProps
 * @property {string} [text="SOCSDOCS"] - The text to display in the title.
 * @property {string} [className] - Optional additional CSS classes for styling the container.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface PageTitleProps {
  text?: string;
  className?: string;
  intensity?: number;
  intensityOnHover?: number;
}

/**
 * Main title component for pages.
 * Displays a large, stylized title with dopamine-driven animations and colors.
 * The intensity prop acts as a multiplier for the global dopamine level.
 * 
 * @param {PageTitleProps} props - Component props.
 * @returns {JSX.Element} A h1 element containing animated Text.
 * 
 * @example
 * <PageTitle text="My Page" intensity={2} />
 */
export function PageTitle({ 
  text = "SOCSDOCS", 
  className,
  intensity = 1,
  intensityOnHover
}: PageTitleProps) {
  const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
  const { titleStyle } = config;

  return (
    <h1 
      className={twMerge(BASE_TITLE_STYLE, titleStyle, className)}
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

export default PageTitle;

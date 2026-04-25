import { Text } from "./Text"

/**
 * Props for the Subtitle component.
 * @interface SubtitleProps
 * @property {string} text - The text content of the subtitle.
 * @property {string} [className] - Optional additional CSS classes.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface SubtitleProps {
    text: string;
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
}

/**
 * Subtitle component for displaying smaller, animated text.
 * Wraps the Text component and passes through dopamine-related props.
 * The intensity prop acts as a multiplier for the global dopamine level.
 * 
 * @param {SubtitleProps} props - Component props.
 * @returns {JSX.Element} A Text component configured as a subtitle.
 * 
 * @example
 * <Subtitle text="A secondary heading" intensity={2} />
 */
export default function Subtitle({ 
  text, 
  className,
  intensity = 1,
  intensityOnHover
}: SubtitleProps) {
    return (
        <Text 
          className={className}
          intensity={intensity}
          intensityOnHover={intensityOnHover}
        >
          {text}
        </Text>
    );
}

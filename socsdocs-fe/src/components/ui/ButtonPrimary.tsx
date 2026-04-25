import { twMerge } from "tailwind-merge";
import { BASE_BUTTON_STYLE } from "../../assets/dopamineStyles";
import { Text } from "./Text";
import { useDopamineIntensity } from "../../store/useDopamineIntensity";

/**
 * Props for the Button component.
 * @interface ButtonProps
 * @property {string} text - The label text for the button.
 * @property {() => void} onClick - Callback function when the button is clicked.
 * @property {string} [className] - Optional additional CSS classes.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
}

/**
 * Primary action button with dopamine-driven styling and animations.
 * The intensity prop acts as a multiplier for the global dopamine level.
 * 
 * @param {ButtonProps} props - Component props.
 * @returns {JSX.Element} A button containing animated Text.
 * 
 * @example
 * <Button text="Click Me" onClick={() => console.log('clicked')} intensity={2} />
 */
export function Button({ 
  text, 
  onClick, 
  className,
  intensity = 1,
  intensityOnHover
}: ButtonProps) {
    const { intensity: currentIntensity, config, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const { buttonStyle } = config;
    
    return (
        <button 
            onClick={onClick}
            className={twMerge(
                BASE_BUTTON_STYLE,
                buttonStyle,
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Text 
              animationType="button" 
              intensity={currentIntensity}
            >
              {text}
            </Text>
        </button>
    );
}

export default Button;

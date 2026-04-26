import { twMerge } from "tailwind-merge";
import { BASE_BUTTON_STYLE } from "../../assets/config/baseStyles";
import { primaryColors } from "../../assets/config";
import { Text } from "./Text";
import { ElementMoveable } from "./Moveables";
import { useDopamineIntensity } from "../../store/useDopamineIntensity";

/**
 * Props for the Button component.
 */
interface ButtonProps {
    text: string;
    onClick?: () => void; 
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

/**
 * Primary action button wrapped in ElementMoveable.
 * Movement is delegated to ElementMoveable, while text uses Text component (TextMoveable).
 */
export function Button({ 
  text, 
  onClick, 
  className,
  intensity = 1,
  intensityOnHover,
  type = "button",
  disabled = false
}: ButtonProps) {
    const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    const level = Math.min(Math.max(Math.floor(currentIntensity), 1), 5);
    
    return (
        <ElementMoveable
            intensity={currentIntensity}
            type="button"
            className={twMerge(
              BASE_BUTTON_STYLE, 
              primaryColors[level], 
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
        >
            <button 
                type={type}
                onClick={onClick}
                disabled={disabled}
                className="w-full h-full cursor-inherit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Text intensity={currentIntensity}>
                  {text}
                </Text>
            </button>
        </ElementMoveable>
    );
}

export default Button;

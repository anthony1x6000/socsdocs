import { twMerge } from "tailwind-merge";
import { BASE_BUTTON_STYLE } from "../../assets/config/baseStyles";
import { Text } from "./Text";
import { ElementMoveable } from "./Moveables";
import { useDopamineIntensity } from "../../store/useDopamineIntensity";

/**
 * Props for the Button component.
 */
interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
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
  intensityOnHover
}: ButtonProps) {
    const { intensity: currentIntensity, handleMouseEnter, handleMouseLeave } = useDopamineIntensity(intensity, intensityOnHover);
    
    return (
        <ElementMoveable
            intensity={currentIntensity}
            type="button"
            className={twMerge(BASE_BUTTON_STYLE, className)}
        >
            <button 
                onClick={onClick}
                className="w-full h-full"
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

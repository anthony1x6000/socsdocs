import { twMerge } from "tailwind-merge";
import { BASE_BUTTON_STYLE } from "../../assets/config/baseStyles";

/**
 * Props for the Button component.
 */
interface ButtonProps {
    text: string;
    onClick?: () => void; 
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

/**
 * Primary action button. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export function Button({ 
  text, 
  onClick, 
  className,
  type = "button",
  disabled = false
}: ButtonProps) {
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={twMerge(
              BASE_BUTTON_STYLE, 
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
        >
            {text}
        </button>
    );
}

export default Button;

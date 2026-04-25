import { twMerge } from "tailwind-merge";
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_BUTTON_STYLE } from "../../assets/dopamineStyles";
import { Text } from "./Text";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
}

export function Button({ text, onClick, className }: ButtonProps) {
    const level = useDopamineStore((state) => state.level);
    const { buttonStyle } = getDopamineConfig(level);
    
    return (
        <button 
            onClick={onClick}
            className={twMerge(
                BASE_BUTTON_STYLE,
                buttonStyle,
                className
            )}
        >
            <Text animationType="button">{text}</Text>
        </button>
    );
}

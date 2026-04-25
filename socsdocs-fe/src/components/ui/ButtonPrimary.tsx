import { twMerge } from "tailwind-merge";
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from "./dopamineLevelStyles";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
}

const baseStyle = "px-4 py-2 text-white font-semibold rounded hover:opacity-80 transition-all";

export function Button({ text, onClick, className }: ButtonProps) {
    const level = useDopamineStore((state) => state.level);
    const { buttonStyle } = getDopamineConfig(level);
    
    return (
        <button 
            onClick={onClick}
            className={twMerge(
                baseStyle,
                buttonStyle,
                className
            )}
        >
            {text}
        </button>
    );
}

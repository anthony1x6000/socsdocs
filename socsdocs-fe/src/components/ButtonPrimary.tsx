import { twMerge } from "tailwind-merge";
import useDopamineStore from "../store/useDopamineStore";
import { buttonStyle } from "./dopamineLevelStyles";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
}

export function Button({ text, onClick, className }: ButtonProps) {
    const level = useDopamineStore((state) => state.level);
    
    return (
        <button 
            onClick={onClick}
            className={twMerge(
                "px-4 py-2 text-white font-semibold rounded hover:opacity-80 transition-all",
                buttonStyle[level],
                className
            )}
        >
            {text}
        </button>
    );
}

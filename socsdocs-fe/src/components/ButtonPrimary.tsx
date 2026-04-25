import { twMerge } from "tailwind-merge";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
}

export function Button({ text, onClick, className }: ButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={twMerge(
                // default styles 
                "px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors",
                // extra styles down here
                className
            )}
        >
            {text}
        </button>
    );
}
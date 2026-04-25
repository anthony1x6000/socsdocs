import { twMerge } from "tailwind-merge";
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from "../../assets/dopamineStyles";
import { motion } from "framer-motion";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
    level?: number;
}

const baseStyle = "px-4 py-2 text-white font-semibold rounded hover:opacity-80";

export function Button({ text, onClick, className, level: propLevel }: ButtonProps) {
    const storeLevel = useDopamineStore((state) => state.level);
    const level = propLevel ?? storeLevel;
    const { buttonStyle, buttonAnimation } = getDopamineConfig(level);
    
    return (
        <motion.button 
            key={level}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0, opacity: 1 }}
            onClick={onClick}
            className={twMerge(
                baseStyle,
                buttonStyle,
                className
            )}
            {...buttonAnimation}
        >
            {text}
        </motion.button>
    );
}

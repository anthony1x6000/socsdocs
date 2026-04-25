import { twMerge } from "tailwind-merge";
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from "../../assets/dopamineStyles";
import { motion } from "framer-motion";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
}

const baseStyle = "px-4 py-2 text-white font-semibold rounded hover:opacity-80 transition-all";

export function Button({ text, onClick, className }: ButtonProps) {
    const level = useDopamineStore((state) => state.level);
    const { buttonStyle, buttonAnimation } = getDopamineConfig(level);
    
    return (
        <motion.button 
            key={level}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
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

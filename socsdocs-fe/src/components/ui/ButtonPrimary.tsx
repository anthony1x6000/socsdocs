import { twMerge } from "tailwind-merge";
import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_BUTTON_STYLE } from "../../assets/dopamineStyles";
import { motion } from "framer-motion";

interface ButtonProps {
    text: string;
    onClick: () => void; 
    className?: string;
}

export function Button({ text, onClick, className }: ButtonProps) {
    const level = useDopamineStore((state) => state.level);
    const { buttonStyle, buttonAnimation } = getDopamineConfig(level);
    
    return (
        <motion.button 
            key={level}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0, opacity: 1 }}
            onClick={onClick}
            className={twMerge(
                BASE_BUTTON_STYLE,
                buttonStyle,
                className
            )}
            {...buttonAnimation}
        >
            {text}
        </motion.button>
    );
}

import { motion } from "framer-motion";
import { getDopamineConfig } from "../../assets/dopamineStyles";
import useDopamineStore from "../../store/useDopamineStore";

interface TextProps {
    text: string;
    className?: string;
}

/**
 * A motion-enhanced text component that reacts to the current dopamine level.
 * @param {TextProps} props - The text content and optional styling.
 * @returns A motion.span element with level-based animations.
 * @example
 * <Text text=${text} className=${className} />
 */
export function Text({ text, className }: TextProps) {
    const level = useDopamineStore((state) => state.level);
    const { textAnimation } = getDopamineConfig(level);

    return (
        <motion.span 
        key={level}
        initial={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0, opacity: 1 }}
        className={className}
        {...textAnimation}
        whileHover={{ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 }}
        >
            {text}
        </motion.span>
    );
}
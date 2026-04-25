import useDopamineStore from "../../store/useDopamineStore";
import { titleLevelStyle, titleLevelAnimation } from './dopamineLevelStyles';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  text: string;
  className?: string;
}

const baseStyle = "";

export function Header({ text, className }: HeaderProps) {
    const level = useDopamineStore((state) => state.level);
    
    return (
        <h1 className={twMerge(baseStyle, titleLevelStyle[level], className)}>
            <motion.span className="inline-block" {...titleLevelAnimation[level]}>
                {text}
            </motion.span>
        </h1>
    );
}

export default Header;

import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from '../../assets/dopamineStyles';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  text: string;
  className?: string;
  level?: number;
}

const baseStyle = "";

export function Header({ text, className, level: propLevel }: HeaderProps) {
    const storeLevel = useDopamineStore((state) => state.level);
    const level = propLevel ?? storeLevel;
    const { titleStyle, titleAnimation } = getDopamineConfig(level);
    
    return (
        <h1 className={twMerge(baseStyle, titleStyle, className)}>
            <motion.span className="inline-block" {...titleAnimation}>
                {text}
            </motion.span>
        </h1>
    );
}

export default Header;

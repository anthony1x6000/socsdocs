import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_HEADER_STYLE } from '../../assets/dopamineStyles';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  text: string;
  className?: string;
}

export function Header({ text, className }: HeaderProps) {
    const level = useDopamineStore((state) => state.level);
    const { headerStyle, titleAnimation } = getDopamineConfig(level);
    
    return (
        <h1 className={twMerge(BASE_HEADER_STYLE, headerStyle, className)}>
            <motion.span className="inline-block" {...titleAnimation}>
                {text}
            </motion.span>
        </h1>
    );
}

export default Header;

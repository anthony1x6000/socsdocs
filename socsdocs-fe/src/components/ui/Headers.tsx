import useDopamineStore from "../../store/useDopamineStore";
import { titleLevelStyle, titleLevelAnimation } from './dopamineLevelStyles';
import { motion } from 'framer-motion';

interface HeaderProps {
  text: string;
}

export function Header({ text }: HeaderProps) {
    const level = useDopamineStore((state) => state.level);
    
    return (
        <h1 className={titleLevelStyle[level]}>
            <motion.span className="inline-block" {...titleLevelAnimation[level]}>
                {text}
            </motion.span>
        </h1>
    );
}

export default Header;

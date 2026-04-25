import type { HeadingLevel } from './dopamineLevelStyles';
import { titleLevelStyle, titleLevelAnimation } from './dopamineLevelStyles';
import { motion } from 'framer-motion';

interface HeaderProps {
  text: string;
  level?: HeadingLevel;
}

export function Header({ text, level = 1 }: HeaderProps) {
    return (
        <h1 className={titleLevelStyle[level]}>
            <motion.span className="inline-block" {...titleLevelAnimation[level]}>
                {text}
            </motion.span>
        </h1>
    );
}

export default Header;

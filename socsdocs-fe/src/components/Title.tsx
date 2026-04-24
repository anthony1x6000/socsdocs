import type { HeadingLevel } from './dopamineLevelStyles';
import { titleLevelStyle, titleLevelAnimation } from './dopamineLevelStyles';
import { motion } from 'framer-motion';

interface PageTitleProps {
  text: string;
  level?: HeadingLevel;
}

export function PageTitle({ text, level = 1 }: PageTitleProps) {
  const className = titleLevelStyle[level] || titleLevelStyle[1]; // Fallback to level 1 if level is not provided or invalid
  const animationProps = titleLevelAnimation[level] || titleLevelAnimation[1];

  return (
    <h1 className={className}>
      <motion.span className="inline-block" {...animationProps}>
        {text}
      </motion.span>
    </h1>
  );
}
import useDopamineStore from '../store/useDopamineStore';
import { titleLevelStyle, titleLevelAnimation } from './dopamineLevelStyles';
import type { DopamineLevel } from './dopamineLevelStyles';
import { motion } from 'framer-motion';

interface PageTitleProps {
  text: string;
  level?: DopamineLevel;
}

export function PageTitle({ text, level: levelProp }: PageTitleProps) {
  const storeLevel = useDopamineStore((state) => state.level) as DopamineLevel;
  const level = levelProp ?? storeLevel;
  
  const className = titleLevelStyle[level];
  const animationProps = titleLevelAnimation[level];

  return (
    <h1 className={className}>
      <motion.span className="inline-block" {...animationProps}>
        {text}
      </motion.span>
    </h1>
  );
}

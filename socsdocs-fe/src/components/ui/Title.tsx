import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from './dopamineLevelStyles';
import type { DopamineLevel } from './dopamineLevelStyles';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  text: string;
  className?: string;
}

const baseStyle = "transition-all";

export function PageTitle({ text, className }: PageTitleProps) {
  const level = useDopamineStore((state) => state.level) as DopamineLevel;
  const { titleStyle, titleAnimation } = getDopamineConfig(level);

  return (
    <h1 className={twMerge(baseStyle, titleStyle, className)}>
      <motion.span className="inline-block" {...titleAnimation}>
        {text}
      </motion.span>
    </h1>
  );
}

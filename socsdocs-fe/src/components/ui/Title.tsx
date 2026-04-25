import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig } from '../../assets/dopamineStyles';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  text: string;
  className?: string;
  level?: number;
}

const baseStyle = "transition-all";

export function PageTitle({ text, className, level: propLevel }: PageTitleProps) {
  const storeLevel = useDopamineStore((state) => state.level);
  const level = propLevel ?? storeLevel;
  const { titleStyle, titleAnimation } = getDopamineConfig(level);

  return (
    <h1 className={twMerge(baseStyle, titleStyle, className)}>
      <motion.span key={level} initial={{ x: 0, y: 0, rotate: 0 }} className="inline-block" {...titleAnimation}>
        {text}
      </motion.span>
    </h1>
  );
}

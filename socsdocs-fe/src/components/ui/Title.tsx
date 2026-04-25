import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_TITLE_STYLE } from '../../assets/dopamineStyles';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  text?: string;
  className?: string;
}

export function PageTitle({ text, className }: PageTitleProps) {
  const level = useDopamineStore((state) => state.level);
  const { titleStyle, titleAnimation } = getDopamineConfig(level);

  return (
    <h1 className={twMerge(BASE_TITLE_STYLE, titleStyle, className)}>
      <motion.span key={level} initial={{ x: 0, y: 0, rotate: 0 }} className="inline-block" {...titleAnimation}>
        socsdocs{text ? ` ${text}` : ''}
      </motion.span>
    </h1>
  );
}

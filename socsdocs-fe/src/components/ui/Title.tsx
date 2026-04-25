import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_TITLE_STYLE } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

interface PageTitleProps {
  text?: string;
  className?: string;
}

export function PageTitle({ text = "SOCSDOCS", className }: PageTitleProps) {
  const level = useDopamineStore((state) => state.level);
  const { titleStyle } = getDopamineConfig(level);

  return (
    <h1 className={twMerge(BASE_TITLE_STYLE, titleStyle, className)}>
      <Text animationType="title">{text}</Text>
    </h1>
  );
}

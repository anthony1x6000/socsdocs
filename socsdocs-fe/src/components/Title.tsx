import type { HeadingLevel } from './dopamineLevelStyles';
import { titleLevelStyle } from './dopamineLevelStyles';

interface PageTitleProps {
  text: string;
  level?: HeadingLevel;
}

export function PageTitle({ text, level = 1 }: PageTitleProps) {
  const className = titleLevelStyle[level] || titleLevelStyle[1]; // Fallback to level 1 if level is not provided or invalid
  return <h1 className={className}>{text}</h1>;
}
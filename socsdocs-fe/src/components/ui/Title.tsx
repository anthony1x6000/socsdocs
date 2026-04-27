import { BASE_TITLE_STYLE } from '../../assets/config/baseStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

/**
 * Props for the PageTitle component.
 */
interface PageTitleProps {
  text?: string;
  className?: string;
}

/**
 * Main title component. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export function PageTitle({ 
  text = "SOCSDOCS", 
  className,
}: PageTitleProps) {
  return (
    <h1 className={twMerge(BASE_TITLE_STYLE, "text-5xl", className)}>
      <Text>
        {text}
      </Text>
    </h1>
  );
}

export default PageTitle;

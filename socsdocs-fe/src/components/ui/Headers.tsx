import { BASE_HEADER_STYLE } from '../../assets/config/baseStyles';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  text: string;
  className?: string;
}

/**
 * Secondary header component. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export function Header({ 
  text, 
  className,
}: HeaderProps) {
    return (
        <h1 className={twMerge(BASE_HEADER_STYLE, "text-3xl", className)}>
          {text}
        </h1>
    );
}

export default Header;

import { Text } from "./Text"

/**
 * Props for the Subtitle component.
 */
interface SubtitleProps {
    text: string;
    className?: string;
}

/**
 * Subtitle component. Stateless and without animations.
 * Responsibility for movement is delegated to Moveable wrapper in parent.
 */
export default function Subtitle({ 
  text, 
  className,
}: SubtitleProps) {
    return (
        <Text className={className}>
          {text}
        </Text>
    );
}

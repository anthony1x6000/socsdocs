import useDopamineStore from "../../store/useDopamineStore";
import { getDopamineConfig, BASE_HEADER_STYLE } from '../../assets/dopamineStyles';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';

interface HeaderProps {
  text: string;
  className?: string;
}

export function Header({ text, className }: HeaderProps) {
    const level = useDopamineStore((state) => state.level);
    const { titleStyle } = getDopamineConfig(level);

    return (
        <h1 className={twMerge(BASE_HEADER_STYLE, titleStyle, className)}>
            <Text animationType="title">{text}</Text>
        </h1>
    );
}

export default Header;

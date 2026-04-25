import {Text} from "./Text"

interface SubtitleProps {
    text: string;
    className?: string;
}

export default function Subtitle({ text, className }: SubtitleProps) {
    return (
        <Text text={text} className={className} />
    );
}
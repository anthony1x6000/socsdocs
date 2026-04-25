interface SubtitleProps {
    text: string;
    className?: string;
}

export default function Subtitle({ text, className }: SubtitleProps) {
    return (
        <span className={className}>{text}</span>
    );
}
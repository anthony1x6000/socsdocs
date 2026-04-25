import { twMerge } from "tailwind-merge";


interface LineProps {
    className?: string;
}

const LINE_STYLE = "w-full h-2px bg-white";

export default function VerticalLine({ className }: LineProps) {
    return (
        <span className={twMerge(LINE_STYLE, className)} />
    );
}
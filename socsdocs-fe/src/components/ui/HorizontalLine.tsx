import { twMerge } from "tailwind-merge";


interface LineProps {
    className?: string;
}

const LINE_STYLE = "w-full h-[2px] bg-white block";

export default function HorizontalLine({ className }: LineProps) {
    return (
        <div className={twMerge(LINE_STYLE, className)} />
    );
}
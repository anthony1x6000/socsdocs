import { twMerge } from "tailwind-merge";

/**
 * Props for the HorizontalLine component.
 * @interface LineProps
 * @property {string} [className] - Optional additional CSS classes.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface LineProps {
    className?: string;
    intensity?: number;
    intensityOnHover?: number;
}

const LINE_STYLE = "w-full h-[2px] bg-white block";

/**
 * A simple horizontal line component.
 * Supports intensity props for consistency across the UI library.
 * 
 * @param {LineProps} props - Component props.
 * @returns {JSX.Element} A div styled as a horizontal line.
 * 
 * @example
 * <HorizontalLine className="my-4" intensity={3} />
 */
export default function HorizontalLine({ className }: LineProps) {
    return (
        <div className={twMerge(LINE_STYLE, className)} />
    );
}

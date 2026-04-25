import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props for the FlexBox component.
 * @interface FlexProps
 * @property {string} [className] - Optional additional CSS classes.
 * @property {React.ReactNode} children - The content to be rendered inside the flex container.
 * @property {number} [intensity=1] - Multiplier for the global dopamine level.
 * @property {number} [intensityOnHover] - Absolute override for the dopamine level when hovered (1-5).
 */
interface FlexProps {
    className?: string;
    children: React.ReactNode;
    intensity?: number;
    intensityOnHover?: number;
}

/**
 * A simple wrapper component that applies Tailwind's `flex` display by default.
 * While it doesn't have inherent dopamine styles, it supports intensity props 
 * for consistency across UI components.
 * 
 * @param {FlexProps} props - Component props.
 * @returns {JSX.Element} A div with flex display.
 * 
 * @example
 * <FlexBox className="flex-col items-center justify-between gap-4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </FlexBox>
 */
export function FlexBox({ className, children }: FlexProps) {
    return (
        <div className={twMerge('flex', className)}>
            {children}
        </div>
    );
}

export default FlexBox;

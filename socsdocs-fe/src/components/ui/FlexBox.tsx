import React from 'react';
import { twMerge } from 'tailwind-merge';

interface FlexProps {
    className?: string;
    children: React.ReactNode;
}

/**
 * A simple wrapper component that applies Tailwind's `flex` display by default.
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
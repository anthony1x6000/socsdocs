import React from 'react';
import { twMerge } from 'tailwind-merge';
import { BASE_TITLE_STYLE, BASE_HEADER_STYLE } from '../../assets/config/baseStyles';

type TypographyVariant = 'title' | 'header' | 'subtitle' | 'text';

/**
 * Props for the Typography component.
 */
interface TypographyProps {
  /** The semantic and visual variant of the text. */
  variant?: TypographyVariant;
  /** The text or elements to be rendered. */
  children: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
  /** The HTML element to render as. Defaults based on the variant (e.g., 'h1' for title). */
  as?: React.ElementType;
}

const variantClasses: Record<TypographyVariant, string> = {
  title: twMerge(BASE_TITLE_STYLE, "text-5xl"),
  header: twMerge(BASE_HEADER_STYLE, "text-3xl"),
  subtitle: "",
  text: "inline-block",
};

const defaultElement: Record<TypographyVariant, React.ElementType> = {
  title: 'h1',
  header: 'h2',
  subtitle: 'span',
  text: 'span',
};

/**
 * A consolidated component for all text styles in the application.
 * Supports titles, headers, subtitles, and standard inline text.
 * 
 * @example
 * // Main Page Title
 * <Typography variant="title">SOCSDOCS</Typography>
 * 
 * @example
 * // Secondary Header
 * <Typography variant="header">Settings</Typography>
 * 
 * @example
 * // Custom Element
 * <Typography variant="text" as="p">This is a paragraph.</Typography>
 */
export const Typography = ({
  variant = 'text',
  children,
  className,
  as,
}: TypographyProps) => {
  const Component = as || defaultElement[variant];
  
  return (
    <Component className={twMerge(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};

export default Typography;

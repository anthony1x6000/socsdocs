import React from 'react';
import { twMerge } from 'tailwind-merge';
import { BASE_TITLE_STYLE, BASE_HEADER_STYLE } from '../../assets/config/baseStyles';

type TypographyVariant = 'title' | 'header' | 'subtitle' | 'text';

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
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

import React from "react";

interface ITypographyProps {
  variant: "h1" | "h2" | "h3" | "body" | "caption" | "base";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  testId?: string;
}

const Typography = (props: ITypographyProps) => {
  const { variant, component, children, className = "", testId } = props;

  const getVariantClasses = (variant: string): string => {
    const variants = {
      h1: "text-4xl md:text-6xl font-black text-neutral-900 leading-tight",
      h2: "text-3xl md:text-5xl font-bold text-neutral-900 leading-tight",
      h3: "text-2xl md:text-3xl font-bold text-neutral-900 leading-snug",
      body: "text-base font-normal text-neutral-700 leading-relaxed",
      caption: "text-sm font-medium text-neutral-600",
      base: "text-base font-normal text-neutral-900",
    };
    return variants[variant as keyof typeof variants] || variants.body;
  };

  const Component = component || "p";
  const variantClasses = getVariantClasses(variant);

  return (
    <Component
      className={`${variantClasses} ${className}`}
      data-testid={testId || `typography-${variant}`}
    >
      {children}
    </Component>
  );
};

export default Typography;

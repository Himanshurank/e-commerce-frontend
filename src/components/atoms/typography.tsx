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
      h1: "text-3xl md:text-5xl font-bold text-gray-900",
      h2: "text-2xl md:text-4xl font-semibold text-gray-900",
      h3: "text-xl md:text-2xl font-semibold text-gray-900",
      body: "text-base font-normal text-gray-700",
      caption: "text-sm font-normal text-gray-600",
      base: "text-base font-normal text-gray-900",
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

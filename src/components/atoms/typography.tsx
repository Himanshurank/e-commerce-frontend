import React from "react";
import { motion } from "framer-motion";

interface ITypographyProps {
  variant: "h1" | "h2" | "h3" | "body" | "caption" | "base";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  testId?: string;
  animate?: boolean;
  delay?: number;
}

const Typography = (props: ITypographyProps) => {
  const {
    variant,
    component,
    children,
    className = "",
    testId,
    animate = true,
    delay = 0,
  } = props;

  const getVariantClasses = (variant: string): string => {
    const variants = {
      h1: "text-4xl md:text-6xl font-black text-neutral-900 leading-tight tracking-tight",
      h2: "text-3xl md:text-5xl font-bold text-neutral-900 leading-tight tracking-tight",
      h3: "text-2xl md:text-3xl font-bold text-neutral-900 leading-snug tracking-normal",
      body: "text-base font-normal text-neutral-700 leading-relaxed",
      caption: "text-sm font-medium text-neutral-600 leading-normal",
      base: "text-base font-normal text-neutral-900 leading-normal",
    };
    return variants[variant as keyof typeof variants] || variants.body;
  };

  const Component = component || "p";
  const variantClasses = getVariantClasses(variant);

  // Animation variants for different typography elements
  const textVariants = {
    initial: {
      opacity: 0,
      y: variant.startsWith("h") ? 30 : 20,
      scale: variant.startsWith("h") ? 0.95 : 1,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const MotionComponent = motion(Component);

  if (!animate) {
    return (
      <Component
        className={`${variantClasses} ${className}`}
        data-testid={testId || `typography-${variant}`}
      >
        {children}
      </Component>
    );
  }

  return (
    <MotionComponent
      className={`${variantClasses} ${className}`}
      data-testid={testId || `typography-${variant}`}
      variants={textVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: variant.startsWith("h") ? 0.6 : 0.4,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </MotionComponent>
  );
};

export default Typography;

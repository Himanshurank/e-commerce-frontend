import React from "react";
import { motion } from "framer-motion";

interface IButtonProps {
  variant: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  testId?: string;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = (props: IButtonProps) => {
  const {
    variant,
    size = "md",
    children,
    onClick,
    disabled = false,
    type = "button",
    className = "",
    testId,
    fullWidth = false,
    loading = false,
  } = props;

  const getVariantClasses = (variant: string): string => {
    const variants = {
      primary:
        "bg-brand-600 hover:bg-brand-700 text-white border-transparent focus:ring-brand-200 shadow-lg",
      secondary:
        "bg-white hover:bg-neutral-50 text-brand-600 border-2 border-brand-600 hover:border-brand-700 focus:ring-brand-200 shadow-md",
      outline:
        "bg-transparent hover:bg-brand-50 text-brand-600 border-2 border-brand-600 hover:border-brand-700 focus:ring-brand-200",
      ghost:
        "bg-transparent hover:bg-brand-50 text-brand-600 border-transparent focus:ring-brand-200 hover:text-brand-700",
    };
    return variants[variant as keyof typeof variants] || variants.primary;
  };

  const getSizeClasses = (size: string): string => {
    const sizes = {
      sm: "px-4 py-2 text-sm h-9 rounded-lg",
      md: "px-6 py-3 text-base h-11 rounded-xl",
      lg: "px-8 py-4 text-lg h-14 rounded-xl",
    };
    return sizes[size as keyof typeof sizes] || sizes.md;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold border-2 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClasses = fullWidth ? "w-full" : "";

  // Animation variants for Framer Motion
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.6 },
    animate: { scale: 4, opacity: 0 },
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
      data-testid={testId || `button-${variant}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {loading ? (
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            className="-ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Loading...
          </motion.span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          {children}
        </motion.div>
      )}

      {/* Subtle ripple effect on click */}
      <motion.div
        className={`absolute inset-0 bg-white ${size === "sm" ? "rounded-lg" : "rounded-xl"}`}
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
        transition={{ duration: 0.6 }}
        style={{ pointerEvents: "none" }}
      />
    </motion.button>
  );
};

export default Button;

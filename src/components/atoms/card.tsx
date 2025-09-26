import React from "react";
import { motion } from "framer-motion";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const Card = (props: ICardProps) => {
  const {
    children,
    className = "",
    testId,
    onClick,
    hover = false,
    padding = "md",
  } = props;

  const getPaddingClasses = (padding: string): string => {
    const paddings = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };
    return paddings[padding as keyof typeof paddings] || paddings.md;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.stopPropagation();
      onClick(event);
    }
  };

  const baseClasses =
    "bg-white rounded-2xl border border-neutral-200 shadow-lg backdrop-blur-sm relative overflow-hidden";
  const paddingClasses = getPaddingClasses(padding);
  const interactiveClasses = onClick ? "cursor-pointer" : "";

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      borderColor: "#6b21a8",
    },
    tap: { scale: 0.98 },
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { x: "100%" },
  };

  return (
    <motion.div
      className={`${baseClasses} ${paddingClasses} ${interactiveClasses} ${className}`}
      onClick={handleClick}
      data-testid={testId || "card"}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={hover ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.3 },
        y: { duration: 0.3 },
      }}
    >
      {children}

      {/* Subtle shimmer effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          whileHover="animate"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Border glow effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-brand-200 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: "none" }}
        />
      )}
    </motion.div>
  );
};

export default Card;

import React from "react";
import { motion } from "framer-motion";

interface ILabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  testId?: string;
  animate?: boolean;
  delay?: number;
}

const Label = (props: ILabelProps) => {
  const {
    children,
    htmlFor,
    required = false,
    className = "",
    testId,
    animate = true,
    delay = 0,
  } = props;

  // Animation variants
  const labelVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  const requiredVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  const baseClasses =
    "block text-sm font-semibold text-neutral-700 mb-2 tracking-wide";

  if (!animate) {
    return (
      <label
        htmlFor={htmlFor}
        className={`${baseClasses} ${className}`}
        data-testid={testId || "label"}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }

  return (
    <motion.label
      htmlFor={htmlFor}
      className={`${baseClasses} ${className}`}
      data-testid={testId || "label"}
      variants={labelVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      {children}
      {required && (
        <motion.span
          className="text-red-500 ml-1"
          variants={requiredVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: delay + 0.2,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          *
        </motion.span>
      )}
    </motion.label>
  );
};

export default Label;

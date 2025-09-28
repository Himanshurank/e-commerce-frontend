import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IInputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  testId?: string;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = (props: IInputProps) => {
  const {
    type = "text",
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    required = false,
    className = "",
    testId,
    label,
    error,
    icon,
    fullWidth = false,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const renderLabel = () => {
    if (!label) return null;

    return (
      <motion.label
        className="block text-sm font-semibold text-neutral-700 mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label}
        {required && (
          <motion.span
            className="text-red-500 ml-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            *
          </motion.span>
        )}
      </motion.label>
    );
  };

  const renderError = () => {
    return (
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-600 flex items-center"
            data-testid={`${testId}-error`}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              className="mr-1"
            >
              ⚠️
            </motion.span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    );
  };

  const baseClasses =
    "block px-4 py-3 border rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-4 focus:ring-offset-0";
  const sizeClasses = "h-12 text-base font-medium";
  const stateClasses = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
    : isFocused
      ? "border-brand-600 focus:border-brand-600 focus:ring-brand-200"
      : "border-neutral-300 focus:border-brand-600 focus:ring-brand-200";
  const disabledClasses = disabled
    ? "bg-neutral-50 cursor-not-allowed"
    : "bg-white";
  const widthClasses = fullWidth ? "w-full" : "";
  const iconPadding = icon ? "pl-12" : "";

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    focus: { scale: 1.1, color: "#6b21a8" },
  };

  return (
    <motion.div
      className={fullWidth ? "w-full" : ""}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
    >
      {renderLabel()}
      <motion.div
        className="relative"
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {icon && (
          <motion.div
            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            variants={iconVariants}
            initial="initial"
            animate={isFocused ? "focus" : "animate"}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`transition-colors duration-200 ${isFocused ? "text-brand-600" : "text-neutral-400"}`}
            >
              {icon}
            </div>
          </motion.div>
        )}
        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className={`${baseClasses} ${sizeClasses} ${stateClasses} ${disabledClasses} ${widthClasses} ${iconPadding} ${className}`}
          data-testid={testId || "input"}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </motion.div>
      {renderError()}
    </motion.div>
  );
};

export default Input;

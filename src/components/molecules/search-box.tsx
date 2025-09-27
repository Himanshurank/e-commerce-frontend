import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/atoms/input";
import Icon from "@/components/atoms/icon";

interface ISearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  testId?: string;
  fullWidth?: boolean;
}

const SearchBox = (props: ISearchBoxProps) => {
  const {
    placeholder = "Search products, suppliers, categories...",
    value: controlledValue,
    onChange,
    onSubmit,
    className = "",
    testId,
    fullWidth = false,
  } = props;

  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit && value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Animation variants
  const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    focus: { scale: 1.02 },
  };

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0,
      opacity: 0,
    },
    hover: { scale: 1.05, rotate: 5 },
    tap: { scale: 0.95 },
  };

  const suggestionsVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
  };

  const iconVariants = {
    focus: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative group ${className}`}
      role="search"
      aria-label="Product search"
      variants={formVariants}
      initial="initial"
      animate="animate"
      whileFocus="focus"
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="relative"
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          fullWidth={fullWidth}
          icon={
            <motion.div
              variants={iconVariants}
              animate={isFocused ? "focus" : ""}
            >
              <Icon
                name="search"
                size="sm"
                className={`transition-colors duration-300 ${isFocused ? "text-brand-600" : "text-neutral-400"}`}
              />
            </motion.div>
          }
          className="pr-16 shadow-lg border-2 border-transparent focus:border-brand-200"
          testId={testId || "search-box"}
        />

        {/* Animated search button */}
        <AnimatePresence>
          {value && (
            <motion.button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-200 shadow-lg"
              aria-label="Search"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
            >
              <Icon name="search" size="sm" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Focus glow effect */}
        <motion.div
          className="absolute inset-0 bg-brand-600 rounded-xl opacity-0 -z-10"
          animate={
            isFocused
              ? { opacity: 0.05, scale: 1.05 }
              : { opacity: 0, scale: 1 }
          }
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Enhanced search suggestions with animations */}
      <AnimatePresence>
        {isFocused && value && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-brand-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
            variants={suggestionsVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Search suggestions header */}
            <motion.div
              className="p-4 bg-brand-50 border-b border-brand-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                <Icon name="search" size="sm" />
                <span>Search suggestions</span>
              </div>
            </motion.div>

            {/* Mock suggestions for demo */}
            <div className="p-2">
              {["Electronics", "Fashion", "Home & Garden", "Sports"].map(
                (suggestion, index) => (
                  <motion.div
                    key={suggestion}
                    className="p-3 hover:bg-brand-50 rounded-xl cursor-pointer transition-colors duration-200 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: "#faf5ff" }}
                  >
                    <Icon
                      name="search"
                      size="sm"
                      className="text-neutral-400"
                    />
                    <span className="text-neutral-700">{suggestion}</span>
                    <motion.div
                      className="ml-auto text-xs text-brand-500 opacity-0"
                      whileHover={{ opacity: 1 }}
                    >
                      Search
                    </motion.div>
                  </motion.div>
                )
              )}
            </div>

            {/* Floating search particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-brand-400 rounded-full"
                  style={{
                    top: `${20 + i * 30}%`,
                    right: `${10 + i * 15}%`,
                  }}
                  animate={{
                    y: [-2, -6, -2],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default SearchBox;

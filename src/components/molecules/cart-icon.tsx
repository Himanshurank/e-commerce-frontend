import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../atoms/icon";

interface ICartIconProps {
  itemCount?: number;
  onClick?: () => void;
  className?: string;
  testId?: string;
}

const CartIcon = (props: ICartIconProps) => {
  const { itemCount = 0, onClick, className = "", testId } = props;

  // Animation variants
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.4 },
    },
    tap: { scale: 0.9 },
  };

  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
    },
    exit: {
      scale: 0,
      opacity: 0,
    },
    bounce: {
      scale: [1, 1.3, 1],
    },
  };

  const backgroundVariants = {
    initial: { scale: 0, opacity: 0 },
    hover: {
      scale: 1,
      opacity: 0.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.button
      onClick={onClick}
      className={`group relative p-4 text-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-200 overflow-hidden ${className}`}
      data-testid={testId || "cart-icon"}
      aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} items` : " is empty"}`}
      title={`Cart (${itemCount} items)`}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Background hover effect */}
      <motion.div
        className="absolute inset-0 bg-brand-600 rounded-2xl"
        variants={backgroundVariants}
        initial="initial"
        whileHover="hover"
      />

      {/* Icon with animation */}
      <motion.div
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
        className="relative z-10"
      >
        <Icon
          name="cart"
          size="lg"
          className="group-hover:text-brand-600 transition-colors duration-200"
        />
      </motion.div>

      {/* Badge with count */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            className="absolute -top-2 -right-2"
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={itemCount}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Badge background */}
            <motion.div className="relative">
              <motion.span
                className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 shadow-lg relative z-10"
                animate={itemCount > 0 ? "bounce" : ""}
                variants={badgeVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </motion.span>

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 bg-red-400 rounded-full"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-brand-200 rounded-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: 1.5,
          opacity: 0.3,
          transition: { duration: 0.4, ease: "easeOut" },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      />

      {/* Floating particles when items are in cart */}
      {itemCount > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-400 rounded-full"
              style={{
                top: `${30 + i * 20}%`,
                left: `${20 + i * 30}%`,
              }}
              animate={{
                y: [-3, -8, -3],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default CartIcon;

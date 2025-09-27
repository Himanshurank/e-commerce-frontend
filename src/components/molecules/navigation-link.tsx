import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/typography";

interface INavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  testId?: string;
  active?: boolean;
}

const NavigationLink = (props: INavigationLinkProps) => {
  const { href, children, className = "", testId, active = false } = props;

  const baseClasses =
    "relative px-5 py-3 text-neutral-700 font-medium rounded-xl group overflow-hidden";
  const activeClasses = active
    ? "text-brand-600 bg-brand-50 font-semibold"
    : "";

  // Animation variants
  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -2 },
    tap: { scale: 0.95 },
  };

  const backgroundVariants = {
    initial: { scaleX: 0, opacity: 0 },
    hover: {
      scaleX: 1,
      opacity: 0.1,
    },
  };

  const indicatorVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 1,
    },
  };

  const textVariants = {
    hover: {
      color: "#6b21a8",
    },
  };

  const MotionLink = motion(Link);

  return (
    <MotionLink
      href={href}
      className={`${baseClasses} ${activeClasses} ${className}`}
      data-testid={testId || "navigation-link"}
      variants={linkVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Background hover effect */}
      <motion.div
        className="absolute inset-0 bg-brand-600 rounded-xl"
        variants={backgroundVariants}
        initial="initial"
        whileHover="hover"
        style={{ originX: 0 }}
      />

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-brand-200 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: 1,
          opacity: 0.3,
        }}
        style={{ transformOrigin: "center" }}
      />

      {/* Text content */}
      <motion.div
        className="relative z-10"
        variants={textVariants}
        whileHover="hover"
      >
        <Typography
          variant="body"
          component="span"
          className="font-semibold tracking-wide"
          animate={false}
        >
          {children}
        </Typography>
      </motion.div>

      {/* Active indicator with animation */}
      {active && (
        <motion.div
          className="absolute bottom-1 left-1/2 w-6 h-0.5 bg-brand-600 rounded-full"
          style={{ x: "-50%" }}
          variants={indicatorVariants}
          initial="initial"
          animate="animate"
        />
      )}

      {/* Subtle glow effect for active state */}
      {active && (
        <motion.div
          className="absolute inset-0 bg-brand-600 rounded-xl opacity-5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.05,
            
          }}
        />
      )}

      {/* Floating indicator dots */}
      {active && (
        <div className="absolute top-2 right-2">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-600 rounded-full"
              style={{
                top: i * 3,
                right: i * 3,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </MotionLink>
  );
};

export default NavigationLink;

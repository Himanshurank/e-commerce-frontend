import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/typography";

interface ILogoProps {
  className?: string;
  testId?: string;
  showText?: boolean;
}

const Logo = (props: ILogoProps) => {
  const { className = "", testId, showText = true } = props;

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { rotate: -10, scale: 0.8 },
    animate: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: [0, -5, 5, 0],
    },
  };

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.4 },
    },
  };

  const MotionLink = motion(Link);

  return (
    <MotionLink
      href="/"
      className={`group flex items-center ${className}`}
      data-testid={testId || "logo"}
      aria-label="ECommerce - Go to homepage"
      variants={logoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Modern logo icon without gradient */}
      <motion.div
        className="relative w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg overflow-hidden"
        variants={iconVariants}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Background pulse effect */}
        <motion.div
          className="absolute inset-0 bg-brand-700 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{
            scale: 1,
            opacity: 0.3,
            transition: { duration: 0.3 },
          }}
        />

        {/* Letter E with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <Typography
            variant="body"
            className="relative text-white font-black text-xl z-10"
            animate={false}
          >
            E
          </Typography>
        </motion.div>

        {/* Floating particles effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${20 + i * 20}%`,
              right: `${15 + i * 10}%`,
            }}
            animate={{
              y: [-5, -15, -5],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {showText && (
        <motion.div
          className="hidden sm:block"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Typography
              variant="h3"
              component="span"
              className="text-neutral-900 font-black tracking-tight group-hover:text-brand-600 transition-colors duration-300"
              animate={false}
            >
              ECommerce
            </Typography>
          </motion.div>

          <motion.div
            className="text-xs text-neutral-500 font-medium -mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              B2B Platform
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </MotionLink>
  );
};

export default Logo;

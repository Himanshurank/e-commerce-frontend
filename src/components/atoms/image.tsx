import React, { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface IImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  testId?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  animate?: boolean;
  delay?: number;
}

const Image = (props: IImageProps) => {
  const {
    src,
    alt,
    width,
    height,
    fill = false,
    className = "",
    testId,
    priority = false,
    placeholder,
    sizes,
    objectFit = "cover",
    animate = true,
    delay = 0,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageProps = {
    src,
    alt,
    className: `${objectFit === "cover" ? "object-cover" : `object-${objectFit}`} transition-all duration-500 ${className}`,
    "data-testid": testId || "image",
    priority,
    placeholder,
    sizes,
    quality: 90,
    onLoad: handleLoad,
    onError: handleError,
    ...(fill ? { fill: true } : { width, height }),
  };

  // Animation variants
  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { x: "100%" },
  };

  if (!animate) {
    return <NextImage {...imageProps} />;
  }

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        {isLoading && !hasError && (
          <motion.div
            className="absolute inset-0 bg-neutral-200 rounded-lg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Loading shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Loading pulse */}
            <motion.div
              className="absolute inset-0 bg-brand-100 rounded-lg"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <motion.div
          className="flex items-center justify-center bg-neutral-100 rounded-lg text-neutral-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: width || "100%",
            height: height || "200px",
          }}
        >
          Failed to load image
        </motion.div>
      ) : (
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate={!isLoading ? "animate" : "initial"}
          whileHover="hover"
          transition={{
            duration: 0.6,
            delay,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <NextImage {...imageProps} />
        </motion.div>
      )}
    </div>
  );
};

export default Image;

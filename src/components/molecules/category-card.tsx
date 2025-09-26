import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Typography from "@/components/atoms/typography";
import Card from "@/components/atoms/card";
import Image from "@/components/atoms/image";

interface ICategory {
  id: string;
  name: string;
  image: string;
  productCount: number;
  slug: string;
}

interface ICategoryCardProps {
  category: ICategory;
  className?: string;
  testId?: string;
}

const CategoryCard = (props: ICategoryCardProps) => {
  const { category, className = "", testId } = props;

  const formatProductCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M+ products`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+ products`;
    }
    return `${count} products`;
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -8, scale: 1.05 },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15, rotate: 5 },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 360 },
  };

  const exploreVariants = {
    initial: { opacity: 0, y: 10, x: -5 },
    hover: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link
        href={`/categories/${category.slug}`}
        className="block focus:outline-none focus:ring-4 focus:ring-brand-200 rounded-2xl transition-all duration-300"
        aria-label={`Browse ${category.name} category with ${formatProductCount(category.productCount)}`}
      >
        <Card
          hover
          padding="md"
          className={`group transition-all duration-500 hover:border-brand-200 hover:shadow-xl ${className}`}
          testId={testId || `category-card-${category.id}`}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* Category Image with modern styling - removed gradients */}
            <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-2xl bg-brand-50 shadow-lg group-hover:shadow-xl transition-all duration-500">
              <motion.div
                className="absolute inset-0 bg-brand-100/30 group-hover:bg-brand-100/50 transition-colors duration-500"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                variants={imageVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </motion.div>
              {/* Shine effect - simplified without gradient */}
              <motion.div
                className="absolute inset-0 bg-white/20 opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating particles on hover */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-brand-400 rounded-full"
                  style={{
                    top: `${20 + i * 20}%`,
                    right: `${10 + i * 15}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{
                    scale: 1,
                    opacity: 0.8,
                    y: [-5, -15, -5],
                  }}
                  transition={{
                    delay: i * 0.1,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Category Info with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Typography
                variant="body"
                className="font-bold mb-3 text-neutral-900 group-hover:text-brand-600 transition-colors duration-300"
              >
                {category.name}
              </Typography>
            </motion.div>

            <motion.div
              className="flex items-center justify-center space-x-1 text-neutral-500 group-hover:text-neutral-600 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                variants={iconVariants}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </motion.svg>
              <Typography variant="caption" className="font-medium">
                {formatProductCount(category.productCount)}
              </Typography>
            </motion.div>

            {/* Explore indicator */}
            <motion.div
              className="mt-4 flex items-center justify-center text-brand-500"
              variants={exploreVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.span
                className="text-sm font-medium mr-1"
                whileHover={{ scale: 1.05 }}
              >
                Explore
              </motion.span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

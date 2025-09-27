import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import ProductCard from "@/components/molecules/product-card";

interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  reviewCount: number;
  seller: string;
  inStock: boolean;
}

interface IProductGridProps {
  title: string;
  subtitle?: string;
  products: IProduct[];
  onAddToCart?: (productId: string) => void;
  onViewAll?: () => void;
  className?: string;
  testId?: string;
  showViewAllButton?: boolean;
  id?: string;
}

const ProductGrid = (props: IProductGridProps) => {
  const {
    title,
    subtitle,
    products,
    onAddToCart,
    onViewAll,
    className = "",
    testId,
    showViewAllButton = true,
    id,
  } = props;

  const renderHeader = () => {
    const headerVariants = {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    };

    const buttonVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    };

    return (
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          variants={headerVariants}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <Typography variant="h2" component="h2" className="mb-3">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" className="text-neutral-600">
              {subtitle}
            </Typography>
          )}
        </motion.div>

        {showViewAllButton && onViewAll && (
          <motion.div
            variants={buttonVariants}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="mt-6 sm:mt-0 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300"
              onClick={onViewAll}
            >
              View All Products
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderProductGrid = () => {
    const containerVariants = {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    };

    const itemVariants = {
      initial: { opacity: 0, y: 40, scale: 0.9 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
    };

    if (products.length === 0) {
      return (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <Typography variant="body" className="text-neutral-500">
            No products available
          </Typography>
        </motion.div>
      );
    }

    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            custom={index}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.6,
            }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              testId={`product-${product.id}`}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const sectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.section
      id={id}
      className={`py-16 relative ${className}`}
      data-testid={testId || "product-grid"}
      variants={sectionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        {renderProductGrid()}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-600 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-500 rounded-full blur-3xl" />
      </div>

      {/* Section accent line */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-brand-600 rounded-full opacity-0"
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
    </motion.section>
  );
};

export default ProductGrid;

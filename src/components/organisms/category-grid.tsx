import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import CategoryCard from "@/components/molecules/category-card";

interface ICategory {
  id: string;
  name: string;
  image: string;
  productCount: number;
  slug: string;
}

interface ICategoryGridProps {
  title: string;
  subtitle?: string;
  categories: ICategory[];
  onViewAll?: () => void;
  className?: string;
  testId?: string;
  showViewAllButton?: boolean;
}

const CategoryGrid = (props: ICategoryGridProps) => {
  const {
    title,
    subtitle,
    categories,
    onViewAll,
    className = "",
    testId,
    showViewAllButton = true,
  } = props;

  const renderHeader = () => {
    const headerVariants = {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    };

    const subtitleVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        className="text-center mb-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          variants={headerVariants}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <Typography variant="h2" component="h2" className="mb-4">
            {title}
          </Typography>
        </motion.div>

        {subtitle && (
          <motion.div
            variants={subtitleVariants}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography
              variant="body"
              className="text-neutral-600 max-w-2xl mx-auto"
            >
              {subtitle}
            </Typography>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderCategoryGrid = () => {
    const containerVariants = {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
      },
    };

    const itemVariants = {
      initial: { opacity: 0, y: 30, scale: 0.9 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
    };

    if (categories.length === 0) {
      return (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body" className="text-neutral-500">
            No categories available
          </Typography>
        </motion.div>
      );
    }

    return (
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            custom={index}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <CategoryCard
              category={category}
              testId={`category-${category.slug}`}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderViewAllButton = () => {
    if (!showViewAllButton || !onViewAll) return null;

    return (
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onViewAll}
          className="hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300"
        >
          View All Categories
        </Button>
      </motion.div>
    );
  };

  const sectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.section
      className={`py-16 bg-neutral-50 ${className}`}
      data-testid={testId || "category-grid"}
      variants={sectionVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        {renderCategoryGrid()}
        {renderViewAllButton()}
      </div>

      {/* Section bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brand-600 rounded-full opacity-0"
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </motion.section>
  );
};

export default CategoryGrid;

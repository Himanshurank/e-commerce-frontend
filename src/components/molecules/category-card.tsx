import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Typography from "@/components/atoms/typography";
import Card from "@/components/atoms/card";

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

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -8, scale: 1.05 },
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
        aria-label={`Browse ${category.name} category`}
      >
        <Card
          hover
          className={`group transition-all duration-500 hover:border-brand-200 hover:shadow-lg ${className}`}
          testId={testId || `category-card-${category.id}`}
        >
          <motion.div
            className="text-center py-4 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Typography
              variant="body"
              className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors duration-300"
            >
              {category.name}
            </Typography>
          </motion.div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

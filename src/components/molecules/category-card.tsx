import React from "react";
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

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block focus:outline-none focus:ring-4 focus:ring-brand-200 rounded-2xl transition-all duration-300"
      aria-label={`Browse ${category.name} category with ${formatProductCount(category.productCount)}`}
    >
      <Card
        hover
        padding="md"
        className={`group transition-all duration-500 hover:border-brand-200 ${className}`}
        testId={testId || `category-card-${category.id}`}
      >
        <div className="text-center">
          {/* Category Image with modern styling */}
          <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 shadow-lg group-hover:shadow-xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-100/50 to-accent-100/50 group-hover:opacity-80 transition-opacity duration-500"></div>
            <Image
              src={category.image}
              alt={`${category.name} category`}
              fill
              className="group-hover:scale-110 transition-transform duration-500 object-cover"
              sizes="80px"
            />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Category Info with enhanced styling */}
          <Typography
            variant="body"
            className="font-bold mb-2 text-neutral-900 group-hover:text-brand-600 transition-colors duration-300"
          >
            {category.name}
          </Typography>

          <div className="flex items-center justify-center space-x-1 text-neutral-500 group-hover:text-neutral-600 transition-colors duration-300">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <Typography variant="caption" className="font-medium">
              {formatProductCount(category.productCount)}
            </Typography>
          </div>

          {/* Explore indicator */}
          <div className="mt-3 flex items-center justify-center text-brand-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-sm font-medium mr-1">Explore</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;

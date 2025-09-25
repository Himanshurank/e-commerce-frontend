import React from "react";
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
    return (
      <div className="text-center mb-8">
        <Typography variant="h2" component="h2" className="mb-4">
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body"
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </Typography>
        )}
      </div>
    );
  };

  const renderCategoryGrid = () => {
    if (categories.length === 0) {
      return (
        <div className="text-center py-12">
          <Typography variant="body" className="text-gray-500">
            No categories available
          </Typography>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            testId={`category-${category.slug}`}
          />
        ))}
      </div>
    );
  };

  const renderViewAllButton = () => {
    if (!showViewAllButton || !onViewAll) return null;

    return (
      <div className="text-center mt-8">
        <Button variant="outline" size="lg" onClick={onViewAll}>
          View All Categories
        </Button>
      </div>
    );
  };

  return (
    <section
      className={`py-12 bg-gray-50 ${className}`}
      data-testid={testId || "category-grid"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        {renderCategoryGrid()}
        {renderViewAllButton()}
      </div>
    </section>
  );
};

export default CategoryGrid;

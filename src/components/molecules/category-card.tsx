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
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+ products`;
    }
    return `${count} products`;
  };

  return (
    <Link href={`/categories/${category.slug}`}>
      <Card
        hover
        padding="sm"
        className={`group transition-all duration-200 ${className}`}
        testId={testId || `category-card-${category.id}`}
      >
        <div className="text-center">
          {/* Category Image */}
          <div className="relative w-16 h-16 mx-auto mb-3 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="group-hover:scale-110 transition-transform duration-200"
              sizes="64px"
            />
          </div>

          {/* Category Info */}
          <Typography
            variant="body"
            className="font-medium mb-1 group-hover:text-blue-600 transition-colors"
          >
            {category.name}
          </Typography>

          <Typography variant="caption" className="text-gray-600">
            {formatProductCount(category.productCount)}
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;

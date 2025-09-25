import React from "react";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import ProductCard from "@/components/molecules/product-card";

interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
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
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <Typography variant="h2" component="h2" className="mb-2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" className="text-gray-600">
              {subtitle}
            </Typography>
          )}
        </div>
        {showViewAllButton && onViewAll && (
          <Button
            variant="outline"
            className="mt-4 sm:mt-0"
            onClick={onViewAll}
          >
            View All Products
          </Button>
        )}
      </div>
    );
  };

  const renderProductGrid = () => {
    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <Typography variant="body" className="text-gray-500">
            No products available
          </Typography>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            testId={`product-${product.id}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id={id}
      className={`py-12 ${className}`}
      data-testid={testId || "product-grid"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        {renderProductGrid()}
      </div>
    </section>
  );
};

export default ProductGrid;

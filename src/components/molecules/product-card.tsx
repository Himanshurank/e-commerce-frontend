import React from "react";
import Link from "next/link";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import Card from "@/components/atoms/card";
import Image from "@/components/atoms/image";
import Icon from "@/components/atoms/icon";

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

interface IProductCardProps {
  product: IProduct;
  onAddToCart?: (productId: string) => void;
  className?: string;
  testId?: string;
}

const ProductCard = (props: IProductCardProps) => {
  const { product, onAddToCart, className = "", testId } = props;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (onAddToCart && product.inStock) {
      onAddToCart(product.id);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderDiscountBadge = () => {
    if (!product.originalPrice || product.originalPrice <= product.price)
      return null;

    const discountPercent = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    return (
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
        -{discountPercent}%
      </div>
    );
  };

  const renderStockStatus = () => {
    if (product.inStock) return null;

    return (
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-lg">
        <Typography variant="body" className="text-white font-semibold">
          Out of Stock
        </Typography>
      </div>
    );
  };

  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size="sm" className="text-yellow-400" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Icon name="star-empty" size="sm" className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Icon name="star" size="sm" className="text-yellow-400" />
          </div>
        </div>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          name="star-empty"
          size="sm"
          className="text-gray-300"
        />
      );
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex items-center">{stars}</div>
        <Typography variant="caption" className="text-gray-600">
          ({product.reviewCount})
        </Typography>
      </div>
    );
  };

  const renderPricing = () => {
    return (
      <div className="flex items-center space-x-2">
        <Typography variant="h3" component="span" className="text-blue-600">
          {formatPrice(product.price)}
        </Typography>
        {product.originalPrice && product.originalPrice > product.price && (
          <Typography
            variant="caption"
            component="span"
            className="text-gray-500 line-through"
          >
            {formatPrice(product.originalPrice)}
          </Typography>
        )}
      </div>
    );
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        hover
        className={`group transition-all duration-200 ${className}`}
        testId={testId || `product-card-${product.id}`}
      >
        {/* Product Image */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {renderDiscountBadge()}
          {renderStockStatus()}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <Typography
            variant="body"
            className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors"
          >
            {product.name}
          </Typography>

          {renderRating()}

          <Typography variant="caption" className="text-gray-600">
            by {product.seller}
          </Typography>

          {renderPricing()}

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.inStock}
            testId={`add-to-cart-${product.id}`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;

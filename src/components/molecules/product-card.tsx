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
      <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
        -{discountPercent}%
      </div>
    );
  };

  const renderStockStatus = () => {
    if (product.inStock) return null;

    return (
      <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center rounded-xl z-20">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-neutral-700 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <Typography variant="body" className="text-white font-bold">
            Out of Stock
          </Typography>
        </div>
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
          <Icon name="star-empty" size="sm" className="text-neutral-300" />
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
          className="text-neutral-300"
        />
      );
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex items-center">{stars}</div>
        <Typography variant="caption" className="text-neutral-600">
          ({product.reviewCount})
        </Typography>
      </div>
    );
  };

  const renderPricing = () => {
    return (
      <div className="flex items-center space-x-2">
        <Typography
          variant="h3"
          component="span"
          className="text-brand-600 font-black"
        >
          {formatPrice(product.price)}
        </Typography>
        {product.originalPrice && product.originalPrice > product.price && (
          <Typography
            variant="caption"
            component="span"
            className="text-neutral-500 line-through font-medium"
          >
            {formatPrice(product.originalPrice)}
          </Typography>
        )}
      </div>
    );
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="block focus:outline-none focus:ring-4 focus:ring-brand-200 rounded-2xl transition-all duration-300"
      aria-label={`View ${product.name} - ${formatPrice(product.price)}`}
    >
      <Card
        hover
        className={`group transition-all duration-500 hover:border-brand-200 ${className}`}
        testId={testId || `product-card-${product.id}`}
      >
        {/* Product Image with enhanced styling */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 shadow-inner">
          <Image
            src={product.image}
            alt={`${product.name} product image`}
            fill
            className="group-hover:scale-110 transition-transform duration-500 object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Wishlist button */}
          <button
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Future: Add to wishlist functionality
            }}
            aria-label="Add to wishlist"
          >
            <Icon
              name="heart"
              size="sm"
              className="text-neutral-600 hover:text-red-500 transition-colors"
            />
          </button>

          {renderDiscountBadge()}
          {renderStockStatus()}

          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Product Info with enhanced spacing */}
        <div className="space-y-3">
          <Typography
            variant="body"
            className="font-bold line-clamp-2 text-neutral-900 group-hover:text-brand-600 transition-colors duration-300 leading-snug"
          >
            {product.name}
          </Typography>

          {renderRating()}

          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-brand-100 rounded-full flex items-center justify-center">
              <svg
                className="w-2 h-2 text-brand-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <Typography
              variant="caption"
              className="text-neutral-600 font-medium"
            >
              by {product.seller}
            </Typography>
          </div>

          {renderPricing()}

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-4 group-hover:shadow-lg transition-all duration-300"
            testId={`add-to-cart-${product.id}`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="cart" size="sm" />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </div>
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;

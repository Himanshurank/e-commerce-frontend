import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (onAddToCart && product.inStock) {
      onAddToCart(product.id);
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
    }
  };

  const handleWishlistToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsWishlisted(!isWishlisted);
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
      <motion.div
        className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.05 }}
      >
        -{discountPercent}%
      </motion.div>
    );
  };

  const renderStockStatus = () => {
    if (product.inStock) return null;

    return (
      <motion.div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center rounded-xl z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="w-12 h-12 mx-auto mb-2 bg-neutral-700 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
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
          </motion.div>
          <Typography variant="body" className="text-white font-bold">
            Out of Stock
          </Typography>
        </motion.div>
      </motion.div>
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
      <motion.div
        className="flex items-center space-x-1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {stars}
        </motion.div>
        <Typography variant="caption" className="text-neutral-600">
          ({product.reviewCount})
        </Typography>
      </motion.div>
    );
  };

  const renderPricing = () => {
    return (
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Typography
            variant="h3"
            component="span"
            className="text-brand-600 font-black"
          >
            {formatPrice(product.price)}
          </Typography>
        </motion.div>
        {product.originalPrice && product.originalPrice > product.price && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Typography
              variant="caption"
              component="span"
              className="text-neutral-500 line-through font-medium"
            >
              {formatPrice(product.originalPrice)}
            </Typography>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02 },
  };

  const imageVariants = {
    hover: { scale: 1.1 },
  };

  const wishlistVariants = {
    initial: { scale: 0, opacity: 0, y: 10 },
    animate: { scale: 1, opacity: 1, y: 0 },
    hover: { scale: 1.1 },
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
        href={`/products/${product.id}`}
        className="block focus:outline-none focus:ring-4 focus:ring-brand-200 rounded-2xl transition-all duration-300"
        aria-label={`View ${product.name} - ${formatPrice(product.price)}`}
      >
        <Card
          hover
          className={`group transition-all duration-500 hover:border-brand-200 hover:shadow-xl ${className}`}
          testId={testId || `product-card-${product.id}`}
        >
          {/* Product Image with enhanced styling */}
          <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-neutral-100 shadow-inner">
            <motion.div
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={product.image}
                alt={`${product.name} product image`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </motion.div>

            {/* Wishlist button */}
            <motion.button
              className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full shadow-lg z-10 transition-colors duration-300 ${
                isWishlisted
                  ? "bg-red-100 text-red-500"
                  : "bg-white/80 hover:bg-white text-neutral-600 hover:text-red-500"
              }`}
              onClick={handleWishlistToggle}
              aria-label="Add to wishlist"
              variants={wishlistVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  name="heart"
                  size="sm"
                  className={`transition-colors duration-200 ${
                    isWishlisted ? "text-red-500" : ""
                  }`}
                />
              </motion.div>
            </motion.button>

            {renderDiscountBadge()}
            {renderStockStatus()}

            {/* Shine effect on hover - removed gradient */}
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Product Info with enhanced spacing */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Typography
                variant="body"
                className="font-bold line-clamp-2 text-neutral-900 group-hover:text-brand-600 transition-colors duration-300 leading-snug"
              >
                {product.name}
              </Typography>
            </motion.div>

            {renderRating()}

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <motion.div
                className="w-4 h-4 bg-brand-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  className="w-2 h-2 text-brand-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>
              <Typography
                variant="caption"
                className="text-neutral-600 font-medium"
              >
                by {product.seller}
              </Typography>
            </motion.div>

            {renderPricing()}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <AnimatePresence>
                {showAddedToCart ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-green-100 text-green-700 py-2 px-4 rounded-xl text-center font-semibold text-sm"
                  >
                    ✓ Added to Cart!
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
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
                        <span>
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

import React, { useState } from "react";
import MainLayout from "@/components/layouts/main-layout";
import HeroSection from "../organisms/hero-section";
import CategoryGrid from "../organisms/category-grid";
import ProductGrid from "../organisms/product-grid";
import NewsletterSection from "../organisms/newsletter-section";
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
} from "@/core/modules/homepage/constants";

// Mock data - In real app, this would come from API
interface IHomePageProps {
  className?: string;
}

const HomePage = (props: IHomePageProps) => {
  const { className } = props;
  const [cartItems, setCartItems] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => [...prev, productId]);
    console.log("Added to cart:", productId);
    console.log("Current cart items:", cartItems.length + 1);
  };

  const handleCartClick = () => {
    console.log("Cart clicked, items:", cartItems.length);
    // Navigate to cart page
  };

  const handleSearch = (query: string) => {
    console.log("Search:", query);
    // Handle search functionality
  };

  const handleShopNowClick = () => {
    const featuredSection = document.getElementById("featured-products");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBecomeSellerClick = () => {
    // Navigate to seller registration
    window.location.href = "/sellers/register";
  };

  const handleViewAllCategories = () => {
    // Navigate to categories page
    window.location.href = "/categories";
  };

  const handleViewAllProducts = () => {
    // Navigate to products page
    window.location.href = "/products";
  };

  const handleNewsletterSubscribe = async (email: string) => {
    console.log("Newsletter subscription:", email);
    // Handle newsletter subscription
    // In real app, this would make an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <MainLayout
      cartItemCount={cartItems.length}
      onCartClick={handleCartClick}
      onSearch={handleSearch}
      className={className}
    >
      <HeroSection
        onShopNowClick={handleShopNowClick}
        onBecomeSellerClick={handleBecomeSellerClick}
      />

      <CategoryGrid
        title="Shop by Category"
        subtitle="Discover thousands of products across our most popular categories"
        categories={MOCK_CATEGORIES}
        onViewAll={handleViewAllCategories}
      />

      <ProductGrid
        id="featured-products"
        title="Featured Products"
        subtitle="Hand-picked products from our top sellers"
        products={MOCK_PRODUCTS}
        onAddToCart={handleAddToCart}
        onViewAll={handleViewAllProducts}
      />

      <NewsletterSection onSubscribe={handleNewsletterSubscribe} />
    </MainLayout>
  );
};

export default HomePage;

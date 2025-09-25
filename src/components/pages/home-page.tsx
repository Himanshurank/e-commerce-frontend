import React, { useState } from "react";
import MainLayout from "@/components/layouts/main-layout";
import HeroSection from "../organisms/hero-section";
import CategoryGrid from "../organisms/category-grid";
import ProductGrid from "../organisms/product-grid";
import NewsletterSection from "../organisms/newsletter-section";

// Mock data - In real app, this would come from API
const mockCategories = [
  {
    id: "1",
    name: "Electronics",
    image: "/api/placeholder/64/64",
    productCount: 1250,
    slug: "electronics",
  },
  {
    id: "2",
    name: "Fashion",
    image: "/api/placeholder/64/64",
    productCount: 2100,
    slug: "fashion",
  },
  {
    id: "3",
    name: "Home & Garden",
    image: "/api/placeholder/64/64",
    productCount: 890,
    slug: "home-garden",
  },
  {
    id: "4",
    name: "Sports",
    image: "/api/placeholder/64/64",
    productCount: 650,
    slug: "sports",
  },
  {
    id: "5",
    name: "Books",
    image: "/api/placeholder/64/64",
    productCount: 3200,
    slug: "books",
  },
  {
    id: "6",
    name: "Toys",
    image: "/api/placeholder/64/64",
    productCount: 720,
    slug: "toys",
  },
  {
    id: "7",
    name: "Beauty",
    image: "/api/placeholder/64/64",
    productCount: 980,
    slug: "beauty",
  },
  {
    id: "8",
    name: "Automotive",
    image: "/api/placeholder/64/64",
    productCount: 450,
    slug: "automotive",
  },
];

const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 89.99,
    originalPrice: 129.99,
    image: "/api/placeholder/300/300",
    rating: 4.5,
    reviewCount: 128,
    seller: "TechStore",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Tracker with Heart Rate Monitor",
    price: 149.99,
    image: "/api/placeholder/300/300",
    rating: 4.2,
    reviewCount: 89,
    seller: "FitGear",
    inStock: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt - Premium Quality",
    price: 24.99,
    originalPrice: 34.99,
    image: "/api/placeholder/300/300",
    rating: 4.7,
    reviewCount: 256,
    seller: "EcoFashion",
    inStock: true,
  },
  {
    id: "4",
    name: "Professional Camera Lens 50mm f/1.8",
    price: 299.99,
    image: "/api/placeholder/300/300",
    rating: 4.8,
    reviewCount: 67,
    seller: "PhotoPro",
    inStock: false,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 199.99,
    originalPrice: 249.99,
    image: "/api/placeholder/300/300",
    rating: 4.4,
    reviewCount: 143,
    seller: "OfficeComfort",
    inStock: true,
  },
  {
    id: "6",
    name: "Smart Home Security Camera System",
    price: 179.99,
    image: "/api/placeholder/300/300",
    rating: 4.3,
    reviewCount: 94,
    seller: "SecureHome",
    inStock: true,
  },
  {
    id: "7",
    name: "Premium Kitchen Knife Set with Wooden Block",
    price: 79.99,
    originalPrice: 99.99,
    image: "/api/placeholder/300/300",
    rating: 4.6,
    reviewCount: 187,
    seller: "ChefTools",
    inStock: true,
  },
  {
    id: "8",
    name: "Wireless Charging Pad for Smartphones",
    price: 29.99,
    image: "/api/placeholder/300/300",
    rating: 4.1,
    reviewCount: 312,
    seller: "TechStore",
    inStock: true,
  },
];

interface IHomePageProps {
  className?: string;
  testId?: string;
}

const HomePage = (props: IHomePageProps) => {
  const { className = "", testId } = props;
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
      testId={testId || "home-page"}
    >
      <HeroSection
        onShopNowClick={handleShopNowClick}
        onBecomeSellerClick={handleBecomeSellerClick}
      />

      <CategoryGrid
        title="Shop by Category"
        subtitle="Discover thousands of products across our most popular categories"
        categories={mockCategories}
        onViewAll={handleViewAllCategories}
      />

      <ProductGrid
        id="featured-products"
        title="Featured Products"
        subtitle="Hand-picked products from our top sellers"
        products={mockProducts}
        onAddToCart={handleAddToCart}
        onViewAll={handleViewAllProducts}
      />

      <NewsletterSection onSubscribe={handleNewsletterSubscribe} />
    </MainLayout>
  );
};

export default HomePage;

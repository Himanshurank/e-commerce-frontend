import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/main-layout";
import HeroSection from "../organisms/hero-section";
import CategoryGrid from "../organisms/category-grid";
import ProductGrid from "../organisms/product-grid";
import NewsletterSection from "../organisms/newsletter-section";
import { ClientHttpService } from "@/core/shared/services/httpServiceClient";
import { ConfigService } from "@/core/shared/services/configService";
import { IHomePageProps } from "@/core/modules/homepage/types";
import PageContainer from "../layouts/pageContainer";
import { authService, User } from "@/core/shared/services/auth.service";

const HomePage = (props: IHomePageProps) => {
  const { className, categories, featuredProducts, stats } = props;
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = authService.isAuthenticated();
      const userData = authService.getUser();
      setIsAuthenticated(authenticated);
      setUser(userData);
    };

    checkAuthStatus();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      // Use client-side HTTP service to add to cart
      const configService = new ConfigService();
      const httpService = new ClientHttpService(configService);

      await httpService.post({
        path: "/cart/add",
        body: { productId, quantity: 1 },
      });

      setCartItems((prev) => [...prev, productId]);
      console.log("Added to cart:", productId);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Still update local state for demo purposes
      setCartItems((prev) => [...prev, productId]);
    }
  };

  const handleCartClick = () => {
    console.log("Cart clicked, items:", cartItems.length);
    // Navigate to cart page
    window.location.href = "/cart";
  };

  const handleSearch = async (query: string) => {
    console.log("Search:", query);
    // Navigate to search results page with query
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
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
    try {
      // Use client-side HTTP service for newsletter subscription
      const configService = new ConfigService();
      const httpService = new ClientHttpService(configService);

      await httpService.post({
        path: "/newsletter/subscribe",
        body: { email },
      });

      console.log("Newsletter subscription successful:", email);
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      // For demo purposes, simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  return (
    <>
      <PageContainer component="section">
        <HeroSection
          onShopNowClick={handleShopNowClick}
          onBecomeSellerClick={
            !isAuthenticated || (user && user.role !== "SELLER")
              ? handleBecomeSellerClick
              : undefined
          }
        />

        <CategoryGrid
          title="Shop by Category"
          subtitle="Discover thousands of products across our most popular categories"
          categories={categories}
          onViewAll={handleViewAllCategories}
        />

        <ProductGrid
          id="featured-products"
          title="Featured Products"
          subtitle="Hand-picked products from our top sellers"
          products={featuredProducts}
          onAddToCart={handleAddToCart}
          onViewAll={handleViewAllProducts}
        />
      </PageContainer>
      <NewsletterSection onSubscribe={handleNewsletterSubscribe} />
    </>
  );
};

export default HomePage;

import React from "react";
import Typography from "@/components/atoms/typography";
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";

interface IHeroSectionProps {
  className?: string;
  testId?: string;
  onShopNowClick?: () => void;
  onBecomeSellerClick?: () => void;
}

const HeroSection = (props: IHeroSectionProps) => {
  const { className = "", testId, onShopNowClick, onBecomeSellerClick } = props;

  const handleShopNowClick = () => {
    if (onShopNowClick) {
      onShopNowClick();
      return;
    }

    // Default behavior: scroll to featured products
    const featuredSection = document.getElementById("featured-products");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMoreClick = () => {
    if (onBecomeSellerClick) {
      onBecomeSellerClick();
      return;
    }

    // Default behavior: navigate to sellers page
    window.location.href = "/sellers";
  };

  const renderStats = () => {
    const stats = [
      { value: "10K+", label: "Products" },
      { value: "500+", label: "Sellers" },
      { value: "50K+", label: "Happy Customers" },
    ];

    return (
      <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-8 pt-8 border-t border-blue-400">
        {stats.map((stat, index) => (
          <div key={index} className="text-center lg:text-left">
            <Typography
              variant="h2"
              component="div"
              className="text-yellow-300 font-bold"
            >
              {stat.value}
            </Typography>
            <Typography variant="caption" className="text-blue-100">
              {stat.label}
            </Typography>
          </div>
        ))}
      </div>
    );
  };

  const renderHeroIllustration = () => {
    return (
      <div className="flex-1 lg:flex-shrink-0 max-w-lg">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>

          {/* Main hero illustration */}
          <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-4">
              {/* Sample product cards in hero */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-4 shadow-lg ${
                    index === 1 ? "mt-4" : index === 2 ? "-mt-4" : ""
                  }`}
                >
                  <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden ${className}`}
      data-testid={testId || "hero-section"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left lg:pr-12 mb-8 lg:mb-0">
            <Typography
              variant="h1"
              component="h1"
              className="text-white mb-4 leading-tight"
            >
              Discover Amazing Products from
              <span className="block text-yellow-300">Trusted Sellers</span>
            </Typography>

            <Typography
              variant="body"
              className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto lg:mx-0"
            >
              Shop from thousands of quality products across multiple
              categories. Find the best deals from verified sellers with secure
              payments and fast delivery.
            </Typography>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={handleShopNowClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
                testId="hero-shop-now"
              >
                Shop Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleLearnMoreClick}
                className="border-white text-white hover:bg-white hover:text-blue-600"
                testId="hero-learn-more"
              >
                Become a Seller
              </Button>
            </div>

            {renderStats()}
          </div>

          {/* Right Content - Hero Image */}
          {renderHeroIllustration()}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <Icon
            name="chevron-down"
            size="lg"
            className="text-white opacity-70"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

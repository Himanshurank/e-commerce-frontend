import React, { useState } from "react";
import Button from "@/components/atoms/button";
import {
  HERO_STATS,
  HERO_CONTENT,
  HERO_VALUE_PROPS,
} from "@/core/modules/homepage/constants";

interface IHeroSectionProps {
  className?: string;
  testId?: string;
  onShopNowClick?: () => void;
  onBecomeSellerClick?: () => void;
  onSearch?: (query: string) => void;
}

const HeroSection = (props: IHeroSectionProps) => {
  const {
    className = "",
    testId,
    onShopNowClick,
    onBecomeSellerClick,
    onSearch,
  } = props;

  const [searchQuery, setSearchQuery] = useState("");

  // Helper Functions
  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    } else if (onShopNowClick) {
      onShopNowClick();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Icon Components
  const renderIcon = (iconType: string, className: string = "w-6 h-6") => {
    const iconMap = {
      star: (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      package: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      building: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      globe: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      world: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      shield: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      lightning: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      users: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      search: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      sparkles: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    };
    return iconMap[iconType as keyof typeof iconMap] || null;
  };

  // Render Methods
  const renderFloatingElements = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-brand-400 to-brand-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full opacity-15 animate-float delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-r from-brand-300 to-brand-400 rounded-full opacity-20 animate-float delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-gradient-to-r from-accent-300 to-accent-400 rounded-full opacity-25 animate-float delay-3000"></div>
      </div>
    );
  };

  const renderBadge = () => {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-50 to-accent-50 rounded-full border border-brand-200/50 backdrop-blur-sm">
        <div className="p-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full">
          {renderIcon(HERO_CONTENT.BADGE.iconType, "w-4 h-4 text-white")}
        </div>
        <span className="text-brand-700 text-sm font-semibold">
          {HERO_CONTENT.BADGE.text}
        </span>
      </div>
    );
  };

  const renderHeading = () => {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
          <span className="block text-neutral-900 mb-2">
            {HERO_CONTENT.HEADING.main}
          </span>
          <span className="block bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
            {HERO_CONTENT.HEADING.highlight}
          </span>
        </h1>
      </div>
    );
  };

  const renderDescription = () => {
    return (
      <p className="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
        {HERO_CONTENT.DESCRIPTION}
      </p>
    );
  };

  const renderSearchBox = () => {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-center bg-white rounded-2xl shadow-brand-lg border border-neutral-200 overflow-hidden">
          <div className="absolute left-4 pointer-events-none">
            {renderIcon("search", "w-6 h-6 text-neutral-400")}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={HERO_CONTENT.SEARCH_PLACEHOLDER}
            className="flex-1 pl-14 pr-4 py-6 text-lg placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Button
            onClick={handleSearch}
            className="m-2 px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 focus:ring-4 focus:ring-brand-200"
            variant="primary"
          >
            <div className="flex items-center gap-2">
              {renderIcon("search", "w-5 h-5")}
              Search
            </div>
          </Button>
        </div>
      </div>
    );
  };

  const renderCTAButtons = () => {
    return (
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button
          onClick={onBecomeSellerClick}
          className="px-8 py-4 bg-white text-brand-600 border-2 border-brand-200 hover:bg-brand-50 font-bold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
          variant="secondary"
        >
          {HERO_CONTENT.CTA_BUTTONS.secondary}
        </Button>
      </div>
    );
  };

  const renderStats = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HERO_STATS.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-neutral-100 to-neutral-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {renderIcon(stat.iconType, `w-8 h-8 ${stat.color}`)}
            </div>
            <div className={`text-4xl font-black ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-neutral-600 font-semibold text-lg">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderValueProps = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {HERO_VALUE_PROPS.map((prop) => (
          <div
            key={prop.id}
            className="group relative p-8 bg-white rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500"
              style={{
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
              }}
            ></div>

            <div
              className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${prop.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              {renderIcon(prop.iconType, "w-8 h-8 text-white")}
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-brand-600 transition-colors">
              {prop.title}
            </h3>

            <p className="text-neutral-600 leading-relaxed">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderHeroContent = () => {
    return (
      <div className="text-center space-y-12 relative z-10">
        {renderBadge()}
        {renderHeading()}
        {renderDescription()}
        {renderSearchBox()}
        {renderCTAButtons()}
        {renderStats()}
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          {renderHeroContent()}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          {renderValueProps()}
        </div>
      </div>
    );
  };

  return (
    <section
      className={`relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 bg-hero-pattern overflow-hidden ${className}`}
      data-testid={testId || "hero-section"}
    >
      {renderFloatingElements()}
      {renderMainContent()}
    </section>
  );
};

export default HeroSection;

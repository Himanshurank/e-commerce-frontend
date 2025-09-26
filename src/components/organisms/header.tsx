import React, { useState } from "react";
import Logo from "@/components/molecules/logo";
import SearchBox from "@/components/molecules/search-box";
import CartIcon from "@/components/molecules/cart-icon";
import NavigationLink from "@/components/molecules/navigation-link";
import Button from "../atoms/button";
import Icon from "../atoms/icon";

interface IHeaderProps {
  className?: string;
  testId?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
}

const Header = (props: IHeaderProps) => {
  const {
    className = "",
    testId,
    cartItemCount = 2,
    onCartClick,
    onSearch,
  } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (query: string) => {
    if (onSearch) {
      onSearch(query);
    }
    console.log("Search query:", query);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderDesktopNavigation = () => {
    return (
      <nav className="hidden md:flex items-center space-x-6">
        <NavigationLink href="/categories">Categories</NavigationLink>
        <NavigationLink href="/deals">Deals</NavigationLink>
        <NavigationLink href="/sellers">Sell on ECommerce</NavigationLink>
      </nav>
    );
  };

  const renderUserActions = () => {
    return (
      <div className="flex items-center space-x-3">
        <CartIcon itemCount={cartItemCount} onClick={onCartClick} />

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Icon name="menu" size="lg" />
        </button>
      </div>
    );
  };

  const renderMobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return (
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="px-4 py-4 space-y-4">
          <NavigationLink href="/categories" className="block">
            Categories
          </NavigationLink>
          <NavigationLink href="/deals" className="block">
            Deals
          </NavigationLink>
          <NavigationLink href="/sellers" className="block">
            Sell on ECommerce
          </NavigationLink>
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
            <Button variant="ghost" size="sm" fullWidth>
              Sign In
            </Button>
            <Button variant="primary" size="sm" fullWidth>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${className}`}
      data-testid={testId || "header"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <div className="flex-1 max-w-lg mx-4">
            <SearchBox
              placeholder="Search products..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearchSubmit}
              fullWidth
              testId="header-search"
            />
          </div>

          {renderDesktopNavigation()}
          {renderUserActions()}
        </div>
      </div>
      {renderMobileMenu()}
    </header>
  );
};

export default Header;

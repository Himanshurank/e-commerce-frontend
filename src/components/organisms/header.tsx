import React, { useState } from "react";
import Logo from "@/components/molecules/logo";
import CartIcon from "@/components/molecules/cart-icon";
import NavigationLink from "@/components/molecules/navigation-link";
import Button from "../atoms/button";
import Icon from "../atoms/icon";

interface IHeaderProps {
  className?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Header = (props: IHeaderProps) => {
  const { className, cartItemCount = 0, onCartClick } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items following Jakob's Law - familiar structure
  const navItems = [
    { href: "/categories", label: "Categories" },
    { href: "/deals", label: "Deals" },
    { href: "/sellers", label: "Sell on ECommerce" },
  ];

  // Desktop Navigation - KISS Principle: Simple and clean
  const renderDesktopNavigation = () => (
    <nav
      className="hidden md:flex items-center space-x-6"
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          className="text-neutral-700 hover:text-brand-600 font-medium transition-colors duration-200"
        >
          {item.label}
        </NavigationLink>
      ))}
    </nav>
  );

  // User Actions - UI Hierarchy: Clear visual importance
  const renderUserActions = () => (
    <div className="flex items-center space-x-3">
      {/* Cart Icon - Affordance: Clear interactive element */}
      <div className="relative">
        <CartIcon
          itemCount={cartItemCount}
          onClick={onCartClick}
          className="p-2 text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
        />
      </div>

      {/* Authentication Buttons - Recognition over Recall */}
      <div className="hidden md:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-neutral-700 hover:text-brand-600 hover:bg-neutral-100"
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium"
        >
          Sign Up
        </Button>
      </div>

      {/* Mobile Menu Button - Fitts's Law: Large touch target */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-3 text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <Icon name="menu" size="lg" />
      </button>
    </div>
  );

  // Mobile Menu - Mobile-First Principle
  const renderMobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return (
      <div
        id="mobile-menu"
        className="md:hidden border-t border-neutral-200 bg-white shadow-lg"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-4 py-4 space-y-3">
          {/* Navigation Links */}
          {navItems.map((item) => (
            <div key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
              <NavigationLink
                href={item.href}
                className="block py-2 text-neutral-700 hover:text-brand-600 font-medium"
              >
                {item.label}
              </NavigationLink>
            </div>
          ))}

          {/* Mobile Authentication - UI Consistency */}
          <div className="flex flex-col space-y-2 pt-4 border-t border-neutral-200">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              className="justify-center text-neutral-700 hover:text-brand-600 hover:bg-neutral-100"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              className="justify-center bg-brand-600 hover:bg-brand-700 text-white font-medium"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className={`bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm ${className}`}
      role="banner"
    >
      {/* Skip to main content - Accessibility First */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white px-4 py-2 rounded-lg z-50 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Main Header Container - UI Consistency: Standard layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Jakob's Law: Top-left positioning */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - UI Hierarchy: Center positioning */}
          <div className="flex-1 flex justify-center">
            {renderDesktopNavigation()}
          </div>

          {/* User Actions - Jakob's Law: Right positioning */}
          {renderUserActions()}
        </div>
      </div>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </header>
  );
};

export default Header;

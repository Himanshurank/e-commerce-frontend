import React, { useState, useEffect } from "react";
import Logo from "@/components/molecules/logo";
import CartIcon from "@/components/molecules/cart-icon";
import NavigationLink from "@/components/molecules/navigation-link";
import SignInModal from "@/components/molecules/sign-in-modal";
import SignUpModal from "@/components/molecules/sign-up-modal";
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import { authService, User } from "@/core/shared/services/auth.service";

interface IProps {
  className?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Header = (props: IProps) => {
  const { className = "", cartItemCount = 0, onCartClick } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  // Helper functions
  const navItems = [
    { href: "/categories", label: "Categories" },
    { href: "/deals", label: "Deals" },
    { href: "/sellers", label: "Sell on ECommerce" },
  ];

  // Event handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignInModalClose = () => {
    setIsSignInModalOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignUpModalClose = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignInSuccess = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleSignUpSuccess = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSwitchToSignUp = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  // Render methods
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

  const renderUserActions = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <CartIcon
          itemCount={cartItemCount}
          onClick={onCartClick}
          className="p-2 text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
        />
      </div>

      <div className="hidden md:flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            <div className="flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700">
              <span>Welcome, {user?.firstName || "User"}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-neutral-700 hover:text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignInClick}
              className="text-neutral-700 hover:text-brand-600 hover:bg-neutral-100"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSignUpClick}
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>

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

          <div className="flex flex-col space-y-2 pt-4 border-t border-neutral-200">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-neutral-700 text-center">
                  Welcome, {user?.firstName || "User"}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-center text-neutral-700 hover:text-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    handleSignInClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-center text-neutral-700 hover:text-brand-600 hover:bg-neutral-100"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    handleSignUpClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-center bg-brand-600 hover:bg-brand-700 text-white font-medium"
                >
                  Sign Up
                </Button>
              </>
            )}
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white px-4 py-2 rounded-lg z-50 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex-1 flex justify-center">
            {renderDesktopNavigation()}
          </div>

          {renderUserActions()}
        </div>
      </div>

      {renderMobileMenu()}

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={handleSignInModalClose}
        onSignInSuccess={handleSignInSuccess}
        onSwitchToSignUp={handleSwitchToSignUp}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleSignUpModalClose}
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/molecules/logo";
import CartIcon from "@/components/molecules/cart-icon";
import NavigationLink from "@/components/molecules/navigation-link";
import SignInModal from "@/components/molecules/sign-in-modal";
import SignUpModal from "@/components/molecules/sign-up-modal";
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import Typography from "@/components/atoms/typography";
import { authService } from "@/core/shared/services/auth.service";
import { User } from "@/core/shared/interfaces/auth";

interface IProps {
  className?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Header = (props: IProps) => {
  const { className, cartItemCount = 0, onCartClick } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDashboardDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest("[data-dashboard-dropdown]")) {
          setIsDashboardDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDashboardDropdownOpen]);

  // Helper functions
  const getNavItems = () => {
    const baseItems = [
      { href: "/categories", label: "Categories" },
      { href: "/deals", label: "Deals" },
    ];

    // Only show "Sell on ECommerce" if user is not logged in or not a seller
    if (!isAuthenticated || (user && user.role !== "seller")) {
      baseItems.push({ href: "/sellers", label: "Sell on ECommerce" });
    }

    return baseItems;
  };

  const getDashboardItems = (userRole: string) => {
    const baseItems = [
      { href: "/dashboard/profile", label: "My Profile", icon: "user" },
      { href: "/dashboard/orders", label: "My Orders", icon: "shopping-bag" },
    ];

    if (userRole === "seller") {
      return [
        ...baseItems,
        { href: "/dashboard/seller", label: "Seller Dashboard", icon: "store" },
        {
          href: "/dashboard/seller/products",
          label: "My Products",
          icon: "package",
        },
        {
          href: "/dashboard/seller/analytics",
          label: "Analytics",
          icon: "chart",
        },
      ];
    }

    if (userRole === "admin") {
      return [
        ...baseItems,
        {
          href: "/dashboard/admin",
          label: "Admin Dashboard",
          icon: "settings",
        },
        {
          href: "/dashboard/admin/users",
          label: "Manage Users",
          icon: "users",
        },
        {
          href: "/dashboard/admin/products",
          label: "Manage Products",
          icon: "package",
        },
      ];
    }

    return baseItems;
  };

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
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setIsAuthenticated(false);
      setUser(null);
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

  const toggleDashboardDropdown = () => {
    setIsDashboardDropdownOpen(!isDashboardDropdownOpen);
  };

  const handleDashboardItemClick = () => {
    setIsDashboardDropdownOpen(false);
  };

  // Render methods
  const renderDashboardDropdown = () => {
    if (!isDashboardDropdownOpen || !user) return null;

    const dashboardItems = getDashboardItems(user.role);

    return (
      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50">
        <div className="px-4 py-2 border-b border-neutral-100">
          <Typography
            variant="caption"
            className="text-neutral-500 uppercase tracking-wide font-medium"
          >
            Dashboard
          </Typography>
        </div>

        {dashboardItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleDashboardItemClick}
            className="flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 transition-colors duration-200"
          >
            <Icon
              name={item.icon as any}
              size="sm"
              className="mr-3 text-neutral-400"
            />
            {item.label}
          </Link>
        ))}

        <div className="border-t border-neutral-100 mt-2 pt-2">
          <button
            onClick={() => {
              handleLogout();
              setIsDashboardDropdownOpen(false);
            }}
            className="flex items-center w-full px-4 py-3 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <Icon name="close" size="sm" className="mr-3 text-neutral-400" />
            Logout
          </button>
        </div>
      </div>
    );
  };

  const renderDesktopNavigation = () => {
    const navItems = getNavItems();

    return (
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
  };

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
          <div className="relative" data-dashboard-dropdown>
            <button
              onClick={toggleDashboardDropdown}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              aria-expanded={isDashboardDropdownOpen}
              aria-haspopup="true"
            >
              <span>Welcome, {user?.firstName || "User"}</span>
              <Icon
                name="chevron-down"
                size="sm"
                className={`transition-transform duration-200 ${isDashboardDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {renderDashboardDropdown()}
          </div>
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

    const navItems = getNavItems();

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

                <div className="px-3 py-2">
                  <Typography
                    variant="caption"
                    className="text-neutral-500 uppercase tracking-wide font-medium mb-2 block"
                  >
                    Dashboard
                  </Typography>

                  {user &&
                    getDashboardItems(user.role).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          handleDashboardItemClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center px-2 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand-600 rounded-lg transition-colors duration-200"
                      >
                        <Icon
                          name={item.icon as any}
                          size="sm"
                          className="mr-3 text-neutral-400"
                        />
                        {item.label}
                      </Link>
                    ))}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-2 py-2 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 mt-2"
                  >
                    <Icon
                      name="close"
                      size="sm"
                      className="mr-3 text-neutral-400"
                    />
                    Logout
                  </button>
                </div>
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

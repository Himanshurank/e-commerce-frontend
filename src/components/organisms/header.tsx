import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/molecules/logo";
import CartIcon from "@/components/molecules/cart-icon";
import NavigationLink from "@/components/molecules/navigation-link";
import Button from "../atoms/button";
import Icon from "../atoms/icon";

interface IHeaderProps {
  className?: string;
  testId?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Header = (props: IHeaderProps) => {
  const { className = "", testId, cartItemCount = 2, onCartClick } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderDesktopNavigation = () => {
    const navVariants = {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    };

    const navItems = [
      { href: "/categories", label: "Categories" },
      { href: "/deals", label: "Deals" },
      { href: "/sellers", label: "Sell on ECommerce" },
    ];

    return (
      <motion.nav
        className="hidden md:flex items-center space-x-2"
        variants={navVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
          >
            <NavigationLink href={item.href}>{item.label}</NavigationLink>
          </motion.div>
        ))}
      </motion.nav>
    );
  };

  const renderUserActions = () => {
    const actionsVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    };

    const buttonVariants = {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    };

    const menuButtonVariants = {
      initial: { rotate: 0 },
      animate: { rotate: isMobileMenuOpen ? 90 : 0 },
    };

    return (
      <motion.div
        className="flex items-center space-x-3"
        variants={actionsVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <CartIcon itemCount={cartItemCount} onClick={onCartClick} />
        </motion.div>

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMobileMenu}
          className="md:hidden p-3 text-neutral-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-brand-200"
          aria-label="Toggle mobile menu"
          variants={menuButtonVariants}
          animate="animate"
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon name="menu" size="lg" />
        </motion.button>
      </motion.div>
    );
  };

  const renderMobileMenu = () => {
    const mobileMenuVariants = {
      initial: { opacity: 0, height: 0 },
      animate: {
        opacity: 1,
        height: "auto",
      },
      exit: {
        opacity: 0,
        height: 0,
      },
    };

    const itemVariants = {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    };

    const navItems = [
      { href: "/categories", label: "Categories" },
      { href: "/deals", label: "Deals" },
      { href: "/sellers", label: "Sell on ECommerce" },
    ];

    return (
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-neutral-200 bg-white shadow-lg overflow-hidden"
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <NavigationLink href={item.href} className="block">
                    {item.label}
                  </NavigationLink>
                </motion.div>
              ))}

              <motion.div
                className="flex flex-col space-y-3 pt-6 border-t border-neutral-200"
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button variant="ghost" size="sm" fullWidth>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  Sign Up
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu background blur effect */}
            <motion.div
              className="absolute inset-0 bg-brand-50 opacity-0 pointer-events-none"
              animate={{ opacity: 0.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.header
      className={`bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50 shadow-sm ${className}`}
      data-testid={testId || "header"}
      variants={headerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between h-20"
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {/* Logo with entrance animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            <Logo />
          </motion.div>

          {/* Navigation */}
          <div className="flex-1 flex justify-center">
            {renderDesktopNavigation()}
          </div>

          {/* User actions */}
          {renderUserActions()}
        </motion.div>
      </div>

      {renderMobileMenu()}

      {/* Header bottom glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent opacity-0"
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.header>
  );
};

export default Header;

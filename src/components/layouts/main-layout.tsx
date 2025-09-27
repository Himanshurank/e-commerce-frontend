import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/header";
import SearchSection from "@/components/organisms/search-section";
import Footer from "@/components/organisms/footer";

interface IMainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  className?: string;
  testId?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
  showFooter?: boolean;
  loading?: boolean;
  error?: string;
}

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
    title = "ECommerce - Your Trusted B2B Marketplace",
    description = "Leading B2B ecommerce platform for global trade. Discover quality products from verified suppliers with secure payments and reliable delivery.",
    keywords = "B2B marketplace, wholesale, suppliers, global trade, ecommerce, business solutions",
    className = "",
    testId,
    cartItemCount,
    onCartClick,
    onSearch,
    onFilter,
    showFooter = true,
    loading = false,
    error,
  } = props;

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render loading state with Framer Motion
  const renderLoadingState = () => (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-neutral-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col items-center space-y-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      >
        {/* Animated loading spinner */}
        <motion.div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-brand-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-brand-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Pulsing text */}
        <motion.p
          className="text-neutral-700 font-semibold text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading your experience...
        </motion.p>

        {/* Loading dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-brand-600 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Render error state with Framer Motion
  const renderErrorState = () => (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-neutral-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="max-w-md mx-auto text-center p-8"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      >
        {/* Animated error icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <motion.svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </motion.svg>
        </motion.div>

        {/* Error message */}
        <motion.h2
          className="text-2xl font-bold text-neutral-900 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Oops! Something went wrong
        </motion.h2>

        <motion.p
          className="text-neutral-600 mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {error || "We encountered an unexpected error. Please try again."}
        </motion.p>

        {/* Retry button */}
        <motion.button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-200 transition-colors duration-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    </motion.div>
  );

  // Skip to main content link for accessibility with animation
  const renderSkipLink = () => (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white px-6 py-3 rounded-xl z-50 font-semibold shadow-lg focus:ring-4 focus:ring-brand-200"
      initial={{ opacity: 0, y: -20 }}
      whileFocus={{
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Skip to main content
    </motion.a>
  );

  // Handle loading and error states
  if (loading) return renderLoadingState();
  if (error) return renderErrorState();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#6b21a8" />
        <meta name="msapplication-TileColor" content="#6b21a8" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>

      {renderSkipLink()}

      <motion.div
        className={`min-h-screen bg-neutral-50 flex flex-col antialiased ${className}`}
        data-testid={testId || "main-layout"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with proper semantic structure and entrance animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <Header cartItemCount={cartItemCount} onCartClick={onCartClick} />
        </motion.div>

        {/* Search Section below navbar */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            type: "spring",
            stiffness: 100,
          }}
        >
          <SearchSection onSearch={onSearch} onFilter={onFilter} />
        </motion.div>

        {/* Main content area with proper landmark and stagger animation */}
        <motion.main
          id="main-content"
          className="flex-1 focus:outline-none"
          role="main"
          aria-label="Main content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="relative">{children}</div>
        </motion.main>

        {/* Footer with conditional rendering and entrance animation */}
        <AnimatePresence>
          {showFooter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to top button with show/hide animation */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 p-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-200 z-40"
              aria-label="Back to top"
              title="Back to top"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ y: 2 }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </motion.svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Subtle page transition overlay */}
        <motion.div
          className="fixed inset-0 bg-brand-600 pointer-events-none z-50"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </>
  );
};

export default MainLayout;

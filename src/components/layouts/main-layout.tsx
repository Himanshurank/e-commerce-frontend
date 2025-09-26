import React from "react";
import Head from "next/head";
import Header from "@/components/organisms/header";
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
    showFooter = true,
    loading = false,
    error,
  } = props;

  // Render loading state
  const renderLoadingState = () => (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        <p className="text-neutral-600 font-medium">Loading...</p>
      </div>
    </div>
  );

  // Render error state
  const renderErrorState = () => (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-neutral-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Skip to main content link for accessibility
  const renderSkipLink = () => (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white px-4 py-2 rounded-lg z-50 transition-all duration-200"
    >
      Skip to main content
    </a>
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
        <meta name="theme-color" content="#9333ea" />
        <meta name="msapplication-TileColor" content="#9333ea" />
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

      <div
        className={`min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50 flex flex-col antialiased ${className}`}
        data-testid={testId || "main-layout"}
      >
        {/* Header with proper semantic structure */}
        <Header
          cartItemCount={cartItemCount}
          onCartClick={onCartClick}
          onSearch={onSearch}
        />

        {/* Main content area with proper landmark */}
        <main
          id="main-content"
          className="flex-1 focus:outline-none"
          role="main"
          aria-label="Main content"
        >
          <div className="relative">{children}</div>
        </main>

        {/* Footer with conditional rendering */}
        {showFooter && <Footer />}

        {/* Back to top button for long pages */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-200 z-40"
          aria-label="Back to top"
          title="Back to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default MainLayout;

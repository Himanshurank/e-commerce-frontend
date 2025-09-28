import React from "react";
import Link from "next/link";
import Button from "@/components/atoms/button";
import Typography from "@/components/atoms/typography";
import Icon from "@/components/atoms/icon";

const NotFoundPage = () => {
  // Event handlers
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Render methods
  const renderErrorIcon = () => (
    <div className="flex justify-center mb-8">
      <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center">
        <Icon name="search" size="xl" className="text-neutral-400" />
      </div>
    </div>
  );

  const renderErrorContent = () => (
    <div className="text-center max-w-md mx-auto">
      <Typography
        variant="h1"
        className="text-6xl font-bold text-neutral-900 mb-4"
      >
        404
      </Typography>

      <Typography
        variant="h2"
        className="text-2xl font-semibold text-neutral-800 mb-4"
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body"
        className="text-neutral-600 mb-8 leading-relaxed"
      >
        Sorry, we couldn't find the page you're looking for. The page might have
        been moved, deleted, or you entered the wrong URL.
      </Typography>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        variant="primary"
        size="lg"
        onClick={handleGoHome}
        className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3 rounded-xl"
      >
        Go to Homepage
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={handleGoBack}
        className="text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 px-8 py-3 rounded-xl"
      >
        Go Back
      </Button>
    </div>
  );

  const renderHelpfulLinks = () => (
    <div className="mt-12 pt-8 border-t border-neutral-200">
      <Typography variant="body" className="text-center text-neutral-600 mb-6">
        Or try these popular pages:
      </Typography>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/categories"
          className="text-brand-600 hover:text-brand-700 hover:underline font-medium"
        >
          Categories
        </Link>

        <Link
          href="/deals"
          className="text-brand-600 hover:text-brand-700 hover:underline font-medium"
        >
          Deals
        </Link>

        <Link
          href="/sellers"
          className="text-brand-600 hover:text-brand-700 hover:underline font-medium"
        >
          Become a Seller
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {renderErrorIcon()}
        {renderErrorContent()}
        {renderActionButtons()}
        {renderHelpfulLinks()}
      </div>
    </div>
  );
};

export default NotFoundPage;

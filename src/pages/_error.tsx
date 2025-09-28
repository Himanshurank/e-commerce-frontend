import React from "react";
import { NextPageContext } from "next";
import Link from "next/link";
import Button from "@/components/atoms/button";
import Typography from "@/components/atoms/typography";
import Icon from "@/components/atoms/icon";

interface IProps {
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

const ErrorPage = (props: IProps) => {
  const { statusCode } = props;

  // Helper functions
  const getErrorConfig = (code: number) => {
    switch (code) {
      case 404:
        return {
          title: "404",
          heading: "Page Not Found",
          message:
            "Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered the wrong URL.",
          iconName: "search" as const,
          iconBg: "bg-neutral-100",
          iconColor: "text-neutral-400",
        };
      case 500:
        return {
          title: "500",
          heading: "Server Error",
          message:
            "Something went wrong on our end. We're working to fix this issue. Please try refreshing the page or come back later.",
          iconName: "close" as const,
          iconBg: "bg-red-100",
          iconColor: "text-red-500",
        };
      default:
        return {
          title: code.toString(),
          heading: "Something went wrong",
          message:
            "An unexpected error occurred. Please try again or contact support if the problem persists.",
          iconName: "close" as const,
          iconBg: "bg-neutral-100",
          iconColor: "text-neutral-400",
        };
    }
  };

  // Event handlers
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Render methods
  const renderErrorIcon = () => {
    const config = getErrorConfig(statusCode);

    return (
      <div className="flex justify-center mb-8">
        <div
          className={`w-32 h-32 ${config.iconBg} rounded-full flex items-center justify-center`}
        >
          <Icon name={config.iconName} size="xl" className={config.iconColor} />
        </div>
      </div>
    );
  };

  const renderErrorContent = () => {
    const config = getErrorConfig(statusCode);

    return (
      <div className="text-center max-w-md mx-auto">
        <Typography
          variant="h1"
          className="text-6xl font-bold text-neutral-900 mb-4"
        >
          {config.title}
        </Typography>

        <Typography
          variant="h2"
          className="text-2xl font-semibold text-neutral-800 mb-4"
        >
          {config.heading}
        </Typography>

        <Typography
          variant="body"
          className="text-neutral-600 mb-8 leading-relaxed"
        >
          {config.message}
        </Typography>
      </div>
    );
  };

  const renderActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {statusCode === 500 ? (
        <Button
          variant="primary"
          size="lg"
          onClick={handleRefresh}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3 rounded-xl"
        >
          Try Again
        </Button>
      ) : (
        <Button
          variant="primary"
          size="lg"
          onClick={handleGoHome}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3 rounded-xl"
        >
          Go to Homepage
        </Button>
      )}

      <Button
        variant="ghost"
        size="lg"
        onClick={statusCode === 500 ? handleGoHome : handleGoBack}
        className="text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 px-8 py-3 rounded-xl"
      >
        {statusCode === 500 ? "Go to Homepage" : "Go Back"}
      </Button>
    </div>
  );

  const renderHelpfulLinks = () => {
    if (statusCode !== 404) return null;

    return (
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <Typography
          variant="body"
          className="text-center text-neutral-600 mb-6"
        >
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
  };

  const renderErrorDetails = () => {
    if (statusCode !== 500) return null;

    return (
      <div className="mt-8 p-4 bg-neutral-100 rounded-lg">
        <Typography
          variant="caption"
          className="text-neutral-500 text-center block"
        >
          Error ID: {Date.now().toString(36).toUpperCase()}
        </Typography>

        <Typography
          variant="caption"
          className="text-neutral-500 text-center block mt-1"
        >
          Time: {new Date().toLocaleString()}
        </Typography>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {renderErrorIcon()}
        {renderErrorContent()}
        {renderActionButtons()}
        {renderErrorDetails()}
        {renderHelpfulLinks()}
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;

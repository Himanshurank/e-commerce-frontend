import React from "react";
import Link from "next/link";
import Button from "@/components/atoms/button";
import Typography from "@/components/atoms/typography";
import Icon from "@/components/atoms/icon";

const ServerErrorPage = () => {
  // Event handlers
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleReportIssue = () => {
    // TODO: Implement issue reporting functionality
    console.log("Report issue clicked");
  };

  // Render methods
  const renderErrorIcon = () => (
    <div className="flex justify-center mb-8">
      <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
        <Icon name="close" size="xl" className="text-red-500" />
      </div>
    </div>
  );

  const renderErrorContent = () => (
    <div className="text-center max-w-md mx-auto">
      <Typography
        variant="h1"
        className="text-6xl font-bold text-neutral-900 mb-4"
      >
        500
      </Typography>

      <Typography
        variant="h2"
        className="text-2xl font-semibold text-neutral-800 mb-4"
      >
        Server Error
      </Typography>

      <Typography
        variant="body"
        className="text-neutral-600 mb-8 leading-relaxed"
      >
        Something went wrong on our end. We're working to fix this issue. Please
        try refreshing the page or come back later.
      </Typography>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        variant="primary"
        size="lg"
        onClick={handleRefresh}
        className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3 rounded-xl"
      >
        Try Again
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={handleGoHome}
        className="text-neutral-700 hover:text-brand-600 hover:bg-neutral-100 px-8 py-3 rounded-xl"
      >
        Go to Homepage
      </Button>
    </div>
  );

  const renderSupportSection = () => (
    <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
      <Typography variant="body" className="text-neutral-600 mb-4">
        If the problem persists, please contact our support team.
      </Typography>

      <Button
        variant="outline"
        size="sm"
        onClick={handleReportIssue}
        className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-6 py-2 rounded-lg"
      >
        Report Issue
      </Button>
    </div>
  );

  const renderErrorDetails = () => (
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

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {renderErrorIcon()}
        {renderErrorContent()}
        {renderActionButtons()}
        {renderErrorDetails()}
        {renderSupportSection()}
      </div>
    </div>
  );
};

export default ServerErrorPage;

import React from "react";
import Link from "next/link";
import Typography from "@/components/atoms/typography";

interface ILogoProps {
  className?: string;
  testId?: string;
  showText?: boolean;
}

const Logo = (props: ILogoProps) => {
  const { className = "", testId, showText = true } = props;

  return (
    <Link
      href="/"
      className={`group flex items-center transition-all duration-300 hover:scale-105 ${className}`}
      data-testid={testId || "logo"}
      aria-label="ECommerce - Go to homepage"
    >
      {/* Modern logo icon with gradient */}
      <div className="relative w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Typography
          variant="body"
          className="relative text-white font-black text-lg"
        >
          E
        </Typography>
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl opacity-60"></div>
      </div>

      {showText && (
        <div className="hidden sm:block">
          <Typography
            variant="h3"
            component="span"
            className="text-neutral-900 font-black tracking-tight group-hover:text-brand-600 transition-colors duration-300"
          >
            ECommerce
          </Typography>
          <div className="text-xs text-neutral-500 font-medium -mt-1">
            B2B Platform
          </div>
        </div>
      )}
    </Link>
  );
};

export default Logo;

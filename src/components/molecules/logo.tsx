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
      className={`flex items-center ${className}`}
      data-testid={testId || "logo"}
    >
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
        <Typography variant="body" className="text-white font-bold">
          E
        </Typography>
      </div>
      {showText && (
        <Typography variant="h3" component="span" className="hidden sm:block">
          ECommerce
        </Typography>
      )}
    </Link>
  );
};

export default Logo;

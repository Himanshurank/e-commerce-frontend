import React from "react";
import Link from "next/link";
import Typography from "@/components/atoms/typography";

interface INavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  testId?: string;
  active?: boolean;
}

const NavigationLink = (props: INavigationLinkProps) => {
  const { href, children, className = "", testId, active = false } = props;

  const baseClasses =
    "relative px-4 py-2 text-neutral-700 hover:text-brand-600 transition-all duration-300 font-medium rounded-lg hover:bg-brand-50 group";
  const activeClasses = active
    ? "text-brand-600 bg-brand-50 font-semibold"
    : "";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${activeClasses} ${className}`}
      data-testid={testId || "navigation-link"}
    >
      <Typography variant="body" component="span" className="relative z-10">
        {children}
      </Typography>

      {/* Active indicator */}
      {active && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-brand-600 rounded-full"></div>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-brand-100 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    </Link>
  );
};

export default NavigationLink;

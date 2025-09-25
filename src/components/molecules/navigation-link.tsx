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

  const baseClasses = "text-gray-700 hover:text-blue-600 transition-colors";
  const activeClasses = active ? "text-blue-600 font-semibold" : "";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${activeClasses} ${className}`}
      data-testid={testId || "navigation-link"}
    >
      <Typography variant="body" component="span">
        {children}
      </Typography>
    </Link>
  );
};

export default NavigationLink;

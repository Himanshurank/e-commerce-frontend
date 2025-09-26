import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
  testId?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const Card = (props: ICardProps) => {
  const {
    children,
    className = "",
    testId,
    onClick,
    hover = false,
    padding = "md",
  } = props;

  const getPaddingClasses = (padding: string): string => {
    const paddings = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };
    return paddings[padding as keyof typeof paddings] || paddings.md;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.stopPropagation();
      onClick(event);
    }
  };

  const baseClasses =
    "bg-white rounded-2xl border border-neutral-200 shadow-lg";
  const hoverClasses = hover
    ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    : "";
  const paddingClasses = getPaddingClasses(padding);
  const interactiveClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${interactiveClasses} ${className}`}
      onClick={handleClick}
      data-testid={testId || "card"}
    >
      {children}
    </div>
  );
};

export default Card;

import React from "react";

interface IIconProps {
  name: 
    | "search" 
    | "cart" 
    | "menu" 
    | "close" 
    | "star" 
    | "star-half" 
    | "star-empty" 
    | "chevron-down" 
    | "chevron-up" 
    | "heart"
    | "user"
    | "plus"
    | "minus";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  testId?: string;
}

const Icon = (props: IIconProps) => {
  const { name, size = "md", className = "", testId } = props;

  const getSizeClasses = (size: string): string => {
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    };
    return sizes[size as keyof typeof sizes] || sizes.md;
  };

  const renderIcon = () => {
    const sizeClasses = getSizeClasses(size);
    const baseProps = {
      className: `${sizeClasses} ${className}`,
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      "data-testid": testId || `icon-${name}`,
    };

    switch (name) {
      case "search":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );

      case "cart":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
            />
          </svg>
        );

      case "menu":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        );

      case "close":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );

      case "star":
        return (
          <svg {...baseProps} fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );

      case "star-empty":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );

      case "heart":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );

      case "user":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );

      case "plus":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );

      case "minus":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        );

      case "chevron-down":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        );

      case "chevron-up":
        return (
          <svg {...baseProps}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        );

      default:
        return (
          <svg {...baseProps}>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        );
    }
  };

  return renderIcon();
};

export default Icon;

import React from "react";

interface IButtonProps {
  variant: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  testId?: string;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = (props: IButtonProps) => {
  const {
    variant,
    size = "md",
    children,
    onClick,
    disabled = false,
    type = "button",
    className = "",
    testId,
    fullWidth = false,
    loading = false,
  } = props;

  const getVariantClasses = (variant: string): string => {
    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500",
      secondary:
        "bg-gray-600 hover:bg-gray-700 text-white border-transparent focus:ring-gray-500",
      outline:
        "bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600 focus:ring-blue-500",
      ghost:
        "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent focus:ring-gray-500",
    };
    return variants[variant as keyof typeof variants] || variants.primary;
  };

  const getSizeClasses = (size: string): string => {
    const sizes = {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-4 py-2 text-base h-10 md:h-10",
      lg: "px-6 py-3 text-lg h-12",
    };
    return sizes[size as keyof typeof sizes] || sizes.md;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
      data-testid={testId || `button-${variant}`}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

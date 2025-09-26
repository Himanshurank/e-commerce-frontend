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
        "bg-brand-600 hover:bg-brand-700 text-white border-transparent focus:ring-brand-200 shadow-lg hover:shadow-xl",
      secondary:
        "bg-white hover:bg-neutral-50 text-brand-600 border-2 border-brand-200 hover:border-brand-300 focus:ring-brand-200 shadow-md hover:shadow-lg",
      outline:
        "bg-transparent hover:bg-brand-50 text-brand-600 border-2 border-brand-300 hover:border-brand-400 focus:ring-brand-200",
      ghost:
        "bg-transparent hover:bg-neutral-100 text-neutral-700 border-transparent focus:ring-neutral-200",
    };
    return variants[variant as keyof typeof variants] || variants.primary;
  };

  const getSizeClasses = (size: string): string => {
    const sizes = {
      sm: "px-4 py-2 text-sm h-9 rounded-lg",
      md: "px-6 py-3 text-base h-11 rounded-xl",
      lg: "px-8 py-4 text-lg h-14 rounded-xl",
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

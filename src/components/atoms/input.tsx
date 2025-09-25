import React, { useState } from "react";

interface IInputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  testId?: string;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = (props: IInputProps) => {
  const {
    type = "text",
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    required = false,
    className = "",
    testId,
    label,
    error,
    icon,
    fullWidth = false,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const renderLabel = () => {
    if (!label) return null;

    return (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <p className="mt-1 text-sm text-red-600" data-testid={`${testId}-error`}>
        {error}
      </p>
    );
  };

  const baseClasses =
    "block px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-150";
  const sizeClasses = "h-10 text-base";
  const stateClasses = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
    : isFocused
    ? "border-blue-500 focus:border-blue-500 focus:ring-blue-500"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  const disabledClasses = disabled
    ? "bg-gray-50 cursor-not-allowed"
    : "bg-white";
  const widthClasses = fullWidth ? "w-full" : "";
  const iconPadding = icon ? "pl-10" : "";

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {renderLabel()}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{icon}</div>
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className={`${baseClasses} ${sizeClasses} ${stateClasses} ${disabledClasses} ${widthClasses} ${iconPadding} ${className}`}
          data-testid={testId || "input"}
        />
      </div>
      {renderError()}
    </div>
  );
};

export default Input;

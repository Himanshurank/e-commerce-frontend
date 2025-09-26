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
      <label className="block text-sm font-semibold text-neutral-700 mb-2">
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
    "block px-4 py-3 border rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200";
  const sizeClasses = "h-12 text-base";
  const stateClasses = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
    : isFocused
      ? "border-brand-400 focus:border-brand-500 focus:ring-brand-200"
      : "border-neutral-300 focus:border-brand-500 focus:ring-brand-200";
  const disabledClasses = disabled
    ? "bg-neutral-50 cursor-not-allowed"
    : "bg-white";
  const widthClasses = fullWidth ? "w-full" : "";
  const iconPadding = icon ? "pl-10" : "";

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {renderLabel()}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="text-neutral-400">{icon}</div>
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

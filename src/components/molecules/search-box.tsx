import React, { useState } from "react";
import Input from "@/components/atoms/input";
import Icon from "@/components/atoms/icon";

interface ISearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  testId?: string;
  fullWidth?: boolean;
}

const SearchBox = (props: ISearchBoxProps) => {
  const {
    placeholder = "Search products, suppliers, categories...",
    value: controlledValue,
    onChange,
    onSubmit,
    className = "",
    testId,
    fullWidth = false,
  } = props;

  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit && value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative group ${className}`}
      role="search"
      aria-label="Product search"
    >
      <div
        className={`relative transition-all duration-300 ${isFocused ? "transform scale-[1.02]" : ""}`}
      >
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          fullWidth={fullWidth}
          icon={
            <Icon
              name="search"
              size="sm"
              className={`transition-colors duration-300 ${isFocused ? "text-brand-500" : "text-neutral-400"}`}
            />
          }
          className="pr-12"
          testId={testId || "search-box"}
        />

        {/* Search button */}
        {value && (
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-200"
            aria-label="Search"
          >
            <Icon name="search" size="sm" />
          </button>
        )}
      </div>

      {/* Search suggestions placeholder for future enhancement */}
      {isFocused && value && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 opacity-0 pointer-events-none">
          {/* Future: Add search suggestions here */}
        </div>
      )}
    </form>
  );
};

export default SearchBox;

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
    placeholder = "Search...",
    value: controlledValue,
    onChange,
    onSubmit,
    className = "",
    testId,
    fullWidth = false,
  } = props;

  const [internalValue, setInternalValue] = useState("");
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
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        fullWidth={fullWidth}
        icon={<Icon name="search" size="sm" />}
        testId={testId || "search-box"}
      />
    </form>
  );
};

export default SearchBox;

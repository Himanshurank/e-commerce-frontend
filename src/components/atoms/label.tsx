import React from "react";

interface ILabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  testId?: string;
}

const Label = (props: ILabelProps) => {
  const { children, htmlFor, required = false, className = "", testId } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-semibold text-neutral-700 mb-2 ${className}`}
      data-testid={testId || "label"}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;

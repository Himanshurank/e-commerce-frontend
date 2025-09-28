import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
  component?: React.ElementType;
}

const PageContainer = ({
  children,
  className,
  component: Component = "div",
}: IProps) => {
  return <Component className={className}>{children}</Component>;
};

export default PageContainer;

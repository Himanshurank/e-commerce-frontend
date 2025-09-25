import React from "react";
import NextImage from "next/image";

interface IImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  testId?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const Image = (props: IImageProps) => {
  const {
    src,
    alt,
    width,
    height,
    fill = false,
    className = "",
    testId,
    priority = false,
    placeholder,
    sizes,
    objectFit = "cover",
  } = props;

  const imageProps = {
    src,
    alt,
    className: `${objectFit === "cover" ? "object-cover" : `object-${objectFit}`} ${className}`,
    "data-testid": testId || "image",
    priority,
    placeholder,
    sizes,
    ...(fill ? { fill: true } : { width, height }),
  };

  return <NextImage {...imageProps} />;
};

export default Image;

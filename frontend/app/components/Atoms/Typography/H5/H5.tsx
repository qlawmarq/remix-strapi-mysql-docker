import type { HTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
export const H5: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h5
      {...props}
      className={twMerge(
        "font-heading text-lg font-medium text-gray-700 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </h5>
  );
};

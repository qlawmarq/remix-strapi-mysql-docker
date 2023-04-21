import type { HTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
export const H2: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h2
      {...props}
      className={twMerge(
        "font-heading text-3xl font-medium text-gray-700 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </h2>
  );
};

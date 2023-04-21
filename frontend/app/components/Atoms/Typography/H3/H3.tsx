import type { HTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
export const H3: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h3
      {...props}
      className={twMerge(
        "font-heading text-2xl font-medium text-gray-700 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </h3>
  );
};

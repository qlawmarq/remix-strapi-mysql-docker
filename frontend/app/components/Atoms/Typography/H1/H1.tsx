import type { HTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

export const H1: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  ...props
}) => {
  return (
    <h1
      {...props}
      className={twMerge(
        "font-heading text-4xl font-medium text-gray-700 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </h1>
  );
};

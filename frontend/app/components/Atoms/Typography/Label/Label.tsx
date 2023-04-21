import type { HtmlHTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
export const Label: React.FC<HtmlHTMLAttributes<HTMLLabelElement>> = ({
  ...props
}) => {
  return (
    <label
      {...props}
      className={twMerge(
        "font-default text-sm text-gray-700 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </label>
  );
};

import type { HtmlHTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
export const Span: React.FC<HtmlHTMLAttributes<HTMLSpanElement>> = ({
  ...props
}) => {
  return (
    <span
      {...props}
      className={twMerge(
        "font-default text-sm text-gray-600 dark:text-gray-400",
        props.className
      )}
    >
      {props.children}
    </span>
  );
};

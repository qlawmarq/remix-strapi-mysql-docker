import type { HtmlHTMLAttributes } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
export const Paragraph: React.FC<HtmlHTMLAttributes<HTMLParagraphElement>> = ({
  ...props
}) => {
  return (
    <p
      {...props}
      className={twMerge(
        "font-default text-base text-gray-700 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </p>
  );
};

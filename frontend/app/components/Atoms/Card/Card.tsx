import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Card: React.FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <div
      {...props}
      className={twMerge(
        "overflow-hidden rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 dark:bg-gray-900 md:px-5 md:py-4 lg:px-7 lg:py-5",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

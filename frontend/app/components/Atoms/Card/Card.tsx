import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Card: React.FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <div
      {...props}
      className={twMerge(
        "rounded-xl bg-white drop-shadow dark:bg-gray-900",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

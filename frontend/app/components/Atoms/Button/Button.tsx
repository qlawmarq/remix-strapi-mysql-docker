import type { ButtonHTMLAttributes } from "react";
import React from "react";
import { Loader } from "react-feather";

type Props = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & Props
> = ({ variant = "primary", size = "md", className, children, ...props }) => {
  const baseClassName = `${className} rounded-3xl whitespace-nowrap font-default focus:outline-none transition duration-300 ease-in-out `;
  const primaryClassName = `${baseClassName} text-primary-100 bg-primary-500 dark:text-primary-100 dark:bg-primary-500 hover:bg-primary-400 dark:hover:bg-primary-600 `;
  const secondaryClassName = `${baseClassName} text-gray-700 bg-gray-300 dark:text-gray-100 dark:bg-gray-400 hover:bg-gray-50 dark:hover:bg-gray-50 `;
  const smClassName = `py-2 px-3.5 text-sm font-light `;
  const mdClassName = `py-2.5 px-4 text-md font-normal `;
  const lgClassName = `py-3 px-6 text-lg font-medium `;
  const disabledClassName = `opacity-30 `;

  let buttonClassName = "";
  switch (variant) {
    case "primary":
      buttonClassName = primaryClassName;
      break;
    case "secondary":
      buttonClassName = secondaryClassName;
      break;
    default:
      break;
  }

  switch (size) {
    case "sm":
      buttonClassName += smClassName;
      break;
    case "md":
      buttonClassName += mdClassName;
      break;
    case "lg":
      buttonClassName += lgClassName;
      break;
    default:
      break;
  }

  if (props?.disabled) {
    buttonClassName += disabledClassName;
  }

  return (
    <button
      {...props}
      className={buttonClassName}
      disabled={props.disabled || props.isLoading}
    >
      {props.isLoading ? (
        <div className="flex items-center">
          <Loader />
          &nbsp;
        </div>
      ) : (
        children
      )}
    </button>
  );
};

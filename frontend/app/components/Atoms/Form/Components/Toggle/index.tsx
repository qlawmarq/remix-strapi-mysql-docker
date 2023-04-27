import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { HorizontalBase, BaseProps } from "../../Base/HorizontalBase";

interface IFToggle {
  onChange: (v: boolean) => void;
}

const Component: React.FC<InputHTMLAttributes<HTMLInputElement> & IFToggle> = (
  props
) => {
  let toggleClassName =
    "block w-8 rounded-full p-px after:block after:h-4 after:w-4 after:rounded-full after:drop-shadow after:transition peer-checked:bg-primary-500 peer-checked:after:translate-x-[calc(100%-2px)] ";
  toggleClassName = props.disabled
    ? twMerge(
        toggleClassName,
        "bg-gray-300 after:bg-gray-200 cursor-not-allowed "
      )
    : twMerge(toggleClassName, "bg-gray-300 after:bg-gray-50 cursor-pointer ");
  return (
    <div className={props.className}>
      <input
        {...props}
        type="checkbox"
        checked={props.checked}
        className="peer sr-only hidden"
      >
        {props.children}
      </input>
      <span
        onClick={() => {
          if (!props.disabled) {
            props?.onChange ? props?.onChange(!props.checked) : null;
          }
        }}
        className={toggleClassName}
      />
    </div>
  );
};

export const Toggle: React.FC<
  BaseProps & InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  return (
    <HorizontalBase {...props}>
      <Component {...props} />
    </HorizontalBase>
  );
};

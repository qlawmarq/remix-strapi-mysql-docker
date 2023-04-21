import React, { InputHTMLAttributes } from "react";
import { VerticalBase, BaseProps } from "../../Base/VerticalBase";
import { commonInputClassName, commonInputErrorClassName } from "../../common";

type InputCustomProps = {
  iconleft?: React.ReactNode;
  iconright?: React.ReactNode;
};

const Component: React.FC<
  InputHTMLAttributes<HTMLInputElement> & InputCustomProps & BaseProps
> = (props) => {
  let inputClassName = `${commonInputClassName} `;
  inputClassName = props.disabled
    ? inputClassName +
      "bg-gray-50 text-gray-600 dark:text-gray-400  cursor-not-allowed "
    : inputClassName;
  inputClassName = props?.iconleft
    ? inputClassName + "pl-10 "
    : props?.iconright
    ? inputClassName + "pr-10 "
    : inputClassName;
  inputClassName = props?.error
    ? inputClassName + commonInputErrorClassName
    : inputClassName;
  return (
    <div className="relative">
      {props?.iconleft && (
        <div className="absolute left-3.5 top-3.5  h-3.5 w-3.5 text-gray-600 dark:text-gray-400">
          {props.iconleft}
        </div>
      )}
      <input {...props} className={inputClassName}>
        {props.children}
      </input>
      {props?.iconright && (
        <div className="absolute right-3.5 top-3.5  h-3.5 w-3.5 text-gray-600 dark:text-gray-400">
          {props.iconright}
        </div>
      )}
    </div>
  );
};

export const Input: React.FC<
  InputCustomProps & BaseProps & InputHTMLAttributes<HTMLInputElement>
> = ({ iconleft, iconright, ...props }) => {
  return (
    <VerticalBase {...props}>
      <Component {...props} iconleft={iconleft} iconright={iconright} />
    </VerticalBase>
  );
};

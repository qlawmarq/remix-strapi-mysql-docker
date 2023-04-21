import React, { InputHTMLAttributes } from "react";
import { VerticalBase, BaseProps } from "../../Base/VerticalBase";
import { commonInputClassName, commonInputErrorClassName } from "../../common";

const Component: React.FC<
  InputHTMLAttributes<HTMLTextAreaElement> & BaseProps
> = (props) => {
  let inputClassName = `${commonInputClassName} `;
  inputClassName = props.disabled
    ? inputClassName + "bg-gray-50 text-gray-600 dark:text-gray-400  "
    : inputClassName;
  inputClassName = props?.error
    ? inputClassName + commonInputErrorClassName
    : inputClassName;
  return (
    <textarea {...props} className={inputClassName}>
      {props.children}
    </textarea>
  );
};

export const Textarea: React.FC<
  InputHTMLAttributes<HTMLTextAreaElement> & BaseProps
> = (props) => {
  return (
    <VerticalBase {...props}>
      <Component {...props} />
    </VerticalBase>
  );
};

import type { SelectHTMLAttributes } from "react";
import React from "react";
import type { BaseProps } from "../../Base/VerticalBase";
import { VerticalBase } from "../../Base/VerticalBase";
import { ChevronDown } from "react-feather";
import { commonInputClassName, commonInputErrorClassName } from "../../common";

type OptionType = {
  value: string | number;
  text?: string | number;
};

type SelectCustomProps = {
  options: OptionType[] | string[];
  iconleft?: React.ReactNode;
};

const Component: React.FC<
  SelectHTMLAttributes<HTMLSelectElement> & SelectCustomProps & BaseProps
> = (props) => {
  let inputClassName = `${commonInputClassName} appearance-none pr-10  `;
  inputClassName = props.disabled
    ? inputClassName + "bg-gray-50 text-gray-600 dark:text-gray-400  "
    : inputClassName;
  inputClassName = props?.iconleft ? inputClassName + "pl-10 " : inputClassName;
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
      <select {...props} className={inputClassName}>
        {props.options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string"
              ? option
              : option?.text
              ? option.text
              : option.value}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3.5 top-3.5  text-gray-600 dark:text-gray-400">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export const Select: React.FC<
  SelectHTMLAttributes<HTMLSelectElement> & BaseProps & SelectCustomProps
> = ({ iconleft, ...props }) => {
  return (
    <VerticalBase {...props}>
      <Component {...props} iconleft={iconleft} />
    </VerticalBase>
  );
};

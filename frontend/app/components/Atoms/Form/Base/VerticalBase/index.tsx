import React, { HTMLAttributes, ReactNode } from "react";
import { Label, Span } from "../../../Typography";

export type BaseProps = HTMLAttributes<HTMLElement> & {
  label?: string | ReactNode;
  error?: string;
  helper?: string;
};

export const VerticalBase: React.FC<BaseProps> = (props) => {
  const baseClassName = `${props.className} flex flex-col w-full `;
  return (
    <div className={baseClassName}>
      {props.label && <Label className="pb-1.5 ">{props.label}</Label>}
      {props.children}
      {props.error && (
        <Span className="pt-1.5 text-red-600 dark:text-red-400 ">
          {props.error}
        </Span>
      )}
      {props.helper && (
        <Span className="pt-1.5 text-gray-600 dark:text-gray-400  ">
          {props.helper}
        </Span>
      )}
    </div>
  );
};

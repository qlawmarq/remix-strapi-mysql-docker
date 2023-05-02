import type { InputHTMLAttributes, ReactNode } from "react";
import React from "react";
import { Label, Span } from "../../../Typography";

export type BaseProps = InputHTMLAttributes<HTMLElement> & {
  label?: string | ReactNode;
  error?: string;
};

export const HorizontalBase: React.FC<BaseProps> = (props) => {
  const baseClassName = `${props.className} flex flex-row `;
  return (
    <div className={baseClassName}>
      {props.children}
      <div className="flex flex-col">
        {props.label && <Label className="ml-1.5">{props.label}</Label>}
        {props.error && (
          <Span className="ml-1.5 text-red-600 dark:text-red-400">
            {props.error}
          </Span>
        )}
      </div>
    </div>
  );
};

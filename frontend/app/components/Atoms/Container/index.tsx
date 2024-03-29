import type { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export const Container = ({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={twMerge("container mx-auto px-4", className)} {...props} />
  );
};

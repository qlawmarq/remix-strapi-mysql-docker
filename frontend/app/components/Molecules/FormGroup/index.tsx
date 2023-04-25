import React, { HTMLAttributes } from "react";
import { Paragraph, Span } from "../../Atoms/Typography";
import { Button } from "../../Atoms/Button";

type Props = {
  title: string;
  helper?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
  onSubmit?: () => void;
  submitButtonText?: string;
  isSubmiting?: boolean;
};

export const FormGroup: React.FC<HTMLAttributes<HTMLElement> & Props> = (
  props
) => {
  const baseClassName = `${props.className} grid grid-cols-1 lg:grid-cols-4 gap-4`;
  return (
    <section className={baseClassName}>
      {/* Title and description */}
      <div>
        <Paragraph className="font-medium">{props.title}</Paragraph>
        {props?.helper && (
          <Span className="text-gray-600 dark:text-gray-400 ">
            {props.helper}
          </Span>
        )}
      </div>
      {/* Main content */}
      <div className="col-span-2">
        {props?.children}
        {/* Extra spacing for submit/cancel button */}
        {(props?.cancelButtonText || props?.submitButtonText) && (
          <div className="mb-6 lg:mb-20" />
        )}
      </div>
      {/* Submit and cancel button, optional */}
      <div className="flex items-end">
        {(props?.cancelButtonText || props?.submitButtonText) && (
          <div className="mt-auto pb-6">
            {props?.cancelButtonText && (
              <Button
                variant="secondary"
                className="mr-3"
                onClick={props.onCancel}
                type="button"
              >
                {props.cancelButtonText}
              </Button>
            )}
            {props?.submitButtonText && (
              <Button
                onClick={() => {
                  props?.onSubmit && props.onSubmit();
                }}
                isLoading={props?.isSubmiting}
                type="submit"
              >
                {props.submitButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

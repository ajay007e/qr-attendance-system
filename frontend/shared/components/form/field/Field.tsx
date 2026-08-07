import React from "react";
import { cn } from "@/shared/lib/utils";
import { FieldContext } from "./field.context";
import type { FieldProps } from "./field.types";
import { fieldVariants, helperVariants, labelVariants, messageVariants } from "./field.styles";
import FieldInput from "./input/FieldInput";
import FieldTextarea from "./textarea/FieldTextarea";
import FieldAutocomplete from "./autocomplete/FieldAutocomplete";

export interface FieldComponent extends React.FC<FieldProps> {
  Input: typeof FieldInput;
  Textarea: typeof FieldTextarea;
  Autocomplete: typeof FieldAutocomplete;
}

const FieldBase = ({
  id,
  label,
  children,
  helperText,
  error,
  success,
  required,
  optional,
  disabled,
  size = "md",
  variant = "outline",
  floating = false,
  counter,
  maxLength,
  className,
  labelClassName,
  messageClassName,
  helperClassName,
}: FieldProps) => {
  const fieldId = id ?? React.useId();
  const messageId = `${fieldId}-message`;
  const hasMessage = Boolean(error || success || helperText);
  const contextValue = {
    id: fieldId,
    required,
    disabled,
    invalid: Boolean(error),
    success: Boolean(success),
    describedBy: hasMessage ? messageId : undefined,
    size,
    variant,
    floating,
  };
  return (
    <FieldContext.Provider value={contextValue}>
      <div className={cn(fieldVariants(), className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              labelVariants({
                disabled,
              }),
              labelClassName,
            )}
          >
            {label}

            {required && (
              <span
                className="
                  ml-1
                  text-red-500
                "
              >
                *
              </span>
            )}

            {optional && !required && (
              <span
                className="
                  ml-2
                  text-xs
                  text-slate-400
                "
              >
                Optional
              </span>
            )}
          </label>
        )}

        {children}

        {hasMessage || (typeof counter === "number" && typeof maxLength === "number") ? (
          <div className="flex items-center justify-between gap-4">
            <div className="min-h-[18px]">
              {error && (
                <p
                  id={messageId}
                  className={cn(
                    messageVariants({
                      state: "error",
                    }),
                    messageClassName,
                  )}
                >
                  {error}
                </p>
              )}

              {!error && success && (
                <p
                  id={messageId}
                  className={cn(
                    messageVariants({
                      state: "success",
                    }),
                    messageClassName,
                  )}
                >
                  {success}
                </p>
              )}

              {!error && !success && helperText && (
                <p id={messageId} className={cn(helperVariants(), helperClassName)}>
                  {helperText}
                </p>
              )}
            </div>

            {typeof counter === "number" && typeof maxLength === "number" && (
              <span className="text-xs text-slate-400">
                {counter}/{maxLength}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
};

const Field = Object.assign(FieldBase, {
  Input: FieldInput,
  Textarea: FieldTextarea,
  Autocomplete: FieldAutocomplete,
}) as FieldComponent;
export default Field;

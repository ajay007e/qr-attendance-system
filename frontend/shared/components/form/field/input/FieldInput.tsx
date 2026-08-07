import React from "react";

import { Loader2, Eye, EyeOff, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { useFieldContext } from "../field.context";

import { inputWrapperVariants, inputVariants } from "./input.styles";

import type { FieldInputProps } from "./input.types";

const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  (
    {
      type = "text",

      className,

      leftIcon,

      rightIcon,

      prefix,

      suffix,

      loading,

      clearable,

      showPasswordToggle,

      value,

      onChange,

      onClear,

      disabled,

      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();

    const [showPassword, setShowPassword] = React.useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;

    const hasValue = value !== undefined && String(value).length > 0;

    const handleClear = () => {
      onClear?.();

      if (onChange) {
        const event = {
          target: {
            value: "",
          },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

    return (
      <div
        className={cn(
          inputWrapperVariants({
            size: field.size,

            variant: field.variant,

            invalid: field.invalid,

            disabled: disabled || field.disabled,
          }),
          className,
        )}
      >
        {prefix && (
          <span
            className="
            px-3
            text-sm
            text-slate-500
          "
          >
            {prefix}
          </span>
        )}

        {leftIcon && (
          <span
            className="
            pl-3
            text-slate-400
          "
          >
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={field.id}
          type={inputType}
          required={field.required}
          disabled={disabled || field.disabled}
          aria-invalid={field.invalid}
          aria-describedby={field.describedBy}
          value={value}
          onChange={onChange}
          className={cn(
            inputVariants(),

            "px-3",
          )}
          {...props}
        />

        {suffix && (
          <span
            className="
            px-3
            text-sm
            text-slate-500
          "
          >
            {suffix}
          </span>
        )}

        {loading && (
          <Loader2
            className="
            mr-3
            h-4
            w-4
            animate-spin
            text-slate-400
          "
          />
        )}

        {!loading && clearable && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="
              mr-2
              text-slate-400
              hover:text-slate-700
            "
          >
            <X size={16} />
          </button>
        )}

        {!loading && showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="
              mr-3
              text-slate-400
            "
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

        {!loading && rightIcon}
      </div>
    );
  },
);

FieldInput.displayName = "Field.Input";

export default FieldInput;

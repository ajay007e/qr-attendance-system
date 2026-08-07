import React from "react";

import { Loader2, Eye, EyeOff, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { useFieldContext } from "../field.context";

import { inputWrapperVariants, inputVariants } from "./input.styles";

import type { FieldInputProps } from "./input.types";
import Button from "@/shared/components/ui/button";

const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  (
    {
      type = "text",
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
      className,
      disabled,
      fullWidth = true,

      ...props
    },
    ref,
  ) => {
    const field = useFieldContext();
    const fieldId = field?.id;
    const fieldRequired = field?.required;
    const fieldDisabled = field?.disabled;
    const fieldInvalid = field?.invalid ?? false;
    const fieldDescribedBy = field?.describedBy;
    const fieldSize = field?.size ?? "md";
    const fieldVariant = field?.variant ?? "outline";

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const inputType = type === "password" && passwordVisible ? "text" : type;
    const hasValue = value !== undefined && String(value).length > 0;

    return (
      <div
        className={cn(
          inputWrapperVariants({
            size: fieldSize,
            variant: fieldVariant,
            invalid: fieldInvalid,
            disabled: disabled || fieldDisabled,
            fullWidth,
          }),
          className,
        )}
      >
        {leftIcon && (
          <span
            className="
            absolute
            left-4

            top-1/2

            -translate-y-1/2

            text-slate-400
          "
          >
            {leftIcon}
          </span>
        )}

        {prefix && (
          <span
            className="
            pl-4
            text-sm
            text-slate-500
          "
          >
            {prefix}
          </span>
        )}

        <input
          ref={ref}
          id={fieldId}
          type={inputType}
          required={fieldRequired}
          disabled={disabled || fieldDisabled}
          aria-invalid={fieldInvalid}
          aria-describedby={fieldDescribedBy}
          value={value}
          onChange={onChange}
          className={cn(
            inputVariants(),
            "px-4",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            clearable && hasValue && "pr-10",
            showPasswordToggle && "pr-10",
          )}
          {...props}
        />

        {loading && (
          <Loader2
            size={18}
            className="
            absolute
            right-4
            animate-spin
            text-slate-400
          "
          />
        )}

        {!loading && clearable && hasValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X size={18} />
          </Button>
        )}

        {!loading && showPasswordToggle && type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setPasswordVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        )}

        {rightIcon && !loading && (
          <span
            className="
            absolute
            right-4
            text-slate-400
          "
          >
            {rightIcon}
          </span>
        )}

        {suffix && (
          <span
            className="
            pr-4
            text-sm
            text-slate-500
          "
          >
            {suffix}
          </span>
        )}
      </div>
    );
  },
);

FieldInput.displayName = "Field.Input";

export default FieldInput;

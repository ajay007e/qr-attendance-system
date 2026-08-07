import React from "react";

import { Loader2, X } from "lucide-react";

import Button from "@/shared/components/ui/button";

import { cn } from "@/shared/lib/utils";

import { useFieldContext } from "../field.context";

import { inputWrapperVariants, inputVariants } from "../input/input.styles";

import { AutocompleteContext } from "./autocomplete.context";

import { useAutocomplete } from "./useAutocomplete";

import type { FieldAutocompleteProps } from "./autocomplete.types";

const FieldAutocomplete = React.forwardRef(
  <T,>(
    {
      value,

      onChange,

      options,

      selectedOption,

      onSelect,

      getOptionLabel,

      filterOptions,

      open,

      onOpenChange,

      loading,

      clearable,

      onClear,

      leftIcon,

      rightIcon,

      prefix,

      suffix,

      fullWidth = true,

      disabled,

      children,

      className,

      onFocus,

      ...props
    }: FieldAutocompleteProps<T>,

    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const field = useFieldContext();

    const autocomplete = useAutocomplete<T>({
      value,
      onChange,

      options,

      selectedOption,

      onSelect,

      getOptionLabel,

      filterOptions,

      open,

      onOpenChange,
    });

    const hasValue = value.length > 0;

    return (
      <AutocompleteContext.Provider value={autocomplete}>
        <div className="relative">
          <div
            className={cn(
              inputWrapperVariants({
                size: field?.size ?? "md",

                variant: field?.variant ?? "outline",

                invalid: field?.invalid ?? false,

                disabled: disabled || field?.disabled,

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
              id={field?.id}
              value={value}
              required={field?.required}
              disabled={disabled || field?.disabled}
              aria-invalid={field?.invalid}
              aria-describedby={field?.describedBy}
              className={cn(
                inputVariants(),

                leftIcon && "pl-11",

                (rightIcon || loading || (clearable && hasValue)) && "pr-11",
              )}
              onFocus={(event) => {
                autocomplete.openDropdown();

                onFocus?.(event);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();

                  autocomplete.highlightNext();
                }

                if (event.key === "ArrowUp") {
                  event.preventDefault();

                  autocomplete.highlightPrevious();
                }

                if (event.key === "Escape") {
                  autocomplete.closeDropdown();
                }

                if (event.key === "Enter" && autocomplete.highlightedOption) {
                  autocomplete.selectOption(autocomplete.highlightedOption);
                }
              }}
              onChange={(event) => {
                onChange(event.target.value);

                autocomplete.openDropdown();
              }}
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
                className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                  "
                onClick={onClear}
              >
                <X size={18} />
              </Button>
            )}

            {!loading && rightIcon && (
              <span
                className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
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

          {children}
        </div>
      </AutocompleteContext.Provider>
    );
  },
);

FieldAutocomplete.displayName = "Field.Autocomplete";

export default FieldAutocomplete as <T>(
  props: FieldAutocompleteProps<T> & React.RefAttributes<HTMLInputElement>,
) => React.ReactNode;

import React from "react";
import { cn } from "@/shared/lib/utils";
import { useFieldContext } from "../field.context";
import { textareaVariants } from "./textarea.styles";
import type { FieldTextareaProps } from "./textarea.types";

const FieldTextarea = React.forwardRef<HTMLTextAreaElement, FieldTextareaProps>(
  ({ className, disabled, ...props }, ref) => {
    const field = useFieldContext();
    const variant = field?.variant ?? "outline";
    const invalid = field?.invalid ?? false;
    const fieldDisabled = disabled || field?.disabled;
    return (
      <textarea
        ref={ref}
        id={field?.id}
        disabled={fieldDisabled}
        required={field?.required}
        aria-invalid={invalid}
        aria-describedby={field?.describedBy}
        className={cn(
          textareaVariants({
            variant,
            invalid,
            disabled: fieldDisabled,
          }),

          className,
        )}
        {...props}
      />
    );
  },
);

FieldTextarea.displayName = "Field.Textarea";

export default FieldTextarea;

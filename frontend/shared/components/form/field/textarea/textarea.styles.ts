import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "w-full",
    "rounded-xl",
    "border",
    "bg-white",
    "px-4",
    "py-3",
    "text-sm",
    "text-slate-900",
    "placeholder:text-slate-400",
    "outline-none",
    "transition",
    "resize-y",
    "focus:ring-4",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        outline: ["border-slate-300", "focus:border-blue-600", "focus:ring-blue-100"].join(" "),
        filled: ["border-transparent", "bg-slate-100", "focus:border-blue-600", "focus:ring-blue-100"].join(" "),
        ghost: ["border-transparent", "bg-transparent"].join(" "),
      },
      invalid: {
        true: ["border-red-500", "focus:border-red-500", "focus:ring-red-100"].join(" "),
      },
      disabled: {
        true: "opacity-60",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

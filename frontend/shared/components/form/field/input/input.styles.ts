import { cva } from "class-variance-authority";

export const inputWrapperVariants = cva(
  [
    "relative",
    "flex",
    "items-center",
    "w-full",
    "rounded-xl",
    "border",
    "transition-colors",
    "bg-white",
    "focus-within:ring-4",
  ],
  {
    variants: {
      size: {
        sm: "h-9 text-sm",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },

      variant: {
        outline: [
          "border-slate-300",
          "focus-within:border-blue-500",
          "focus-within:ring-blue-100",
        ].join(" "),

        filled: [
          "bg-slate-100",
          "border-transparent",
          "focus-within:border-blue-500",
        ].join(" "),

        ghost: [
          "border-transparent",
          "bg-transparent",
          "focus-within:border-slate-300",
        ].join(" "),
      },

      invalid: {
        true: ["border-red-500", "focus-within:ring-red-100"].join(" "),
      },

      disabled: {
        true: ["cursor-not-allowed", "bg-slate-100", "opacity-60"].join(" "),
      },
    },

    defaultVariants: {
      size: "md",

      variant: "outline",
    },
  },
);

export const inputVariants = cva([
  "w-full",

  "bg-transparent",

  "outline-none",

  "text-slate-900",

  "placeholder:text-slate-400",

  "disabled:cursor-not-allowed",
]);

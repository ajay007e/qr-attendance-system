import { cva } from "class-variance-authority";

export const inputWrapperVariants = cva(
  ["relative", "flex", "items-center", "rounded-xl", "border", "bg-white", "transition", "focus-within:ring-4"],
  {
    variants: {
      fullWidth: {
        true: "w-full",
      },
      size: {
        sm: "h-10",

        md: "h-12",

        lg: "h-14",
      },

      variant: {
        outline: ["border-slate-300", "focus-within:border-blue-600", "focus-within:ring-blue-100"].join(" "),

        filled: [
          "border-transparent",

          "bg-slate-100",

          "focus-within:border-blue-600",

          "focus-within:ring-blue-100",
        ].join(" "),

        ghost: ["border-transparent", "bg-transparent"].join(" "),
      },

      invalid: {
        true: ["border-red-500", "focus-within:ring-red-100"].join(" "),
      },

      disabled: {
        true: "opacity-60 cursor-not-allowed",
      },
    },

    defaultVariants: {
      size: "md",

      variant: "outline",
    },
  },
);

export const inputVariants = cva([
  "h-full",

  "w-full",

  "bg-transparent",

  "outline-none",

  "text-sm",

  "text-slate-900",

  "placeholder:text-slate-400",

  "disabled:cursor-not-allowed",
]);

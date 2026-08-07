import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",

    "rounded-xl",

    "text-sm",
    "font-semibold",

    "transition-colors",

    "cursor-pointer",

    "disabled:cursor-not-allowed",
    "disabled:opacity-60",

    "focus-visible:outline-none",
    "focus-visible:ring-4",
    "focus-visible:ring-offset-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-200",

        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-200",

        outline:
          "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-200",

        ghost:
          "text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-slate-200",

        danger:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-200 shadow-sm hover:shadow-md active:scale-95",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-200",
      },

      size: {
        xs: "h-8 px-3 text-xs",

        sm: "h-9 px-3 text-sm",

        md: "h-10 px-4 text-sm",

        lg: "h-12 px-6 text-sm",

        icon: "h-10 w-10 p-0",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

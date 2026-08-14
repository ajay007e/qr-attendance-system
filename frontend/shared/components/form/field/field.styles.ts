import { cva } from "class-variance-authority";

export const fieldVariants = cva(["flex", "flex-col", "gap-1.5", "w-full"]);

export const labelVariants = cva(["text-sm", "font-medium", "text-slate-700", "select-none"], {
  variants: {
    disabled: {
      true: "text-slate-400",
    },
  },
});

export const helperVariants = cva(["text-xs", "text-slate-500"]);

export const messageVariants = cva(["text-xs", "font-medium"], {
  variants: {
    state: {
      error: "text-red-600",

      success: "text-green-600",
    },
  },
});

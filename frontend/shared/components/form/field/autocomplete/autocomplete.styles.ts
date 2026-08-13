import { cva } from "class-variance-authority";

/**
 * Dropdown container
 *
 * Consumer can use this for their custom option list.
 */
export const autocompleteDropdownVariants = cva(
  [
    "absolute",
    "z-30",
    "mt-2",
    "w-full",
    "overflow-y-auto",
    "rounded-xl",
    "border",
    "border-gray-200",
    "bg-white",
    "shadow-xl",
  ],
  {
    variants: {
      maxHeight: {
        sm: "max-h-48",
        md: "max-h-80",
        lg: "max-h-[480px]",
      },
    },

    defaultVariants: {
      maxHeight: "md",
    },
  },
);

/**
 * Individual option item.
 *
 * Optional helper if consumers want default styling.
 */
export const autocompleteOptionVariants = cva(
  ["flex", "w-full", "items-center", "gap-3", "px-4", "py-3", "text-left", "transition", "hover:bg-blue-50"],

  {
    variants: {
      active: {
        true: ["bg-blue-50"],
        false: [],
      },

      selected: {
        true: ["font-medium", "text-blue-700"],
        false: [],
      },
    },

    defaultVariants: {
      active: false,
      selected: false,
    },
  },
);

/**
 * Empty state.
 */
export const autocompleteEmptyVariants = cva(["px-4", "py-3", "text-sm", "text-gray-500"]);

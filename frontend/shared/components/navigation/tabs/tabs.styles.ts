import { cva } from "class-variance-authority";

export const tabsVariants = cva(
  ["flex", "w-full", "items-center", "overflow-x-auto", "scrollbar-none", "overscroll-x-contain"],
  {
    variants: {
      variant: {
        segmented: ["rounded-xl", "bg-gray-100", "p-1"].join(" "),

        underline: ["border-b", "border-gray-200"].join(" "),

        pills: ["gap-2"].join(" "),
      },

      width: {
        full: "w-full",
        auto: "w-auto",
      },

      scrollable: {
        true: ["overflow-x-auto", "whitespace-nowrap"].join(" "),

        false: ["overflow-x-hidden"].join(" "),
      },
    },

    defaultVariants: {
      variant: "segmented",
      width: "full",
      scrollable: true,
    },
  },
);

export const tabButtonVariants = cva(
  [
    "relative",
    "inline-flex",
    "shrink-0",
    "items-center",
    "justify-center",
    "gap-2",
    "font-medium",
    "outline-none",
    "transition-all",
    "duration-150",
    "select-none",
    "focus-visible:ring-2",
    "focus-visible:ring-blue-100",
    "focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        segmented: [
          "rounded-lg",
          "text-gray-500",
          "hover:text-gray-700",
          "data-[active=true]:bg-white",
          "data-[active=true]:text-blue-600",
          "data-[active=true]:shadow-sm",
        ].join(" "),

        underline: [
          "rounded-t-lg",
          "text-gray-500",
          "hover:bg-gray-50",
          "hover:text-gray-700",
          "data-[active=true]:text-blue-600",
          "after:absolute",
          "after:bottom-0",
          "after:left-0",
          "after:right-0",
          "after:h-0.5",
          "after:origin-center",
          "after:scale-x-0",
          "after:bg-blue-600",
          "after:transition-transform",
          "data-[active=true]:after:scale-x-100",
        ].join(" "),

        pills: [
          "rounded-full",
          "border",
          "border-transparent",
          "bg-transparent",
          "text-gray-500",
          "hover:border-gray-200",
          "hover:bg-gray-50",
          "hover:text-gray-700",
          "data-[active=true]:border-blue-100",
          "data-[active=true]:bg-blue-50",
          "data-[active=true]:text-blue-600",
        ].join(" "),
      },

      size: {
        sm: ["min-h-9", "px-3", "py-2", "text-xs"].join(" "),

        md: ["min-h-10", "px-4", "py-2.5", "text-sm"].join(" "),

        lg: ["min-h-12", "px-5", "py-3", "text-base"].join(" "),
      },

      width: {
        full: "flex-1",
        auto: "w-auto",
      },
    },

    compoundVariants: [
      {
        variant: "underline",
        width: "full",
        className: "flex-1",
      },
    ],

    defaultVariants: {
      variant: "segmented",
      size: "md",
      width: "full",
    },
  },
);

export const tabIconVariants = cva(["inline-flex", "shrink-0", "items-center", "justify-center"], {
  variants: {
    size: {
      sm: "size-4",
      md: "size-4",
      lg: "size-5",
    },

    active: {
      true: "text-blue-600",
      false: "text-current",
    },
  },

  defaultVariants: {
    size: "md",
    active: false,
  },
});

export const tabLabelVariants = cva(["min-w-0", "truncate"], {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export const tabBadgeVariants = cva(
  ["inline-flex", "shrink-0", "items-center", "justify-center", "rounded-full", "font-medium", "leading-none"],
  {
    variants: {
      size: {
        sm: ["min-w-4", "h-4", "px-1.5", "text-[10px]"].join(" "),

        md: ["min-w-5", "h-5", "px-1.5", "text-[11px]"].join(" "),

        lg: ["min-w-6", "h-6", "px-2", "text-xs"].join(" "),
      },

      active: {
        true: ["bg-blue-100", "text-blue-700"].join(" "),

        false: ["bg-gray-200", "text-gray-600"].join(" "),
      },
    },

    defaultVariants: {
      size: "md",
      active: false,
    },
  },
);

export const tabsScrollAreaStyles = [
  "w-full",
  "overflow-x-auto",
  "overscroll-x-contain",
  "[scrollbar-width:none]",
  "[-ms-overflow-style:none]",
  "[&::-webkit-scrollbar]:hidden",
].join(" ");

export const tabsListStyles = ["flex", "min-w-max", "items-center"].join(" ");

export const tabPanelStyles = [
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-blue-100",
  "focus-visible:ring-offset-2",
].join(" ");

import { cva } from "class-variance-authority";

export const comingSoonVariants = cva(
  `flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center`,
  {
    variants: {
      size: {
        sm: `py-8`,
        md: `py-16`,
        lg: `py-24`,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const comingSoonIconVariants = cva(`flex items-center justify-center rounded-full bg-blue-50 text-blue-600`, {
  variants: {
    size: {
      sm: `h-10 w-10`,
      md: `h-14 w-14`,
      lg: `h-20 w-20`,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const comingSoonTitleVariants = cva(`mt-4 font-semibold text-gray-900 sm:mt-5`, {
  variants: {
    size: {
      sm: `text-lg`,
      md: `text-xl`,
      lg: `text-2xl`,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const comingSoonMessageVariants = cva(`mt-2 max-w-md leading-relaxed text-gray-500`, {
  variants: {
    size: {
      sm: `text-xs`,
      md: `text-sm`,
      lg: `text-base`,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const comingSoonStatusVariants = cva(
  `mt-4 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-600`,
);

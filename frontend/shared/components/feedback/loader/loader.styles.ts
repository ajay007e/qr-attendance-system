import { cva } from "class-variance-authority";

export const loaderSpinnerVariants = cva(
  `
    animate-spin
    rounded-full
    border-4
    border-blue-600
    border-t-transparent
  `,
  {
    variants: {
      size: {
        sm: "h-5 w-5",
        md: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const loaderMessageVariants = cva(`
  text-sm
  font-medium
  text-gray-700
`);

export const loaderHintVariants = cva(`
  mt-1
  text-xs
  text-gray-500
`);

export const loaderVariants = cva(`
  flex
  flex-col
  items-center
  justify-center
  gap-3
`);

export const loaderOverlayVariants = cva(`
  absolute
  inset-0
  z-10
  flex
  items-center
  justify-center
  bg-white/70
`);

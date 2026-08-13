import { cva } from "class-variance-authority";

export const emptyStateVariants = cva(
  `
  flex
  flex-col
  items-center
  justify-center
  rounded-2xl
  border
  border-gray-200
  bg-white
  px-6
  text-center
  `,
  {
    variants: {
      size: {
        sm: `
          py-8
        `,

        md: `
          py-12
        `,

        lg: `
          py-20
        `,
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);

export const emptyStateIconVariants = cva(
  `
  flex
  items-center
  justify-center
  rounded-full
  bg-blue-50
  text-blue-600
  `,
  {
    variants: {
      size: {
        sm: `
          h-10
          w-10
        `,

        md: `
          h-14
          w-14
        `,

        lg: `
          h-16
          w-16
        `,
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);

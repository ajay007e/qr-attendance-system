import { cva } from "class-variance-authority";

export const selectButtonVariants = cva(
  `
  flex
  h-12
  items-center
  justify-between
  rounded-xl
  border
  bg-white
  px-4
  text-sm
  text-gray-700
  shadow-sm
  transition
  cursor-pointer

  focus:outline-none
  focus:ring-4
  `,
  {
    variants: {
      disabled: {
        true: `
          cursor-not-allowed
          bg-gray-100
          text-gray-400
        `,

        false: `
          border-gray-300
          hover:border-blue-400
          focus:border-blue-600
          focus:ring-blue-100
        `,
      },

      fullWidth: {
        true: `
          w-full
        `,

        false: `
          w-auto
        `,
      },
    },

    defaultVariants: {
      disabled: false,
      fullWidth: true,
    },
  },
);

export const selectDropdownVariants = cva(
  `
  z-[9999]

  max-h-[240px]
  overflow-y-auto

  rounded-xl

  border
  border-gray-200

  bg-white

  shadow-xl
  `,
);

export const selectOptionVariants = cva(
  `
  flex
  w-full

  cursor-pointer

  px-4
  py-3

  text-left

  text-sm

  transition
  `,
  {
    variants: {
      selected: {
        true: `
          bg-blue-50
          text-blue-600
        `,

        false: `
          text-gray-700
          hover:bg-gray-50
        `,
      },
    },

    defaultVariants: {
      selected: false,
    },
  },
);

import { cva } from "class-variance-authority";

export const formErrorVariants = cva(
  `
  rounded-xl
  border
  border-red-200
  bg-red-50
  px-4
  py-3
  text-sm
  text-red-700
  `,
);

export const errorFallbackVariants = cva(
  `
  flex
  min-h-[320px]
  w-full
  flex-col
  items-center
  justify-center
  rounded-2xl
  border
  border-gray-200
  bg-white
  px-6
  py-12
  text-center
  `,
);

export const errorFallbackIconVariants = cva(
  `
  flex
  h-14
  w-14
  items-center
  justify-center
  rounded-full
  bg-red-50
  text-red-600
  `,
);

export const errorFallbackTitleVariants = cva(
  `
  mt-5
  text-lg
  font-semibold
  text-gray-900
  sm:text-xl
  `,
);

export const errorFallbackMessageVariants = cva(
  `
  mt-2
  max-w-md
  text-sm
  leading-relaxed
  text-gray-500
  `,
);

export const errorFallbackDetailsVariants = cva(
  `
  mt-5
  max-w-md
  rounded-xl
  border
  border-red-100
  bg-red-50
  px-4
  py-3
  text-left
  text-xs
  text-red-700
  `,
);

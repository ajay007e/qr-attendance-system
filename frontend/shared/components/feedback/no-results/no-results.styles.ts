import { cva } from "class-variance-authority";

export const noResultsVariants = cva(`
  rounded-2xl
  border
  border-dashed
  border-gray-300
  bg-white
  px-5
  py-15
  text-center
  sm:py-20
`);

export const noResultsTitleVariants = cva(`
  text-lg
  font-semibold
  text-gray-900
`);

export const noResultsMessageVariants = cva(`
  mt-2
  text-sm
  text-gray-500
`);

export const PAGINATION_CONTAINER_CLASS_NAME = `
  flex
  flex-col
  gap-4
  rounded-2xl
  border
  border-gray-200
  bg-white
  px-4
  py-4
  text-sm
  text-gray-600
  sm:flex-row
  sm:items-center
  sm:justify-between
`;

export const PAGINATION_BUTTON_CLASS_NAME = `
  inline-flex
  items-center
  justify-center
  rounded-lg
  border
  border-gray-300
  bg-white
  px-3
  py-2
  text-sm
  font-medium
  text-gray-700
  transition
  hover:bg-gray-50
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

export const PAGINATION_DESKTOP_BUTTON_CLASS_NAME = `
  hidden
  sm:inline-flex
`;

export const PAGINATION_MOBILE_BUTTON_CLASS_NAME = `
  inline-flex
  sm:hidden
`;

export const PAGINATION_CURRENT_PAGE_CLASS_NAME = `
  inline-flex
  items-center
  justify-center
  rounded-lg
  bg-blue-600
  px-3
  py-2
  text-sm
  font-semibold
  text-white
`;

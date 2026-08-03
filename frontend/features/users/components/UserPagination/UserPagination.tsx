import { ChevronLeft, ChevronRight } from "lucide-react";

import { UserPaginationProps } from "./types";

const buttonClassName = `
  rounded-lg
  border
  border-gray-300
  transition
  hover:bg-gray-50
  disabled:cursor-not-allowed
  disabled:opacity-50
`;

const desktopButtonClassName = `
  hidden
  px-3
  py-2
  text-sm
  font-medium
  sm:block
`;

const mobileButtonClassName = `
  p-2
  sm:hidden
`;

export default function UserPagination({
  total,
  page = 1,
  totalPages = 1,
  onPrevious,
  onNext,
  disabled = false,
  hasPrevious = true,
  hasNext = true,
}: UserPaginationProps) {
  const previousDisabled = disabled || !hasPrevious || page <= 1;

  const nextDisabled = disabled || !hasNext || page >= totalPages;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        py-3
        text-sm
        text-gray-600
        shadow-sm
        sm:px-5
        sm:py-4
      "
    >
      <p className="whitespace-nowrap">
        Showing <span className="font-semibold text-gray-900">{total}</span>{" "}
        users
      </p>

      <div className="flex items-center gap-2">
        {/* Desktop Previous */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={previousDisabled}
          className={`
            ${buttonClassName}
            ${desktopButtonClassName}
          `}
        >
          Previous
        </button>

        {/* Mobile Previous */}
        <button
          type="button"
          onClick={onPrevious}
          disabled={previousDisabled}
          className={`
            ${buttonClassName}
            ${mobileButtonClassName}
          `}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Current Page */}
        <span
          className="
            rounded-lg
            border
            border-blue-600
            px-3
            py-2
            font-medium
            text-gray-900
          "
        >
          <span className="sm:hidden">
            {page}/{totalPages}
          </span>

          <span className="hidden sm:inline">{page}</span>
        </span>

        {/* Desktop Next */}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`
            ${buttonClassName}
            ${desktopButtonClassName}
          `}
        >
          Next
        </button>

        {/* Mobile Next */}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`
            ${buttonClassName}
            ${mobileButtonClassName}
          `}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

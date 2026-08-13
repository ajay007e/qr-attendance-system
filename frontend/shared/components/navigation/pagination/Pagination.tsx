import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared";

interface PaginationProps {
  total: number;
  label?: string;
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  disabled?: boolean;
}

export default function Pagination({
  total,
  label = "items",
  page,
  totalPages,
  onPrevious,
  onNext,
  hasPrevious = true,
  hasNext = true,
  disabled = false,
}: PaginationProps) {
  const previousDisabled = disabled || !hasPrevious || page <= 1;
  const nextDisabled = disabled || !hasNext || page >= totalPages;

  return (
    <div
      className="
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
      "
    >
      {/* Total */}
      <p className="w-full text-center whitespace-nowrap sm:w-auto sm:text-left">
        Showing <span className="font-semibold text-gray-900">{total}</span> {label}
      </p>

      {/* Pagination controls */}
      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-normal">
        {/* Desktop Previous */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={previousDisabled}
          className="hidden sm:inline-flex"
        >
          Previous
        </Button>

        {/* Mobile Previous */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onPrevious}
          disabled={previousDisabled}
          aria-label="Previous page"
          className="sm:hidden"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </Button>

        {/* Current Page */}
        <span
          className="
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
          "
        >
          <span className="sm:hidden">
            {page}/{totalPages}
          </span>

          <span className="hidden sm:inline">{page}</span>
        </span>

        {/* Desktop Next */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={nextDisabled}
          className="hidden sm:inline-flex"
        >
          Next
        </Button>

        {/* Mobile Next */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={nextDisabled}
          aria-label="Next page"
          className="sm:hidden"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

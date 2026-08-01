import { ChevronLeft, ChevronRight } from "lucide-react";

interface UserPaginationProps {
  total: number;

  page?: number;

  totalPages?: number;

  onPrevious?: () => void;

  onNext?: () => void;

  disabled?: boolean;
}

export default function UserPagination({
  total,
  page = 1,
  totalPages = 1,
  onPrevious,
  onNext,
  disabled = true,
}: UserPaginationProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm sm:px-5 sm:py-4">
      {/* Info */}
      <p className="whitespace-nowrap">
        Showing <span className="font-semibold text-gray-900">{total}</span>{" "}
        users
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Desktop Previous */}
        <button
          onClick={onPrevious}
          disabled={disabled || page <= 1}
          className="
            hidden
            rounded-lg
            border
            border-gray-300
            px-3
            py-2
            text-sm
            font-medium
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:block
          "
        >
          Previous
        </button>

        {/* Mobile Previous Icon */}
        <button
          onClick={onPrevious}
          disabled={disabled || page <= 1}
          className="
            rounded-lg
            border
            border-gray-300
            p-2
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:hidden
          "
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page */}
        <span className="rounded-lg border border-blue-600 px-3 py-2 font-medium text-gray-900">
          <span className="sm:hidden">
            {page}/{totalPages}
          </span>

          <span className="hidden sm:inline">{page}</span>
        </span>

        {/* Desktop Next */}
        <button
          onClick={onNext}
          disabled={disabled || page >= totalPages}
          className="
            hidden
            rounded-lg
            border
            border-gray-300
            px-3
            py-2
            text-sm
            font-medium
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:block
          "
        >
          Next
        </button>

        {/* Mobile Next Icon */}
        <button
          onClick={onNext}
          disabled={disabled || page >= totalPages}
          className="
            rounded-lg
            border
            border-gray-300
            p-2
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:hidden
          "
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserPaginationProps } from "../../types";
import {
  PAGINATION_BUTTON_CLASS_NAME,
  PAGINATION_DESKTOP_BUTTON_CLASS_NAME,
  PAGINATION_MOBILE_BUTTON_CLASS_NAME,
  PAGINATION_CONTAINER_CLASS_NAME,
  PAGINATION_CURRENT_PAGE_CLASS_NAME,
} from "./pagination.constants";

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
    <div className={PAGINATION_CONTAINER_CLASS_NAME}>
      <p className="whitespace-nowrap">
        Showing <span className="font-semibold text-gray-900">{total}</span>{" "}
        users
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={previousDisabled}
          className={`${PAGINATION_BUTTON_CLASS_NAME} ${PAGINATION_DESKTOP_BUTTON_CLASS_NAME}`}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onPrevious}
          disabled={previousDisabled}
          className={`${PAGINATION_BUTTON_CLASS_NAME} ${PAGINATION_MOBILE_BUTTON_CLASS_NAME}`}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <span className={PAGINATION_CURRENT_PAGE_CLASS_NAME}>
          <span className="sm:hidden">
            {page}/{totalPages}
          </span>

          <span className="hidden sm:inline">{page}</span>
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`${PAGINATION_BUTTON_CLASS_NAME} ${PAGINATION_DESKTOP_BUTTON_CLASS_NAME}`}
        >
          Next
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`${PAGINATION_BUTTON_CLASS_NAME} ${PAGINATION_MOBILE_BUTTON_CLASS_NAME}`}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

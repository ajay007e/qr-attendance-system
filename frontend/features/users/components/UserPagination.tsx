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
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-600 shadow-sm">
      <p>Showing {total} users</p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={disabled || page <= 1}
          className="rounded-lg border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>

        <span className="rounded-lg bg-blue-600 px-3 py-2 text-white">
          {page}
        </span>

        <button
          onClick={onNext}
          disabled={disabled || page >= totalPages}
          className="rounded-lg border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

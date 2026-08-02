"use client";

type ErrorStateProps = {
  title?: string;
  message?: string;
  error?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export default function ErrorState({
  title = "Unable to load data",
  message = "Something went wrong while loading this information. Please try again.",
  error,
  onRetry,
  retryLabel = "Retry",
}: ErrorStateProps) {
  return (
    <div className="mx-auto flex min-h-[420px] w-full max-w-3xl items-center justify-center px-4">
      <div
        className="
          w-full
          rounded-3xl
          border
          border-red-200
          bg-gradient-to-br
          from-red-50
          via-white
          to-red-50
          p-8
          shadow-sm
          sm:p-10
        "
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-100
              text-red-600
            "
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 4h.01M10.29 3.86l-7.82 14a2 2 0 001.74 3h15.58a2 2 0 001.74-3l-7.82-14a2 2 0 00-3.48 0z"
              />
            </svg>
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">{title}</h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
            {message}
          </p>

          {error && (
            <div
              className="
                mt-5
                w-full
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
                text-center
              "
            >
              {error}
            </div>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-red-700
                hover:shadow-md
                active:scale-95
                cursor-pointer
              "
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582M20 20v-5h-.581M5.8 18.2A8 8 0 0118.2 5.8M18.2 5.8A8 8 0 015.8 18.2"
                />
              </svg>

              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

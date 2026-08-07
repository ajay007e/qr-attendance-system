"use client";

import Button from "../ui/Button";
import { ErrorFallbackProps } from "./types";
import { RefreshCw } from "lucide-react";

export default function ErrorFalback({
  title = "Unable to load data",
  message = "Something went wrong while loading this information. Please try again.",
  error,
  onRetry,
  retryLabel = "Retry",
}: ErrorFallbackProps) {
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
                text-center
                text-sm
                text-red-700
              "
            >
              {error}
            </div>
          )}

          {onRetry && (
            <Button
              variant="danger"
              size="lg"
              className="mt-6"
              leftIcon={<RefreshCw size={18} />}
              onClick={onRetry}
            >
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

import { Button, useError } from "@/shared";

export default function GlobalError() {
  const { error, clearError } = useError();

  useEffect(() => {
    if (!error) return;

    if (error.type === "AUTH") {
      return;
    }

    const timer = setTimeout(() => {
      clearError();
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, clearError]);

  if (!error) {
    return null;
  }

  if (error.type === "AUTH") {
    return <LoginRequiredModal />;
  }

  return (
    <div
      role="alert"
      className="
        fixed
        right-6
        top-6
        z-[9999]
        w-[360px]
        rounded-2xl
        border
        border-red-200
        bg-white
        p-5
        shadow-2xl
      "
    >
      <div className="flex gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-red-100
            text-red-600
          "
        >
          !
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Something went wrong</h3>

          <p className="mt-1 text-sm text-gray-600">{error.message}</p>

          <Button
            type="button"
            variant="ghost"
            onClick={clearError}
            className="mt-3 text-red-600 hover:text-red-700"
          >
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoginRequiredModal() {
  return (
    <div
      className="
        fixed
        inset-0
        z-[10000]
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
        "
      >
        <h2 className="text-xl font-semibold text-gray-900">Session expired</h2>

        <p className="mt-3 text-sm text-gray-600">
          Your session has expired. Please login again to continue.
        </p>

        <Button
          type="button"
          variant="primary"
          fullWidth
          className="mt-6"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
}

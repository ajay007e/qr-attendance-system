"use client";

import { Button } from "@/shared";

export default function LoginRequiredModal() {
  return (
    <div
      className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-black/40
      px-6
      "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-2xl
        bg-white
        p-6
        shadow-xl
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          text-gray-900
          "
        >
          Session expired
        </h2>

        <p
          className="
          mt-3
          text-sm
          text-gray-600
          "
        >
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

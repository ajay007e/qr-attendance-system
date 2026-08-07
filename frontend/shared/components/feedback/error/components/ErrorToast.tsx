"use client";

import { AlertTriangle, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export default function ErrorToast({
  message,
  onDismiss,
  className,
}: {
  message: string;

  onDismiss: () => void;

  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        `
        fixed
        right-6
        top-6
        z-[9999]
        flex
        w-full
        max-w-sm
        items-start
        gap-3
        rounded-xl
        border
        border-red-200
        bg-white
        p-4
        shadow-lg
        animate-in
        slide-in-from-top-2
        fade-in
        duration-200
        `,
        className,
      )}
    >
      <div
        className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-red-50
        text-red-600
        "
      >
        <AlertTriangle size={18} />
      </div>

      <div className="flex-1">
        <p
          className="
          text-sm
          font-medium
          text-gray-900
          "
        >
          Something went wrong
        </p>

        <p
          className="
          mt-1
          text-sm
          text-gray-600
          "
        >
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="
        rounded-md
        text-gray-400
        transition
        hover:text-gray-600
        "
        aria-label="Dismiss error"
      >
        <X size={16} />
      </button>
    </div>
  );
}

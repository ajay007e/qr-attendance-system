"use client";

import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared";

export default function ErrorAlert({
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
        <h3
          className="
          text-sm
          font-semibold
          text-gray-900
          "
        >
          Something went wrong
        </h3>

        <p
          className="
          mt-1
          text-sm
          text-gray-600
          "
        >
          {message}
        </p>

        <Button
          type="button"
          variant="ghost"
          onClick={onDismiss}
          className="
          mt-2
          px-0
          text-red-600
          hover:text-red-700
          "
        >
          Dismiss
        </Button>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="
        text-gray-400
        hover:text-gray-600
        "
      >
        <X size={16} />
      </button>
    </div>
  );
}

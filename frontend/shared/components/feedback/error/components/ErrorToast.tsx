"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

import { useToast, Button } from "@/shared";
import { ErrorToastProps } from "../error.types";

export default function ErrorToast({ message, onDismiss, className }: ErrorToastProps) {
  const { custom } = useToast();
  const toastCreatedRef = useRef(false);

  useEffect(() => {
    if (toastCreatedRef.current) {
      return;
    }

    toastCreatedRef.current = true;

    custom({
      content: ({ dismiss }) => (
        <div
          role="alert"
          className={[
            "relative",
            "flex",
            "w-full",
            "items-start",
            "gap-3",
            "overflow-hidden",
            "bg-gray-50",
            "p-4",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={["absolute", "inset-y-0", "left-0", "w-1", "bg-red-600"].join(" ")} aria-hidden="true" />

          <div
            className={[
              "flex",
              "size-10",
              "shrink-0",
              "items-center",
              "justify-center",
              "rounded-xl",
              "bg-red-50",
              "text-red-600",
            ].join(" ")}
          >
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold leading-5 text-gray-900">Something went wrong</p>
            </div>

            <p className="mt-1 text-sm leading-5 text-gray-600">{message}</p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              dismiss();
              onDismiss();
            }}
            aria-label="Dismiss error"
          >
            <X size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      ),
      duration: 0,
      dismissible: false,
      progress: false,
    });
  }, [custom, message, onDismiss, className]);

  return null;
}

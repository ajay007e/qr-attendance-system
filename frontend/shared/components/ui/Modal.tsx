"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/shared";

import { ModalProps } from "./types";

export default function Modal({ open, onClose, title, children, footer, size = "md", fullscreen = false }: ModalProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`
        fixed
        inset-0
        z-50
        flex
        justify-center
        bg-black/40
        ${fullscreen ? "items-center p-0" : "items-end p-0 sm:items-center sm:p-4"}
      `}
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className={`
          flex
          w-full
          flex-col
          bg-white
          shadow-xl

          ${fullscreen ? "h-full max-h-full rounded-none" : "max-h-[90vh] rounded-t-2xl sm:rounded-2xl"}

          ${!fullscreen && size === "sm" ? "sm:max-w-md" : ""}
          ${!fullscreen && size === "md" ? "sm:max-w-xl" : ""}
          ${!fullscreen && size === "lg" ? "sm:max-w-3xl" : ""}
        `}
      >
        {title && (
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

            <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </Button>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

        {footer && <div className="shrink-0 border-t border-gray-100 px-5 py-4 sm:px-6">{footer}</div>}
      </div>
    </div>
  );
}

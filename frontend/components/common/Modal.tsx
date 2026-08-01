"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;

  onClose: () => void;

  title?: string;

  children: React.ReactNode;

  footer?: React.ReactNode;

  size?: "sm" | "md" | "lg";
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className={`
          w-full
          rounded-2xl
          bg-white
          shadow-xl

          ${size === "sm" && "max-w-md"}

          ${size === "md" && "max-w-xl"}

          ${size === "lg" && "max-w-3xl"}
        `}
      >
        {/* Header */}

        {title && (
          <div
            className="
                flex
                items-center
                justify-between
                border-b
                border-gray-100
                px-6
                py-4
              "
          >
            <h2
              className="
                  text-lg
                  font-semibold
                  text-gray-900
                "
            >
              {title}
            </h2>

            <button
              onClick={onClose}
              className="
                  rounded-lg
                  p-2
                  text-gray-400
                  hover:bg-gray-100
                  hover:text-gray-700
                "
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}

        <div className="p-6">{children}</div>

        {/* Footer */}

        {footer && (
          <div
            className="
                border-t
                border-gray-100
                px-6
                py-4
              "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

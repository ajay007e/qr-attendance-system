"use client";

import { Button, cn } from "@/shared";

import { emptyStateIconVariants, emptyStateVariants } from "./empty-state.styles";
import type { EmptyStateProps } from "./empty-state.types";

export default function EmptyState({ icon, title, message, action, size = "md", className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        emptyStateVariants({
          size,
        }),
        className,
      )}
    >
      {icon && (
        <div
          className={emptyStateIconVariants({
            size,
          })}
        >
          {icon}
        </div>
      )}

      <h3
        className="
          mt-5
          text-lg
          font-semibold
          text-gray-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-relaxed
          text-gray-500
        "
      >
        {message}
      </p>

      {action && (
        <Button size="lg" fullWidth className="mt-6 sm:w-auto" leftIcon={action.icon} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

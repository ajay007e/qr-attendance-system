"use client";

import { cn } from "@/shared/lib/utils";
import { noResultsMessageVariants, noResultsTitleVariants, noResultsVariants } from "./no-results.styles";
import type { NoResultsProps } from "./no-results.types";

export default function NoResults({
  title = "No results found",
  message = "Try changing your search or filters.",
  action,
  className,
}: NoResultsProps) {
  return (
    <div className={cn(noResultsVariants(), className)}>
      <h3 className={noResultsTitleVariants()}>{title}</h3>

      <p className={noResultsMessageVariants()}>{message}</p>

      {action}
    </div>
  );
}

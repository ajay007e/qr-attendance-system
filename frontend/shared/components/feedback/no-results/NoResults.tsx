"use client";

import { EmptyState } from "@/shared";
import type { NoResultsProps } from "./no-results.types";

export default function NoResults({
  title = "No results found",
  message = "Try changing your search or filters.",
  action,
  className,
}: NoResultsProps) {
  return <EmptyState title={title} message={message} action={action} className={className} />;
}

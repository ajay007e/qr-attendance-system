"use client";

import { cn } from "@/shared/lib/utils";

import { formErrorVariants } from "./error.styles";
import type { FormErrorProps } from "./error.types";

export default function FormError({ message, className }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div role="alert" className={cn(formErrorVariants(), className)}>
      {message}
    </div>
  );
}

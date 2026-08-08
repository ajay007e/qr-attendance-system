import type { HTMLAttributes } from "react";

export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
  message?: string;
  overlay?: boolean;
}

export interface PageLoaderProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}

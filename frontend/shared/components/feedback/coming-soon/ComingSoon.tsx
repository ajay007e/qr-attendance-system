"use client";

import { Clock } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import {
  comingSoonIconVariants,
  comingSoonMessageVariants,
  comingSoonStatusVariants,
  comingSoonTitleVariants,
  comingSoonVariants,
} from "./coming-soon.styles";

import type { ComingSoonProps } from "./coming-soon.types";

export default function ComingSoon({
  title = "Coming Soon",
  message = "This feature is currently under development.",
  status = "Under Development",
  size = "md",
  className,
}: ComingSoonProps) {
  return (
    <div
      className={cn(
        comingSoonVariants({
          size,
        }),
        className,
      )}
    >
      <div
        className={comingSoonIconVariants({
          size,
        })}
      >
        <Clock />
      </div>

      <h2
        className={comingSoonTitleVariants({
          size,
        })}
      >
        {title}
      </h2>

      <p
        className={comingSoonMessageVariants({
          size,
        })}
      >
        {message}
      </p>

      <span className={comingSoonStatusVariants()}>{status}</span>
    </div>
  );
}

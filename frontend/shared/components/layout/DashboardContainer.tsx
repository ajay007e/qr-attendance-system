import type { HTMLAttributes } from "react";

import { cn } from "@/shared";

export default function DashboardContainer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl space-y-5 sm:space-y-6", className)} {...props}>
      {children}
    </div>
  );
}

import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export default function DashboardSection({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      {children}
    </section>
  );
}

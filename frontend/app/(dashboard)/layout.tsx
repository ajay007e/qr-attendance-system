"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { DashboardShell, getDashboardRoute, PageLoader } from "@/shared";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, user } = useAuth();

  const expectedRoute = user ? getDashboardRoute(user.role) : null;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (expectedRoute && !pathname.startsWith(expectedRoute)) {
      router.replace(expectedRoute);
    }
  }, [loading, user, pathname, router, expectedRoute]);

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (!user || !expectedRoute) {
    return null;
  }

  if (!pathname.startsWith(expectedRoute)) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { DashboardShell, getDashboardRoute, PageLoader } from "@/shared";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, user } = useAuth();

  const expectedRoute = user ? getDashboardRoute(user.role) : null;

  const isAuthorizedRoute = expectedRoute && (pathname === expectedRoute || pathname.startsWith(`${expectedRoute}/`));

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (expectedRoute && !isAuthorizedRoute) {
      router.replace(expectedRoute);
    }
  }, [loading, user, pathname, router, expectedRoute, isAuthorizedRoute]);

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (!user || !expectedRoute || !isAuthorizedRoute) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}

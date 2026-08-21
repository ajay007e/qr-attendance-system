"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardShell, getDashboardRoute, PageLoader, MENUS } from "@/shared";
import { useAuth } from "../../hooks/useAuth";

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, user, logout } = useAuth();

  const expectedRoute = user ? getDashboardRoute(user.role) : null;

  const isAuthorizedRoute = expectedRoute && (pathname === expectedRoute || pathname.startsWith(`${expectedRoute}/`));

  const items = user ? (MENUS[user.role] ?? []) : [];

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

  return (
    <DashboardShell user={user} items={items} onLogout={logout}>
      {children}
    </DashboardShell>
  );
}

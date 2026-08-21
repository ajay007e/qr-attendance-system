"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDashboardRoute, PageLoader } from "@/shared";
import { useAuth } from "../../hooks/useAuth";

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace(getDashboardRoute(user.role));
    }
  }, [loading, user, router]);

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (user) {
    return null;
  }

  return children;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { getDashboardRoute, PageLoader } from "@/shared";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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

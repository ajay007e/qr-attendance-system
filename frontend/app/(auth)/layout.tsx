"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth.context";
import { getDashboardRoute } from "@/lib/routes";
import PageLoader from "@/components/common/PageLoader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace(getDashboardRoute(user.role));
    }
  }, [loading, user, router]);

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (user) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      {children}
    </main>
  );
}

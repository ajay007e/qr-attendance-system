"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/context/auth.context";
import { getDashboardRoute } from "@/lib/routes";

import PageLoader from "@/components/common/PageLoader";
import DashboardShell from "@/components/layout/DashboardShell";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    const expectedRoute = getDashboardRoute(user.role);

    if (!pathname.startsWith(expectedRoute)) {
      router.replace(expectedRoute);
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  if (!user) {
    return null;
  }

  const expectedRoute = getDashboardRoute(user.role);

  if (!pathname.startsWith(expectedRoute)) {
    return null;
  }

  return <DashboardShell>{children}</DashboardShell>;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth";
import { getDashboardRoute } from "@/shared";

export default function HomePage() {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;
    const destination = user ? getDashboardRoute(user.role) : "/login";
    router.replace(destination);
  }, [loading, user, router]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth.context";
import { getDashboardRoute } from "@/lib/routes";

export default function HomePage() {
  const router = useRouter();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    router.replace(getDashboardRoute(user.role));
  }, [loading, user, router]);

  return null;
}

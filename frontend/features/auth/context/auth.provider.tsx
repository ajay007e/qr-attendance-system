"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { authService, AuthContext } from "@/features/auth";
import type { SessionUser } from "@/shared";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (): Promise<SessionUser | null> => {
    try {
      const response = await authService.me();
      const currentUser = response.data.data;

      setUser(currentUser);

      return currentUser;
    } catch {
      setUser(null);

      return null;
    }
  }, []);

  async function login(email: string, password: string): Promise<SessionUser> {
    const response = await authService.login({
      email,
      password,
    });

    const currentUser = response.data.data;

    const sessionUser: SessionUser = {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
    };

    setUser(sessionUser);

    return sessionUser;
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      router.replace("/login");
    }
  }

  useEffect(() => {
    async function initialize() {
      await refresh();
      setLoading(false);
    }

    initialize();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

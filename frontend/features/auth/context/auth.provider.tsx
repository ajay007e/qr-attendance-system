"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { authService, AuthContext, toSessionUser } from "@/features/auth";
import type { AuthProviderProps, LoginPayload } from "@/features/auth";
import type { SessionUser } from "@/shared";

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (): Promise<SessionUser | null> => {
    try {
      const response = await authService.me();
      const currentUser = toSessionUser(response.data.data);
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const login = useCallback(async ({ email, password }: LoginPayload): Promise<SessionUser> => {
    const response = await authService.login({
      email,
      password,
    });
    const currentUser = toSessionUser(response.data.data);
    setUser(currentUser);
    return currentUser;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await refresh();
      } finally {
        setLoading(false);
      }
    };
    void initialize();
  }, [refresh]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refresh,
    }),
    [user, loading, login, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

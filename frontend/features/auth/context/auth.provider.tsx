"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/shared";
import { authService } from "../api/auth.service";
import { AuthContext } from "./auth.context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (): Promise<User | null> => {
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

  async function login(email: string, password: string): Promise<User> {
    const response = await authService.login({
      email,
      password,
    });
    const currentUser = response.data.user;
    setUser(currentUser);
    return currentUser;
  }

  async function logout() {
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

"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../api/auth.service";
import { AuthContext } from "./auth.context";
import { User } from "@/shared";

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh(): Promise<User | null> {
    try {
      const response = await authService.me();
      const currentUser = response.data.data;
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      setUser(null);
      return null;
    }
  }

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
      try {
        await refresh();
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

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

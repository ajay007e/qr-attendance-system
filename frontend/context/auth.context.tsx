"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { CurrentUser } from "@/types/auth";

interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async (): Promise<CurrentUser | null> => {
    try {
      const response = await authService.me();

      const user = response.data.user;

      setUser(user);

      return user;
    } catch {
      setUser(null);

      return null;
    }
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<CurrentUser> => {
    await authService.login({ email, password });

    const currentUser = await refresh();

    if (!currentUser) {
      throw new Error("Unable to retrieve authenticated user.");
    }
    return currentUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  useEffect(() => {
    async function initialize() {
      try {
        await refresh();
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
        isAuthenticated: !!user,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

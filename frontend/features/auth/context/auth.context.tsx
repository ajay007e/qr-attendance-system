"use client";

import type { SessionUser } from "@/shared";
import { createContext } from "react";

export interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<SessionUser | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

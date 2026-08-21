"use client";

import { createContext } from "react";

import type { SessionUser } from "@/shared";

export interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<SessionUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<SessionUser | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

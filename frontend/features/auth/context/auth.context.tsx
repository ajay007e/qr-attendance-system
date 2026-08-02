"use client";

import { createContext } from "react";
import { AuthUser } from "../types";

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<AuthUser | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

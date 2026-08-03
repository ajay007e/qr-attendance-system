"use client";

import { User } from "@/shared";
import { createContext } from "react";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

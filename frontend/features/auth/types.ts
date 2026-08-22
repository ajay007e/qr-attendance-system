import type { ReactNode } from "react";

import { SessionUser } from "@/shared";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: ({ email, password }: LoginPayload) => Promise<SessionUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<SessionUser | null>;
}

export type AuthProviderProps = {
  children: ReactNode;
};

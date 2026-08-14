import type { Role } from "@/utils";

export interface BootstrapRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export type LoginRequest = Pick<BootstrapRequest, "email" | "password">;

export interface SessionUser {
  id: number;
  email: string;
  role: Role;
}

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface BootstrapResponse {
  success: true;
  message: string;
}

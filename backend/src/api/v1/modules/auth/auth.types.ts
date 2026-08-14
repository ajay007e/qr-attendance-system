import type { BaseUser } from "@/types";

export interface BootstrapRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export type LoginRequest = Pick<BootstrapRequest, "email" | "password">;

export interface LoginResponse extends BaseUser {
  firstName: string;
  lastName: string | null;
}

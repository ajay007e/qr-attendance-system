import type { Role } from "@/utils";

export interface BaseUser {
  id: number;
  email: string;
  role: Role;
}

export type SessionUser = BaseUser;

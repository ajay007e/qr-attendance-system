import { ROLES } from "@/utils";

export interface BaseUser {
  id: number;
  email: string;
  role: Role;
}

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type SessionUser = BaseUser;

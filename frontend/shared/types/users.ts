import { USER_ROLES } from "@/shared";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface User {
  id: number;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string | null;
  isActive: boolean;
}

export type SessionUser = Pick<User, "id" | "email" | "role">;

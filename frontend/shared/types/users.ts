import { USER_ROLES } from "@/shared";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface User {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  role: UserRole;
  is_active: boolean;
}

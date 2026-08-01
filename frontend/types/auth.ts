export type UserRole = "SUPER_ADMIN" | "ADMIN" | "LECTURER" | "STUDENT";

export interface CurrentUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
}

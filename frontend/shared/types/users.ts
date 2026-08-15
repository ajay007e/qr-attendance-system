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

export type LecturerRole = "PRIMARY" | "SECONDARY" | "TUTOR";
export type Lecturer = Pick<User, "id" | "firstName" | "lastName" | "email"> & { role?: LecturerRole };

export type Participant = Pick<User, "id" | "firstName" | "lastName" | "email">;

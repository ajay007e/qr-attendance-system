import { UserRole } from "../auth";
import { UserQuery } from "./types";

export const USER_ROLES: UserRole[] = ["ADMIN", "LECTURER", "STUDENT"];

export const UI_USER_ROLES: Record<UserRole, string> = {
  SUPER_ADMIN: "Admin",
  ADMIN: "Admin",
  LECTURER: "Lecturer",
  STUDENT: "Student",
};
export const USER_STATUS = ["ACTIVE", "INACTIVE"] as const;

export type UserStatus = (typeof USER_STATUS)[number];

export const DEFAULT_USER_QUERY: UserQuery = {
  page: 1,
  limit: 10,
  search: "",
  role: "ALL",
  status: "ALL",
};

import { UserRole } from "@/types/auth";
import { UserQuery } from "./types";

export const USER_ROLES: UserRole[] = ["ADMIN", "LECTURER", "STUDENT"];

export const USER_STATUS = ["ACTIVE", "INACTIVE"] as const;

export type UserStatus = (typeof USER_STATUS)[number];

export const DEFAULT_USER_QUERY: UserQuery = {
  page: 1,
  limit: 10,
  search: "",
  role: "ALL",
  status: "ALL",
};

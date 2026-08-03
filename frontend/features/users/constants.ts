import { UserQuery, TabItem } from "./types";

export const USER_STATUS = ["ACTIVE", "INACTIVE"] as const;

export type UserStatus = (typeof USER_STATUS)[number];

export const DEFAULT_USER_QUERY: UserQuery = {
  page: 1,
  limit: 10,
  search: "",
  role: "ALL",
  status: "ALL",
};

export const TABS: TabItem[] = [
  { key: "details", label: "Details" },
  { key: "password", label: "Password" },
  { key: "delete", label: "Delete" },
];

export const USER_ROLE_FILTER_OPTIONS = [
  {
    label: "All Roles",
    value: "ALL",
  },
  {
    label: "Admin",
    value: "SUPER_ADMIN",
  },
  {
    label: "Lecturer",
    value: "LECTURER",
  },
  {
    label: "Student",
    value: "STUDENT",
  },
] as const;

export const USER_STATUS_FILTER_OPTIONS = [
  {
    label: "All Status",
    value: "ALL",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
] as const;

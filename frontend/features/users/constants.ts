import type { UserQuery } from "@/features/users";
import type { TabItem } from "@/shared";

export const USER_STATUS = ["ACTIVE", "INACTIVE"] as const;

export const DEFAULT_USER_QUERY: UserQuery = {
  page: 1,
  limit: 10,
  search: "",
  role: "ALL",
  status: "ALL",
};

export const USER_TABS: TabItem[] = [
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
    value: "super_admin",
  },
  {
    label: "Lecturer",
    value: "lecturer",
  },
  {
    label: "Student",
    value: "student",
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

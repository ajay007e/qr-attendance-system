import { type UserRole, LecturerRole, USER_ROLES } from "@/shared";

export const USER_ROLE_OPTIONS = [
  {
    value: USER_ROLES.SUPER_ADMIN,
    label: "Admin",
  },
  {
    value: USER_ROLES.ADMIN,
    label: "Admin",
  },
  {
    value: USER_ROLES.LECTURER,
    label: "Lecturer",
  },
  {
    value: USER_ROLES.STUDENT,
    label: "Student",
  },
] satisfies Array<{
  value: UserRole;
  label: string;
}>;

export const UI_USER_ROLE_OPTIONS = [
  {
    value: USER_ROLES.LECTURER,
    label: "Lecturer",
  },
  {
    value: USER_ROLES.STUDENT,
    label: "Student",
  },
] satisfies Array<{
  value: UserRole;
  label: string;
}>;

export function getUserRoleLabel(role: UserRole): string {
  return USER_ROLE_OPTIONS.find((item) => item.value === role)?.label ?? role;
}

export const LECTURER_ROLE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TUTOR: "tutor",
} as const satisfies Record<string, LecturerRole>;

export const LECTURER_ROLE_LABELS: Record<LecturerRole, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tutor: "Tutor",
};

export const LECTURER_ROLE_OPTIONS = Object.entries(LECTURER_ROLE_LABELS).map(([value, label]) => ({
  label,
  value: value as LecturerRole,
}));

export const getLecturerRoleLabel = (role: LecturerRole) => LECTURER_ROLE_LABELS[role];

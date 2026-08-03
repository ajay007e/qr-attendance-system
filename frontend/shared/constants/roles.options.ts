import { UserRole } from "..";
import { USER_ROLES } from "./roles";

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

export const getUserRoleLabel = (role: UserRole) => {
  return USER_ROLE_OPTIONS.find((item) => item.value === role)?.label ?? role;
};

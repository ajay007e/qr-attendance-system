export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  LECTURER: "lecturer",
  STUDENT: "student",
} as const;

// TODO: move to shared types
export type Role = (typeof ROLES)[keyof typeof ROLES];

export const roles = {
  super_admin: "super_admin",
  admin: "admin",
  lecturer: "lecturer",
  student: "student",
} as const;

// TODO: move to shared types
export type role = (typeof roles)[keyof typeof roles];

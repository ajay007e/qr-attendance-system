import { Role } from "./constants/roles";

export function isValidRole(role: string): role is Role {
  return Object.values(Role).includes(role as Role);
}

export function isAdmin(role: string): boolean {
  return role === Role.SUPER_ADMIN || role === Role.ADMIN;
}
